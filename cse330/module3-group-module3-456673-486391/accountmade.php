<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Making account</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>
    <div class="container">
    <?php
        require 'database.php';
        session_start();
        // check token
        if (!hash_equals($_SESSION['token'], $_POST['token'])) {
            die("Request forgery detected");
        }

        // store new account info
        $user = (string) $_POST['user'];
        $password = (string) $_POST['pass'];
        
        // make sure username isn't already taken
        $stmt=$mysqli->prepare("select * from accounts where username='$user'");
        if (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $existing=$stmt->get_result();

        //return to login page if duplicate
        if (mysqli_num_rows($existing) > 0) {
            echo("Username already taken.");
            echo('<br>
          <form action="welcome.php">
          <input type="submit" value="Return to login page">
          </form>');
            exit;
        }

        // hash password and put user/hash combo into accounts table
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt1 = $mysqli->prepare("insert into accounts (username,hash) values (?,?)");
        if (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $stmt1->bind_param('ss', $user, $hash);
        $stmt1->execute();
        $stmt1->close();

        // start session with new user, continue to feed
        session_start();
        $_SESSION['user'] = $user;
        $_SESSION['loggedin'] = true;

        echo(
          '<p>Account made</p>
          <form action="feed.php">
              <input type="submit" value="Continue to feed">
          </form>'
        );
    ?>
    </div>
  </body>
</html>
