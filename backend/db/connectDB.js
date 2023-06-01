const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB Connected'.bgGreen))
    .catch(() => console.log('Failed to connect to DB'));
};

module.exports = connectDB;
