const express = require('express');
const path = require('path');
const logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';

const indexRouter = require('./routes/index');
const olympiansRouter = require('./routes/api/v1/olympians')
const statsRouter = require('./routes/api/v1/olympianStats')
const eventsRouter = require('./routes/api/v1/events')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/olympians', olympiansRouter);
app.use('/api/v1/olympian_stats', statsRouter);
app.use('/api/v1/events', eventsRouter);


const graphqlHTTP = require('express-graphql');
const schema = require('./lib/schema/schema');

app.use('/graphql-olympians', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

module.exports = app;