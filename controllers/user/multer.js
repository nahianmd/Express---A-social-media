//****************Declaration**************//
var express = require('express');
var multer = require('multer');
var path = require('path');

	var storage = multer.diskStorage({
	destination: './assets/public/uploads/images',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var imageUpload = multer({
	storage: storage,
}).single('image');

module.exports= {
storage: storage,
imageUpload : imageUpload

}