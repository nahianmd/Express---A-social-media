var db = require('./db');

module.exports = {
    insert: function(data, callback){
		var sql = "insert into message_info values(?,?,?,?,?)";
		db.execute(sql, [data.sender_id, data.receiver_id, data.message_id, data.message_status_id, data.time], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertData: function(data, callback){
		var sql = "insert into message_info values(?,?,?,?,?)";
		db.execute(sql, [data.sender, data.receiver, null, data.status, data.time], function(status){
			if(status){
				var sql2 = "insert into message_details values(?,?)";
				db.execute(sql2, [null, data.txt], function(status){
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});
			}else{
				callback(false);
			}
		});
	}
	
}