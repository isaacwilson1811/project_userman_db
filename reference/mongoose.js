const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mtech';
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
const dbClient = mongoose.connection;

dbClient.on('error', console.error.bind(console, 'connection error:'));
dbClient.once('open', function () {
  console.log('db connected');
});

const courseSchema = new mongoose.Schema({
  Course: String,
  Title: String,
  Credits: Number
});
const collection = mongoose.model('courses', courseSchema);

// read all documents
app.get('/courses', (req, res) => {
  collection.find({},(err,data) => {
    let result = JSON.stringify(data);
    res.send(result);
  });
  
});

// read one document
app.post('/courses/:id', (req,res) => {
  res.send(`GET: /courses/${req.params.id}`);
});

// update one document
app.patch('/courses/:id', (req,res) => {
  res.send(`PATCH: /courses/${req.params.id}`);
});

// delete one document
app.delete('/courses/:id', (req,res) => {
  res.send(`DELETE: /courses/${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});