/*
* Javascript boilerplate functionality for Amazon Neptune.
* inspired by this AWS example: https://docs.aws.amazon.com/neptune/latest/userguide/lambda-functions-examples.html
* Requires the following environment variables to be available:
*
*    NEPTUNE_ENDPOINT   –   Your Neptune DB cluster endpoint.
*    NEPTUNE_PORT   –   The Neptune port.
* */

import gremlin from 'gremlin';
import async from "async"
import {getUrlAndHeaders} from 'gremlin-aws-sigv4/lib/utils.js'

const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const t = gremlin.process.t;
const __ = gremlin.process.statics;

let conn = null;
export let g = null;


const createRemoteConnection = () => {
    const { url, headers } = getUrlAndHeaders(
        process.env['NEPTUNE_ENDPOINT'],
        process.env['NEPTUNE_PORT'],
        {},
        '/gremlin',
        'wss');

    const c = new DriverRemoteConnection(
        url,
        {
            mimeType: 'application/vnd.gremlin-v2.0+json',
            headers: headers
        });

    c._client._connection.on('close', (code, message) => {
        console.info(`close - ${code} ${message}`);
        if (code == 1006){
            console.error('Connection closed prematurely');
            throw new Error('Connection closed prematurely');
        }
    });

    return c;
};

export async function execute_query(query){
    return async.retry(
        {
            times: 5,
            interval: 1000,
            errorFilter: function (err) {

                // Add filters here to determine whether error can be retried
                console.warn('Determining whether retriable error: ' + err.message);

                // Check for connection issues
                if (err.message.startsWith('WebSocket is not open')){
                    console.warn('Reopening connection');
                    conn.close();
                    conn = createRemoteConnection();
                    g = traversal().withRemote(conn);
                    return true;
                }

                // Check for ConcurrentModificationException
                if (err.message.includes('ConcurrentModificationException')){
                    console.warn('Retrying query because of ConcurrentModificationException');
                    return true;
                }

                // Check for ReadOnlyViolationException
                if (err.message.includes('ReadOnlyViolationException')){
                    console.warn('Retrying query because of ReadOnlyViolationException');
                    return true;
                }

                return false;
            }

        },
        query);
}

export async function close_connection(){
    return conn.close()
}

console.info("Initializing connection")
conn = createRemoteConnection();
g = traversal().withRemote(conn);

// module.exports = {g: g, execute_query: execute_query}