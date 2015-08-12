<?php 
session_start();

require('MainClass.php');
$main = new MainClass();

$action = $_POST['action'];


switch ($action) {

	case 'login':
		$main->login($_POST['user'], $_POST['password']);
		break;
// Llamados a las funciones del módulo de editar
	case 'data_edit':
		$main->data_edit();
		break;

	case 'edit':
		$main->edit($_POST["data"]);
		break;

	case 'get_info_quest':
		$main->get_info_quest($_POST["poll"], $_POST["quest"]);
		break;

	case 'get_quest':
		$main->get_quest($_POST['poll']);
		break;
// LLamado a las funciones para guardar nuevas preguntas de una nueva encuesta
	case 'save':
		$main->save($_POST["data"], $_SESSION["id"]);
		break;

	case 'check_poll':
		$main->check_poll($_POST["poll"]);
		break;
// Llamado a la funcion para guardar las respuestas de cada encuesta
	case 'save_resp':
		$main->save_resp($_POST["data"]);
		break;
// Lammado a la funcion para decodificar la informacion de la url en el archivo ver.php
	case 'get_data':
		$main->get_data($_POST["poll"]);
		break;
	
}

 ?>