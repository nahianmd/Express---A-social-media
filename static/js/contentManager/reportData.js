function showReport(){
    $.ajax({
        url: '/contentManager/report/showData',
        type: 'GET',
        success: (function(data){
            var results = JSON.parse(data);
            console.log(data);
            console.log("report result: ",results.total_post);
            console.log("report result: ",results.pending_post);
            console.log("report result: ",results.today_post);
            console.log("report result: ",results.total_warning_post);
            $('#todayPost').text(results.today_post);
            $('#totalPost').text(results.total_post);
            $('#pendingPost').text(results.pending_post);
            $('#warningPost').text(results.total_warning_post);
        })
    });
}

function print(){
    var prtContent = document.getElementById("printReport");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}