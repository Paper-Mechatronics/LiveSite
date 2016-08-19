<?php 

$colID = (isset($_GET["colID"])) ? intval($_GET["colID"]) : ''; 
$action = isset($_GET["action"]) ? sanitize_text_field($_GET["action"]) : ''; 

switch($action)
{
	case "edit": 
		require_once("maxbuttons-collection-edit.php"); 
	break;
	
	default; 
		require_once("maxbuttons-collection-list.php"); 
	break; 
}
 




?>
