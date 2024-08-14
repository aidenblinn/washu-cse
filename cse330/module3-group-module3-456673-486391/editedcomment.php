<?php
    require 'database.php';
    // check token
    session_start();
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // get new comment text
    $comment_id = (int) $_POST['comment_id'];
    $newtext = (string) $_POST['comment'];

    // update text of comment using new value
    $stmt = $mysqli->prepare('UPDATE comments SET text= "' . $newtext . '" WHERE comment_id =' . $comment_id);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    
    $stmt->execute();

    // redirect to feed
    header('Location: feed.php');
?>