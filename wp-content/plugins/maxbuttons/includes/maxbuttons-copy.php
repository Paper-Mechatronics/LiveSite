<?php
if (isset($_GET['id']) && $_GET['id'] != '') {
	$button_id = intval($_GET["id"]); // validation
	$button = new maxButton(); 
	$button->set($button_id); 
	$new_id = $button->copy();
 
}
?>
<script type="text/javascript">
	<?php if (isset($new_id)) { ?>
		window.location = "<?php admin_url() ?>admin.php?page=maxbuttons-controller&action=button&id=<?php echo $new_id ?>";
	<?php } else { ?>
		window.location = "<?php admin_url() ?>admin.php?page=maxbuttons-controller&action=list";
	<?php } ?>
</script>
