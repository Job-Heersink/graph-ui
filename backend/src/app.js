import express from "express"
import cors from "cors"
import graph_router from "./routes/graph_route.js"

const port = process.env.PORT || 5000;
export const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/graph', graph_router);

app.get('/ping', (req, res) => {
    res.send('pong')
})


app.listen(port, () => {
    console.log(`app started listening on port ${port}`)
})