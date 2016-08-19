<?php

//----------------------------------------------------------------------------------
//	ADD NOTICE INFORMING USERS THAT THEME OPTIONS PANEL HAS MOVED TO CUSTOMIZER
//----------------------------------------------------------------------------------

function thinkup_customizer_theme_options_notice() {
	
		echo '<div id="thinkup-theme-options-moved" style="background: #fff;padding: 20px;margin-top: 20px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;-o-box-sizing: border-box;box-sizing: border-box;border: 1px solid #dadada;max-width: 800px;">';
		echo '<h2 style="margin: 0 0 20px;border-bottom: 1px solid #ddd;padding-bottom: 20px;text-transform: uppercase;">New Theme Options Panel</h2>';
		echo '<p>We&#39;ve made a major update to the theme options panel to comply with the new WordPress.org guidelines which state that all theme options must be in the customizer. From October 21st 2015 all new themes and theme updates are required to remove any options panels and instead add all options to the WordPress Customizer.</p><h3>Where are the new theme options?</h3><p>We&#39;re glad you asked! All of the work you did using the theme options panel can now be found in the customizer. You can find this in the left-hand side menu under Appearance -&gt; Customize.</p>';
		echo '<p><img src="' . get_template_directory_uri() . '/admin/main/customizer_migration_notice/img/customizer_options_location.png" style="border: 1px solid #ddd;max-width: 400px;"></p>';
		echo '<h3>Have I lost my previous work?</h3>';
		echo '<p>Absolutely not. We&#39;ve taken care of everything for you. All of the work that you did in the theme options panel has now been automatically migrated to the customizer. So you can simply continue from where you left off.</p>';
		echo '</div>';
}
function thinkup_customizer_theme_options_notice_submenu_page() {
	add_theme_page( 'Theme Options', 'Theme Options', 'manage_options', 'thinkup-theme-options', 'thinkup_customizer_theme_options_notice' );
}
add_action('admin_menu', 'thinkup_customizer_theme_options_notice_submenu_page');


?>