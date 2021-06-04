require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const path = require('path');
const Dog = require('./dog-model');

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'client/build')))

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

server.get('/api', (req, res) => {
    res.json({message: `${process.env.COHORT} rocks` })
})

server.get('/hello', (req, res) => {
    res.json({ message: 'hello' });
});

server.get('/api/dogs', async (req, res) => {
    //pull dogs from DB, send dogs back to client
    try {
        const dogs = await Dog.findAll();
        res.json(dogs);
    }
    catch (err) {
        res.status(500).json({message: 'error getting all dogs',
                              error: err.message,});
    }
})

server.get('/api/dogs/:id', async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) {
            res.status(404).json({message: 'Dog not found'});
        }
        else {
            res.json(dog);
        }
    }
    catch (err) {
        res.status(500).json({message: 'error getting dog by id',
                              error: err.message,});
    }
})

server.post('/api/dogs', async (req, res) => {
    try {
        if(!req.body.name || !req.body.weight) {
            res.status(400).json({message: 'name and weight are required'});
        } else {
            const dog = await Dog.create(req.body);
            res.status(201).json(dog);
        }
    }
    catch (err) {
        res.status(500).json({message: 'error posting new dog',
        error: err.message,}); 
    }
})

server.put('/api/dogs/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const updated = await Dog.update(id, body);
        if (!updated) {
            res.status(404).json({ message: `Dog by id ${id} does not exist`});
        }
        else {
            res.json(updated);
        }
    }
    catch (err) {
        res.status(500).json({message: 'error updating dog',
                              error: err.message,}); 
    }
})

server.delete('/api/dogs/:id', async (req, res) => {
    const { id } = req.params;
    Dog.delete(id)
        .then(deletedDog => {
            if (!deletedDog) {
                res.status(404).json({ message: `Dog by id ${id} does not exist`});
            }
            else {
                res.json(deletedDog);
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error deleting dog',
                                  error: err.message,}); 
        })
})
module.exports = server;