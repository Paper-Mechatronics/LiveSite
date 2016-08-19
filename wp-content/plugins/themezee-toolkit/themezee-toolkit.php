<?php
/*
Plugin Name: ThemeZee Toolkit
Plugin URI: https://themezee.com/plugins/toolkit/
Description: The ThemeZee Toolkit is a collection of useful small plugins and features, neatly bundled into a single plugin. It includes modules for Widget Visibility, Header & Footer Scripts, Custom CSS and a lot more.
Author: ThemeZee
Author URI: https://themezee.com/
Version: 1.0.4
Text Domain: themezee-toolkit
Domain Path: /languages/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/

ThemeZee Toolkit
Copyright(C) 2016, ThemeZee.com - support@themezee.com

The Widget Visibility and Gallery Carousel modules are a fork of the JetPack plugin.

*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Use class to avoid namespace collisions
if ( ! class_exists('ThemeZee_Toolkit') ) :


/**
 * Main ThemeZee_Toolkit Class
 *
 * @package ThemeZee Toolkit
 */
class ThemeZee_Toolkit {

	/**
	 * Call all Functions to setup the Plugin
	 *
	 * @uses ThemeZee_Toolkit::constants() Setup the constants needed
	 * @uses ThemeZee_Toolkit::includes() Include the required files
	 * @uses ThemeZee_Toolkit::setup_actions() Setup the hooks and actions
	 * @return void
	 */
	static function setup() {
	
		// Setup Constants
		self::constants();
		
		// Setup Translation
		add_action( 'plugins_loaded', array( __CLASS__, 'translation' ) );
	
		// Include Files
		self::includes();
		
		// Setup Action Hooks
		self::setup_actions();
		
	}
	
	
	/**
	 * Setup plugin constants
	 *
	 * @return void
	 */
	static function constants() {
		
		// Define Version Number
		define( 'TZTK_VERSION', '1.0.4' );
		
		// Plugin Folder Path
		define( 'TZTK_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin Folder URL
		define( 'TZTK_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

		// Plugin Root File
		define( 'TZTK_PLUGIN_FILE', __FILE__ );
		
	}
	
	
	/**
	 * Load Translation File
	 *
	 * @return void
	 */
	static function translation() {

		load_plugin_textdomain( 'themezee-toolkit', false, dirname( plugin_basename( TZTK_PLUGIN_FILE ) ) . '/languages/' );
		
	}
	
	
	/**
	 * Include required files
	 *
	 * @return void
	 */
	static function includes() {

		// Include Admin Classes
		require_once TZTK_PLUGIN_DIR . '/includes/admin/class-themezee-plugins-page.php';
		
		// Include Settings Classes
		require_once TZTK_PLUGIN_DIR . '/includes/settings/class-tztk-settings.php';
		require_once TZTK_PLUGIN_DIR . '/includes/settings/class-tztk-settings-page.php';
		
		// Include Header & Footer Scripts class
		require TZTK_PLUGIN_DIR . '/includes/class-tztk-header-footer-scripts.php';
		
	}
	
	
	/**
	 * Setup Action Hooks
	 *
	 * @see https://codex.wordpress.org/Function_Reference/add_action WordPress Codex
	 * @return void
	 */
	static function setup_actions() {

		// Include active modules
		add_action( 'init',  array( __CLASS__, 'modules' ), 11 );
		
		// Add Settings link to Plugin actions
		add_filter( 'plugin_action_links_' . plugin_basename( TZTK_PLUGIN_FILE ), array( __CLASS__, 'plugin_action_links' ) );
		
		// Add Toolkit Box to Plugin Overview Page
		add_action( 'themezee_plugins_overview_page', array( __CLASS__, 'plugin_overview_page' ) );
		
	}

	
	/**
	 * Include active Modules
	 *
	 * @return void
	 */
	static function modules() {
		
		// Get Plugin Options
		$options = TZTK_Settings::instance();
		
		// Include Widget Visibility class unless it is already activated with Jetpack
		if( true == $options->get( 'widget_visibility' ) and ! class_exists( 'Jetpack_Widget_Conditions' ) ) :
			
			require TZTK_PLUGIN_DIR . '/includes/modules/class-tztk-widget-visibility.php';
		
		endif;
		
		// Include Gallery Carousel class unless it is already activated with Jetpack
		if( true == $options->get( 'gallery_carousel' ) and ! class_exists( 'Jetpack_Carousel' ) ) :
			
			require TZTK_PLUGIN_DIR . '/includes/modules/class-tztk-gallery-carousel.php';
		
		endif;
		
		// Include Infinite Scroll class unless it is already activated with Jetpack
		if( true == $options->get( 'infinite_scroll' ) and ! class_exists( 'The_Neverending_Home_Page' ) ) :
			
			require TZTK_PLUGIN_DIR . '/includes/modules/class-tztk-infinite-scroll.php';
		
		endif;

	}
	
	
	/**
	 * Add Settings link to the plugin actions
	 *
	 * @return array $actions Plugin action links
	 */
	static function plugin_action_links( $actions ) {

		$settings_link = array( 'settings' => sprintf( '<a href="%s">%s</a>', admin_url( 'options-general.php?page=themezee-plugins&tab=toolkit' ), __( 'Settings', 'themezee-toolkit' ) ) );
		
		return array_merge( $settings_link, $actions );
	}


	/**
	 * Add Toolkit box to plugin overview admin page
	 *
	 * @return void
	 */
	static function plugin_overview_page() { 
	
		$plugin_data = get_plugin_data( __FILE__ ); ?>

		<dl>
			<dt>
				<h4><?php echo esc_html( $plugin_data['Name'] ); ?></h4>
				<span><?php printf( esc_html__( 'Version %s', 'themezee-toolkit'), esc_html( $plugin_data['Version'] ) ); ?></span>
			</dt>
			<dd>
				<p><?php echo wp_kses_post( $plugin_data['Description'] ); ?><br/></p>
				<a href="<?php echo admin_url( 'options-general.php?page=themezee-plugins&tab=toolkit' ); ?>" class="button button-primary"><?php esc_html_e( 'Plugin Settings', 'themezee-toolkit' ); ?></a> 
				<a href="<?php echo esc_url( 'https://themezee.com/docs/toolkit-documentation/?utm_source=plugin-overview&utm_medium=button&utm_campaign=toolkit&utm_content=documentation'); ?>" class="button button-secondary" target="_blank"><?php esc_html_e( 'View Documentation', 'themezee-toolkit' ); ?></a>
			</dd>
		</dl>
		
		<?php
	}
	
}

// Run Plugin
ThemeZee_Toolkit::setup();

endif;