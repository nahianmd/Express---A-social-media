var express = require('express');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var post_content = require.main.require('./models/post_content');
var post_info = require.main.require('./models/post_info');

router.post('/', function(request, response){
    user_details.getUserType(request.cookies['loginUserId'], function(result){
        if(result.length > 0){
            if(result.user_type_name != "user"){
                post_content.getNextId(function(nextId){
                    if(nextId.length > 0){
                        data = {
                            post_id: nextId,
                            user_id: request.cookies['loginUserId'],
                            post_type_id: 40,
                            post_status_id: 51
                        }
                        post_info.insert(data, function(status){
                            if(status){
                                data = {
                                    post_text: request.body.post,
                                    post_image: null
                                }
                                post_content.insert(data, function(status){
                                    if(status){
                                        response.redirect('/generalController/mainHome');
                                    }
                                    else{
                                        console.log("error in insert in post_content");
                                    }
                                });
                            }
                            else{
                                console.log("error in insert in post_info");
                            }
                        });
                    }
                    else{
                        console.log("error in next id");
                    }
                });
            }
            else{
                console.log("error in user type name");
            }
        }
        else{
            console.log("error in user type check");
        }
    });
});





module.exports = router;