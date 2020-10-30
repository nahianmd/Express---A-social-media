var db = require('./db');

module.exports = {
    update: function(user_id, callback){
		var sql = "UPDATE account_warning SET warning_count = warning_count + 1 WHERE user_id = ?";
		db.execute(sql, [user_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getTotalWarning: function(callback){
		var sql = "SELECT SUM(account_warning.warning_count) AS total_warning FROM account_warning";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}