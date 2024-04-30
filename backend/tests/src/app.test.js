import {app} from '../../src/app.js';
import request from 'supertest'

describe('test GET /ping', () => {

    test('GET /ping should return pong', async () => {
        const response = await request(app).get("/ping")
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe("pong")
    });

});