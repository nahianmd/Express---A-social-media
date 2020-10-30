function show(){
    // $("#dropdownId").empty();
    $("#dropdownId").empty();
    $.ajax({
        url: '/contentManager/sendMessage/showUser',
        type: 'POST',
        success:(function(data){
            var results = JSON.parse(data);
            $('#dropdownId').append("<option class='touch' value=''>--------</option>");
            for(var i=0; i < results.length; i++){
                $('#dropdownId').append("<option class='touch' value='"+results[i].user_id+"'>"+results[i].user_id+" "+results[i].username+"</option>");
            }
            $('#dropdownId').click(function(){
                $('#idOfUser').val($('#dropdownId option:selected').val());
            });
        })
    });
}