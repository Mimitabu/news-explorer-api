require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT);
