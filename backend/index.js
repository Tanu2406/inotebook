require('dotenv').config({ path: '../.env.local' }); 
const connectToMongo = require('./db');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

connectToMongo();

const port = process.env.PORT || 5000;  

var app = express();

app.use(cors({
    origin:  ['http://localhost:3000', 'https://inotebook-khaki.vercel.app'], // Frontend domain
}));
app.use(express.json()); 
app.use(morgan('combined')); 

app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes')); 
app.get('/', (req, res) => {
     res.send('Hello World');
   });

   const server = app.listen(port, () => {
       console.log(`iNotebook backend listening at http://localhost:${port}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Trying a different port...`);
          server.close(() => {
              server.listen(port + 1);
          });
      } else {
          console.error('Server error:', err);
      }
  });

  