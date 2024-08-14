<?php require 'database.php'; 
session_start();?>

<a href="comment-view.php">Back to comments</a>

<h3>Add Comment</h3>

<form action="comment-add.php" method="POST">
    <label for="comment">New comment: </label>
    <input type="text" id="comment" name="comment" placeholder="New comment here" Required>
    <button type="submit" name="submit">Submit</button>
</form>

<?php
    if(isset($_POST['comment'])) {
        $mysqli = connectdb(); 
        $newcomment = $_POST['comment'];
        $sql = "INSERT INTO comments(commentstext, comuserid) VALUES(?, ?)";

        $stmt = $mysqli -> prepare($sql);
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        } else {
            echo "Query successful!";         
            $stmt->bind_param('ss', $newcomment, $_SESSION['username']);
            $stmt->execute();
            $stmt->close();
        }
    }
?>
