<?php  

require('mysql.php');

//Se instancia la clase en la variable $main
$main = new mysql();

$poll = $_POST["poll"];

$consult = "SELECT * FROM encuestas WHERE poll = '$poll'";

$res = $main->query_assoc($consult);

echo json_encode($res);

?>