<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Make acccount</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>
    <?php
      session_start();
      $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    ?>
    
    <!-- form to submit account details -->
    <div class="container">
      <form action="accountmade.php" method="post">
        <label for="username">Username:
          <input type="text" name="user" id="username"/>
        </label>
        <br>
        <label for="password">Password:
          <input type="text" name="pass" id="password">
        </label>
        <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>">
        <input type="submit">
      </form>
    </div>
  </body>
</html>