<?php  

require('mysql.php');

//Se instancia la clase en la variable $main
$main = new mysql();

$poll = $_POST["poll"];

$quest = $_POST["quest"];

$consult = "SELECT * FROM encuestas WHERE poll = '$poll' AND contenido = '$quest'";

$res = $main->query_assoc($consult);

echo json_encode($res);

?>