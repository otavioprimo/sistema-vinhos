<?php 
header('Access-Control-Allow-Origin: *');
$target_path = "";

$target_path = $target_path . basename($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
	echo json_encode(array("error" => false,"message"=>"Success to upload image", "fileName" => $target_path));
} else {
	echo json_encode(array("error" => true,"message"=>"Error to upload image", "fileName" => ""));
}
?>