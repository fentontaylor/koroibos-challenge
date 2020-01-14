var express = require('express');
var router = express.Router();

const DB = require('../../../utils/dbConnect');
// const { olympianStats } = require('../../../utils/dbQueries');

router.get('/', (request, response) => {
  response.status(200).send({message: 'hi'})
})

module.exports = router;