<?php
    require 'database.php';
    session_start();
    // check token
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    //get comment to be deleted, execute statement to delete comment
    $comment_id = (int) $_POST['comment_id'];

    $stmt = $mysqli->prepare('DELETE FROM comments WHERE comment_id =' . $comment_id);
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();

    // redirect to feed
    header('Location: feed.php');
?>