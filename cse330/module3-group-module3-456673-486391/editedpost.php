<?php
    require 'database.php';
    // check token
    session_start();
    if (!hash_equals($_SESSION['token'], $_POST['token'])) {
        die("Request forgery detected");
    }

    // get edits for post fields
    $post_id = (int) $_POST['post_id'];
    $link = (string) $_POST['link'];
    $title = (string) $_POST['title'];
    $body = (string) $_POST['body'];

    // prepare and execute statement to update post
    $stmt = $mysqli->prepare('UPDATE posts SET title= "' . $title . '", link= "' . $link . '", body= "' . $body . '" WHERE post_id =' . $post_id);

    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    
    $stmt->execute();

    // redirect to feed
    header('Location: feed.php');
