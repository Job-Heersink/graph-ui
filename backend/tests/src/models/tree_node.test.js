import {TreeNode} from "../../../src/models/tree_node.js";


describe('test TreeNode', () => {

    test('TreeNode should have a name description and parent when given', async () => {
        const node_data = {name: "node_id", description: "node description", parent: "node parent"}
        const node = new TreeNode(node_data)
        expect(node.id).toBe(node_data.name)
        expect(node.description).toBe(node_data.description)
        expect(node.parent).toBe(node_data.parentId)
    });

    test('TreeNode should not have a parent when not given', async () => {
        const node_data = {name: "node_id", description: "node description"}
        const node = new TreeNode(node_data)
        expect(node.id).toBe(node_data.name)
        expect(node.description).toBe(node_data.description)
        expect(typeof node.parent).toBe('undefined')
    });

});