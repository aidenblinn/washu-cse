<?php
  require 'database.php';
  ini_set("session.cookie_httponly", 1);
  session_start();

  //check for legit token
  $token = $_POST['token'];
  if($token != $_SESSION['token']) {
    echo json_encode(array(
      "success" => false,
      "message" => "Error with token."
    ));
    exit;
  }

  //gather post info based on post ID
  $event_id = (int)$_POST['event_id'];
  $stmt = $mysqli->prepare('select title,day,month,year,time,tag from events where event_id=?');
  $stmt->bind_param('i',$event_id);
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Error retrieving posts."
    ));
    exit;
  }
  $stmt->execute();
  $stmt->bind_result($title,$day,$month,$year,$time,$tag);
  while($stmt->fetch()) {
    $result = [$title,$day,$month,$year,$time,$tag];
  }

  //prep and execute insertion statement into events table in the database using user input
  $user = $_SESSION['user'];
  $stmt1 = $mysqli->prepare('SELECT username FROM accounts where not username=?');
  $stmt1->bind_param('s',$user);
  if(!$stmt1){
    echo json_encode(array(
      "success" => false,
      "message" => "Error adding post. Please try again."
    ));
    exit;
  }
  $stmt1->execute();
  $stmt1->bind_result($userlist);
  while ($stmt1->fetch()) {
    $username = $userlist;
    $stmt2 = $mysqli->prepare('insert into events (username,title,day,month,year,time,tag) values (?,?,?,?,?,?,?)');
    // $stmt2->bind_param('sssssss',$username,$result[0],$result[1],$result[2],$result[3],$result[4],$result[5]);
    // if(!$stmt2){
    //   echo json_encode(array(
    //     "success" => false,
    //     "message" => "Error adding post. Please try again."
    //   ));
    //   exit;
    // }
    // $stmt2->execute();
  };
  // header("Content-Type: application/json");
  // //communicate successful insertion
  // echo json_encode(array(
  //   "success" => true,
  // ));
  echo json_encode(array(
    "success" => true,
    "error" => $error,
    "result" => $result,
    "userlist" => $username
  ));
?>
