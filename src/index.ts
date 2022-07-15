import express from 'express';

const server = express()

server.listen(5500, () => {
    console.log('Serveur lancé et écoute sur le port 5500')
})

server.get('/', (req, res) => {
    console.log('Bienvenue sur la page d\'acceuil de l\'API juices')
})