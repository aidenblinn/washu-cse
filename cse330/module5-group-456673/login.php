<?php
    require 'database.php';
    ini_set("session.cookie_httponly", 1);
    session_start();

    //get user info from input field, prep statement using that info
    header("Content-Type: application/json");
    $user = $_POST['user'];
    $pass_attempt = $_POST['pass'];

    $stmt = $mysqli->prepare("select username from accounts where username='$user'");
    $stmt->execute();
    $account=$stmt->get_result();

    //login fail if user invalid
    if (mysqli_num_rows($account) == 0) {
      echo json_encode(array(
        "success" => false,
        "message" => "Invalid user"
      ));
      exit;
    }

    //otherwise, get password attempt hash
    $stmt1 = $mysqli->prepare('select hash from accounts where username=?');
    $stmt1->bind_param('s', $user);

    $stmt1->execute();
    $stmt1->bind_result($hash);
    $stmt1->fetch();

    //compare to real hash, start session / log in if same
    if (password_verify($pass_attempt, $hash)) {
        session_start();
        $_SESSION['token'] = bin2hex(random_bytes(32));
        $_SESSION['user'] = $user;
        $_SESSION['loggedin'] = true;
        echo json_encode(array(
          "success" => true,
          "message" => "Login successful"
        ));
        exit;
    }

    //return to login if password wrong
    else {
      echo json_encode(array(
        "success" => false,
        "message" => "Password incorrect",
      ));
      exit;
    }
?>
