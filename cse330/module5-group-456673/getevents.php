<?php
  require 'database.php';
  ini_set("session.cookie_httponly", 1);
  session_start();

  //get relevant info for event list
  header("Content-Type: application/json");
  $month = $_POST['month'];
  $year = $_POST['year'];
  $username = $_SESSION['user'];

  //prep and execute statement to get list of events
  $stmt = $mysqli->prepare('select title,day,time,event_id,tag from events where username=? AND month=? AND year=?');
  $stmt->bind_param('sss',$username,$month,$year);
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Error retrieving posts."
    ));
    exit;
  }
  $stmt->execute();
  $stmt->bind_result($title,$day,$time,$event_id,$tag);
  $result = null;
  $results = [];
  //add each event to results array while there are still events to be added
  while ($stmt->fetch()) {
    $result = [$title, $day, $time,$event_id,$tag];
    array_push($results, $result);
  };
  //return events to be inserted into calendar
  echo json_encode(
    $results
  );
?>
