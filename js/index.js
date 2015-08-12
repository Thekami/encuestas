$(document).on('click', '#btn_login', function(event){
	event.preventDefault();
	var user =$('#txt_user').val();
	var password =$('#txt_pass').val();

	$.ajax({
		url:'resources/Ajax.php',
		type:'post',
		data: {user: user, password: password, action: "login"},
		dataType:'json',
		success: function(loggedIn){
			//alert(loggedIn);   // <-- eso se descomenta para mandar el alert con una password hasheada
			if(loggedIn){
				//Redirect a la parte de /hidden
				window.location = 'panel.php';
			}
			else{
				//Limpia el campo de texto de la contraseña
				$('#password').val("");
				//Carga el texto de la alerta
				$('#msgText').text("Datos incorrectos, vuelve a intentarlo.");
				//Muestra la alerta
				//$('#loginMsg').slideDown(400);
				$('#msgText').css({
					"background":"#f2dede",
					"color":"#a94850",
					"display":"block",	
				});
					
			}
		}
	});

})