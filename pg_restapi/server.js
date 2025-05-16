require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const pool = require('./db');
console.log(`${port}`);


const app = express();

app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});