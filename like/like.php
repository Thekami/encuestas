<?php  

require('../mysql.php');
$main = new mysql();

$txt = $_POST["txt"];

$consult = "SELECT * FROM colonias WHERE nomAsen LIKE '%$txt%' OR nomLoc LIKE '%$txt%' LIMIT 10";

echo json_encode($main->query_assoc($consult));

?>