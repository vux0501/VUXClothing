const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('hello');
});

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});
