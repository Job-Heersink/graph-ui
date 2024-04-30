import {close_connection, get_traversal} from "../db/neptune.js";
import {TreeNode} from "../models/tree_node.js";
import gremlin from "gremlin";

const  __  = gremlin.process.statics;

export async function get_tree(req, res){
    /*
     retrieve the entire tree from the database
     */

    const g = await get_traversal();
    let vertexes = await g.V().project('name', 'description', 'parent')
        .by(__.label())
        .by(__.properties("description").value())
        .by(__.outE().inV().label()).toList();

    res.send(vertexes.map(e => new TreeNode(e)));
    await close_connection();
}