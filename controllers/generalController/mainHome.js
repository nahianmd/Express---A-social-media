var express = require('express');
var user_details = require.main.require('./models/user_details');
var router = express.Router();

router.get('/', function(request, response){
	
	if(request.cookies['loginUserId'] != null){
		
		user_details.getById(request.cookies['loginUserId'], function(result){
            
			console.log("general home controllers");
            console.log(result.user_type_id);
            
			if(result.user_type_id == "21" && result.account_status_id != "12"){
                response.redirect('/contentManager/home');
            }
			else if(result.user_type_id == "22" && result.account_status_id != "12"){
                response.redirect('/accountManager/home');
            }
			else if(result.user_type_id == "20" && result.account_status_id != "12"){
                response.redirect('/systemAdmin/home');
            }
            else{
                response.send('User Account Has Been Blocked ...!');
            }
			
		});
	}else{
		response.redirect('/');
	}
});

module.exports = router;