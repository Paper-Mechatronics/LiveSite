<?php
/*
Plugin Name: MaxButtons
Plugin URI: http://maxbuttons.com
Description: The best WordPress button generator. This is the free version; the Pro version <a href="http://maxbuttons.com/?ref=mbfree">can be found here</a>.
Version: 5.7
Author: Max Foundry
Author URI: http://maxfoundry.com
Text Domain: maxbuttons 
Domain Path: /languages

Copyright 2016 Max Foundry, LLC (http://maxfoundry.com)
*/


if (! function_exists('maxbuttons_php52_nono'))
{
	function maxbuttons_php52_nono()
	{
		$message = sprintf( __("From version 3 MaxButtons requires at least PHP 5.3 . You are running version: %s ","maxbuttons"), PHP_VERSION);
		echo"<div class='error'> <h4>$message</h4></div>"; 
		return; 
	}
}
if ( version_compare(PHP_VERSION, '5.3', '<' ) ) {
 
	add_action( 'admin_notices', 'maxbuttons_php52_nono' ); 
	return;
}

if (! function_exists('maxbutton_double_load')) 
{
	function maxbutton_double_load()
	{
		$message =  __("Already found an instance of MaxButtons running. Please check if you are trying to activate two MaxButtons plugins and deactivate one. ","maxbuttons" );
		echo "<div class='error'><h4>$message</h4></div>"; 
		return;
	}
}

if (function_exists("MB")) 
{
	add_action('admin_notices', 'maxbutton_double_load');
	return;
} 


define("MAXBUTTONS_ROOT_FILE", __FILE__);
define('MAXBUTTONS_VERSION_NUM', '5.7');
define('MAXBUTTONS_RELEASE',"08 Jul 2016"); 

// In case of development, copy this to wp-config.php
// define("MAXBUTTONS_DEBUG", true);
// define("MAXBUTTONS_BENCHMARK",true); 

require_once("classes/maxbuttons-class.php"); 

// core
require_once('classes/button.php');
require_once('classes/buttons.php'); 
require_once("classes/installation.php"); 	
require_once("classes/max-utils.php"); 

// more core
require_once("classes/block.php"); 
if (is_admin()) 
{
	require_once('classes/field.php'); 
	require_once('classes/blocks.php'); 
}			

require_once("classes/maxCSSParser.php");
require_once("classes/admin-class.php");

require_once("classes/collections.php"); 
require_once("classes/collection.php"); 
require_once("classes/collection-block.php"); 
require_once("classes/pack.php");
require_once("classes/integrations.php");

require_once("includes/maxbuttons-admin-helper.php"); 
 

// external libraries 
require_once("assets/libraries/scssphp/scss.inc.php");
require_once("assets/libraries/simple-template/simple_template.php"); 

if (! class_exists('simple_html_dom_node'))
	require_once("assets/libraries/simplehtmldom/simple_html_dom.php");


// runtime.
if (! function_exists("MB"))	{
	function MB()
	{
		return maxButtonsPlugin::getInstance();
	}
}
$m = new maxButtonsPlugin();	


// Activation / deactivation
register_activation_hook(__FILE__, array("maxInstall",'activation_hook') );
register_deactivation_hook(__FILE__,array("maxInstall", 'deactivation_hook') );

