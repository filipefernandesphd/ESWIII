var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(400).json({ error: "Solicitação desconhecida" });
});

module.exports = router;
