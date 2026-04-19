const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(' Mongo DB connected Successfully')
    }
    catch(error){
        console.error('Mongo connection Failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;