import Grocery from "../models/Grocery";
import { Request, Response } from 'express';

export default ({
    getAll(req: Request, res: Response) {
        try {
            Grocery.find().then(fruitsOuLegumes => {
                res.send(fruitsOuLegumes)
            })
        } catch (e) {
            console.log(e)
        }
        
    },
    get(req: Request, res: Response) {
        const id = req.params.id;
        try {
            Grocery.findById(id).then(fruitOuLegume => {
                res.send(fruitOuLegume);
            });
        } catch (e) {
            console.log(e)
        }
        
    },
    create(req: Request, res: Response) {
        const fruitOuLegume = new Grocery({
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            local: req.body.local,
            months: req.body.months || [0]
        });
        try {
            fruitOuLegume.save().then(() => {
                res.send({ result: `Création du fruit / du légume ${fruitOuLegume.name}` });
            });
        } catch (e) {
            console.log(e)
        }
        
    },
    update(req: Request, res: Response) {
        const newFruitOuLegume = { ...req.body, months: req.body.months ? req.body.months : [0] }

        const id = req.body._id;
        if (id) {
            try {
                Grocery.findByIdAndUpdate(id, newFruitOuLegume).then(fruitOuLegume => {
                    res.send(`Mise à jour du ${fruitOuLegume.type === 'Fruit' ? 'fruit' : 'légume'}  ${fruitOuLegume.name}`);
                });
            } catch (e) {
                console.log(e)
            }
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour l'item" });
        }
    },
    delete(req: Request, res: Response) {
        const id = req.body._id;
        try {
            Grocery.findByIdAndRemove(id).then(fruitOuLegume => {
                res.send({ result: `Suppression du ${fruitOuLegume.type === 'Fruit' ? 'fruit' : 'légume'} ${fruitOuLegume.name}` });
            });
        } catch (e) {
            console.log(e)
        }
        
    }
})