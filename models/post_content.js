var db = require('./db');

module.exports = {
    getAll : function(callback){
		var sql = "select * from post_content";
		db.getResults(sql, null, function(results){
            // console.log("result from table:", results);
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	delete : function(post_id, callback){
		var sql = "Delete from post_content where post_id=?";
		db.execute(sql, [post_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getNextId : function(callback){
		var sql = "SELECT auto_increment AS id FROM `information_schema`.`tables` WHERE table_name = 'post_content' AND table_schema = 'express'";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	insert : function(data, callback){
		var sql = "INSERT INTO `post_content`(`post_text`, `post_image`) VALUES (?, ?)";
		db.execute(sql, [data.post_text, data.post_image], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		})
	},
	getAllFromSearch : function(string, callback){
		var sql = "select post_info.post_time, user_details.username, post_type.post_type_name, post_content.post_id, post_content.post_text, post_content.post_image, post_status.post_status_name from post_content, post_status, post_type, post_info, user_details WHERE post_content.post_id = post_info.post_id AND user_details.username = (SELECT user_details.username WHERE user_details.user_id = post_info.user_id) AND post_type.post_type_name = (SELECT post_type.post_type_name WHERE post_type.post_type_id = post_info.post_type_id) AND post_status.post_status_name = (SELECT post_status.post_status_name WHERE post_info.post_status_id = post_status.post_status_id) AND post_status.post_status_name = 'approve' AND post_content.post_text LIKE '%' ? '%'";
		db.getResults(sql, [string], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllPost : function(callback){
		var sql = "select post_info.post_time, user_details.username, post_type.post_type_name, post_content.post_id, post_content.post_text, post_content.post_image, post_status.post_status_name from post_content, post_status, post_type, post_info, user_details WHERE post_content.post_id = post_info.post_id AND user_details.username = (SELECT user_details.username WHERE user_details.user_id = post_info.user_id) AND post_type.post_type_name = (SELECT post_type.post_type_name WHERE post_type.post_type_id = post_info.post_type_id) AND post_status.post_status_name = (SELECT post_status.post_status_name WHERE post_info.post_status_id = post_status.post_status_id) AND post_status.post_status_name = 'approve'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getReported : function(callback){
		var sql = "select * from post_content,post_info where post_info.post_id=post_content.post_id and post_info.post_status_id=53";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(userid,callback){
		var sql = "select post_info.user_id, post_info.post_id,post_info.post_type_id,post_status_id,post_content.post_text,post_info.post_time from post_content,post_info where post_content.post_id=post_info.post_id and post_info.user_id=? order by post_info.post_id desc";
		db.getResults(sql, [userid], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getLikeComment : function(callback){
		var sql = "select count(*) as res from post_info,post_like where post_info.post_id=post_like.post_id and post_info.post_status_id=53 group by post_like.post_id";
		db.getResults(sql, null , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getLikeById : function(id,callback){
		var sql = "SELECT count(*) as res FROM post_like,post_info WHERE post_like.post_id=post_info.post_id and post_info.user_id="+id;
		db.getResults(sql, [id] , function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}