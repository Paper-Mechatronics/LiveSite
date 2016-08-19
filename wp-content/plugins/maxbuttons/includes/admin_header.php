<?php 
defined('ABSPATH') or die('No direct access permitted');
 

$page = isset($_REQUEST["page"]) ? $_REQUEST["page"] : '';
$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : $action; 
$mainclass = $page . '-' . $action; 
?>

<div id="maxbuttons" class="<?php echo $mainclass ?>" <?php if ($tabs_active) echo "data-view='tabs'" ?>>
	<?php do_action("mb-interface-start");  ?>
	<div class="wrap">
		<h1 class="title"><span><?php _e("MaxButtons:","maxbuttons"); ?> <?php echo $title ?>
		<?php if (isset($title_action) && $title_action != "") {  
			echo $title_action; } ?> 
			</span>
			<div class="logo">
				<?php do_action("mb-display-logo"); ?> 
			</div>
			
		</h1>
		<h2 class='dummy-heading'></h2>
		<?php do_action("mb_admin_notices"); ?> 
				
		<div class="clear"></div>
		<?php do_action("mb-feedback-form"); ?> 
		
		<div class="main">
			<?php do_action('mb-display-tabs'); ?>
			
		
