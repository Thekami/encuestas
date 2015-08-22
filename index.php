<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Login</title>
</head>

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">

  <style>
  body{
	background-color: #F8F8F8;
  	}
  </style>

<body>

	<div class="login">

		<!-- <h1>Encuestas código joven</h1> -->
		
		<!-- <div class="row" style=""> -->
			
			<div>

				<form class="form-login" action="">
					<div class="form-login-head">
						<h3>Inicio de Sesion</h3>
					</div>

					<div class="form-login-body">
						<input type="text" placeholder="Usuario" id="txt_user">
						<input type="password" placeholder="Contraseña" id="txt_pass">
						<input type="submit" value="Enviar" class="button-primary" id="btn_login">
					</div>
					
					<p id="msgText"></p>
				</form>

			</div>

		<!-- </div> -->

	</div>

	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/index.js"></script>

</body>
</html>