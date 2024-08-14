<?php 
	require "database.php"; 
	session_start();
	// get the database handler
	$mysqli = connectdb(); 
	$id = $_GET['id']; // get id through query string which is passed to this file from index.php
	//done by "posting" the variable to the url

	 // select query, there will only be one that matches the id
	$query = mysqli_query($mysqli,"select * from stories where id='$id'");

	$data = mysqli_fetch_array($query); // fetch data

	if(isset($_POST['update']) && isset($_SESSION['logged_in']) && $_SESSION['logged_in']==true) // when you click on update button
	{
		//extract the new values
		$brandnewtitle = $_POST['title'];
		$brandnewstory = $_POST['story'];
		
		//perform a query and update using those values
		$edit = mysqli_query($mysqli,"UPDATE stories SET newstitle='$brandnewtitle', newstext='$brandnewstory' WHERE newsid='$id'");
		
		if($edit)
		{
			mysqli_close($mysqli); // Close connection
			header("location: index.php"); // redirects to home page
			exit;
		} else {
			echo mysqli_error();
		}    	
	}
?>

<a href="index.php">Back to Main Page</a>

<h3>Edit Story</h3>

<form method="POST">
  <label for="title">New title: </label>
  <input type="text" id="title" name="title" value="<?php echo $title?>" placeholder="Enter title" Required>

  <label for="story">New story:</label>
  <input type="text" id="story" name="story" value="<?php echo $text?>" placeholder="Enter story..." Required>

  <button type="submit" name="update" value="Update">Submit</button>
</form>

