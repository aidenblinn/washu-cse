<?php
session_start();
$username = $_SESSION["user"];
$filename = strval($_GET["filename"]);

//get file path of file to be deleted and delete it
$full_path = sprintf("/home/trevorperez10/%s/%s", $username, $filename);
if (!unlink($full_path)) {  
    echo (htmlentities($filename) . " cannot be deleted");  
}  
else {  
    echo (htmlentities($filename) . " has been deleted");  
}
?>
<p>Click the button below to return to your file list...</p>
 <form action="filesharing.php?user=<?php echo htmlentities($username)?>" method = "POST">
    <input type="submit" value="return to list">
</form>

<style>
    html * {
        color: green;
        font-family: monospace;
    }
</style>