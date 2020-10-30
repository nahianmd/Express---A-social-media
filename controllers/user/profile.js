//****************Declaration**************//
var express = require('express');
var userModel = require.main.require('./models/user-model');
var postModel = require.main.require('./models/post-model');
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


//profile
router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result_user){
		res.render('user/profile/index', {user: result_user});
	});
});



//Profile Settings - Get
router.get('/settings', function(req, res){

	userModel.getByUname(req.cookies['username'], function(result){
		// console.log(result_photo);
		res.render('user/settings/index', {user: result});
	});
});


//Profile Settings - Post
router.post('/settings', Upload, function(req, res){

	var content = {
		image: req.file,
		textFields: req.body
	};

	Upload(req, res, function(error){
		if (error) {
			res.render('/settings',{msg: error});
		}
		else{

			// console.log(content.textFields);
			// console.log(content.image)
			// res.send('file uploaded');
			
			if (content.image != undefined) {

				var user = {
					username: content.textFields.username,
					email: content.textFields.email,
					password: content.textFields.password,
					alt_email: content.textFields.alt_email,
					firstname: content.textFields.firstname,
					lastname: content.textFields.lastname,
					gender: content.textFields.gender,
					birthday: content.textFields.birthday,
					bio: content.textFields.bio,
					website: content.textFields.website,
					address: content.textFields.address, 
					photo_filename: content.image.filename,
					photo_source: content.image.destination
				}

				console.log('printing user before passing it to user model');
				console.log(user);

				userModel.updateAll(user, function(status){
					if (status) {
						res.redirect('/'+user.username);
					}
					else{
						res.send('error');
					}
				});
			}

			else{

				var user = {
					username: content.textFields.username,
					email: content.textFields.email,
					password: content.textFields.password,
					alt_email: content.textFields.alt_email,
					firstname: content.textFields.firstname,
					lastname: content.textFields.lastname,
					gender: content.textFields.gender,
					birthday: content.textFields.birthday,
					bio: content.textFields.bio,
					website: content.textFields.website,
					address: content.textFields.address,
				}

				userModel.updateText(user, function(status){
					if (status) {
						res.redirect('/'+user.username);
					}
					else{
						res.send('error');
					}
				});
			}
		}
	})
});



module.exports = router;