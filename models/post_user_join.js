var db = require('./db');

module.exports= {

	//Get ALl
	getAll : function(callback){
		var sql = "select post.post_id, post.post_image_source, post.post_image_filename, post.text, post.time, user.username, user.firstname, user.lastname, user.user_image_filename, user.user_image_source, user.username from post,user where post.uid = user.uid and user.username = (select user.username from user where user.uid = post.uid ) order by time desc";
		db.getResults(sql, null, function(results){
			console.log('inside post_user_join model');
			console.log(results);
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
}