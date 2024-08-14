<?php
session_start();
$username = $_SESSION["user"];

//check for valid file name and username (special characters)
$filename = basename($_FILES['uploadedfile']['name']);
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo "Invalid filename";
	exit;
}

if( !preg_match('/^[\w_\-]+$/', $username) ){
	echo "Invalid username";
	exit;
}

$full_path = sprintf("/home/trevorperez10/%s/%s", $username, $filename);

//"move" uploaded file to desired folder
if( move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path) ){
	header("Location: filesharing.php?user=" . $username);
	exit;
}else{
	header("Location: upload_failure.html");
	exit;
}
?>

<style>
    html * {
        color: green;
        font-family: monospace;
    }
</style>