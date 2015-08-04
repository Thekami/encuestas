var respuestas = {"user": "", "poll": "", "resp": []};

var poll;

$('document').ready(function(){

//console.log(getGET())
poll = getGET()
//console.log(poll["src"])

	$.ajax({
		url:'get_data.php',
		type:'post',
		data: {poll: poll["src"]},
		dataType:'json',
		error: function(error){
			//console.log("error")
		},
		success: function(data){
			//console.log(data)
			var preg = 0;

			$('#main').append('<form id="form_poll"></form>')

			for (var i = 0; i < data.length; i++) {
				
				preg = i+1;

				if (data[i]["tipo_resp"] == 1) {
					pregunta_abierta(data[i]["contenido"], preg, data.length)
				}

				if (data[i]["tipo_resp"] == 2) {
					pregunta_opcionM(data[i], preg, data.length)
				}

				if (data[i]["tipo_resp"] == 3) {
					pregunta_multiS(data[i], preg, data.length)
				}

				if (data[i]["tipo_resp"] == 4) {
					pregunta_select(data[i], preg, data.length)
				}

			}

		}
	})



})//ready

function getGET(){
   var loc = document.location.href;
   var getString = loc.split('?')[1];
   var GET = getString.split('&');
   var get = {};//this object will be filled with the key-value pairs and returned.

   for(var i = 0, l = GET.length; i < l; i++){
      var tmp = GET[i].split('=');
      get[tmp[0]] = unescape(decodeURI(tmp[1]));
   }
   return get;
}

function pregunta_abierta(data, preg, length){

	$('#form_poll').append('<div class="div_preg" id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
						  '<h4>Pregunta '+preg+'</h4>'+
						  '<label id="contenido_'+preg+'">'+data+'</label>'+
						  '<br><br>'+
						  '<input type="text" name="" id="respuesta">'+
					  '</div>'+
					  '<br><br>')

	//$('#contenido_'+preg).html(data);

	if (preg == length)
		$('#form_poll').append('<input type="submit" id="btn_guardar" class="'+data["poll"]+'" value="Guardar">')

}

function pregunta_opcionM(data, preg, length){

	var html_head = '<div class="div_preg" id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
					  '<h4>Pregunta '+preg+'</h4>'+
					  '<label id="contenido_'+preg+'">'+data["contenido"]+'</label>'+
					  '<br><br>';

	var radios = "";
	var respuestas = "";

	for (var i = 1; i <= data["cuantas_respuestas"]; i++) {

		respuestas = data["respuestas"].split(",")
		radios = radios+'<input type="radio" name="respuestas" value="'+respuestas[(i-1)]+'">'+respuestas[(i-1)]+'&nbsp;&nbsp;&nbsp;';

	}

	var html_foot = '</div>'+
					  '<br><br>';

	$('#form_poll').append(html_head+radios+html_foot)

	if (preg == length)
		$('#form_poll').append('<input type="submit" id="btn_guardar" class="'+data["poll"]+'" value="Guardar">')

}

function pregunta_multiS(data, preg, length){

	var html_head = '<div class="div_preg" id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
					  '<h4>Pregunta '+preg+'</h4>'+
					  '<label id="contenido_'+preg+'">'+data["contenido"]+'</label>'+
					  '<br><br>';

	var checks = "";
	var respuestas = "";

	for (var i = 1; i <= data["cuantas_respuestas"]; i++) {

		respuestas = data["respuestas"].split(",")
		checks = checks+'<input type="checkbox" name="respuestas" value="'+respuestas[(i-1)]+'">'+respuestas[(i-1)]+'&nbsp;&nbsp;&nbsp;';

	}

	var html_foot = '</div>'+
					  '<br><br>';

	$('#form_poll').append(html_head+checks+html_foot)

	if (preg == length)
		$('#form_poll').append('<input type="submit" id="btn_guardar" class="'+data["poll"]+'" value="Guardar">')

}


function pregunta_select(data, preg, length){

	$('#form_poll').append('<div class="div_preg" id="preg_'+preg+' style="padding: 1% 3%; margin: 1% 0% 2% 0%"">'+
					  '<h4>Pregunta '+preg+'</h4>'+
					  '<label id="contenido_'+preg+'">'+data["contenido"]+'</label>'+
					  '<br><br>'+
					  '<select id="select_'+preg+'">'+
					  	'<option value="0" selected disabled>Seleccione una opcion</option>'+
		  			  '</select>'+
					'</div>'+
					'<br><br>')

	var respuestas = "";

	//console.log(data["cuantas_respuestas"])

	for (var i = 1; i <= data["cuantas_respuestas"]; i++) {

		respuestas = data["respuestas"].split(",")
		$('#select_'+preg).append('<option value="'+respuestas[(i-1)]+'">'+respuestas[(i-1)]+'</option>')
	
	}

	if (preg == length)
		$('#form_poll').append('<input type="submit" id="btn_guardar" class="'+data["poll"]+'" value="Guardar">')

}


$(document).on('click', '#btn_guardar', function(e){
	e.preventDefault();

	var x = $('#form_poll').find('.div_preg');
	console.log(x.length)

	respuestas.user = "nada";
	respuestas.poll = poll["src"];

	//console.log(respuestas.user);
	//console.log(respuestas.poll);


		for (var i = 0; i < x.length; i++) {
			respuestas.resp.push(x[i].childNodes[4].value)
			console.log(x[i].childNodes[4].value)			
		};

		
		//console.log(x)
		//console.log(x[0].childNodes[0])
		//console.log(x[0].childNodes[0].innerHTML)
})