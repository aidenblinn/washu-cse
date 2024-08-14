<?php
    session_start();
    // check token, end session, go back to welcome page
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }
    $_SESSION['loggedin'] = false;
    session_destroy();
    header('Location: welcome.php');
?>