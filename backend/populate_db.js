/*
populate the AWS Neptune Database with the given json data.
 */

import {g, execute_query, close_connection} from "./db/neptune.js"

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

let query = g
async function add_data(){
    console.log("populating database")

    // clear existing data
    await g.V().drop().iterate()

    // add vertices
    for(const d of data["data"]){
        query = query.addV(d.name).property("description", d.description).as(d.name)
    }

    //add edges
    for(const d of data["data"]){
        if (d.parent !== "") {
            query = query.V().hasLabel(d.name).addE("PARENT").to(d.parent)
        }
    }
    await query.next()
}


await execute_query(add_data)
console.log("database populated")
await close_connection()
