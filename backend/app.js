// dependencies
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

// app initialization
const app = express();
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// Home route
app.get('/', (req, res) => {
    res.send(`<h1>Backend for hackathon project is up & running</h1>`);
});