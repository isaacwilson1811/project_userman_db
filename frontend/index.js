const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('Hello Client')
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});