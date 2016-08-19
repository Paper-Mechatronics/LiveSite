<?php
namespace MaxFoundry;

defined('ABSPATH') or die('No direct access permitted');

class simpleTemplate
{
	private $version = '1.1'; 
		
	public static function parse($template_file, $object) 
	{
		$template = file_get_contents($template_file); 
		
		$template = static::checkif($template, $object);
				
		preg_match_all('/%%(.*?)%%/im', $template, $matches); 
		
		if(isset($matches[1]) && count($matches[1]) > 0) 
		{
			for($i = 0; $i < count($matches[1]); $i++)
			{
				$match = $matches[1][$i]; 
				$replace = $matches[0][$i]; 
				
				if (! isset($object->$match)) 
					continue; 
					
				$template = str_replace($replace, $object->$match, $template); 
			}
		}		
		
		return $template; 
	}
	
	public static function checkif($template, $object) 
	{
		//  (\{\/if:(.*)\})
		preg_match_all('/\{if:(.*)\}(.*)\{\/if:(.*)\}/im', $template, $matches);
		
		if (! isset($matches[0])) 
			return $template; // no statements; 
			
		$count = count($matches[0]); // amount of statements; 
		
		/* matches[0] = full statement 
		   matches[1] = name of field
		   matches[2] = inner content 
		*/
		for($i = 0; $i < $count; $i++) 
		{
			$field = $matches[1][$i]; 
			if (isset($object->$field)) 		
			{
				$template = str_replace($matches[0][$i], $matches[2][$i], $template); 
			}
			else
			{
				$template = str_replace($matches[0][$i], '', $template); 
			}	 
		}
		return $template; 
	}

}
