var db = require('./db');

module.exports= {

	//Get ALl
	getAll : function(callback){
		var sql = "SELECT post.post_id, post.post_image_source, post.post_image_filename, post.text, post.time, user.username, user.firstname, user.lastname, user.user_image_filename, user.user_image_source, post_comment.comment_id, post_comment.post_id, post_comment.comment_user_id, post_comment.comment_text FROM user LEFT JOIN post_comment ON user.uid = post_comment.comment_user_id RIGHT JOIN post on user.uid = post.uid order by post.time desc ";
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