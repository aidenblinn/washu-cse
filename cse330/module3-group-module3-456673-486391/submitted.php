<?php
    require 'database.php';
    session_start();

    // token check
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // get info from submmission form
    $title = (string) $_POST['title'];
    $body = (string) $_POST['body'];
    $link = (string) $_POST['link'];
    $username = $_SESSION['user'];

    // add to posts table
    $stmt = $mysqli->prepare('insert into posts (title,body,link,username) values (?,?,?,?)');
    $stmt->bind_param('ssss',$title,$body,$link,$username);

    $stmt->execute();

    header('Location: feed.php');
?>