/*
* Javascript boilerplate functionality for Amazon Neptune.
* inspired by this AWS example: https://docs.aws.amazon.com/neptune/latest/userguide/lambda-functions-examples.html
* Requires the following environment variables to be available:
*
*    NEPTUNE_ENDPOINT   –   Your Neptune DB cluster endpoint.
*    NEPTUNE_PORT   –   The Neptune port.
* */

import gremlin from 'gremlin';

const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

let conn = null;


async function createRemoteConnection() {
    console.info("Initializing connection")
    const url = 'wss://' + process.env['NEPTUNE_ENDPOINT'] + ':' + process.env['NEPTUNE_PORT'] + '/gremlin';

    const c = new DriverRemoteConnection(
        url,
        {
            mimeType: 'application/vnd.gremlin-v2.0+json',
            headers: {}
        });

    c._client._connection.on('close', (code, message) => {
        console.info(`close - ${code} ${message}`);
        if (code === 1006){
            console.error('Connection closed prematurely');
            throw new Error('Connection closed prematurely');
        }
    });

    return c;
}

export async function get_traversal(){
    conn = await createRemoteConnection();
    return traversal().withRemote(conn);
}

export async function close_connection(){
    return conn.close()
}
