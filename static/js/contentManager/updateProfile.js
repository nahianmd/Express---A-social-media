$(document).ready(function(){
});
function check(){
    if($('#email').val() == ""){
        $('#email').css('border', '1px solid red');
        $('#emailError').text('email empty');
        return false;
    }
    else{
        return true;
    }
}