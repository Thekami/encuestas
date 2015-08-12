
var preguntas = 0;

var cuestionario = [];

var name_poll = "";

var contenido_edit = "";

var cuantas_respuestas_edit = "";

var tipo_resp_edit = "";

$('document').ready(function(){

	//en cuanto cargue la pagina escondera el div de "nueva pregunta" (main2) y el de "Enviar encuesta" (main3)
	$('#div_create').css('display', 'none')
	$('#div_btn_new_quest').css('display', 'none')
	$('#div_btn_send_poll').css('display', 'none')
	$('#div_edit').css('display', 'none')
	$('#div_show_edit').css('display', 'none')
	$('#div_show_url').css('display', 'none')


})//ready



// ============= Eventos para editar ============================================================================

$(document).on('click', '#edit_poll', function(e){
	e.preventDefault()
	//alert()

	$('#div_edit').css('display', 'none')
	$('#div_btn_new_quest').css('display', 'none')
	$('#div_btn_send_poll').css('display', 'none')
	$('#div_create').css('display', 'none')
	$('#div_show_url').css('display', 'none')


	$.ajax({
		url:'resources/Ajax.php',
		type:'post',
		data: {action: "data_edit"},
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
		url:'resources/Ajax.php',
		type:'post',
		data: {poll: poll, action: "get_quest"},
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
		url:'resources/Ajax.php',
		type:'post',
		data: {poll: poll, quest: quest, action: "get_info_quest"},
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
									'<input type="submit" value="Guardar" disabled id="save_quest_edit">'+
								'</form>')

			contenido_edit = $('#contenido').val() //variable global

			tipo_resp_edit = data[0]["tipo_resp"]; //variable global
			//console.log(contenido_edit)

			if (data[0]["tipo_resp"] == 1)
				document.getElementById("tipo_resp").selectedIndex = "1";

			if (data[0]["tipo_resp"] == 2)
				document.getElementById("tipo_resp").selectedIndex = "2";

			if (data[0]["tipo_resp"] == 3)
				document.getElementById("tipo_resp").selectedIndex = "3";

			var res = data[0]["respuestas"].split(",")
			//console.log(res)

			cuantas_respuestas_edit = data[0]["cuantas_respuestas"]; //variable global

			for(var i = 1; i <= cuantas_respuestas_edit; i++){
				//console.log(i)
				$('#respuestas').append('Respuesta '+i+': <input class="respuestas" id="resp'+i+'" type="text" value="'+res[(i-1)]+'"><br>')
			}

			
			
		}
	})

})


$(document).on('keyup', '.respuestas, #contenido', function(){

	$('#save_quest_edit').removeAttr('disabled')

})


$(document).on('click', '#save_quest_edit', function(e){
	e.preventDefault()

	var contenido = $('#contenido').val()
	var tipo_resp = $('#tipo_resp').val()

	name_poll = $('#select_poll').val()

	//console.log(contenido)
	//console.log(tipo_resp)
		
	var pregunta = {name_poll: name_poll, contenido: contenido_edit, new_contenido: contenido, 
					tipo_resp: tipo_resp, cuantas_respuestas: "", respuestas: ""}

	if (tipo_resp == 1) {
		pregunta.cuantas_respuestas = 0;
		pregunta.respuestas = 0;
		pregunta.cuantas_respuestas = 0;

	}

	if (tipo_resp == 2 || tipo_resp == 3) {

		if (tipo_resp == tipo_resp_edit) {

			pregunta.cuantas_respuestas = cuantas_respuestas_edit;
			var respuestas = [];

			for(var i = 1; i <= cuantas_respuestas_edit; i++){
				if ($('#resp'+i+'').val() != "") {
					respuestas.push($('#resp'+i+'').val())
				}
			}
			pregunta.respuestas = respuestas;
			console.log(pregunta.respuestas)

		}else{
			
			cuantas = $('#many_opts').val()
			pregunta.cuantas_respuestas = cuantas;
			var respuestas = [];

			for(var i = 1; i <= cuantas; i++){
				if ($('#resp'+i+'').val() != "") {
					respuestas.push($('#resp'+i+'').val())
				}
			}
			pregunta.respuestas = respuestas;
			console.log(pregunta.respuestas)

		}
		

	}


	if (pregunta.contenido != "" && pregunta.tipo_resp != "") {
		
		if (pregunta.tipo_resp == 1) {

			cuestionario.push(pregunta)
			console.log(pregunta+1)

			$.ajax({
				url:'resources/Ajax.php',
				type:'post',
				data: {data: pregunta, action: "edit"},
				//dataType:'json',
				error: function(error){
					console.log("error")
				},
				success: function(data){
					console.log(data)
					$('#select_poll').trigger('change')
					if (data) {
						console.log("se guardo bien")
						$('#div_btn_new_quest').css('display', 'none')
						$('#div_btn_send_poll').css('display', 'none')
						
					}else{
						console.log("no se guardo bien")
					}

				}
			})

			/*$('#div_btn_new_quest').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_btn_send_poll').css('display', 'block')*/

		}else if(pregunta.cuantas_respuestas != "" && pregunta.respuestas.length == pregunta.cuantas_respuestas){

			cuestionario.push(pregunta)
			console.log(pregunta+2)

			$.ajax({
				url:'resources/edit.php',
				type:'post',
				data: {data: pregunta},
				//dataType:'json',
				error: function(error){
					console.log("error")
				},
				success: function(data){
					console.log(data)
					$('#select_poll').trigger('change')
					if (data) {
						console.log("se guardo bien")
						$('#div_btn_new_quest').css('display', 'none')
						$('#div_btn_send_poll').css('display', 'none')
						
					}else{
						console.log("no se guardo bien")
					}

				}
			})
			/*$('#div_btn_new_quest').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_btn_send_poll').css('display', 'block')*/

		}else{
			alert("debe llenar todos los campos antes de poder continuar")
		}
			

	}else{
		alert("debe llenar todos los campos antes de poder continuar")
	}


})

// ================== Eventos para crear nuevo cuestionario ===========================================

$(document).on('blur', '#name_poll', function(){

	var txt_name_poll = $('#name_poll').val()

	$.ajax({
		url:'resources/Ajax.php',
		type:'post',
		data: {poll: txt_name_poll, action: "check_poll"},
		//dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			if (data)
				alert("El nombre que selecciono ya existe, intente con otro")

		}
	})

})
//Evento para crear el html del formulario para ingresar el nombre de la encuesta a  crear
$(document).on('click', '#make_poll', function(e){
	e.preventDefault()

	preguntas = 0;
	cuestionario = [];
	//escondo el primero div (el que da las opciones de nueva encuesta y editar encuesta)
	$('#div_create').css('display', 'block')
	$('#div_edit').css('display', 'none')
	$('#div_show_edit').css('display', 'none')
	$('#div_show_url').css('display', 'none')
	$('#div_btn_new_quest').css('display', 'none')
	$('#div_btn_send_poll').css('display', 'none')


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
		$('#div_btn_new_quest').css('display', 'none')
		$('#div_btn_send_poll').css('display', 'none')

		preguntas++;

		if (preguntas == 1)
			name_poll = $('#name_poll').val();
			console.log(name_poll)

		new_quest(preguntas)

	}else{
		alert("Proporcione primero el nombre de la encuesta")
	}


})


$(document).on('change', '#tipo_resp', function(e){

	var tipo_resp = $('#tipo_resp').val()
	//console.log(tipo_resp)
	$('#save_quest_edit').removeAttr('disabled')

	if (tipo_resp == 1) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#save_quest').removeAttr('disabled')
	}

	if (tipo_resp == 2 || tipo_resp == 3 || tipo_resp == 4) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#div_cuantas_resp').append('¿Cuantas? <input id="many_opts" type="text"><br>'+
									'<input type="button" value="Crear respuestas" id="make_opt">')
		$('#save_quest').attr('disabled', 'disabled')
	}

	/*if (tipo_resp == 3) {
		$('#respuestas').empty()
		$('#div_cuantas_resp').empty()
		$('#div_cuantas_resp').append('¿Cuantas? <input id="many_opts" type="text"><br>'+
									'<input type="button" value="Crear respuestas" id="make_opt">')
		$('#save_quest').attr('disabled', 'disabled')
	}*/

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
		
	var pregunta = {name_poll: name_poll, contenido: contenido, 
					tipo_resp: tipo_resp, cuantas_respuestas: "", 
					respuestas: "", no_preg: preguntas}

	if (tipo_resp == 1) {
		pregunta.cuantas_respuestas = 0;
		pregunta.respuestas = 0;
		pregunta.cuantas_respuestas = 0;

	}

	if (tipo_resp == 2 || tipo_resp == 3 || tipo_resp == 4) {

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
			$('#div_btn_new_quest').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_btn_send_poll').css('display', 'block')

		}else if(pregunta.cuantas_respuestas != "" && pregunta.respuestas.length == pregunta.cuantas_respuestas){

			cuestionario.push(pregunta)
			$('#div_btn_new_quest').css('display', 'block')
			$('#div_create').css('display', 'none')
			$('#div_btn_send_poll').css('display', 'block')

		}else{
			alert("debe llenar todos los campos antes de poder continuar")
			console.log(1)
		}
			

	}else{
		alert("debe llenar todos los campos antes de poder continuar")
		console.log(2)
	}

	
		//console.log(cuestionario)
})


$(document).on('click', '#send_poll', function(e){
	e.preventDefault()

	preguntas = 0;

	$.ajax({
		url:'resources/Ajax.php',
		type:'post',
		data: {data: cuestionario, action: "save"},
		//dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			//console.log(data)
			if (data) {
				console.log(data)
				console.log("se guardo bien")
				$('#div_btn_new_quest').css('display', 'none')
				$('#div_show_url').css('display', 'block')
				$('#div_show_url').empty()
				$('#div_show_url').append('<p>localhost/encuestas/ver.php?src='+data+'</p>')
				$('#div_btn_send_poll').css('display', 'none')
				
				
			}else{
				console.log("no se guardo bien")

			}

		}
	})
})


function new_quest(preguntas){
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
									'<option value="4">Select</option>'+
								'</select><br><br>'+
							'<div id="div_cuantas_resp">'+
							'</div>'+
							'<div id="respuestas">'+
							'</div><br>'+
							'<input type="submit" value="Guardar" disabled id="save_quest">'+
						'</form>')

}

var contenido_txt_cant = "";
$(document).on('keyup', '#many_opts', function(event){ 					
																	
	var caracteres = $(this).val();									
																	
	if (caracteres.match(/[^1234567890]/g) ){										
		//console.log('danger','ERROR','Solo se permite letras o numeros')	
		$(this).val(contenido_txt_cant);
	}else{								
		contenido_txt_cant = $(this).val();
	}																					
																	
																						
});	

