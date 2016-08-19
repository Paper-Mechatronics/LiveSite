<?php
/***
 * Header & Footer Scripts
 *
 * Print custom scripts in <head> and above <body> section of the theme 
 *
 * @package ThemeZee Toolkit
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


// Use class to avoid namespace collisions
if ( ! class_exists( 'TZTK_Header_and_Footer_Scripts' ) ) :

class TZTK_Header_and_Footer_Scripts {
	
	/**
	 * Add Header, Custom CSS and Footer Scripts to theme
	 *
	 * @return void
	 */
	static function init() {
	
		// Add Header and Footer Scripts in Frontend
        add_action( 'wp_head', array( __CLASS__, 'header_scripts' ) );
		add_action( 'wp_footer', array( __CLASS__, 'footer_scripts' ) );
		
	}
	
	
	/**
	 * Output Scripts in Header
	 *
	 * @return void
	 */
	static function header_scripts() {
		
		self::output_scripts( 'header_scripts' );
		
	}
	
	
	/**
	 * Output Scripts in Footer
	 *
	 * @return void
	 */
	static function footer_scripts() {
		
		self::output_scripts( 'footer_scripts' );
		
	}
	

	/**
	 * Output Scripts from Database
	 *
	 * @param string $setting Name of the setting
	 * @return void
	 */
	static function output_scripts( $setting ) {
		
		// Ignore admin, feed, robots and trackbacks
		if ( is_admin() or is_feed() or is_robots() or is_trackback() ) :
			return;
		endif;
		
		// Get Plugin Options
		$options = TZTK_Settings::instance();
		
		// Get Scripts
		$scripts = trim( $options->get( $setting ) );
		
		// Output Scripts
		if( $scripts <> '' ) :
			
			echo stripslashes( $scripts );
		
		endif;
		
	}
	
}

// Run Class
TZTK_Header_and_Footer_Scripts::init();

endif;