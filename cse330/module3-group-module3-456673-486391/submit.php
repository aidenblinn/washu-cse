<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Submit post</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>

    <div class="container">
      <?php
        session_start();
        // check token
        if(!hash_equals($_SESSION['token'], $_POST['token'])){
          die("Request forgery detected");
        }

        // make sure logged in
        if ($_SESSION['user'] == null) {
          echo('You must log in to post');
          exit;
        }
      ?>

      <!-- form containing various elements of submission -->
      <form action="submitted.php" method="post">
      <label for="title">enter a post title:
        <input type="text" name="title" id="title">
      </label>
      <br>
      <label for="body">enter a post body:
        <input type="text" name="body" id="body">
      </label>
      <br>
      <label for="link">enter a post link (optional):
        <input type="text" name="link" id="link">
      </label>
      <input type="submit" value="post" id="post">
      <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
      </form>
    </div>
  </body>
</html>