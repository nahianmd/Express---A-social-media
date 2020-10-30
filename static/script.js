$(document).ready(function(){
	
	$('input').keyup(function(){
		alert("haay there");
		console.log("haay there");
	});
});





// function searchFunc(){
		// alert("key up");
		// console.log("key up");
		// $(document).ready(function(){
			// $(".resultClass").empty();
			// var idVal = $('#searchID').val();
			// $.ajax({
				// url: '/accountManager/home/search/',
				// type: 'POST',
				// data: {
					// value: idVal,
				// },
				// success:(function(data){
					// var results = JSON.parse(data);
					// for(var i = 0; i < results.length; i++){
						// $('.resultClass').append(
						// console.log("ajax working >> " results[i].username);
							// "<div><h2>"+results[i].username+"</h2></div>"
						// );
					// }
				// })
			// });
		// });
	// }