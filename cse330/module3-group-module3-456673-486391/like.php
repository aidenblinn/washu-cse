<?php
    require 'database.php';
    session_start();
    // check token
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // get info from liked post, add like to likes table in database
    $post_id = (int) $_POST['post_id'];
    $user = $_SESSION['user'];
    $stmt = $mysqli->prepare('INSERT INTO likes (post_id, username) VALUES (?,?)');
    $stmt->bind_param('is',$post_id,$user);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();

    // redirect to feed
    header('Location: feed.php');
?>