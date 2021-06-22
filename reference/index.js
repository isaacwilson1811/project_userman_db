const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send('Hello Client')
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});