const express = require('express');
const path = require('path');
const logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';

const indexRouter = require('./routes/index');
const olympiansRouter = require('./routes/api/v1/olympians')
const statsRouter = require('./routes/api/v1/olympianStats')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/olympians', olympiansRouter);
app.use('/api/v1/olympian_stats', statsRouter);

module.exports = app;