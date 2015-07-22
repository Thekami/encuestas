<?php 

require('mysql.php');

//Se instancia la clase en la variable $main
$main = new mysql();

$data = $_POST["data"];


for ($i=0; $i < count($data); $i++) { 
	
	$respuestas_es = "";
	$poll = $data[$i]["name_poll"];
	$contenido = $data[$i]["contenido"];
	$cuantas_respuestas = $data[$i]["cuantas_respuestas"];
	$tipo_resp = $data[$i]["tipo_resp"];
	$respuestas = $data[$i]["respuestas"];

	for ($j=0; $j < count($respuestas); $j++) { 
		if ($respuestas_es == "") {
			$respuestas_es = $respuestas_es.$respuestas[$j];
		}else{
			$respuestas_es = $respuestas_es.",".$respuestas[$j];
		}
	}

	$consult = "INSERT INTO encuestas (`poll`, `contenido`, `cuantas_respuestas`, `tipo_resp`, `respuestas`)
						   	   VALUES ('$poll', '$contenido', '$cuantas_respuestas', '$tipo_resp', '$respuestas_es')";

	if ($main->query($consult)) {
		$response = true;
	}else{
		$response = false;
	}

	echo $response;


}


//echo var_dump($data);
//echo $data[0]["respuestas"];
//echo var_dump($data[0]["respuestas"]);

?>