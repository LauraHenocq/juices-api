import Favorite from "../models/Favorite";
import { Request, Response } from 'express';

export default ({
    async getAll(req: Request, res: Response) {
        const { limit } = req.query
        let search = {}
        try {
            const favorites = await Favorite.find(search)
                .sort({ type: 1 })
                .limit(Number(limit) || 10)
                .exec()

            res.send(favorites);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
        }
        
    },
    create(req: Request, res: Response) {
        const fruitOuLegume = new Favorite({
            type: req.body.type,
            item: req.body.favorite
        });
        try {
            fruitOuLegume.save().then(() => {
                res.send({ result: `Ajout du favori ${fruitOuLegume.item.name || fruitOuLegume.item.title}` });
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Erreur lors de l\'ajout aux favoris' });
        }
        
    },
});