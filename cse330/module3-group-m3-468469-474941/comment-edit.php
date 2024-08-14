<?php 
	require "database.php"; 
	// get the database handler
	$mysqli = connectdb(); 
	$id = $_GET['id']; // get id through query string which is passed to this file from index.php
	//done by "posting" the variable to the url

	 // select query, there will only be one that matches the id
	$query = mysqli_query($mysqli,"select * from comments where commentsid='$id'");

	$data = mysqli_fetch_array($query); // fetch data

	if(isset($_POST['update'])) // when you click on update button
	{
		//extract the new values
		$brandnewcomment = $_POST['comment'];
		
		//perform a query and update using those values
		$edit = mysqli_query($mysqli,"UPDATE comments SET commentstext='$brandnewcomment' WHERE commentsid='$id'");
		
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

<h3>Edit Comment</h3>

<form method="POST">
  <label for="comment">Edit comment: </label>
  <input type="text" id="comment" name="comment" value="<?php echo $title?>" placeholder="Updated comment here" Required>
  <button type="submit" name="update" value="Update">Submit</button>
</form>