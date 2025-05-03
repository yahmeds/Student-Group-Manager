var express = require('express');
var router = express.Router();
var indexController = require('../controller/index.controller')
/* GET home page. */
router.get('/',indexController.home);

module.exports = router;
