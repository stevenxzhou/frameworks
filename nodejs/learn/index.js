// create a api that returns a json object
// with the following structure:
// {
//   data: 'Hello World!',
// }

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ data: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Run the server with the following command:
// node api/nodejs/index.js
// Now you can access the api at http://localhost:3000