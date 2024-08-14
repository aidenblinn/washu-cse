<?php require 'database.php'; 
session_start();
$user = $_SESSION['username'];?>

<html>
    <head>
        <title>My News Site</title>
        <link href="news-site-styles.css" rel="stylesheet" type="text/css"/>
    </head>

    <body>
    
    	<div class="container">
            
            <h1>Your News</h1>
            <h3> You're logged in as <?php echo $user ?>!</h3>
            <div class="news">
                <?php
                    $mysqli = connectdb(); 
                    // $myquery = "SELECT * from stories WHERE userid=$user";
                    $myquery = "SELECT * from stories";

                    $allstories = mysqli_query($mysqli, $myquery);

                    echo "<ul>\n";

                    //this prints out all the stories!
                    while($data = mysqli_fetch_array($allstories)){
                        echo $data['newstitle'];
                        echo $data['newstext'];
                        if(isset($data['newslink'])) {
                            echo $data['newslink'];
                        }
                ?>
                        <!-- inserting php is like diving in and out of the water
                        while swimming, even if you break out of the tags for a bit
                        the same variables are still accessible in the same file -->
                            
                        <a href="comment-view.php?id=<?php echo $data['newsid']; ?>">View Comments</a>
                        <a href="news-item-edit.php?id=<?php echo $data['newsid'];?>">Edit</a>
                        <a href="delete.php?id=<?php echo $data['newsid']; ?>">Delete</a>
                <?php
                        echo "<ul>\n";
                    }
                   
                ?>
            </div>
            
            <div class="newstorysubmit">
                <a href="submitnews.php">Submit a New Story</a>
            </div>

            <!-- user can logout here -->
            <form action="logout.php" method="POST">
            <p>
                <input type="submit" name="logout" value="logout" />
            </p>
            </form>
            

    	</div>

    </body>
</html>