<?php
session_start();
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
$username = $_SESSION["user"];
$friend = $_GET["friend"];
$message = (string) $_GET["message"];

//check for valid username

if( !preg_match('/^[\w_\-]+$/', $username) ){
	echo "Invalid username";
	exit;
}

if ($username == $friend) {
    echo "You can't send a file to yourself!";
    exit;
}

//create file path for message and save to friend's folder

$messagename = "messagefrom" . $username . ".txt";
$full_path_message = sprintf("/home/trevorperez10/%s/%s", $friend, $messagename);
$sendfile = fopen($full_path_message, "w+");
fwrite($sendfile, htmlentities($message));
fclose($sendfile);

?>


<p>Success! Click the button below to return to your file list...</p>
 <form action="filesharing.php?user=<?php echo $username?>" method = "POST">
    <input type="submit" value="return to list">
</form>
<style>
    html * {
        color: green;
        font-family: monospace;
    }
</style>