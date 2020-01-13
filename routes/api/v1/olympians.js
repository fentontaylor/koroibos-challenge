var express = require('express');
var router = express.Router();

const DB = require('../../../utils/dbConnect');
const {
  olympianIndex
} = require('../../../utils/dbQueries');

router.get('/', (request, response) => {
  olympianIndex()
    .then((dbResult) => response.status(200).send({ olympians: dbResult }))
    .catch((error) => response.status(500).send({ error }))
});

module.exports = router;