<?php
    require 'database.php';
    // check token
    session_start();
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // id of post to be deleted
    $post_id = (int) $_POST['post_id'];

    // delete likes and comments associated with post to resolve foreign key issues
    $stmt = $mysqli->prepare('DELETE FROM likes WHERE post_id =' . $post_id);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();

    $stmt = $mysqli->prepare('DELETE FROM comments WHERE post_id =' . $post_id);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    
    // delete post itself
    $stmt = $mysqli->prepare('DELETE FROM posts WHERE post_id =' . $post_id);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();

    // redirect to feed
    header('Location: feed.php');
?>