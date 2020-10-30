var db = require('./db');

module.exports= {

	//Get ALl
	getAll : function(callback){
		var sql = "select * from post order by time desc";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	//Get post by ID
	getById : function(id, callback){
		var sql = "select * from post where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	getByUname: function(postname, callback){
		var sql = "select * from post where postname=?";
		db.getResults(sql, [postname], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	//Get All Employee
	getEmployee : function(callback){
		var sql = "select * from post where type=?";
		db.getResults(sql, ['employee'], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	validate: function(post, callback){
		var sql ="SELECT * FROM post where postname=? and password=?";
		db.getResults(sql, [post.postname, post.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(comment, callback){

		console.log('We are inside comment model insert function');
		console.log(comment);

		var sql = "insert into post_comment ( comment_id, post_id, comment_user_id, comment_text) values (?,?,?,?)";
		db.execute(sql, [null, comment.post_id, comment.uid, comment.text], function(status){

			console.log(status);

			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update : function(post, callback){
		var sql = "update post set name=?, postname=?, password=?, contact=?, type=? where id=?";
		//console.log('I am in update function');
		db.execute(sql, [post.name, post.postname, post.password, post.contact, post.type, post.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	delete: function(post, callback){
		var sql = "delete from post where id=?";
		db.execute(sql, [post.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}