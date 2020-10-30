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

router.get('/', function(req, res){
	console.log('Edit Profile page requested!');
	
	user_details.getById(req.cookies['loginUserId'], function(result)
	{
		data={
		username: result.username,
		mail: req.cookies['loginUserMail'],
		phone: result.phone_number,
		bio: result.bio,
		dob: result.birthdate,
		gender: result.gender
		}
		
		res.render('accountManager/editProfile',data);
	});
});


router.post('/', function(req, res){
	
	var userInfo={
		username: req.body.name,
		email: req.body.mail,
		phone_number: req.body.phn,
		bio: req.body.bio,
		dob: req.body.dob,
		password: req.body.pass1,
		user_id: req.cookies["loginUserId"],
		website: "",
		address: "",
		firstName: "",
		lastName: ""
	}
	
	user_details.update(userInfo,function(status){
		if(status){
			if(req.body.pass != null)
			{
				user_login.update(userInfo,function(status){
					if(status){
						res.redirect("/");
					}else{
						console.log(userInfo);
					}		
				});
			}
			else
			{
				res.redirect("/");
			}
		}else{
			console.log(userInfo);
		}		
	});
});

module.exports = router;