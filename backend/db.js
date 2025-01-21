require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true,
   useUnifiedTopology: true,}
   );
    console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
  

