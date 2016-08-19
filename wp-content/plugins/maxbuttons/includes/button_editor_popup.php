<?php 
include_once 'arrays.php';
//include_once 'constants.php';
//do_action('admin_enqueue_scripts', 'maxbuttons-popup'); 
 
//do_action('enqueue_scripts'); 
//do_action('enqueue_styles');

 
$button = MB()->getClass("button"); //new maxButton();
$button_id = 0; 


if (isset($_GET['id']) && $_GET['id'] != '') { 
	$button = MB()->getClass('button'); // reset
	$button_id = intval($_GET["id"]); 
}
?>
<html>
<head>
<?php //wp_head();

//echo "HEAD"; 

//do_action('admin_print_scripts'); 
//do_action('admin_print_styles'); 
// wp_print_scripts();
// wp_print_styles();
exit('Button popup not found. Please contact support.');
 ?> 
 
</head>
<body class="wp-admin wp-core-ui js  maxbuttons_page_maxbuttons-button auto-fold admin-bar branch-4-4 version-4-4 admin-color-fresh locale-nl-nl customize-support svg">
<?php
//remove_action("mb-display-logo"); 
//remove_action('mb-display-tabs');
$admin = MB()->getClass("admin"); 
$admin->get_header(array("tabs_active" => true)); 
 

			$button->admin_fields();
?>

 
<?php


 //$admin->get_footer(); 
 
?>
<?php  
//o_action('admin_print_scripts'); 
//print_footer_scripts()  ?>
	</body>
</html>

