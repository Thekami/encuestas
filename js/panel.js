
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
			$('#div_show_edit').append('<br><div class="linea_divisoria"></div><br>'+
									   '<form id="a" action="">'+
										  '<div class="row">'+
											    '<div class="six columns">'+
											        '<label>Contenido</label>'+
											        '<input class="u-full-width" id="contenido" type="text" value="'+data[0]["contenido"]+'"><br><br>'+
										        '</div>'+
										        '<div class="six columns">'+
											        '<label>Tipo de respuesta</label>'+
											        '<select class="u-full-width" id="tipo_resp" name="" id="">'+
												        '<option value="0" disabled>Seleccione una opcion</option>'+
												        '<option value="1">Abierta</option>'+
												        '<option value="2">Opcion multiple</option>'+
												        '<option value="3">Multiseleccion</option>'+
											        '</select><br><br>'+
											    '</div>'+
										  '</div>'+
						      			  '<div id="div_cuantas_resp"></div>'+
									      '<div id="respuestas" class="row"></div><br>'+
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
	$('#div_create').append('<div class="row">'+
								'<form action="">'+
									'<div class="six columns">'+
								   		'<label for=""> Nombre de la encuesta</label>'+
								   		'<div class="row">'+
									   		'<div class="six columns">'+
									   			'<input type="text" id="name_poll">'+
									   		'</div>'+
									   		'<div class="six columns">'+
									   			'<input type="submit" class="button-primary" value="Crear encuesta" id="new_quest">'+
									   		'</div>'+
									   	'</div>'+
									'</div>'+
								'</form>'+
				   	  		'</div>')


})

$(document).on('click', '#new_quest', function(e){
	e.preventDefault()

	if ($('#name_poll').val() != "") {

		$('#div_create').css('display', 'block')
		$('#div_btn_new_quest').css('display', 'none')
		$('#div_btn_send_poll').css('display', 'none')

		preguntas++;

		if (preguntas == 1) // Si es la primera pregunta de la encuesta...
			name_poll = $('#name_poll').val();
			console.log(name_poll)

		nuevaPregunta(preguntas)

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
		$('#div_cuantas_resp').append('<label for=""> ¿Cuantas? </label>'+
									  '<div class="row">'+
		   							  		'<div class="seven columns">'+
								  		  		'<input class="u-full-width" id="many_opts" type="text"><br>'+
								  	  		'</div>'+
		   							  		'<div class="five columns">'+
										  		'<input type="button" class="button-primary" value="Crear respuestas" id="make_opt">'+
									  		'</div>'+
			   						  '</div>')

		$('#save_quest').attr('disabled', 'disabled')
	}

})

$(document).on('click', '#make_opt', function(e){
	e.preventDefault()

	$('#save_quest').removeAttr('disabled')
	var respuestas = "";
	var cont = 0;
	var bandera = false;

	var cuantas = $('#many_opts').val()

	$('#respuestas').empty()

	for(var i = 1; i <= cuantas; i++){
		cont = cont+1;

		if (cont <= 4) {

			respuestas = respuestas+'<div id="resp_three_columns_'+i+'" name="'+cont+'" class="three columns"></div>';

		}else{

			cont = 1;
			respuestas = respuestas+'<div class="new_resp" id="">'+
											'<div id="resp_three_columns_'+i+'" name="'+cont+'" class="three columns">'+
											'</div>'+
										'</div>'
									;
									bandera = true;						
		}

		$('#respuestas').append(respuestas)

		if (bandera) {
			$('#respuestas').attr('id', '')
			$('.new_resp').attr('id', 'respuestas')	
		}
		bandera = false;


		$('#resp_three_columns_'+i).append('<label for="">Respuesta '+i+': </label>'+
									   '<input id="resp'+i+'" type="text">')
		
		respuestas = "";
	}

	$('.old_resp').attr('id', 'respuestas');
	$('.new_resp').attr('id', '');

})


// ================== Eventos para guardar las preguntas y la encuesta ======================================================

$(document).on('click', '#save_quest', function(e){
	e.preventDefault()

	var contenido = $('#contenido').val()
	var tipo_resp = $('#tipo_resp').val()

	
	// Se llena un json con la infomación que se va a enviar
	// A la variable name_poll se le asignó valor cuando se 
	// creó la encuesta
	var pregunta = {name_poll: name_poll, contenido: contenido, 
					tipo_resp: tipo_resp, cuantas_respuestas: "", 
					respuestas: "", no_preg: preguntas}

	// Si es una pregunta Abierta (tipo 1) entonces se deja
	// en cero los campos que no se van a necesitar
	if (tipo_resp == 1) {
		pregunta.cuantas_respuestas = 0;
		pregunta.respuestas = 0;
		pregunta.cuantas_respuestas = 0;
	}

	// Si la pregunta es de los demás tipos entonces...
	if (tipo_resp == 2 || tipo_resp == 3 || tipo_resp == 4) {

		var	cuantas = $('#many_opts').val()
		pregunta.cuantas_respuestas = cuantas;
		
		var respuestas = [];

		for(var i = 1; i <= cuantas; i++){
			if ($('#resp'+i+'').val() != "")
				respuestas.push($('#resp'+i+'').val())
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


function nuevaPregunta(preguntas){
	$('#div_create').empty()

	$('#div_create').append('<form action="" id="preg_'+preguntas+'">'+
								'<div class="row">'+
									'<div class="six columns">'+
										'<h4>Pregunta '+preguntas+'</h4>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="six columns">'+
										'<label for="">Contenido</label>'+
										'<input id="contenido" class="u-full-width" type="text">'+
									'</div>'+
									'<div class="six columns">'+
										'<label for="">Tipo de respuesta</label>'+
										'<select id="tipo_resp" class="u-full-width" name="" id="">'+
											'<option value="0" selected disabled>Seleccione una opcion</option>'+
											'<option value="1">Abierta</option>'+
											'<option value="2">Opcion multiple</option>'+
											'<option value="3">Multiseleccion</option>'+
											'<option value="4">Select</option>'+
										'</select>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="six columns">'+
										'<div id="div_cuantas_resp"></div>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="old_resp" id="respuestas"></div>'+
								'</div>'+
								'<br>'+
								'<div class="row">'+
									'<div class="six columns">'+
										'<input type="submit" class="button-primary" value="Guardar" disabled id="save_quest">'+
									'</div>'+
								'</div>'+
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

