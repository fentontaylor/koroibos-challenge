var express = require('express');
var router = express.Router();

const DB = require('../../../utils/dbConnect');

router.get('/', async (request, response) => {
  let dbResult = await DB('athletes');

  response.status(200).send({ olympians: dbResult });
});

module.exports = router;