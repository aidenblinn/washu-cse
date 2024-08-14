<!DOCTYPE html>
<html>
    <head>
        <title>My News Site</title>
        <link href="news-site-styles.css" rel="stylesheet" type="text/css"/>
    </head>
    
    <body>
        <form action="authentication.php" method="POST" className="mainForm">
            <h1>Welcome to SCNN!</h1>
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="text" name="password" id="password">
            </div>
                
            <div>
                <button type="submit" name="login">Login</button>
                <button type="submit" name="register">Register</button>
            </div>

            <!-- buttons redirect to different things!! -->
            
        </form>
    </body>
</html>