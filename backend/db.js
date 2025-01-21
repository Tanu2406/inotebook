require('dotenv').config({ path: '../.env.local' }); 
const mongoose = require('mongoose');

const connectToMongo = async () => {
  console.log('MongoDB URI:', process.env.MONGO_URI);

  await mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true,
   useUnifiedTopology: true,}
   );
  
    console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
  

