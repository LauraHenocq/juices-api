import Favorite from "../models/Favorite";
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

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
  async create(req: Request, res: Response) {
    const fruitOuLegume = new Favorite({
      type: req.body.type,
      item: req.body.item
    });
    try {
      await Favorite.create(fruitOuLegume).then((result) => {
        res.send(result);
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Erreur lors de l\'ajout aux favoris' });
    } 
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      console.log('id', id);
      const deletedItem = await Favorite.findByIdAndRemove(new ObjectId(id));
      if (deletedItem) {
        console.log("Favori supprimé avec succès");
        res.send(id);
      } else {
        console.log("Aucun favori trouvé avec cet ID.");
        res.status(404).send(null);
      }
    } catch (e) {
      console.error(`Erreur lors de la suppression du favori: ${e}`);
      res.status(500).json({ message: 'Erreur lors de la suppression du favori' });
    } 
  },
});