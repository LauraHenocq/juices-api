import GroceryController from "../controllers/GroceryController";
import RecipeController from "../controllers/RecipeController";
import FavoriteController from "../controllers/FavoriteController";
import { Request, Response } from 'express';

export default (server) => {
  // GROCERY
  server.get("/grocery", (req: Request, res: Response) => {
    GroceryController.getAll(req, res);
  });
  
  server.get("/grocery/:id", (req: Request, res: Response) => {
    GroceryController.get(req, res);
  });
  
  server.post("/grocery", (req: Request, res: Response) => {
    GroceryController.create(req, res);
  });
  
  server.put("/grocery", (req: Request, res: Response) => {
    GroceryController.update(req, res);
  });
  
  server.delete("/grocery", (req: Request, res: Response) => {
    GroceryController.delete(req, res);
  }); 

  // RECIPES
  server.get("/recipes", (req: Request, res: Response) => {
    RecipeController.getAll(req, res);
  });
    
  server.get("/recipes/:id", (req: Request, res: Response) => {
    RecipeController.get(req, res);
  });
    
  server.post("/recipes", (req: Request, res: Response) => {
    RecipeController.create(req, res);
  });
    
  server.put("/recipes", (req: Request, res: Response) => {
    RecipeController.update(req, res);
  });
    
  server.delete("/recipes", (req: Request, res: Response) => {
    RecipeController.delete(req, res);
  }); 

  // FAVORITES
  server.get("/favorites", async (req: Request, res: Response) => {
    await FavoriteController.getAll(req, res);
  });

  server.post("/favorites", (req: Request, res: Response) => {
    FavoriteController.create(req, res);
  });
};