var express = require('express');
var router = express.Router();
var post_info = require.main.require('./models/post_info');
var account_warning = require.main.require('./models/account_warning');

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/report', function(request, response){
    console.log('from report.js');
    response.render('contentManager/reportAnalysis/report');
});

router.get('/showData', function(request, response){
	data = {}
	post_info.countAllPost(function(result){
		if(result.length > 0){
			data.total_post = JSON.stringify(result[0].total_post);
			post_info.countPendingPost(function(result){
				if(result.length > 0){
					data.pending_post = JSON.stringify(result[0].pending_post);
					post_info.getAll(function(results){
						if(results.length > 0){
							var count = 0;
							for(var i=0; i<results.length; i++){
								var timeString = JSON.parse(JSON.stringify(results[i])).post_time;
								var timeInMillisecond = parseInt(timeString);
								var fullDate = new Date(timeInMillisecond);
								var timeCheck = fullDate.toLocaleDateString();
								var todayDate = new Date();
								var todayDateString = todayDate.toLocaleDateString();
								if(timeCheck == todayDateString){
									count++;
								}
							}
							data.today_post = count;
							account_warning.getTotalWarning(function(result){
								if(result.length > 0){
									data.total_warning_post = JSON.stringify(result[0].total_warning);
									response.send(JSON.stringify(data));
								}
							});
						}
					});
				}
			});
		}
		else{
			console.log("error");
		}
	});

});

module.exports = router;

// console.log(result);
// console.log(data);
// response.send(JSON.stringify(data));