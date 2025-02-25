import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from "../routes/index";
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());
routes(server);

server.use((err: any, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue.' });
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/juices')
    .then(() => {
        console.log("Connexion à MongoDB ok");
        server.listen(process.env.PORT || 4000, () => {
            console.log(`Serveur lancé et écoute sur le port ${process.env.PORT || 4000}`);
        });
    })
    .catch(error => {
        console.log("Erreur de connexion à MongoDB:", error);
    });

// Endpoint d'accueil
server.get('/', (req: Request, res: Response) => {
    console.log('Bienvenue sur la page d\'acceuil de l\'API juices');
    res.send({
        result: "Hello World !"
    });
});