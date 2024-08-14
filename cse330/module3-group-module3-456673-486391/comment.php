<?php
    require 'database.php';
    session_start();
    // check token
    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    // make sure logged in
    if ($_SESSION['user'] == null) {
      echo('You must log in to comment');
      exit;
    }

    // get comment info, execute statement to put in comments table
    $comment = (string) $_POST['comment'];
    $user = $_SESSION['user'];
    $post_id = (int) $_POST['post_id'];

    $stmt = $mysqli->prepare('insert into comments (text,username,post_id) values (?,?,?)');
    $stmt->bind_param('ssi',$comment,$user,$post_id);

    $stmt->execute();

    // return to feed
    header('Location: feed.php');
?>