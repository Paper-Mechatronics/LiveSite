<?php 
namespace MaxButtons;
defined('ABSPATH') or die('No direct access permitted');

/** Blocks collection
*
* Class for general block functions - transitional
*/
use MaxButtons\maxBlocks as maxBlocks; 

class maxBlocks
{
	protected static $blocks;  // collection!
	
	protected static $data; // full data array
	protected static $fields = array(); // all fields 
	
	public static function init() 
	{
		add_action('mb-data-load', array('MaxButtons\maxBlocks', 'data') );
	}
	
	public static function data($data) 
	{
		$new_data = array(); //egalite 
		foreach($data as $block => $fields) 
		{
			if (is_array($fields)) 
				$new_data = array_merge($new_data, $fields); 
		}
		self::$data = $new_data; 
	}
	
	public static function add($block)
	{
		$name = $block->get_name(); 
		self::$blocks[$name] = $block;
		self::$fields = array_merge(self::$fields, $block->get_fields()); 
	}
	
	public static function getValue($fieldname) 
	{
 
		if (isset(self::$data[$fieldname])) 
			return self::$data[$fieldname]; 
		if (isset(self::$fields[$fieldname])) 
			return self::$fields[$fieldname]['default'];
		
		return false; // dunno. 
 	
	}

	public static function getDefault($fieldname) 
	{
		if (isset(self::$fields[$fieldname]['default'])) 
			return self::$fields[$fieldname]['default'];
		
		return false; // dunno
	
	}


}
