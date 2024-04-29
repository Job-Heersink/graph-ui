import express from "express"
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Online')
})

app.get('/ping', (req, res) => {
    res.send('pong')
})


app.listen(port, () => {
    console.log(`app started listening on port ${port}`)
})