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
  <link href='//fonts.gstatic.com/s/raleway/v9/xkvoNo9fC8O2RDydKj12bwzyDMXhdD8sAj6OAJTFsBI.woff2' rel='stylesheet' type='text/css'>
<body>

<!-- 	<nav class="primary">
		<div class="container">
		    <ul>
		        <li><a style="color: #222" class="navbar-link" id="make_poll" href="#">Nueva encuesta</a></li>
		        <li><a style="color: #222" class="navbar-link" id="edit_poll" href="#">Editar encuesta</a></li>
		        <li><a style="color: #222" class="navbar-link" href="logout.php">Cerrar Sesion</a></li>
		    </ul>
		</div>
	</nav> -->
	<div class="navbar-container">
		<nav class="primary">
			<div class="container">
			    <ul class="navbar-list">
			        <li class="navbar-item" ><a class="navbar-link" id="make_poll" href="#">Nueva encuesta</a></li>
			        <li class="navbar-item" ><a class="navbar-link" id="edit_poll" href="#">Editar encuesta</a></li>
			        <li class="navbar-item" ><a class="navbar-link" href="logout.php">Cerrar Sesion</a></li>
			    </ul>
			</div>
		</nav>
	</div>
	

	<div class="container">

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
	</div>

	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/static-nav.js"></script>
	<script src="js/panel.js"></script>
</body>
</html>