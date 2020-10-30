var db = require('./db');

module.exports = {
    getId : function(callback){
		var sql = "SELECT auto_increment AS id FROM `information_schema`.`tables` WHERE table_name = 'message_details' AND table_schema = 'express'";
		db.getResults(sql, null, function(results){
            // console.log("result from table:", results);
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
    },
	getMsgs : function(id,callback){
		var sql = "SELECT * FROM message_info,message_details WHERE message_info.message_id=message_details.message_id and message_info.receiver_id=? order by message_details.message_id desc";
		db.getResults(sql, [id], function(results){
            if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
    },
    insertDeleteMessage : function(callback){
        var sql = "insert into message_details(message_text) values(?)";
		db.execute(sql, "Your post request is canceled.", function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertWarningMessage : function(callback){
        var sql = "insert into message_details(message_text) values(?)";
		db.execute(sql, "your account was warned", function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    }
}