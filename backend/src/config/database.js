const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DBconnection = async () => {
    const URL = process.env.MONGO_URI;
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = DBconnection;
