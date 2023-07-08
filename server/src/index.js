const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    return res.send('hello');
});

//bodyParser
app.use(bodyParser.json());
//routes
routes(app);

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
