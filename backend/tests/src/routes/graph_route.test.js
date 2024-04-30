import { jest } from '@jest/globals';
import {TreeNode} from "../../../src/models/tree_node.js";
import request from "supertest";
import {app} from "../../../src/app.js";

jest.mock('../../../src/db/neptune.js');

const mock_data = {
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

const traversal_mock = {toList: ()=>mock_data}
traversal_mock.V = ()=>traversal_mock
traversal_mock.project = ()=>traversal_mock
traversal_mock.by = ()=>traversal_mock



describe('test graph controller', () => {


    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should send a JSON response with the nodes', async () => {
        import("../../../src/db/neptune.js").then(async (mod)=>{
            mod.get_traversal.mockReturnValue(()=>traversal_mock)
            console.log(mod.get_traversal().toList())
            const response = await request(app).get("/api/graph")
            expect(response).toBe(mock_data.map(e => new TreeNode(e)))

        })

    });


});