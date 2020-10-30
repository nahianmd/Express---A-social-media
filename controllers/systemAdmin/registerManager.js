var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var user_login = require.main.require('./models/user_login');

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/:usertype', function(req, res){
	console.log('Manager Register page requested!');
	console.log("admin reg >>>>>>>>>"+req.params.usertype);
	// res.cookie('acctype',req.params.usertype);
	res.render('systemAdmin/register');
});

router.post('/:usertype', function(req, res){
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
				usertype: req.params.usertype,
				acctype: 30,
				accstatus: 10
			}
				// res.ClearCookie('acctype');
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