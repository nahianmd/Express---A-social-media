var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res){
	console.log('User Account page requested!');
	res.render('systemAdmin/userAccountView');
});

module.exports = router;