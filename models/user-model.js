var db = require('./db');

module.exports= {

	//Get User by ID
	getById : function(id, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	getByUname: function(username, callback){
		var sql = "select * from user where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	//Get All Employee
	getEmployee : function(callback){
		var sql = "select * from user where type=?";
		db.getResults(sql, ['employee'], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	validate: function(user, callback){
		var sql ="SELECT * FROM user where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into user (id, name, username, password, contact, type) values (?,?,?,?,?,?)";
		db.execute(sql, [user.id, user.name, user.username, user.password, user.contact, user.type], function(status){

			console.log(status);
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateAll : function(user, callback){
		var sql = "update user set user_image_filename=?, user_image_source=?, email=?, password=?, alt_email=?, firstname=?, lastname=?, gender=?, birthday=?, bio=?, website=?, address=? where username=?";
		console.log('I am in updateAll function. printing user before executing query!');
		console.log(user);
		db.execute(sql, [user.photo_filename, user.photo_source, user.email, user.password, user.alt_email, user.firstname, user.lastname, user.gender, user.birthday, user.bio, user.website, user.address, user.username], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				console.log(status);
				callback(false);
			}
		});
	},

	updateText : function(user, callback){
		var sql = "update user set email=?, password=?, alt_email=?, firstname=?, lastname=?, gender=?, birthday=?, bio=?, website=?, address=? where username=?";
		console.log('I am in updateText function. printing user before executing query!');
		console.log(user);
		db.execute(sql, [ user.email, user.password, user.alt_email, user.firstname, user.lastname, user.gender, user.birthday, user.bio, user.website, user.address, user.username], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				console.log(status);
				callback(false);
			}
		});
	},
	
	delete: function(user, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}