$('document').ready(function(){

//console.log(getGET())
poll = getGET()
//console.log(poll["src"])

	$.ajax({
		url:'resources/Ajax.php',
		type:'post',
		data: {poll: poll["src"], action: "get_data"},
		dataType:'json',
		error: function(error){
			console.log("error")
		},
		success: function(data){
			console.log(data)
			var preg = 0;

			$('#main').append('<label>Nombre</label>&nbsp<input id="txt_nombre" type="text" placeholder="Nombre">')
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