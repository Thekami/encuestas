$('document').ready(function(){

	$.ajax({
		url:'get_data.php',
		type:'post',
		data: {poll: "aa"},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			console.log(data)
			var preg = 0;

			for (var i = 0; i < data.length; i++) {
				
				preg = i+1;

				if (data[i]["tipo_resp"] == 1) {
					pregunta_abierta(data[i]["contenido"], preg)
				}

				if (data[i]["tipo_resp"] == 2) {
					pregunta_opcionM(data[i], preg)
				}

				if (data[i]["tipo_resp"] == 3) {
					pregunta_multiS(data[i], preg)
				}

			}

		}
	})

})//ready

function pregunta_abierta(data, preg){

	$('#main').append('<div id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
						  '<h4>Pregunta '+preg+'</h4>'+
						  '<label id="contenido_'+preg+'"></label>'+
						  '<br><br>'+
						  '<input type="text" name="" id="respuesta">'+
					  '</div>'+
					  '<br><br>')

	$('#contenido_'+preg).html(data);

}

function pregunta_opcionM(data, preg){

	var html_head = '<div id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
					  '<h4>Pregunta '+preg+'</h4>'+
					  '<label id="contenido_'+preg+'"></label>'+
					  '<br><br>';

	var radios = "";
	var respuestas = "";

	for (var i = 1; i <= data["cuantas_respuestas"]; i++) {

		respuestas = data["respuestas"].split(",")
		radios = radios+'<input type="radio" name="respuestas" value="'+respuestas[(i-1)]+'">'+respuestas[(i-1)]+'&nbsp;&nbsp;&nbsp;';

	}

	var html_foot = '</div>'+
					  '<br><br>';

	$('#main').append(html_head+radios+html_foot)

	$('#contenido_'+preg).html(data["contenido"]);
}

function pregunta_multiS(data, preg){

	var html_head = '<div id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
					  '<h4>Pregunta '+preg+'</h4>'+
					  '<label id="contenido_'+preg+'"></label>'+
					  '<br><br>';

	var checks = "";
	var respuestas = "";

	for (var i = 1; i <= data["cuantas_respuestas"]; i++) {

		respuestas = data["respuestas"].split(",")
		checks = checks+'<input type="checkbox" name="respuestas" value="'+respuestas[(i-1)]+'">'+respuestas[(i-1)]+'&nbsp;&nbsp;&nbsp;';

	}

	var html_foot = '</div>'+
					  '<br><br>';

	$('#main').append(html_head+checks+html_foot)

	$('#contenido_'+preg).html(data["contenido"]);
}