<?php 

	class mysql{

		var $dbCon;

		function __construct(){
			$this->conect();
		}

		public function conect(){
			// $this->dbCon = new mysqli('redcj.db.8957254.hostedresource.com', 'redcj', 'F04d@2075117', 'redcj');
			$this->dbCon = new mysqli('localhost', 'root', 'toortoor', 'encuestas');
			$this->dbCon->set_charset("utf8");
			if(!$this->dbCon)
				echo $this->show_error();

			// $this->dbCon->autocommit(false);
		}

		public function query($consult){
			$query = $this->dbCon->query($consult);
			if(!$query){
				$this->show_error();
			}
			else{
				return $query;
			}
		}

		public function next_result(){
			$this->dbCon->next_result();
		}

		private function show_error(){
			return $this->dbCon->connect_error;
		}

		public function query_assoc($consult){
			$vec = array();
			if($result = $this->query($consult)){
				while($fila = $result->fetch_assoc()){ $vec[] = $fila; }
			}
			return $vec;
		}

		public function query_row($consult){
			$vec = array();
			if($result = $this->query($consult)){
				while($fila = $result->fetch_row()){ $vec[] = $fila; }
			}
			return $vec;
		}
		
		public function exit_conect(){
			mysqli_close($this->dbCon);
		}

		public function destroy(){
			session_destroy();
			header("Location: /index.php");
			// header("Location: /angel/rutas");
		}

		public function obtenerId(){
			return $this->dbCon->insert_id;
		}

	 
	}
?>