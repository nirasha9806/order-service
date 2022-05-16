const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const uri = process.env.MONGODB_ATLAS_URI;
const port = process.env.PORT;

const server = express();

server.use(cors());

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('This is the Order Service');
});

//#region Data Routes
const orderRoutes = require('./routes/order-routes');

server.use('/api/order', orderRoutes);

//#endregion Data Routes

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port);
    console.log(
      '\x1b[36m%s\x1b[36m%s\x1b[2m',
      'Connected to MongoDB Successfully',
      ' Port: ' + port
    );
  })
  .catch((error) => {
    console.log(error);
  });
