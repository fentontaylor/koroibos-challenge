var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../../../knexfile')[env];
const DB = require('knex')(config);

router.get('/', async (request, response) => {
  let dbResult = await DB('athletes');

  response.status(200).send({ olympians: dbResult });
});

module.exports = router;