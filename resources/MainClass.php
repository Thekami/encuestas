<?php 

require('mysql.php');

//$mysql->conect();


Class MainClass extends mysql {


	public function login($user, $password){
		$response = false;

		//$password = "Á(&$8jÑ{u·$^¨ç".$password;
		//$password = hash('sha256',$password);

		$consult = "SELECT iduser FROM users WHERE 
			username = '$user' and password = '$password'";

		$datos = $this->query_assoc($consult);

		if(count($datos)>0){
			//session_start();
			$_SESSION["username"] = $user;
			$_SESSION["iduser"] = $datos[0]['iduser'];
			$response = true;
		}
		echo json_encode($response);
		//echo $consult;
	}


// ==== Funciones para el modulo editar ============================================================

	public function data_edit(){

		$consult = "SELECT DISTINCT C.poll FROM preguntas C";

		echo json_encode($this->query_assoc($consult));
	}

	public function edit($data){

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

		$consult = "UPDATE preguntas SET `contenido` = '$nuevo_contenido',
										 `cuantas_respuestas` = '$cuantas_respuestas',
										 `tipo_resp` = '$tipo_resp',
										 `respuestas` = '$respuestas_es'
									WHERE `poll` = '$poll' AND `contenido` = '$contenido'";
		
		if ($this->query($consult)) {
			$response = true;
		}else{
			$response = false;
		}

		echo $response;

	}


	public function get_info_quest($poll, $quest){
		
		$consult = "SELECT * FROM preguntas WHERE poll = '$poll' AND contenido = '$quest'";

		$res = $this->query_assoc($consult);

		echo json_encode($res);
	}

	public function get_quest($poll){

		$consult = "SELECT contenido FROM preguntas WHERE poll = '$poll'";

		$res = $this->query_assoc($consult);

		echo json_encode($res);
	}


// ======== Funcion para guardar nueva encuesta con sus respectivas preguntas ========================================
	
	public function save($data, $id){
		
		for ($i=0; $i < count($data); $i++) { 
	
			$respuestas_es = "";
			$poll = $data[$i]["name_poll"];
			$contenido = $data[$i]["contenido"];
			$cuantas_respuestas = $data[$i]["cuantas_respuestas"];
			$tipo_resp = $data[$i]["tipo_resp"];
			$respuestas = $data[$i]["respuestas"];
			$no_preg = $data[$i]["no_preg"];

			for ($j=0; $j < count($respuestas); $j++) { 
				if ($respuestas_es == "") {
					$respuestas_es = $respuestas_es.$respuestas[$j];
				}else{
					$respuestas_es = $respuestas_es.",".$respuestas[$j];
				}
			}

			$consult = "INSERT INTO preguntas (`poll`, `contenido`, `cuantas_respuestas`, `tipo_resp`, `respuestas`, `no_pregunta`)
								   	   VALUES ('$poll', '$contenido', '$cuantas_respuestas', '$tipo_resp', '$respuestas_es', '$no_preg')";

			if ($this->query($consult)) {

				$link=utf8_encode($poll);
				$key="c0d1g0j0v3n";
				$link=$key.$link.$key;
				$response=base64_encode($link);

				$consult2 = "INSERT INTO encuestas (`id_usuario`, `nombre_poll`, `url`)
										   VALUES ('$id', '$poll', '$response')";

				$this->query($consult2);

				//$response = true;
			}else{
				$response = false;
			}

			echo $response;


		}

	}

	public function check_poll($poll){

		$consult = "SELECT * FROM encuestas WHERE `nombre_poll` = '$poll'";

		$res = $this->query_assoc($consult);

		if (count($res) > 0) {
			$response = true;
		}else{
			$response = false;
		}

		echo $response;
	}

	public function save_resp($data){
		
		$poll = base64_decode($data["poll"]);

		$poll = split('c0d1g0j0v3n', $poll);

		$poll = $poll[1];

		$user = $data["user"];


		$respuestas = "";

		/*for ($i=0; $i < count($data["resp"]); $i++) { 

			if ($i == (count($data["resp"])-1)) {
				$respuestas = $respuestas.$data["resp"][$i];
			}else{
				$respuestas = $respuestas.$data["resp"][$i].",";
			}
			
	
		}*/

		for ($i=0; $i < count($data["resp"]); $i++) { 

			if ($i == (count($data["resp"])-1)) {
				$respuestas = $respuestas.base64_decode($data["resp"][$i]);
			}else{
				$respuestas = $respuestas.base64_decode($data["resp"][$i]).",";
			}
			
	
		}

		$consult = "INSERT INTO respuestas (`user`, `poll`, `respuestas`)
								VALUES ('$user', '$poll', '$respuestas')";

		if ($this->query($consult)) {
			$response = true;
		}else{
			$response = false;
		}

		echo json_encode($response);
		//echo json_encode($respuestas);


		


	}

	public function get_data($poll){
		
		$data = base64_decode($poll);

		$data = split('c0d1g0j0v3n', $data);

		$poll = $data[1];

		$consult = "SELECT * FROM preguntas WHERE poll = '$poll'";

		$res = $this->query_assoc($consult);

		echo json_encode($res);
	}

	


}

?>