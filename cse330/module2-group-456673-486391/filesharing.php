<?php
session_start();
$_SESSION["user"] = strval($_GET["user"]);
$user = $_SESSION["user"];;
$accounts = file('/home/trevorperez10/users.txt', FILE_IGNORE_NEW_LINES);

//check to see if user entered is valid
if (in_array($user, $accounts))
{
    echo htmlentities($user) . " is logged in <br>" ;
}
else
{
    exit("access denied");
}

//list each file in the user's folder
$directory = "/home/trevorperez10/" . $user;
echo "DIRECTORY: " . htmlentities($directory) . "<br>";
$files = scandir($directory);
$files = array_diff($files, array('.', '..'));
echo "<br>";
foreach($files as $file)
{
    echo ( "<br>" . $file );

}
?>
<style>
    html * {
        color: green;
        font-family: monospace;
    }
</style>
<br>

<!-- read function to view file -->
<p>READ:</p>
<form action="read.php" method="get">
<label for="view">enter a file to view:
    <input type="text" name="filename" id="view"/>
</label>
<input type="submit" value="send">
</form>

<!-- send message to friend -->
<p>SEND:</p>
<form action="send.php" method="get">
<label for="message">enter a message to send to a friend:
    <input type="text" name="message" id="message">
</label>
<label for="aidan">aidan
    <input type="radio" name = "friend" value="aidan" id="aidan">
</label>
<label for="trevor">trevor
    <input type="radio" name = "friend" value="trevor" id="trevor">
</label>
<label for="comp">comp
    <input type="radio" name = "friend" value="comp" id="comp">
</label>
<input type="submit" value="send">
</form>

<!-- delete input file -->
<p>DELETE:</p>
<form action="delete.php" method="get">
<label for="delete">enter a file to delete:
    <input type="text" name="filename" id="delete"/>
</label>
<input type="submit" value="send">
</form>

<!-- upload a new file -->
<p>UPLOAD:</p>
<form enctype="multipart/form-data" action="upload.php" method="POST">
	<p>
		<input type="hidden" name="MAX_FILE_SIZE" value="20000000"/>
		<label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input" />
	</p>
	<p>
		<input type="submit" value="Upload File" />
	</p>
</form>

<!-- log out -->
<p>LOG OUT:</p>
<form action="filesharing.html">
<label for="logout">please log out when finished:</label>
<input type="submit" value="logout">
</form>
