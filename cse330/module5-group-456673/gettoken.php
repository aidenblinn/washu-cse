<?php
  ini_set("session.cookie_httponly", 1);
  session_start();
  header("Content-Type: application/json");
  echo json_encode(array(
    "token" => $_SESSION['token']
  ));
?>
