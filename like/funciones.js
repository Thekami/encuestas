var num = 1;
var limiteLinks = 11;
var inicioLinks = 1;
var finPAgs = 0;

$('document').ready(function(){

	$.ajax({
		url:'envios.php',
		type:'post',
		data: {num: 0},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			finPAgs = data[10]["Npags"];
			finPAgs = finPAgs + 1;

			//console.log(finPAgs)

			$('#tbody').empty();
			for (var i = 0; i < data.length-1; i++) {
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
			}

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			};
			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
			//identificador = "todo";
			
		}
	})		


})//ready

$(document).on('click', ".links", function(event){
		event.preventDefault(); //evito que se refresque la pagina
		var pags = ($(this).html()); //guardo en la variable "pags" el valor del link (2, 3, 4 , >, >>, etc)
		var num = 0;

		var response = paginar(pags, limiteLinks, inicioLinks, finPAgs);
		limiteLinks = response[0];
		inicioLinks = response[1];

		$.ajax({
			url:'envios.php',
			type:'post',
			data: {num: pags},
			dataType:'json',
			error: function(error){
				console.log("error")
			},
			success: function(data){
				//console.log(data)

				$('#tbody').empty();
				for (var i = 0; i < data.length-1; i++) {
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
				}
				
			}
		})		

	});


$(document).on('keyup', '#txt_busqueda', function(){

	var txt = $('#txt_busqueda').val();

	$.ajax({
		url:'like.php',
		type:'post',
		data: {txt: txt, num: 0},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)
			//console.log(data.length)
			
			finPAgs = data[data.length-1]["Npags"];
			
			finPAgs = finPAgs + 1;

			//console.log(finPAgs)

			$('#tbody').empty();
			for (var i = 0; i < data.length-1; i++) {
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
			
			$("#paginacion").empty()
			if (finPAgs > 11) {
				for (var i = inicioLinks; i < limiteLinks; i++) {
					$("#paginacion").append('<a href="#" class="linksBusqueda" >'+i+'</a>&nbsp;');
				};
				$("#paginacion").append('&nbsp;<a href="#" class="linksBusqueda" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="linksBusqueda" id="ultimo">'+'>>'+'</a>');
			}
			

			/*if (limiteLinks > 11) {
				$("#paginacion").append('&nbsp;<a href="#" class="linksBusqueda" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="linksBusqueda" id="ultimo">'+'>>'+'</a>');
			}*/

			/*$("#paginacion").empty()
			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+i+'</a>&nbsp;');
			};
			$("#paginacion").append('&nbsp;<a href="#" class="linksBusqueda" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="linksBusqueda" id="ultimo">'+'>>'+'</a>');*/
		}
	})

})


$(document).on('click', ".linksBusqueda", function(event){
	event.preventDefault(); //evito que se refresque la pagina
	var pags = ($(this).html()); //guardo en la variable "pags" el valor del link (2, 3, 4 , >, >>, etc)
	var num = 0;

	var txt = $('#txt_busqueda').val();

	var response = paginarBusqueda(pags, limiteLinks, inicioLinks, finPAgs);
	limiteLinks = response[0];
	inicioLinks = response[1];

	$.ajax({
		url:'like.php',
		type:'post',
		data: {txt: txt, num: pags},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#tbody').empty();
			for (var i = 0; i < data.length-1; i++) {
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
			}
			
		}
	})		

})



// ================== Evento para paginar se carga la tabla por primera vez ================================

function paginar (pags, limiteLinks, inicioLinks, finPAgs) {

	if (pags == "Siguiente") {  // INICIA condicion para mostrar paginado al precionar el lin "siguiente"

			limiteLinks = limiteLinks + 5;
			inicioLinks = inicioLinks + 5;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

			if(limiteLinks < finPAgs){ // condicion pa saber si ya llegue al limite de paginas

				$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
			}

		} // ------------------ TERMINA CONDICION DEL LINK "SIGUIENTE" --------------------------------------


		if (pags == "Anterior") {  // INICIA condicion para mostrar paginado al precionar el lin "anterior"

			limiteLinks = limiteLinks - 5;
			inicioLinks = inicioLinks - 5;

			$("#paginacion").empty();

			if(inicioLinks > 1){ //condicion para saber si estoy mostrando el limite inicial de los links

				$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');
			}

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');

		} // --------------------- TERMINA CONDICION DEL LINK "ANTEIROR" ---------------------------------

		if(pags == "&gt;&gt;"){  // >>
			limiteLinks = finPAgs;
			inicioLinks = finPAgs - 10;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

		}

		if(pags == "&lt;&lt;"){  // <<
			limiteLinks = 11;
			inicioLinks = 1;

			$("#paginacion").empty();

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			};
			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
		}

		var response = [limiteLinks, inicioLinks];
		return response;
}


// ================== Evento para paginar cuando se hace una busqueda ================================

function paginarBusqueda (pags, limiteLinks, inicioLinks, finPAgs) {

	if (pags == "Siguiente") {  // INICIA condicion para mostrar paginado al precionar el lin "siguiente"

			limiteLinks = limiteLinks + 5;
			inicioLinks = inicioLinks + 5;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

			if(limiteLinks < finPAgs){ // condicion pa saber si ya llegue al limite de paginas

				$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
			}

		} // ------------------ TERMINA CONDICION DEL LINK "SIGUIENTE" --------------------------------------


		if (pags == "Anterior") {  // INICIA condicion para mostrar paginado al precionar el lin "anterior"

			limiteLinks = limiteLinks - 5;
			inicioLinks = inicioLinks - 5;

			$("#paginacion").empty();

			if(inicioLinks > 1){ //condicion para saber si estoy mostrando el limite inicial de los links

				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+'<<'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+'Anterior'+'</a>&nbsp;');
			}

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+i+'</a>&nbsp;');
			}

			$("#paginacion").append('&nbsp;<a href="#" class="linksBusqueda" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="linksBusqueda" id="ultimo">'+'>>'+'</a>');

		} // --------------------- TERMINA CONDICION DEL LINK "ANTEIROR" ---------------------------------

		if(pags == "&gt;&gt;"){  // >>
			limiteLinks = finPAgs;
			inicioLinks = finPAgs - 10;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="linksBusqueda" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="linksBusqueda" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+i+'</a>&nbsp;');
			}

		}

		if(pags == "&lt;&lt;"){  // <<
			limiteLinks = 11;
			inicioLinks = 1;

			$("#paginacion").empty();

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="linksBusqueda" >'+i+'</a>&nbsp;');
			};
			$("#paginacion").append('&nbsp;<a href="#" class="linksBusqueda" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="linksBusqueda" id="ultimo">'+'>>'+'</a>');
		}

		var response = [limiteLinks, inicioLinks];
		return response;
}