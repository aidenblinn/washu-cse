<?php
session_start();
$username = $_SESSION["user"];
$filename = strval($_GET["filename"]);

//check for valid filename and username
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo "Invalid filename";
	exit;
}

if( !preg_match('/^[\w_\-]+$/', $username) ){
	echo "Invalid username";
	exit;
}

//get file path and file type to display correctly
$full_path = sprintf("/home/trevorperez10/%s/%s", $username, $filename);

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($full_path);

//read file, taking into account file type
header("Content-Type: ".$mime);
header('content-disposition: inline; filename="'.$filename.'";');
readfile($full_path);

?>