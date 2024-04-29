import express from 'express';
const router = express.Router();
import {g, execute_query, close_connection} from "../db/neptune.js"
import {TreeNode} from "../models/tree_node.js";
import gremlin from "gremlin";
const  __  = gremlin.process.statics;


router.get('/', async (req, res) => {
    let vertexes = await g.V().project('name', 'description', 'parent')
        .by(__.label())
        .by(__.properties("description").value())
        .by(__.outE().inV().label()).toList()
    const result = vertexes.map(e => new TreeNode(e))
    res.send(result)
});

export default router;