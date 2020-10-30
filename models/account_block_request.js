var db = require('./db');

module.exports = {
    insert: function(user_id, callback){
		var sql = "insert into account_block_request values(?,?,?)";
		db.execute(sql, [data.id, "pending", data.time], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from account_block_request";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	}
}