const Table = require("../models/Table");


//create a table
exports.createTable = async (req,res) => {
    try{
        const {tableName, area} = req.body;

        if(!tableName || !area){
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            });
        }

        const existingTable = await Table.findOne({tableName});
        if(existingTable){
            return res.status(400).json({
                success: false,
                message: "Table with this name already exists"
            });
        }

        await Table.create({
            tableName,
            area
        });

        res.status(201).json({
            success: true,
            message: "Table created Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//get all tables
exports.getTables = async (req,res) =>{
    try{
        const tables = await Table.find({});
        res.status(200).json({
            success: true,
            data: tables
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
