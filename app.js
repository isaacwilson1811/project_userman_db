// required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// env vars
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_URI;
const myDataBase = process.env.DB_NAME;
const myCollection = process.env.DB_COLLECTION;

// mongoose client and socket connection
mongoose.connect( DB_HOST+myDataBase, {useNewUrlParser:true, useUnifiedTopology:true} );
const mongoClient = mongoose.connection;
mongoClient.on('error', console.error.bind(console, 'connection error:'));
mongoClient.once('open', () => {
  console.log('connected to mongoose client');
});

// mongoose schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number
});

// mongoose model
const UserModel = mongoose.model('User', userSchema, myCollection);

// express app and use middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start server listening
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`)
});

// http requests
app.get('/', (req, res) => {
  UserModel.find({},(err,data) => {
    let result = JSON.stringify(data);
    res.send(result);
  });
});

