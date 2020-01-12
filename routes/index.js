const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ "message": "Koroibos Challenge - Fenton Taylor" })
})

module.exports = router;