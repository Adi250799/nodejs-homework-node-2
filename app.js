const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

module.exports = app;
