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

//Home - Get
router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result_user){
		postModel.getAll(function(result_post){
			console.log(result_post);
			res.render('user/home/index', {user: result_user, post: result_post});
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
			res.render('home/settings',{msg: error});
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

//profile
router.get('/:username', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result_user){
		res.render('user/profile/index', {user: result_user});
	});
});










// //View Employee
// router.get('/view_emp', function(req, res){
	
// 		userModel.getEmployee(function(results){
// 			if(results.length > 0){
// 				res.render('home/view_emp', {emplist: results});
// 			}else{
// 				res.redirect('/home');
// 			}
// 		});
// });

// //Update Employee
// router.get('/edit/:id', function(req, res){
// 	userModel.getById(req.params.id, function(result){
// 		res.render('home/edit', {user: result});
// 	});
// });

// router.post('/edit/:id', function(req, res){
	
// 		var user = {
// 			id: req.params.id,
// 			name: req.body.name,
// 			username: req.body.username,
// 			password: req.body.password,
// 			contact: req.body.contact,
// 			type: req.body.type
// 		};

// 		//console.log(user);

// 		userModel.update(user, function(status){
// 			if(status){
// 				res.redirect('/home/view_emp');
// 			}else{
// 				res.redirect('/home/edit/'+req.params.id);
// 			}
// 		});
// });

// //Delete Employee
// router.get('/delete/:id', function(req, res){

// 	var user = {
			
// 			id: req.params.id
// 		};

// 		userModel.delete(user, function(status){
// 			if(status){
// 				res.redirect('/home/view_emp');
// 			}else{
// 				res.redirect('/home/edit/'+req.params.id);
// 			}
// 		});
// });

// //Add Employee
// router.get('/add_emp', function(req, res){
// 		res.render('home/add_emp');
// });

// router.post('/add_emp', function(req, res){
	
// 		var user = {
// 			id: req.body.id,
// 			name: req.body.name,
// 			username: req.body.username,
// 			password: req.body.password,
// 			contact: req.body.contact,
// 			type: req.body.type
// 		};

// 		console.log(user);

// 		userModel.insert(user, function(status){
// 			if(status){
// 				res.redirect('/home/view_emp');
// 			}else{
// 				res.redirect('/home/add_emp');
// 			}
// 		});
// });


module.exports = router;