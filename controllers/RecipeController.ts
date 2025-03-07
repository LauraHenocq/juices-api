import Recipe from "../models/Recipe";
import { Request, Response } from 'express';

export default ({
    getAll(req: Request, res: Response) {
        const { limit, text, quantityOfJuice, ingredients, season } = req.query
        let search = {}
        if (quantityOfJuice) {
            const searchQuantityOfJuice = { quantityOfJuice: quantityOfJuice }
            search = { ...search, ...searchQuantityOfJuice }
        }
        if (ingredients) {
            const searchIngredients = { 'ingredients.grocery_id': { $in: ingredients} }
            search = { ...search, ...searchIngredients }
        }
        if (text) {
            const textForIndex = "\"" + text + "\""
            const searchText = { $text: { $search: textForIndex } }
            search = { ...search, ...searchText }
        }
        if (season) {
            const searchSeason = { season: season }
            search = { ...search, ...searchSeason }
        }
        try {
            Recipe.find(search)
                .sort({ title: 1})
                .limit(Number(limit))
                .exec()
                .then(recettes => {
                    res.send(recettes)
                })
        } catch (e) {
            console.log(e)
        }
        
    },
    get(req: Request, res: Response) {
        const id = req.params.id;
        try {
            Recipe.findById(id).then(recipe => {
                res.send(recipe);
            });
        } catch (e) {
            console.log(e)
        }
        
    },
    create(req: Request, res: Response) {
        const recette = new Recipe({
            title: req.body.title,
            preparation: req.body.preparation,
            quantityOfJuice: req.body.quantityOfJuice,
            ingredients: req.body.ingredients,
            description: req.body.description,
            season: req.body.season,
            goodToKnow: req.body.goodToKnow
        });
        try {
            recette.save().then(() => {
                res.send({ result: `Création de la recette ${recette.title}` });
            });
        } catch (e) {
            console.log(e)
        }
        
    },
    update(req: Request, res: Response) {
        const newRecette = req.body

        const id = newRecette._id;
        if (id) {
            try {
                Recipe.findByIdAndUpdate(id, newRecette).then(recette => {
                    res.send(`Mise à jour de la recette  ${recette.title}`);
                });
            } catch (e) {
                console.log(e)
            }
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour la recette" });
        }
    },
    delete(req: Request, res: Response) {
        const id = req.body._id;
        try {
            Recipe.findByIdAndRemove(id).then(recette => {
                res.send({ result: `Suppression de la recette ${recette.title}` });
            });
        } catch (e) {
            console.log(e)
        }
        
    }
})