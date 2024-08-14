# CSE330
  
### General info  
Aiden Blinn  
456673  
apblinn  

Trevor Perez  
486391  
trevorperez10  
  
News site homepage: http://ec2-3-16-129-71.us-east-2.compute.amazonaws.com/~aidenblinn/NewsWebsite/welcome.php?  
  
Login info:
- username "apblinn" / password "password"
- username "mark.zucc" / password "facebook"
- username "1234" / password "1234"
  
### Creative project  
For our creative project, we added like/unlike functionality. If you're logged in, you're able to like/unlike posts (including your own). Anyone can see the total number of likes for each post. To implement this feature, we first created a "likes" table that links to the accounts and posts tables through foreign keys to ensure that the information in each like row is legitimate. We then added a like/unlike button (the one that shows up depends on whether the user has already liked the post). The buttons like to corresponding php scripts that modify the likes table accordingly.

## Grading
-2pts - used string concatenation to insert values into queries

-2pts - html validator failed on upload story page

-5pts - insufficient creative portion
