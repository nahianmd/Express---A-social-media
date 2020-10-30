var express = require('express');
var user_details = require.main.require('./models/user_details');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.post('/showUser', function(request, response){
    console.log("show user");
    user_details.getNameAndId(function(results){
        if(results.length > 0){
            response.send(JSON.stringify(results));
        }
    });
});

module.exports = router;