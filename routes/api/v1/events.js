var express = require('express');
var router = express.Router();
const {
  sportEvents,
  eventMedalists
} = require('../../../utils/dbQueries');

router.get('/', (request, response) => {
  sportEvents()
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(500).send(error))
});

router.get('/:id/medalists', (request, response) => {
  let eventId = parseInt(request.params.id)
  eventMedalists(eventId)
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(500).send(error))
});

module.exports = router;