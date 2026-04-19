const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true 
    },
    image: {
        type: String, // Optional: for showing a small photo in the Waiter's order app
        required: false
    }

}, {timestamps: true});

module.exports = mongoose.model("Menu", menuSchema);