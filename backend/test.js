import {g, execute_query, close_connection} from "./db/neptune.js"
import gremlin from 'gremlin';
import {TreeNode} from "./models/tree_node.js";
const  __  = gremlin.process.statics;

// console.log("vertices")
let vertexes = await g.V().project('name', 'description', 'parent')
    .by(__.label())
    .by(__.properties("description").value())
    .by(__.outE().inV().label()).toList()
const result = vertexes.map(e => new TreeNode(e))
// console.log(result)

let roots = await g.V().hasLabel("A").out().out().tree().toList()


console.log(roots[0][0].value["@value"][0])

// console.log("get data")
// console.log(await g.V().out().fold().next())


await close_connection()