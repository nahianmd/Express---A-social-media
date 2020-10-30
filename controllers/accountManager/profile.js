var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var contents = require.main.require('./models/post_content');

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	
	user_details.getById(req.cookies['loginUserId'], function(result)
	{
		data={
		username: result.username,
		mail: req.cookies['loginUserMail'],
		phone: result.phone_number,
		bio: result.bio,
		dob: result.birthdate,
		gender: result.gender,
		account_status_id: result.account_status_id
		}
		
		contents.getById(req.cookies['loginUserId'], function(contentResult)
		{
			console.log('Profile page requested!');
			res.render('accountManager/profile',{data,contentData:contentResult});
		});
		
	});
});

router.get('/deactive', function(req, res){
	
	user_details.deactivator(req.cookies['loginUserId'], function(status)
	{
		if(status){
			res.redirect("/accountManager/profile");
		}else{
			console.log("Account Manager Profile Couldn't Be Deactivated.");
		}
		
	});
});

router.get('/active', function(req, res){
	
	user_details.activator(req.cookies['loginUserId'], function(status)
	{
		if(status){
			res.redirect("/accountManager/profile");
		}else{
			console.log("Account Manager Profile Couldn't Be Activated.");
		}
		
	});
});

// router.post('/', function(req, res){
	
	// if(req.body.uname == req.body.password){
		// req.session.username = req.body.uname;
		// res.redirect('/home');
	// }else{
		// res.send('invalid username/password');
	// }
// });

module.exports = router;