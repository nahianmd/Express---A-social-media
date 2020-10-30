//****************Declaration**************//
var express = require('express');
var userModel = require.main.require('./models/user-model');
var postModel = require.main.require('./models/post-model');
var commentModel = require.main.require('./models/comment-model');
var post_user_join = require.main.require('./models/post_user_join');
var post_user_comment = require.main.require('./models/post_user_comment');
var multer = require('multer');
var path = require('path');

//Instances

var router = express.Router();

var storage = multer.diskStorage({
	destination: './assets/public/uploads/images',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var Upload = multer({
	storage: storage,
}).single('image');


//****************Routes*****************//

//Checks Cookie for all url
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

//Home - Get
router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result_user){
		post_user_join.getAll(function(result_post){
			console.log('inside home controller');
			console.log(result_post);
			res.render('user/home/index', {user: result_user, post: result_post});
		});
	});
});

//Home - Post
router.post('/',function(req, res){
	userModel.getByUname(req.cookies['username'], function(result_user){
		var comment = {
			text: req.body.comment,
			uid: result_user.uid,
			post_id: req.body.post_id
		}
		console.log(comment);

		commentModel.insert(comment, function(status){
			if (status) {
				res.redirect('/home');
			}
			else{
				res.send('error');
			}

		});
	});
});

//Get upload
router.get('/upload', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('user/upload/index', {user: result});
	});
});

//Post upload
router.post('/upload', Upload, function(req, res){

	var content = {
		postImage: req.file,
		postText: req.body.postText
	};
	
	Upload(req, res, function(error){
		if (error) {
			res.send('error uploading');
		}
		else{
			userModel.getByUname(req.cookies['username'], function(user_result){
				console.log(user_result.username);

				//Post with Text and Image
				if ((content.postImage != undefined)&&(content.postText != undefined)) {

					console.log("Photo information on home.js - line 78");
					console.log(content.postImage);

					var post = {
						text: content.postText,
						uid: user_result.uid,
						photo_filename: content.postImage.filename,
						photo_destination: content.postImage.destination
					}
					
					postModel.insert(post,function(status){
						if(status){
							res.redirect('/home');
						}
						else{
							res.send('error');
						}
					});
				}

				//Post with only Text
				else if((content.postImage == undefined)&&(content.postText != undefined)){

					var post = {
						text: content.postText,
						uid: user_result.uid,
						photo_filename: null,
						photo_destination: null
					}
					
					postModel.insert(post,function(status){
						if(status){
							res.redirect('/home');
						}
						else{
							res.send('error');
						}
					});
				}

				//Post with only photo
				else if((content.postImage != undefined)&&(content.postText == undefined)){

					var post = {
						text: null,
						uid: user_result.uid,
						photo_filename: content.postImage.filename,
						photo_destination: content.postImage.destination
					}
					
					postModel.insert(post,function(status){
						if(status){
							res.redirect('/home');
						}
						else{
							res.send('error');
						}
					});
				}

			});
		}
	})
});



module.exports = router;