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
		<!-- <div class="row">
			<form action="">
				<div class="six columns">
					<label for="">Holq</label>
						<input class="u-full-width" type="text">
				</div>
				<div class="six columns">
					<label for="">Holq</label>
						<input class="u-full-width" type="text">
				</div>
			</form>
		</div> -->
		<!-- ============ Seccion para editar  ================= -->

		<div id="div_edit" class="row">

			<div class="six columns">
				<select name="" class="u-full-width" id="select_poll"></select>
			</div>
			<div class="six columns">
				<select name="" class="u-full-width" id="select_quest">
					<option value="0" selected disabled>Selecione una encuesta</option>
				</select>
			</div>

		</div>
		

		<!-- ============ Seccion para crear nueva encuesta  ================= -->

		<div id="div_create"></div>
		
		

		<!-- ============ Seccion para ver la encuesta a editar  ================= -->

		<div id="div_show_edit"></div>


		<!-- ============ Seccion para mostrar la opcion de "crear nueva pregunta"  ================= -->

		<div id="div_btn_new_quest">
			
			<div class="row">
				<form action="">
					<div class="six columns">
						<label for=""> Nueva pregunta</label>
						<input class="button-primary" value="Crear" id="new_quest" type="submit">
					</div>
				</form>
			</div>

		</div>

		<!-- ============ Seccion para mostrar la opcion de guardar la encuesta  ================= -->

		<div id="div_btn_send_poll">
			
			<div class="row">
				<form action="">
					<div class="six columns">
						<label for=""> Enviar encuesta </label>
						<input class="button-primary" value="Enviar" id="send_poll" type="submit">
					</div>
				</form>
			</div>


		</div>

		<!-- ============ Seccion para mostrar la url de la encuesta creada  ================= -->

		<div id="div_show_url" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
			

		</div>
	</div>

	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/static-nav.js"></script>
	<script src="js/panel.js"></script>
</body>
</html>