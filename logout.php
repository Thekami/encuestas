<?php 
session_start();
require('resources/MainClass.php');
$main = new MainClass();

if($main->destroy()){
	Header('Location: index.php');
}


 ?>