<?php  

require('mysql.php');
$main = new mysql();

$consult = "SELECT DISTINCT C.poll FROM encuestas C";

echo json_encode($main->query_assoc($consult));

?>