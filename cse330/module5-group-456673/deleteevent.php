<?php
  require 'database.php';
  ini_set("session.cookie_httponly", 1);
  session_start();

  // get event info from request
  header("Content-Type: application/json");
  $event_id = $_POST['event_id'];
  $token = $_POST['token'];
  $username = $_SESSION['user'];

  // check for proper token
  if($token != $_SESSION['token']) {
    exit;
  }

  // prep and execute delete statement based on id AND username
  $stmt = $mysqli->prepare('delete from events where event_id = ? AND username=?');
  $stmt->bind_param('ss',$event_id, $username);
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Error adding post. Please try again."
    ));
    exit;
  }
  $stmt->execute();

  //finish script, communicate success
  echo json_encode(array(
    "success" => true,
  ));
?>
