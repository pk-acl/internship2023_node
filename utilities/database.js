const mongoose = require('mongoose')
const dataBaseConnectionString = 'mongodb+srv://prabhakaran:prabhakaran@aclintern2023.rxxn8cd.mongodb.net/';

const connectToMongoDb = async () => {
    await mongoose
        .connect(dataBaseConnectionString, {})
        .then(() => {
            console.log('DB Connected')
        })
}

module.exports = connectToMongoDb;