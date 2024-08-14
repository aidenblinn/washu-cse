<?php
  require 'database.php';
  ini_set("session.cookie_httponly", 1);
  session_start();

  //gather info from AJAX request and session
  header("Content-Type: application/json");
  $title = $_POST['title'];
  $year = $_POST['year'];
  $month = $_POST['month'];
  $day = $_POST['day'];
  $time = $_POST['time'];
  $username = $_SESSION['user'];
  $token = $_POST['token'];
  $tag = $_POST['tag'];

  //check for legit token
  if($token != $_SESSION['token']) {
    exit;
  }

  //prep and execute insertion statement into events table in the database using user input
  $stmt = $mysqli->prepare('insert into events (username,title,day,month,year,time,tag) values (?,?,?,?,?,?,?)');
  $stmt->bind_param('sssssss',$username,$title,$day,$month,$year,$time,$tag);
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Error adding post. Please try again."
    ));
    exit;
  }
  $stmt->execute();
  //communicate successful insertion
  echo json_encode(array(
    "success" => true,
  ));
?>
