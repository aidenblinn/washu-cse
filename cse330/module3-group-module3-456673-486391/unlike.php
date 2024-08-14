<?php
    require 'database.php';
    session_start();

    // token check
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // get info from unlike form
    $post_id = (int) $_POST['post_id'];
    $user = $_SESSION['user'];

    // remove from likes table
    $stmt = $mysqli->prepare('DELETE FROM likes WHERE username =? AND post_id =?');
    $stmt->bind_param('si',$user,$post_id);

    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();

    header('Location: feed.php');
?>