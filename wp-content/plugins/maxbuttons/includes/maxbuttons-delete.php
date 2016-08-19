<?php
if (isset($_GET['id']) && $_GET['id'] != '') {
	$button = new maxButton();
	$button_id = intval($_GET["id"]); // validation
	
	$button->delete(intval($_GET['id'])); 
	
	//maxbuttons_button_delete_permanently($_GET['id']);
}
 
?>
<script type="text/javascript">
	window.location = "<?php admin_url() ?>admin.php?page=maxbuttons-controller&action=list&status=trash&message=1delete";
</script>
