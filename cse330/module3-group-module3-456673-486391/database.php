<?php
$mysqli = new mysqli('localhost', 'php', '', 'newswebsite');
    if($mysqli->connect_errno) {
        printf("Connection Failed: %s\n", $mysqli->connect_error);
        exit;
    }
?>