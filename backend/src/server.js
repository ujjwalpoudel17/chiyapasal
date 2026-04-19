require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const tableRoutes = require('./routes/tableRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


//Routes
app.use('/api/auth',authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/menus',menuRoutes);
app.use('/api/orders', orderRoutes);




//create server
app.get('/',(req, res) => {
res.send('Backend is Running Successfully');
});

//Start the server after the Database Connectivity
connectDB().then(()=>{
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
console.log(`Server is running ON port ${PORT}`);
});
});