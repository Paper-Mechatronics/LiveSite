<?php
/***
 * TZTK Settings Page Class
 *
 * Adds the menu link in the backend and displays the settings page.
 *
 * @package ThemeZee Toolkit
 */
 
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


/* Use class to avoid namespace collisions */
if ( ! class_exists('TZTK_Settings_Page') ) :

class TZTK_Settings_Page {

	/**
	 * Setup the Settings Page class
	 *
	 * @return void
	*/
	static function setup() {
		
		// Add settings page to plugin tabs
		add_filter( 'themezee_plugins_settings_tabs', array( __CLASS__, 'add_settings_page' ) );
		
		// Hook settings page to plugin page
		add_action( 'themezee_plugins_page_toolkit', array( __CLASS__, 'display_settings_page' ) );
		
	}

	/**
	 * Add settings page to tabs list on themezee plugin page
	 *
	 * @return void
	*/
	static function add_settings_page($tabs) {
			
		// Add Boilerplate Settings Page to Tabs List
		$tabs['toolkit'] = esc_html__( 'Toolkit', 'themezee-toolkit' );
		
		return $tabs;
		
	}
	
	/**
	 * Display settings page
	 *
	 * @return void
	*/
	static function display_settings_page() { 
	
		ob_start();
	?>
		
		<div id="tztk-settings" class="tztk-settings-wrap">
			
			<h1><?php esc_html_e( 'ThemeZee Toolkit', 'themezee-toolkit' ); ?></h1>
			
			<form class="tztk-settings-form" method="post" action="options.php">
				<?php
					settings_fields('tztk_settings');
					do_settings_sections('tztk_settings');
					submit_button();
				?>
			</form>
			
		</div>
<?php
		echo ob_get_clean();
	}
	
}

// Run Settings Page Class
TZTK_Settings_Page::setup();

endif;