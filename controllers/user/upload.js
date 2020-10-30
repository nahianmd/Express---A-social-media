//****************Declaration**************//
var express = require('express');
var userModel = require.main.require('./models/user-model');
var multer = require('multer');
var path = require('path');


//Instances
var router = express.Router();

var storage = multer.diskStorage({
	destination: './public/uploads/images',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var fileUpload = multer({
	storage: storage,
}).single('image');


//*****************ROUTES****************//
//Checks Cookie for all url
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

//Get
router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('/user/upload/index', {user: result});
	});
});

//Post
router.post('/', Upload, function(req, res){

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