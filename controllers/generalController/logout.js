var express = require('express');
var router = express.Router();
var home = require.main.require('./controllers/accountManager/home');
var app = express();

router.get('/', function(req, res){
	console.log('logout command accepted!');
	res.clearCookie('loginUserId');
	req.session,username = null;
	res.redirect('/');
});

// router.post('/', function(req, res){
	// console.log('Post requested!');
	// if(req.body.uname == req.body.pass){
		// req.session.username = req.body.uname;
		// res.redirect('/accountManager/home');
		// app.use('/',home);
	// }else{
		// res.send('invalid username or password');
	// }
// });

module.exports = router;