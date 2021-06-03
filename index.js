require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const path = require('path');

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'client/build')))


const PORT = process.env.PORT || 5000;

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

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