var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var user_login = require.main.require('./models/user_login');

router.get('/', function(req, res){
	console.log('Registration page requested!');
	res.render('registration');
});

router.post('/checkMail', function(req, res){
	console.log('Registration email check requested!');
	user_login.getEmail(function(results){
		if(results.length > 0){
			res.send(JSON.stringify(results));
		}
	});
	// JSON.stringify(results)
});

router.post('/', function(req, res){
	user_login.getNextId(function(nextId){
		if(nextId.length > 0){
			var userInfo={
				user_id: JSON.stringify(nextId[0].id),
				username: req.body.name,
				mail: req.body.mail,
				phone: req.body.phn,
				gender: req.body.gender,
				bio: req.body.bio,
				dob: req.body.dob,
				pass: req.body.pass1,
				usertype: 23,
				acctype: 31,
				accstatus: 10
			}
			user_details.insert(userInfo,function(status){
				if(status){
					user_login.insert(userInfo,function(status){
						if(status){
							res.redirect("/");
						}else{
							console.log(userInfo);
						}
					});
				}else{
					console.log(userInfo);
				}
			});
		}
		else{
			console.log("error user id");
		}
	});
	
});

module.exports = router;