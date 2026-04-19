const express = require("express");
const router = express.Router();
const multer = require("multer"); // 1. Import multer
const { createMenu, getMenus } = require("../controllers/menuController");
const { protect, authorize } = require('../middleware/authMiddleware');

// 2. Define how and where to store the files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this 'uploads' folder exists in your backend root!
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 3. Create the 'upload' variable (This fixes your ReferenceError)
const upload = multer({ storage: storage });

// create menu
// 4. Use 'upload.single("image")' here
router.post('/create-menu', protect, authorize("admin"), upload.single("image"), createMenu);

// get menu
router.get('/menus', protect, authorize("admin", "waiter"), getMenus);

module.exports = router;