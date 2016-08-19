<?php
if (isset($_GET['action']) && $_GET['action'] != '') {
	/*if (isset($_GET['status']) && $_GET['status'] == 'trash') {
		include_once 'maxbuttons-list.php';
	} */
	//else {
		switch ($_GET['action']) {
			case 'button':
			case 'edit': 
				if (isset($_GET["popup"]) && $_GET["popup"] == true) // bugs with save function to name something
					include_once 'button_editor_popup.php'; 
				else
					include_once 'maxbuttons-button.php';
				break;
			case 'copy':
				include_once 'maxbuttons-copy.php';
				break;
			case 'delete':
				include_once 'maxbuttons-delete.php';
				break;
			case 'trash':
				include_once 'maxbuttons-trash.php';
				break;
			case 'restore':
				include_once 'maxbuttons-restore.php';
				break;
 
			default:
				include_once 'maxbuttons-list.php';
				break;
		}
	//}
} else {
	include_once 'maxbuttons-list.php';
}
?>
