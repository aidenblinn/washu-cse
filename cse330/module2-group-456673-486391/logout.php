<?php
session_start();
$username = $_SESSION["user"];
//end session to log out user
sessiondestroy();
echo htmlentities($username) . " has been successfully logged out."
?>