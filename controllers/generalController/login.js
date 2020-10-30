var express = require('express');
var router = express.Router();
var home = require('../accountManager/home');
var user_login = require.main.require('./models/user_login');
var app = express();

router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('index');
});


router.post('/', function(request, response){
    console.log('post request from login');
	var user ={
		email: request.body.email,
		password: request.body.password
    };
	
    console.log(user.email, user.password);
	
	user_login.validate(user, function(status){
		
	 	if(status){
			
			console.log('successfully login with ');
			
			user_login.getByEmail(user.email, function(results){
				
				if(results.length > 0){
					
					// setting up Cookies
					response.cookie('loginUserId', results[0].user_id);
					response.cookie('loginUserMail', user.email);
					
					//just for value testing if its getting accurate data
					var loginUserId = request.cookies['loginUserId'];
					console.log('Call for details of >> ', loginUserId);
					
					//Redirecting to the Main Home Section
					response.redirect('/generalController/mainHome');
				}
				
				else{
					console.log("login page back");
					response.redirect('/');
				}
			});
        }
        else{
			response.send('invalid username/password');
		}
	});
});

module.exports = router;