$('document').ready(function(){

	$.ajax({
		url:'envios.php',
		type:'post',
		//data: {txt: txt},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#tbody').empty();
			for (var i = 0; i < data.length; i++) {
				var id = i+1;
				$('#tbody').append('<tr>'+
				                        '<td>'+data[i].id+'</td>'+
				                        '<td>'+data[i].Entidad+'</td>'+
				                        '<td>'+data[i].Municipio+'</td>'+
				                        '<td>'+data[i].nomLoc+'</td>'+
				                        '<td>'+data[i].cveAsen+'</td>'+
				                        '<td>'+data[i].nomAsen+'</td>'+
				                        '<td>'+data[i].cvetipoAsen+'</td>'+
			                       '</tr>');
			};
			
		}
	})		


})//ready


$(document).on('keyup', '#txt_busqueda', function(){

	var txt = $('#txt_busqueda').val();

	$.ajax({
		url:'like.php',
		type:'post',
		data: {txt: txt},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#tbody').empty();
			for (var i = 0; i < data.length; i++) {
				var id = i+1;
				$('#tbody').append('<tr>'+
				                        '<td>'+data[i].id+'</td>'+
				                        '<td>'+data[i].Entidad+'</td>'+
				                        '<td>'+data[i].Municipio+'</td>'+
				                        '<td>'+data[i].nomLoc+'</td>'+
				                        '<td>'+data[i].cveAsen+'</td>'+
				                        '<td>'+data[i].nomAsen+'</td>'+
				                        '<td>'+data[i].cvetipoAsen+'</td>'+
			                       '</tr>');
			};
			
		}
	})

})