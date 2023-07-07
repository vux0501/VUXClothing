const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

const app = express();
app.get('/', (req, res) => {
    return res.send('hello');
});

//connect mongoose
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to Mongoose successfully');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});
