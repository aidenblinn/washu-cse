<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Edit comment</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <body>
    <div class="container">
    <?php
        session_start();
        // check token
        if (!hash_equals($_SESSION['token'], $_POST['token'])) {
            die("Request forgery detected");
        }

        // get info of comment to be edited
        $comment_id = (int) $_POST['comment_id'];
        $text = (string) $_POST['text'];
        $token=$_SESSION['token'];

        // form that allows user to edit comment and submit change
        echo(
            '<form action="editedcomment.php" method="post">
                <input type="hidden" name="token" value="' . $token . '"/>
                <input type="text" name="comment" value="' . htmlentities($text) . '">
                <input type="hidden" name="comment_id" value="' . $comment_id . '">
                <input type="submit" value="submit edit">
            </form>'
        );
    ?>
    </div>
  </body>
</html>