const express = require('express');
const port = 3002;
const app = express();
const movie = require('./routes/movie');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/movie', movie);


mongoose.connect('mongodb://localhost:27017/javed')
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.log(err));



app.listen(`Listening on port:${port}................................................................`);


