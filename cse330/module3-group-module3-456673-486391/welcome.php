<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>
    <?php
      session_start();
      $_SESSION['token'] = bin2hex(random_bytes(32));
    ?>
    <div class="container">

      <!-- form for login page -->
      <form action="login.php" method="post">
        <label for="username">Username:
            <input type="text" name="user" id="username"/>
        </label>
        <br>
        <label for="password">Password:
            <input type="text" name="pass" id="password">
        </label>
        <br>
        <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
        <input type="submit" value="Log in">
      </form>
      <br>

      <!-- account creation form -->
      <form action="makeaccount.php">
        <input type="submit" name="create" id="create" value="Create account">
      </form>

      <!-- go to feed without logging in -->
      <form action="feed.php">
        <input type="submit" value="Continue without logging in">
      </form>
    </div>
  </body>
</html>