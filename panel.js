
var preguntas = 0;

var cuestionario = [];

var name_poll = "";

$('document').ready(function(){

	//en cuanto cargue la pagina escondera el div de "nueva pregunta" (main2) y el de "Enviar encuesta" (main3)
	$('#div_create').css('display', 'none')
	$('#div_main2').css('display', 'none')
	$('#div_main3').css('display', 'none')
	$('#div_edit').css('display', 'none')
	$('#div_show_edit').css('display', 'none')


})//ready



// ============= Eventos para editar ============================================================================

$(document).on('click', '#edit_poll', function(e){
	e.preventDefault()

	$('#div_edit').css('display', 'none')
	$('#div_main2').css('display', 'none')
	$('#div_main3').css('display', 'none')
	$('#div_create').css('display', 'none')


	$.ajax({
		url:'data_edit.php',
		type:'post',
		//data: {},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#div_edit').css('display', 'block')
			$('#select_poll').empty()
			$('#select_poll').append('<option value="0" selected disabled>Selecione una encuesta</option>')
			
			for(var i = 0; i < data.length; i++){
				$('#select_poll').append('<option value="'+data[i]["poll"]+'">'+data[i]["poll"]+'</option>')
			}
			
		}
	})

})

$(document).on('change', '#select_poll', function(e){
	e.preventDefault()

	var poll = $('#select_poll').val();

	$.ajax({
		url:'get_quest.php',
		type:'post',
		data: {poll: poll},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#select_quest').removeAttr('disabled')
			$('#select_quest').empty();
			$('#select_quest').append('<option value="0" selected disabled>Selecione una pregunta</option>')
			
			for(var i = 0; i < data.length; i++){
				$('#select_quest').append('<option value="'+data[i]["contenido"]+'">'+data[i]["contenido"]+'</option>')
			}
			
		}
	})

})


$(document).on('change', '#select_quest', function(e){
	e.preventDefault()

	var quest = $('#select_quest').val()
	var poll = $('#select_poll').val()

	//console.log(quest)
	//console.log(poll)

	$.ajax({
		url:'get_info_quest.php',
		type:'post',
		data: {poll: poll, quest: quest},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)

			$('#div_show_edit').empty()
			$('#div_show_edit').css('display', 'block')
			$('#div_show_edit').append('<form id="a" action="">'+
									'Contenido <input id="contenido" type="text" value="'+data[0]["contenido"]+'"><br><br>'+
									'Tipo de respuesta '+
										'<select id="tipo_resp" name="" id="">'+
											'<option value="0" disabled>Seleccione una opcion</option>'+
											'<option value="1">Abierta</option>'+
											'<option value="2">Opcion multiple</option>'+
											'<option value="3">Multiseleccion</option>'+
										'</select><br><br>'+
									'<div id="div_cuantas_resp">'+
									'</div>'+
									'<div id="respuestas">'+
									'</div><br>'+
									'<input type="submit" value="Guardar" disabled id="save_quest">'+
								'</form>')

			if (data[0]["tipo_resp"] == 1)
				document.getElementById("tipo_resp").selectedIndex = "1";

			if (data[0]["tipo_resp"] == 2)
				document.getElementById("tipo_resp").selectedIndex = "2";

			if (data[0]["tipo_resp"] == 3)
				document.getElementById("tipo_resp").selectedIndex = "3";

			var res = data[0]["respuestas"].split(",")
			//console.log(res)

			for(var i = 1; i <= data[0]["cuantas_respuestas"]; i++){
				//console.log(i)
				$('#respuestas').append('Respuesta '+i+': <input class="respuestas" id="resp'+i+'" type="text" value="'+res[(i-1)]+'"><br>')
			}

			var x = document.getElementById("div_cuantas_resp");
			var text = "";
		    var i;
		    for (i = 0; i < x.length ;i++) {
		        text += x.elements[i].value;
		    }
			console.log(text)
			
		}
	})

})


$(document).on('keyup', '.respuestas, #contenido', function(){

	$('#save_quest').removeAttr('disabled')

})

// ================== Eventos para crear nuevo cuestionario ===========================================

//Evento para crear el html del formulario para ingresar el nombre de la encuesta a  crear
$(document).on('click', '#make_poll', function(e){
	e.preventDefault()

	//escondo el primero div (el que da las opciones de nueva encuesta y editar encuesta)
	$('#div_create').css('display', 'block')
	$('#div_edit').css('display', 'none')
	$('#div_show_edit').css('display', 'none')

	$('#div_create').empty()
	$('#div_create').append('<form action="">'+
						   	'<label for=""> Nombre a la encuesta</label>'+
						   	'<input type="text" id="name_poll">'+
						   	'<input type="submit" value="Siguiente" id="new_quest">'+
					   	  '</form>')
})

$(document).on('click', '#new_quest', function(e){
	e.preventDefault()

	if ($('#name_poll').val() != "") {

		$('#div_create').css('display', 'block')
		$('#div_main2').css('display', 'none')

		preguntas++;

		if (preguntas == 1)
			name_poll = $('#name_poll').val();

		$('#div_create').empty()
		$('#div_create').append('<form id="preg_'+preguntas+'" action="">'+
								'<h4>Pregunta '+preguntas+'</h4>'+
								'Contenido <input id="contenido" type="text"><br><br>'+
								'Tipo de respuesta '+
									'<select id="tipo_resp" name="" id="">'+
										'<option value="0" selected disabled>Seleccione una opcion</option>'+
										'<option value="1">Abierta</option>'+
										'<option value="2">Opcion multiple</option>'+
										'<option value="3">Multiseleccion</option>'+
									'</select><br><br>'+
								'<div id="div_cuantas_resp">'+
								'</div>'+
								'<div id="respuestas">'+
								'</div><br>'+
								'<input type="submit" value="Guardar" disabled id="save_quest">'+
							'</form>')


	}else{
		alert("Proporcione primero el nombre de la encuesta")
	}


})


$(document).on('change', '#tipo_resp', function(e){

	var tipo_resp = $('#tipo_resp').val()
	//console.log(tipo_resp)

	if (tipo_resp == 1) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#save_quest').removeAttr('disabled')
	}

	if (tipo_resp == 2) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#div_cuantas_resp').append('¿Cuantas? <input id="many_opts" type="text"><br>'+
									'<input type="button" value="Crear respuestas" id="make_opt">')
		$('#save_quest').attr('disabled', 'disabled')
	}

	if (tipo_resp == 3) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#div_cuantas_resp').append('¿Cuantas? <input id="many_opts" type="text"><br>'+
									'<input type="button" value="Crear respuestas" id="make_opt">')
		$('#save_quest').attr('disabled', 'disabled')
	}

})

$(document).on('click', '#make_opt', function(e){
	e.preventDefault()

	$('#save_quest').removeAttr('disabled')

	var cuantas = $('#many_opts').val()
	//console.log(cuantas)

	$('#respuestas').empty()

	for(var i = 1; i <= cuantas; i++){
		//console.log(i)
		$('#respuestas').append('Respuesta '+i+': <input id="resp'+i+'" type="text"><br>')
	}
})


// ================== Eventos para guardar las preguntas y la encuesta ======================================================

$(document).on('click', '#save_quest', function(e){
	e.preventDefault()

	var contenido = $('#contenido').val()
	var tipo_resp = $('#tipo_resp').val()

	//console.log(contenido)
	//console.log(tipo_resp)
		
	var pregunta = {name_poll: name_poll, contenido: contenido, tipo_resp: tipo_resp, cuantas_respuestas: "", respuestas: ""}

	if (tipo_resp == 1) {
		pregunta.cuantas_respuestas = 0;
		pregunta.respuestas = 0;
		pregunta.cuantas_respuestas = 0;

	}

	if (tipo_resp == 2 || tipo_resp == 3) {

		var	cuantas = $('#many_opts').val()
		pregunta.cuantas_respuestas = cuantas;
		var respuestas = [];

		for(var i = 1; i <= cuantas; i++){
			if ($('#resp'+i+'').val() != "") {
				respuestas.push($('#resp'+i+'').val())
			}
		}
		pregunta.respuestas = respuestas;

	}


	if (pregunta.contenido != "" && pregunta.tipo_resp != "") {
		
		if (pregunta.tipo_resp == 1) {

			cuestionario.push(pregunta)
			$('#div_main2').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_main3').css('display', 'block')

		}else if(pregunta.cuantas_respuestas != "" && pregunta.respuestas.length == pregunta.cuantas_respuestas){

			cuestionario.push(pregunta)
			$('#div_main2').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_main3').css('display', 'block')

		}else{
			alert("debe llenar todos los campos antes de poder continuar")
		}
			

	}else{
		alert("debe llenar todos los campos antes de poder continuar")
	}

	
		//console.log(cuestionario)
})


$(document).on('click', '#send_poll', function(e){
	e.preventDefault()

	$.ajax({
		url:'save.php',
		type:'post',
		data: {data: cuestionario},
		//dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)
			if (data) {
				console.log("se guardo bien")
				$('#div_main2').css('display', 'none')
				$('#div_main3').css('display', 'none')
				$('#div_create').css('display', 'block')
				$('#div_create').empty()
				$('#div_create').append('<form action="">'+
									   	'<label for=""> Crear nueva encuesta</label>'+
									   	'<input type="submit" value="Crear" id="make_poll">'+
									   	'<label for=""> Editar encuesta</label>'+
									    '<input type="submit" value="Editar" id="edit_poll">'+
								   	  '</form>')
			}else{
				console.log("no se guardo bien")
			}

		}
	})
})
