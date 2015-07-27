<?php 

	require('mysql.php');

	//Se instancia la clase en la variable $main
	$main = new mysql();

	$data = $_POST["data"];

	
	$respuestas_es = "";
	$poll = $data["name_poll"];
	$contenido = $data["contenido"];
	$nuevo_contenido = $data["new_contenido"];
	$cuantas_respuestas = $data["cuantas_respuestas"];
	$tipo_resp = $data["tipo_resp"];
	$respuestas = $data["respuestas"];

	for ($j=0; $j < count($respuestas); $j++) { 
		if ($respuestas_es == "") {
			$respuestas_es = $respuestas_es.$respuestas[$j];
		}else{
			$respuestas_es = $respuestas_es.",".$respuestas[$j];
		}
	}

	$consult = "UPDATE encuestas SET `contenido` = '$nuevo_contenido',
									 `cuantas_respuestas` = '$cuantas_respuestas',
									 `tipo_resp` = '$tipo_resp',
									 `respuestas` = '$respuestas_es'
								WHERE `poll` = '$poll' AND `contenido` = '$contenido'";
	
	if ($main->query($consult)) {
		$response = true;
	}else{
		$response = false;
	}

	echo $response;

	//echo $consult;




//echo var_dump($data);
//echo $data[0]["respuestas"];
//echo var_dump($data[0]["respuestas"]);

?>