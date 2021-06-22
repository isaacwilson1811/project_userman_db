// modules
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const connect = require('./mongoDriver');

// middleware
app.use(express.json());


// routes
app.get('/users/all', (req, res) => {
  connect();

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