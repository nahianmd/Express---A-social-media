var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	console.log('Report Analysis requested!');
	res.render('accountManager/report');
});

// router.post('/', function(req, res){
	
	// if(req.body.uname == req.body.password){
		// req.session.username = req.body.uname;
		// console.log("Account Manager Activated");
		// res.redirect('/home');
	// }else{
		// res.send('invalid username/password');
	// }
// });

module.exports = router;