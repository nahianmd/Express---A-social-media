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

router.get('/updateProfile', function(request, response){
	console.log('content manager update profile page requested with get method!');
	user_details.getAllInfo(request.cookies['loginUserId'], function(results){
        response.render('contentManager/profile/updateProfile', {user: results});
    });
});

router.post('/updateProfile', function(request, response){
	var user ={
		user_id: request.body.user_id,
		email: request.body.email,
		username: request.body.username,
		phone_number: request.body.phone_number,
		dob: request.body.birthdate,
		bio: request.body.bio,
		website: request.body.website,
		address: request.body.address,
		password: request.body.password,
		firstName: "",
		lastName: ""
	};
	user_details.update(user,function(status){
		if(status){
			user_login.update(user,function(status){
				if(status){
					response.redirect("/contentManager/profile/viewProfile");
				}else{
					console.log("error");
				}		
			});
		}else{
			console.log("error");
		}		
	});
	// response.send(user);
});

module.exports = router;