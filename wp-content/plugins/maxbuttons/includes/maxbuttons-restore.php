<?php
if (isset($_GET['id']) && $_GET['id'] != '') {
	$button_id = intval($_GET["id"]); // validation
	$button = new maxButton();
	$set = $button->set($button_id,'','trash');
	if (! $set) exit("Restore failed"); 
	$button->setStatus("publish"); 
}
?>
<script type="text/javascript">
	window.location = "<?php admin_url() ?>admin.php?page=maxbuttons-controller&action=list&status=trash&message=1restore";
</script>
