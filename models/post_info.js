var db = require('./db');

module.exports = {
    getAll : function(callback){
		var sql = "select * from post_info";
		db.getResults(sql, null, function(results){
            // console.log("result from table:", results);
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
    },
    statusUpdate : function(post_id, callback){
		var sql = "UPDATE `post_info` SET `post_status_id`= (SELECT post_status_id from post_status WHERE post_status.post_status_name = 'approve') WHERE post_id = ?";
		db.execute(sql, [post_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	statusUpdateReport : function(post_id, callback){
		var sql = "UPDATE `post_info` SET `post_status_id`= (SELECT post_status_id from post_status WHERE post_status.post_status_name = 'report') WHERE post_id = ?";
		db.execute(sql, [post_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getById : function(post_id, callback){
		var sql = "select * from post_info where post_id=?";
		db.getResults(sql, [post_id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
    },
    delete : function(post_id, callback){
		var sql = "Delete from post_info where post_id=?";
		db.execute(sql, [post_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insert : function(data, callback){
		var d = new Date();
		var millisecond = d.getTime();
		var d = null;
		var sql = "INSERT INTO `post_info`(`post_id`, `user_id`, `post_type_id`, `post_status_id`, `post_time`) VALUES (?, ?, ?, ?, ?)";
		db.execute(sql, [data.post_id, data.user_id, data.post_type_id, data.post_status_id, millisecond], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		})
	},
	countAllPost: function(callback){
		var sql = "SELECT COUNT(*) AS total_post FROM post_info";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	countPendingPost: function(callback){
		var sql = "SELECT COUNT(*) AS pending_post FROM post_info WHERE post_info.post_status_id = '50'";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	}
}