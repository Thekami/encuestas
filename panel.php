<?php 


    session_start();
    if (!isset($_SESSION["username"]) && !isset($_SESSION["id"])) {

        //redireccion a index en el caso que no se halla iniciado sesion
        Header('Location: landing.php');
    }        

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Crear Encuesta</title>
</head>
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">
<body>
	
	<div id="div_main" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		<!-- <h2>Hola <?php echo $_SESSION["username"]; ?>!</h2> -->
		<a href="logout.php">Cerrar Sesion</a>
	</div>
	
	<div id="div_main" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		<form action="">
			<label for=""> Crear nueva encuesta</label>
			<input type="submit" value="Crear" id="make_poll">
			<label for=""> Editar encuesta</label>
			<input type="submit" value="Editar" id="edit_poll">
		</form>

	</div>

	<div id="div_edit" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		
		<select name="" id="select_poll"></select>

		<select name="" id="select_quest">
			<option value="0" selected disabled>Selecione una encuesta</option>
		</select>

	</div>
	
	<div id="div_create" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		

	</div>

	<div id="div_show_edit" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		

	</div>


	<div id="div_btn_new_quest" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		
		<form action="">
			<label for=""> Nueva pregunta</label>
			<input type="submit" value="Crear" id="new_quest">
		</form>


	</div>

	<div id="div_btn_send_poll" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		
		<form action="">
			<label for=""> Enviar</label>
			<input type="submit" value="Enviar" id="send_poll">
		</form>


	</div>

	<div id="div_show_url" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
		

	</div>
	
	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/panel.js"></script>
</body>
</html>