const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

require('dotenv').config();


const port = parseInt(process.env.PORT, 10);
const url = process.env.URL;

const mainRoute = require('./src/routes');

//common middlewares
app.use(express.json());

app.use(cors());
app.options("*", cors());

mongoose.connect(url).then(() => console.log('Connected to mongoDB')).catch(() => console.log('Failed to connect to mongoDB'));

//router middleware
app.use('/v1', mainRoute);





app.listen(`${port}`, () => {
    console.log('Server listening on port ' + port);
})