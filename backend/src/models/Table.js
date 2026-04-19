const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableName:{
        type: String,
        required: true,
        unique: true
    },
    area:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["available", "occupied"],
        default: "available"
    }
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);