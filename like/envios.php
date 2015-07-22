<?php  

require('../mysql.php');
$main = new mysql();


$consult = "SELECT * FROM colonias LIMIT 10";

echo json_encode($main->query_assoc($consult));

?>