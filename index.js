require('dotenv').config();
const express = require("express");
const server = express();

const PORT = process.env.PORT || 5000;

server.get('/api', (req, res) => {
    res.json({message: `${process.env.COHORT} rocks` })
})

server.use((req, res) => {
    res.json({message: 'hello'})
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
console.log(process.env)