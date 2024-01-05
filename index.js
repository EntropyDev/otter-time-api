import express from 'express'

const app = express()
const port = 5001

app.listen(port, () => console.log(`Listening on port: ${port}`))

app.get('/', (req, res) => res.json({msg: "Get request served! 😎"}))