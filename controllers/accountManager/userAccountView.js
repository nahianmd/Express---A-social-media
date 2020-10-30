var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var content = require.main.require('./models/post_content');
var msngr = require.main.require('./models/message_info');

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/:id', function(req, res){
	
	user_details.getById(req.params.id, function(result)
	{
		data={
		userid: result.user_id,
		username: result.username,
		phone: result.phone_number,
		bio: result.bio,
		dob: result.birthdate,
		gender: result.gender,
		usertype: result.user_type_id,
		acctype: result.account_type_id,
		accstatus: result.account_status_id
		}
		
		content.getLikeById(req.params.id, function(countres)
		{
			var rest = countres;
			console.log(countres);
			content.getById(req.params.id, function(contentResult)
			{
				
				//console.log(contentResult);
				console.log('User Account View Requested!');
				res.render('accountManager/userAccountView',{data,contentData:contentResult,rest});
			});
		});
	});
});

router.get('/deactive/:id', function(req, res){
	
	user_details.deactivator(req.params.id, function(status)
	{
		if(status)
		{
			res.redirect("/accountManager/userAccountView/"+req.params.id);
		}
		else{
			console.log(req.params.id+" : couldn't get Deactivated");
		}
	});
});

router.get('/active/:id', function(req, res){
	
	user_details.activator(req.params.id, function(status)
	{
		if(status)
		{
			res.redirect("/accountManager/userAccountView/"+req.params.id);
		}
		else{
			console.log(req.params.id+" : couldn't get Activated");
		}
	});
});

router.get('/block/:id', function(req, res){
	
	user_details.blocker(req.params.id, function(status)
	{
		if(status)
		{
			res.redirect("/accountManager/userAccountView/"+req.params.id);
		}
		else{
			console.log(req.params.id+" : couldn't get Blocked");
		}
	});
});

router.get('/delete/:id', function(req, res){
	
	user_details.remover(req.params.id, function(status)
	{
		if(status)
		{
			res.redirect("/accountManager/home/");
		}
		else{
			console.log(req.params.id+" : couldn't get Deleted");
		}
	});
});

router.post('/:id', function(req, res){
	var msgData={
		sender: req.cookies["loginUserId"],
		receiver: req.body.receiver,
		status: 60,
		time: "0000-00-00 00:00:00.",
		txt: req.body.notifyTxt
	}
	msngr.insertData(msgData, function(status)
	{
		if(status)
		{
			res.redirect("/accountManager/home/");
		}
		else{
			console.log(req.body.notifyTxt+" << couldn't get Delivered");
		}
	});
});

module.exports = router;