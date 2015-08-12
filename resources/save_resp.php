<?php 

require('mysql.php');
$main = new mysql();

$data = $_POST["data"];


//base64_decode($data[])

$consult = "UPDATE encuestas SET poll = '".base64_decode($data["poll"])."' 
								 contenido = '".base64_decode($data["resp"][0])."' 
								 cuantas_respuestas = '".base64_decode($data["resp"][1])."'
								 tipo_resp = '".base64_decode($data["resp"][2])."'
								 respuestas = '".base64_decode($data["resp"][3])."'
								 WHERE id = 1";

$res = $main->query($consult);

echo json_encode($res);



?>