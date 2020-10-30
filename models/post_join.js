var db = require('./db');

module.exports = {
    getAll : function(callback){
		var sql = "select post_info.post_time, user_details.username, post_content.post_id, post_type.post_type_name, post_content.post_text, post_content.post_image, post_status.post_status_name from post_content, post_status, post_type, post_info, user_details WHERE post_content.post_id = post_info.post_id AND user_details.username = (SELECT user_details.username WHERE user_details.user_id = post_info.user_id) AND post_type.post_type_name = (SELECT post_type.post_type_name WHERE post_type.post_type_id = post_info.post_type_id) AND post_status.post_status_name = (SELECT post_status.post_status_name WHERE post_info.post_status_id = post_status.post_status_id)";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}