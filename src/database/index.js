const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

async function connect() {
    try {
        await mongoose.connect(MONGO_URI);
        return true;
    } catch (error) {
        console.log('Error:');
        console.log(error);
        return false;
    }
}

let database = {
    connect
};

module.exports = database;