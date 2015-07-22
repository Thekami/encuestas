<?php  

require('../mysql.php');
$main = new mysql();


$con = "SELECT COUNT(*) FROM colonias";

$count = $main->query_assoc($con);

$Npags = $count[0]["COUNT(*)"]/10;
$Npags = round($Npags);
$Npags = $Npags + 1;
$Npags = array('Npags' => $Npags);

$num = $_POST["num"];

if ($num != 0) 
	$num--;

$num = $num * 10;

$consult = "SELECT * FROM colonias LIMIT $num, 10";


$res = $main->query_assoc($consult);

array_push($res, $Npags);
echo json_encode($res);
//echo json_encode($count);

?>