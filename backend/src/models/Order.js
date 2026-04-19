const mongoose = require("mongoose");
const Table = require("./Table");

const orderSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Table"
    },
    items: [
        {
            menuItem: {
                 type: mongoose.Schema.Types.ObjectId,
                 required: true,
                 ref: "Menu",
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }   
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema)