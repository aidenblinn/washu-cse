<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'database.php';

$mysqli = connectdb(); 

if(isset($_POST['register'])&& isset($_POST['username']) && isset($_POST['password'])){
    $new_user = $_POST['username'];//must check if username already exists??
    $new_pwd = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users(username, pword) VALUES (?, ?)";
    $stmt = $mysqli -> prepare($sql);  

    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    } else {
        echo "Query successful!";            
        $stmt->bind_param('ss', $new_user, $new_pwd);
        $stmt->execute();
        $stmt->close();

        session_start();
        $_SESSION['username']=$new_user; //deposit user in list of session variables
        
        // session_id($user_id);
        
        header("Location: index.php");
        exit;
    }
}

else if(isset($_POST['login'])&& isset($_POST['username']) && isset($_POST['password'])){
    $sql = "SELECT COUNT(*), username, pword FROM users WHERE username=?";
    $new_user = $_POST['username'];//must check if username already exists??
    $stmt = $mysqli->prepare($sql);
    // Bind the parameter
    $stmt->bind_param('s', $user);
    $user = $_POST['username'];
    $stmt->execute();

    // Bind the results
    $stmt->bind_result($cnt, $user_id, $pwd_hash);
    $stmt->fetch();

    $pwd_guess = $_POST['password'];
    // Compare the submitted password to the actual password hash

    if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
        // Login succeeded!
        //$_SESSION['token'] = bin2hex(random_bytes(32));
        //if(!hash_equals($_SESSION['token'], $_POST['token'])){
        //    die("Request forgery detected");
        //}
        $_SESSION['username'] = $new_user;
        session_start();
        // Redirect to your target page
        header("Location: index.php");
        exit;
        
    } else{
        // Login failed; redirect back to the login screen
        echo "login failed";
        header("Location: login.php");
        exit;
        
    }
}

?>