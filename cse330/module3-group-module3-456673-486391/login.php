<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Login</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>
  <div class="container">
  <?php
        require 'database.php';
        session_start();

        // check token
        if (!hash_equals($_SESSION['token'], $_POST['token'])) {
          exit;
          ("Request forgery detected");
        }

        // get login info, look for account username
        $user = (string) $_POST['user'];
        $pass_attempt = (string) $_POST['pass'];

        $stmt = $mysqli->prepare("select username from accounts where username='$user'");
        $stmt->execute();
        $account=$stmt->get_result();

        // login fail if user invalid
        if (mysqli_num_rows($account) == 0) {
            echo("Invalid username");
            echo('<br>
            <form action="welcome.php">
            <input type="submit" value="Return to login page">
            </form>');
            exit;
        }

        // otherwise, get password attempt hash
        $stmt1 = $mysqli->prepare('select hash from accounts where username=?');
        $stmt1->bind_param('s', $user);

        $stmt1->execute();
        $stmt1->bind_result($hash);
        $stmt1->fetch();

        // compare to real hash, start session / log in if same
        if (password_verify($pass_attempt, $hash)) {
            session_start();
            $_SESSION['user'] = $user;
            $_SESSION['loggedin'] = true;
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
            header('Location: feed.php');
        }

        // return to login if password wrong
        else {
            echo('Login attempt failed');
            echo('<br>
            <form action="welcome.php">
            <input type="submit" value="Return to login page">
            </form>');
        }
    ?>
  </div>
    </div>
  </body>
</html>
