var db = require('./db');

module.exports = {
    validate: function(user, callback){
		var sql ="SELECT * FROM user_login where email=? and password=?";
		
		db.getResults(sql, [user.email, user.password], function(results){
			if(results.length == 1){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getByEmail : function(email, callback){
		var sql = "select * from user_login where email=?";
		db.getResults(sql, [email], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getEmail : function(callback){
		var sql = "select email from user_login";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	update:function(userInfo,callback){
		var sql = "update user_login set email=? , password=? where user_id=?";
		db.execute(sql, [userInfo.email, userInfo.password,userInfo.user_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insert:function(userInfo,callback){
		var sql = "insert into user_login values(?,?,?)";
		db.execute(sql, [null,userInfo.mail,userInfo.pass], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getNextId : function(callback){
		var sql = "SELECT auto_increment AS id FROM `information_schema`.`tables` WHERE table_name = 'user_login' AND table_schema = 'express'";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	}
}