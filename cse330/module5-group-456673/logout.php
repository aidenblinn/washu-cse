<?php
  ini_set("session.cookie_httponly", 1);
  session_start();
  $_SESSION['token'] = null;
  session_destroy();
  exit;
?>
