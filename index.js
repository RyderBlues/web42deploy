const server = require('./server');
const path = require('path');

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
