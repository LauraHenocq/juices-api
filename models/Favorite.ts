import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['grocery', 'recipes'],
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.Mixed,  // Permet de stocker différents types d'objets
        required: true,
    }
}, { collection : 'favorites' });

const Favorite = mongoose.model("favorites", FavoriteSchema);

export default Favorite;