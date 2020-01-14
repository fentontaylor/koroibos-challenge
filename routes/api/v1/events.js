var express = require('express');
var router = express.Router();

const DB = require('../../../utils/dbConnect');
const { sportEvents } = require('../../../utils/dbQueries');

router.get('/', (request, response) => {
  sportEvents()
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(500).send({ error }))
});

module.exports = router;