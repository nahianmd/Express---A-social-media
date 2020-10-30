var express = require('express');
var user_details = require.main.require('./models/user_details');
var post_join = require.main.require('./models/post_join');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.cookies['loginUserId'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/', function(request, response){
    console.log('content manager home page requested with get method!');
    user_details.getById(request.cookies['loginUserId'], function(result){
        console.log("general home controllers");
        response.render('contentManager/home/index', {user: result});
    });
});

router.get('/viewProfile', function(request, response){
    console.log('content manager profile page requested with get method!');
    user_details.getAllInfo(request.cookies['loginUserId'], function(results){
        console.log(results);
        response.render('contentManager/profile/viewProfile', {user: results});
    });
});

router.get('/index', function(request, response){
    console.log('content manager search page requested with get method!');
    response.render('contentManager/search/index');
});

router.get('/contentRequest', function(request, response){
    console.log('content manager search page requested with get method!');
    post_join.getAll(function(results){
        if(results.length > 0){
            response.render('contentManager/contentView/contentRequest', {userList: results});
        }else{
            res.redirect('/contentManager/home');
        }
    });
});

router.get('/report', function(request, response){
    console.log('content manager report analysis page requested with get method!');
    response.render('contentManager/reportAnalysis/report');
});

router.get('/createPost', function(request, response){
    console.log('content manager create post page requested with get method!');
    response.render('contentManager/createPost/createPost');
});

router.get('/sendMessage', function(request, response){
    console.log('content manager send message page requested with get method!');
    response.render('contentManager/sendMessage/sendMessage');
});

router.get('/view', function(request, response){
    console.log('content manager send message page requested with get method!');
    response.render('contentManager/viewPost/view');
});

module.exports = router;