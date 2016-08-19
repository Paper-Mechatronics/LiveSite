<?php 
namespace MaxButtons; 

use MaxFoundry\simpleTemplate; 

class maxField
{

	/* Static class variables */
	static $templates = ''; 
	static $position = 0; 

	/* Field data */ 
	public $id; 
	public $name; 
	public $value = '';
		
	/* Layout options */
	public $note; 
	public $label;
	public $title;  
	public $default;

	// Specific options */ 
	public $placeholder = ''; // text / textarea
	public $icon; // checkbox-icon
	public $checked = ''; // checkbox  / radio
	public $input_class = ''; // inputs
	public $before_input; // text
	public $content = ''; // generic / spacer
 	public $min;  // number
 	
 	/* Border radius */ 
 	public $radius_tl; 
 	public $radius_tr; 
 	public $radius_bl, $radius_br; 
 	
	//public 

	/* Template */	
	public $template; 
	public $main_class = 'option';  // row class - start template
	public $esc_function = 'esc_attr';  
	
	/* Publish brake */
	public $publish = true; 
	public $output = ''; 
	
	static function setTemplates($templates) 
	{
		self::$templates = $templates; 
	
	}
	
	public function __construct($template = 'text') 
	{
		self::$position++; 
		$this->template = $template; 
	}	
	
	public function setDefault($default) 
	{
		$this->default = __('Default:','maxbuttons') . ' ' . $default; 
	
	}
 
	public function output($start_tpl = '', $end_tpl = '') 
	{
		if ($this->esc_function) 
		{
			$this->value = call_user_func($this->esc_function, $this->value); 
		}
		
		$output = ''; 
		if ($start_tpl != '') 
		{
			$start_tpl = self::$templates[$start_tpl];
			$output .= \maxFoundry\simpleTemplate::parse($start_tpl['path'], $this);
		}

		$template = self::$templates[$this->template]; // template name; 		
		do_action('mb/editor/before-field-' . $this->id, $this);
		
		$output .= \maxFoundry\simpleTemplate::parse($template['path'], $this); 	
	

		if ($end_tpl != '') 
		{
			$end_tpl = self::$templates[$end_tpl];
			$output .= \maxFoundry\simpleTemplate::parse($end_tpl['path'], $this);
		}
				
		if ($this->publish) 
			echo $output; 	
		do_action('mb/editor/after-field-'. $this->id); // hook for extra fields. 		

		
		$this->output =  $output;
		return $output; 
	}


}
