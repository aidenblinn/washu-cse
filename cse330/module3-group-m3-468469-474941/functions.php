<?php 
    	require 'database.php'; 
    
        //this function loads all news upon startup
    	function fetchNews( $mysqli )
    	{
            
    		$request = $mysqli->prepare(" SELECT newsid, newstitle, newstext, newscomments from stories");
    		return $request->execute() ? $request->fetchAll() : false; 
    	}
    
    
    	// function getAnArticle( $id_article, $mysqli )
    	// {
    
    	// 	$request =  $mysqli->prepare(" SELECT news_id,  news_title, news_full_content, news_author, news_published_on FROM info_news  WHERE news_id = ? ");
    	// 	return $request->execute(array($id_article)) ? $request->fetchAll() : false; 
    	// }
    
    
    	// function getOtherArticles( $differ_id, $conn )
    	// {
    	// 	$request =  $conn->prepare(" SELECT news_id,  news_title, news_short_description, news_full_content, news_author, news_published_on FROM info_news  WHERE news_id != ? ");
    	// 	return $request->execute(array($differ_id)) ? $request->fetchAll() : false; 
        // }
?>