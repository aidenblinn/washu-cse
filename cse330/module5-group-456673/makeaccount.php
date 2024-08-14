<?php
    require 'database.php';
    ini_set("session.cookie_httponly", 1);
    session_start();

    header("Content-Type: application/json");
    $user = $_POST['user'];
    $password = $_POST['pass'];

    //make sure username isn't already taken
    $stmt=$mysqli->prepare("select * from accounts where username='$user'");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();
    $existing=$stmt->get_result();

    //return to login page if duplicate
    if (mysqli_num_rows($existing) > 0) {
      echo json_encode(array(
        "success" => false,
        "message" => "User already exists"
      ));
      exit;
    }

    //hash password and put user/hash combo into accounts table
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt1 = $mysqli->prepare("insert into accounts (username,hash) values (?,?)");
    if (!$stmt) {
      echo json_encode(array(
        "success" => false,
        "message" => "Error creating account"
      ));
      exit;
    }

    $stmt1->bind_param('ss', $user, $hash);
    $stmt1->execute();
    $stmt1->close();

    //start session with new user, continue to feed
    session_start();
    $_SESSION['user'] = $user;
    $_SESSION['loggedin'] = true;

    echo json_encode(array(
      "success" => true,
      "message" => "Account created",
      "user" => $user
    ));
?>
