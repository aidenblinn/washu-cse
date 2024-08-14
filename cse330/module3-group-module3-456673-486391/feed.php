<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Main feed</title>
    <link rel="stylesheet" href="feed.css">
  </head>
  <body>
    <?php
      session_start();
    ?>
    <div id="topbar">
      <!-- top bar with site name, useful buttons to navigate site -->
      <h1 id="sitename">News Website</h1>
      <div id="topbuttons">
        <div class="button">
          <form action="welcome.php">
            <input type="submit" value="log in">
          </form>
        </div>
        <div class="button">
          <form action="submit.php" method="post">
            <input type="submit" value="submit a post">
            <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
          </form>
        </div>
        <div class="button">
          <form action="logout.php" method="post">
            <input type="submit" value="log out">
            <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
          </form>
        </div>
      </div>
    </div>
    <div style="height:80px;">
    </div>

    <?php
        // set login var to be used later, set token for forms
        if(!isset($_SESSION['loggedin'])) {
          $_SESSION['loggedin'] = false;
        }
        $token=$_SESSION['token'];
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
        error_reporting(E_ALL);
        require 'database.php';

        // query posts
        $posts = $mysqli->query("SELECT * FROM posts ORDER BY post_id desc");
        $rowcount = $posts->num_rows;
        $i = 0;

        // while statement to create div for each new post
        while ($post = mysqli_fetch_row($posts)) 
        {
          $postcomments = $mysqli->query("SELECT * FROM comments where post_id = $post[0]");
          $commentnumber = mysqli_num_rows($postcomments);
          echo(
            '<div class=post>
              <div class=header>'
          );

          // add edit/delete functions to post div only if current user = post creator
          if ($_SESSION['loggedin']) {
            if ($post[5] == $_SESSION['user']) {
              echo(
                '<form action="editpost.php" method="post">
                  <input type="submit" value="edit post">
                  <input type="hidden" name="token" value="' . $token . '"/>
                  <input type="hidden" name="post_id" value="' . $post[0] . '">
                  <input type="hidden" name="link" value="' . htmlentities($post[3]) . '">
                  <input type="hidden" name="title" value="' . htmlentities($post[1]) . '">
                  <input type="hidden" name="body" value="' . htmlentities($post[2]) . '">
                </form>
                <form action="deletepost.php" method="post">
                  <input type="hidden" name="token" value="' . $token . '"/>
                  <input type="submit" value="delete post">
                  <input type="hidden" name="post_id" value="' . $post[0] . '">
                </form>'
              );
            };
          };

          // like/unlike button
          if ($_SESSION['loggedin']) {
            // if logged in, see if user has liked post
            if ($_SESSION['user'] != null) {
              $user = $_SESSION['user'];
              $stmt = $mysqli->prepare("select * from likes where username=? AND post_id=?");
              $stmt->bind_param('si',$user,$post[0]);
              $stmt->execute();
              $account=$stmt->get_result();
              // like button if not yet liked
              if (mysqli_num_rows($account) == 0) {
                echo(
                  '<form action="like.php" method="post">
                    <input type="submit" value="like post">
                    <input type="hidden" name="post_id" value="' . $post[0] . '">
                    <input type="hidden" name="token" value="' . $token . '"/>
                  </form>'
                );
              };
              // unlike button if already liked
              if (mysqli_num_rows($account) != 0) {
                echo( 
                  '<form action="unlike.php" method="post">
                    <input type="submit" value="unlike post">
                    <input type="hidden" name="post_id" value="' . $post[0] . '">
                    <input type="hidden" name="token" value="' . $token . '"/>
                  </form>'
                );
              };
            };
          };

          // display number of likes for post, user who submitted post, title, body, and link
          // (basically here's all the important post info)
          $like_query = $mysqli->query("SELECT * FROM likes where post_id = " . $post[0]);
          $likes = mysqli_num_rows($like_query);
          echo(
                '<h3 class=title>' . htmlentities($post[1]) . '</h3>
                <p class=user>submitted by @' . htmlentities($post[5]) . '</p>
              </div>
              <div class="likecount">
                <p>' . $likes . ' like(s)</p>
              </div>
              <hr style="clear:both">
              <div class=content>
                <p class=body>' . htmlentities($post[2]) . '</p>
                <a href="//' . htmlentities($post[3]) . '" class=link>' . htmlentities($post[3]) . '</a>                
              </div>
              <hr>
              <h4>Comments:</h4>
              <div class=comments>'
          );

          // load every comment
          while ($comment = mysqli_fetch_row($postcomments)) {
            echo(
              '<div>
                <p class=commentuser>@' . htmlentities($comment[3]) . '</p>
                <p class=commenttext>' . htmlentities($comment[1]) . '</p>
              </div>'
            );
            // if comment poster = current user, allow edit / delete functions
            if ($_SESSION['loggedin']) {
              if ($comment[3] == $_SESSION['user']) {
                echo(
                  '
                  <form action="editcomment.php" method="post">
                  <input type="submit" value="edit comment">
                  <input type="hidden" name="comment_id" value="' . $comment[2] . '">
                  <input type="hidden" name="text" value="' . htmlentities($comment[1]) . '">
                  <input type="hidden" name="token" value="' . $token . '"/>
                  </form>
                  <form action="deletecomment.php" method="post">
                  <input type="submit" value="delete comment">
                  <input type="hidden" name="comment_id" value="' . $comment[2] . '">
                  <input type="hidden" name="token" value="' . $token . '"/>
                  </form>'
                );
              };
            };
          };
          echo (
            '</div>'
          );
          // add comment function but only if logged in
          if ($_SESSION['loggedin']) {
            echo(
              '<hr>
              <div class=addcomment>
                <form action="comment.php" method="post">
                <label for="comment' . strval($i) . '">enter a comment on this post:
                <input type="text" name="comment" id="comment' . strval($i) . '">
                </label>
                <input type="hidden" name="token" value="' . $token . '"/>
                <input type="submit" value="post">
                <input type="hidden" name="post_id" value="' . $post[0] . '">
                </form>
              </div>'
            );
            $i++;
          };
            echo (
            '</div>'
            );
        };
    ?>
  </body>
</html>