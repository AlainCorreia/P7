const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

mongoose
  .connect(`${process.env.DATABASE_URI}/groupomania-api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err) => console.log('Failed to connect to MongoDB! ' + err));

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
