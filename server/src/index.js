const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('ialso');
});

app.listen(port, () => {
    console.log('server listening on port: ' + port);
});
