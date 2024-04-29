/*
populate the AWS Neptune Database with the given json data.
 */

import {g, execute_query} from "./neptune.js"

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
    await g.V().drop().iterate()

    // add vertices
    for(const d of data["data"]){
        query = query.addV(d["name"]).property("description", d["description"])
    }

    //add edges
    for(const d of data["data"]){
        query = query.V(d["parent"]).addE("CHILD").to(d["name"])
    }
    await query.next()
}


// execute_query(add_data).then(() => console.log("data has been written"))
g.V().next().then((r)=>{console.log(r)})
add_data().then(()=>console.log("database populated")).then(()=>g.V().next().then((r)=>console.log(r)))
