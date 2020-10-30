var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var block_req = require.main.require('./models/account_block_request');
var content = require.main.require('./models/post_content');
var msgs = require.main.require('./models/message_details');

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	
	var data={
		username: "",
		mail: "",
		phone: "",
		bio: "",
	}
	var block_req_list;
	
	user_details.getById(req.cookies['loginUserId'], function(result)
	{
		data={
		username: result.username,
		mail: req.cookies['loginUserMail'],
		phone: result.phone_number,
		bio: result.bio,
		}
	});
	
	content.getLikeComment(function(countResult)
	{
		var countRes = countResult;
		// console.log("like count >> "+countResult[1].res);
		content.getReported(function(reportedResult)
		{
			repResult = reportedResult;
			msgs.getMsgs(req.cookies['loginUserId'],function(msgsRes)
			{
				var msgss = msgsRes;
				block_req.getAll(function(resultss)
				{
					block_req_list=resultss;
					
					user_details.getAll(function(results)
					{
						console.log('home page requested!');
						res.render('accountManager/home',{data,resultList:results,block_req_list,repResult,countRes,msgss});
					});
				});
			});
		});	
	});
});

router.post('/search', function(request, response){
    
	if(request.body.value !=""){
        user_details.getBySearching(request.body.value, function(results){
            response.send(JSON.stringify(results));
        });
    }
    else if(request.body.value == ""){
		console.log("Empty value .........................................");
        user_details.getAll(function(results){
            response.send(JSON.stringify(results));
        });
    }
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