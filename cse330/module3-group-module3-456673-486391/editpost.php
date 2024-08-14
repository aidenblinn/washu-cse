<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Edit post</title>
    <link rel="stylesheet" href="generic.css">
  </head>
  <div class="container">
  <?php
        session_start();
        // check token
        if (!hash_equals($_SESSION['token'], $_POST['token'])) {
            die("Request forgery detected");
        }
        $token=$_SESSION['token'];

        // get info about post to be edited
        $post_id = (int) $_POST['post_id'];
        $link = (string) $_POST['link'];
        $title = (string) $_POST['title'];
        $body = (string) $_POST['body'];

        // form to put new title/body/link of post that is being edited
        echo(
            '<form action="editedpost.php" method="post">
                <input type="hidden" name="token" value="' . $token . '"/>
                <input type="hidden" name="post_id" value="' . $post_id . '">
                <label for=title>New title: 
                  <input type="text" id="title" name="title" value="' . htmlentities($title) . '">
                </label>
                <br>
                <label for=body>New body: 
                  <input type="text" id="body" name="body" value="' . htmlentities($body) . '">
                </label>
                <br>
                <label for=link>New link: 
                  <input type="text" id="link" name="link" value="' . htmlentities($link) . '">
                </label>
                <br>
                <input type="submit" value="submit edit">
            </form>'
        );
    ?>
  </body>
  </div>
  <body>
</html>