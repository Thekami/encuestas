<?php 

	$poll = $_GET["src"]; 

	$data = base64_decode($poll);

	$data = split('c0d1g0j0v3n', $data);

	$poll = $data[1];

	//$poll = $main->get_data($poll);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> Encuesta: <?php  echo $poll;?></title>
</head>
<body>

	<div id="main" style="border: solid 1px; padding: 1% 3%; margin: 1% 0% 2% 0%">
							
	</div>
	
	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/ver.js"></script>
	<script src="js/base64js.js"></script>
</body>
</html>
