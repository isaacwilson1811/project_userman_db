// modules
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { MongoClient } = require('mongodb');

// vars
const uri = "mongodb://localhost:27017/"; // local mongodb uri
const dbName = 'isaacs_db'; // database name
const colName = 'users'; // collection name

// middleware
app.use(express.json());

// setup mongo driver
const MONGO = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// routes
app.get('/users/all', (req, res) => {
  MONGO.connect( async (err, mongo) => {
    if (err) {
      res.status(500).json({message:err.message});
      throw err;
    }
    const db = mongo.db(dbName);
    let result = await db.collection(colName).find({}).toArray();
    res.json(result);
    MONGO.close();
  });
});

// get one user by id
app.get('/:id', (req, res) => {

});
// create new user
app.post('/', (req, res) => {

});
// update user by id
app.patch('/:id', (req, res) => {

});
// delete user by id
app.delete('/:id', (req, res) => {

});

// start server
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});