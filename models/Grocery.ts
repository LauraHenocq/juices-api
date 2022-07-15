import mongoose from "mongoose";
import GroceryType from "../domain/groceryType"

const FruitOuLegumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String, 
        enum: GroceryType,
        required: true
    },
    local: {
        type: Boolean, 
        required: true
    },
    months: {
        type: [Number],
        required: true
    }
}, { collection : 'grocery' });

const Grocery = mongoose.model("grocery", FruitOuLegumeSchema);

export default Grocery