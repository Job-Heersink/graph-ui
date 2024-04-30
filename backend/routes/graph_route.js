import express from 'express';
import {close_connection, get_traversal} from "../db/neptune.js"
import {TreeNode} from "../models/tree_node.js";
import gremlin from "gremlin";


const router = express.Router();
const  __  = gremlin.process.statics;


router.get('/', async (req, res) => {
    const g = await get_traversal()
    let vertexes = await g.V().project('name', 'description', 'parent')
        .by(__.label())
        .by(__.properties("description").value())
        .by(__.outE().inV().label()).toList()
    const result = vertexes.map(e => new TreeNode(e))
    res.send(result)
    await close_connection()
});

export default router;