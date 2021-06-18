const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/";
const dbName = 'isaacs_db';
const collectionName = 'users';
const MONGO = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.get('/users/all', (req, res) => {
  try {
    MONGO.connect( async (err, mongo) => {
      if (err) throw err;
      const db = mongo.db(dbName);
      let result = await db.collection(collectionName).find({}).toArray();
      res.json(result);
      db.close();
    });
  }
  catch (err) {res.status(500).json({message:err.message})};
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

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});