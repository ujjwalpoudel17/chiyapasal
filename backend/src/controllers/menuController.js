const Menu = require("../models/Menu");

// Create Menu Item
exports.createMenu = async (req, res) => {
    try {
        const { itemName, price, category, available, ingredients } = req.body;

        // 1. Validate fields
        if (!itemName || !price || !category || !available || !ingredients) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            });
        }

        // 2. Check for existing item
        const existingItem = await Menu.findOne({ itemName });
        if (existingItem) {
            return res.status(400).json({
                success: false,
                message: "Menu item with this name already exists"
            });
        }

        // 3. Handle image path from Multer
        const imagePath = req.file ? req.file.path : "";

        // 4. Create the item
        const newItem = await Menu.create({
            itemName,
            price,
            category,
            // Logic: Handle both "true" from Postman and "Available" from your Select dropdown
            available: available === "true" || available === "Available",
            ingredients,
            image: imagePath
        });

        // ✅ FIXED: You MUST send a response back, otherwise it results in a 500/Timeout
        return res.status(201).json({
            success: true,
            message: "Menu item created successfully",
            data: newItem
        });

    } catch (error) {
        console.error("DETAILED SERVER ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Get All Menus
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({});
        res.status(200).json({
            success: true,
            data: menus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};