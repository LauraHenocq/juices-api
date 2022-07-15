import mongoose from "mongoose";
import Season from "../domain/season"

const RecetteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    preparation: {
        type: {
            hours:{
                type: Number,
                required: true
            },
            minutes: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    quantityOfJuice: {
        type: String, 
        required: true
    },
    ingredients: {
        type: [{
            grocery_id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    season: {
        type: String,
        enum: Season,
        required: true
    },
    goodToKnow: {
        type: String,
        required: false
    }
}, { collection : 'recipes' });

const Recipe = mongoose.model("recipes", RecetteSchema);

export default Recipe