import {app} from '../../src/app.js';
import supertest from 'supertest';
import {describe, it} from "node:test";
const requestWithSupertest = supertest(app);

const data = {
    "data":[
        {
            "name":"A",
            "description":"This is a description of A",
            "parent":""
        },
        {
            "name":"B",
            "description":"This is a description of B",
            "parent":"A"
        },
        {
            "name":"C",
            "description":"This is a description of C",
            "parent":"A"
        },
        {
            "name":"D",
            "description":"This is a description of D",
            "parent":"A"
        },
        {
            "name":"B-1",
            "description":"This is a description of B-1",
            "parent":"B"
        },
        {
            "name":"B-2",
            "description":"This is a description of B-2",
            "parent":"B"
        },
        {
            "name":"B-3",
            "description":"This is a description of B-3",
            "parent":"B"
        }
    ]
}

describe('Graph endpoints', () => {

    it('GET /graph should get all graph data', async () => {
        const res = await requestWithSupertest.get('/api/graph');
        console.log(res.body)
        // expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});