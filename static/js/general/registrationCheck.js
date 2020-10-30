function check(){
    var flag= null;
    $.ajax({
        url: '/generalController/register/checkMail',
        type: 'POST',
        success:(function(data){
            var results = JSON.parse(data);
            console.log($('#email').val());
            for(var i = 0; i < results.length; i++){
                if($('#email').val() == results[i].email){
                    $('#email').css('border', '3px solid red');
                    console.log(results[i].email);
                    flag = false;
                }
            }
        }),
        async: false
    });
    console.log(flag);
    if(flag == false){
        console.log("i am false");
        return false;
    }
    else if(flag == null){
        console.log("i am true");
        return true;
    }
}

function keyUpCheck(){
    $.ajax({
        url: '/generalController/register/checkMail',
        type: 'POST',
        success:(function(data){
            var results = JSON.parse(data);
            var mail = $('#email').val();
            // console.log($('#email').val());
            // console.log(results);
            for(var i = 0; i < results.length; i++){
                if(results[i].email == mail){
                    $('#email').css('border', '3px solid red');
                    $('#submit').prop("disabled",true);
                    break;
                }
                else{
                    $('#email').css('border', '3px solid green');
                    $('#submit').prop("disabled",false);
                }
            }
        })
    });
}