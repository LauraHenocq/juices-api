import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from "../routes/index";
const cors = require('cors');

const server = express()
server.use(cors())
server.use(express.json())
routes(server);

server.listen(4000, () => {
    console.log('Serveur lancé et écoute sur le port 4000')

    mongoose.set('strictQuery', false)

    mongoose.connect("mongodb://127.0.0.1:27017/juices")
        .catch(error => console.log(error));


    mongoose.connection
        .once("open", () => console.log("Connexion à MongoDB ok"))
        .on("error", error => console.warn("Problème durant la connexion", error));
})

server.get('/', (req: Request, res: Response) => {
    console.log('Bienvenue sur la page d\'acceuil de l\'API juices')
    res.send({
        result: "Hello World !"
    })
})