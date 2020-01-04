require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/articles'));

app.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).send({ message: 'The requested resource is not found' });
});


app.listen(PORT);
