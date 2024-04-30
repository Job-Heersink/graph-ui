import express from "express"
import cors from "cors"
import graph_router from "./routes/graph_route.js"

export const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/graph', graph_router);

app.get('/ping', (req, res) => {
    res.send('pong')
})