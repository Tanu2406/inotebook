const mongoose = require('mongoose');

const connectToMongo = async () => {
  //  await mongoose.connect('mongodb://localhost:27017/inotebook');
  await mongoose.connect('mongodb+srv://Tanuja:Tanuja24@cluster0.gyby1.mongodb.net/');
    console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
  

