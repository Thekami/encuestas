<?php  

require('mysql.php');

//Se instancia la clase en la variable $main
$main = new mysql();

$poll = $_POST["poll"];

$data = base64_decode($poll);

$data = split('c0d1g0j0v3n', $data);

$poll = $data[1];

$consult = "SELECT * FROM encuestas WHERE poll = '$poll'";

$res = $main->query_assoc($consult);

echo json_encode($res);

?>