<?php
defined('ABSPATH') or die('No direct access permitted');

$blockClass["color"] = "colorBlock"; 
$blockOrder[10][] = "color"; 

class colorBlock extends maxBlock 
{
	protected $blockname = "color"; 
	protected $fields = array("text_color" => array("default" => "#ffffff",
													"css" => "color",
													"csspart" => "mb-text"
													),
						"text_shadow_color" => array("default" => "#505ac7",
													"css" => "text-shadow-color",
													"csspart" => "mb-text"
													),
						"gradient_start_color" => array("default" => "#505ac7",
													"css" => "gradient-start-color"
													),
						"gradient_end_color" => array("default" => "#505ac7",
													"css" => "gradient-end-color"
													), 
						"border_color" => array("default" => "#505ac7",
													"css" => "border-color"
												    ),
						"box_shadow_color" => array("default" => "#333333",
													"css" => "box-shadow-color"
													),
						"text_color_hover" => array("default" => "#505ac7",
													"css" => "color", 
													"csspart" => "mb-text",
													"csspseudo" => "hover", 
													),
						"text_shadow_color_hover" => array("default" => "#333333",
													"css" => "text-shadow-color", 
													"csspart" => "mb-text",
													"csspseudo" => "hover"),
													
						"gradient_start_color_hover" => array("default" => "#ffffff",
													"css" => "gradient-start-color", 
													"csspseudo" => "hover"),
													
						"gradient_end_color_hover" => array("default" => "#ffffff",
													"css" => "gradient-end-color", 
													"csspseudo" => "hover"
													),
													
						"border_color_hover" => array("default" => "#505ac7",
													"css" => "border-color", 
													"csspseudo" => "hover"),	
																								
 						"box_shadow_color_hover" => array("default" => "#333333",
													"css" => "box-shadow-color", 
													"csspseudo" => "hover"),
 						
 						"icon_color" 			 => array( "default" => '#ffffff', 
													"css" => "color", 
													"csspart" => "fa"), 
						
						"icon_color_hover"		 => array( "default" => '#2b469e', 
													"css" => "color", 
													"csspart" => "fa",
													"csspseudo" => "hover",
													),
						); 
	
	


	public function admin_fields() 
	{
		return; 
		
		$data = $this->data[$this->blockname]; 
		foreach($this->fields as $field => $options)
		{		
 	 	    $default = (isset($options["default"])) ? $options["default"] : ''; 
			$$field = (isset($data[$field])) ? $data[$field] : $default;
			${$field  . "_default"} = $default; 
		}
		

		$color_labels = array(  
							  __('Gradient Start', 'maxbuttons'),
							  
							  __('Gradient End', 'maxbuttons'),

							  ); 
							  
		$normal_colors = array(  "gradient_start_color", "gradient_end_color" );
		$hover_colors = array(  "gradient_start_color_hover", "gradient_end_color_hover" ); 
		
		
		$normal_colors = apply_filters($this->blockname . "-normal-colors", $normal_colors); 
		$hover_colors = apply_filters($this->blockname . "-hover-colors", $hover_colors); 
		
		$color_labels = apply_filters($this->blockname . "-color-labels", $color_labels); 
?>		
	<div class="option-container mb_tab">
			<input type="hidden" name="icon_color" value="<?php echo $icon_color ?>"> 
			<input type="hidden" name="icon_color_hover" value="<?php echo $icon_color_hover ?>"> 
			
				<div class="title"><?php _e('Colors', 'maxbuttons') ?></div>
				<div class="inside">
					<div class="option-design">
						<div class="input">
							<table class="color-line" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<th>&nbsp;</th>
									<?php foreach($color_labels as $label) 
										echo "<th>" . $label . "</th>"; 
									?>
	
								</tr>
								
								<tr>
									<td class="label"><?php _e('Normal', 'maxbuttons') ?></td>
								
									<?php foreach($normal_colors as $color) 
									{
										?>
									<td>
										<span class="colorpicker-box square" id="<?php echo $color ?>_box">
											<span></span>
										</span>
							<input style="display: none;" type="text" id="<?php echo $color ?>" name="<?php echo $color ?>" 
							value="<?php echo $$color  ?>" />
							
										<span class='dashicons dashicons-arrow-right'></span>
										<span class='dashicons dashicons-arrow-left'></span>		
	
										<div class="clear"></div>
									</td>
										<?php
									}
									?>
								
								 
								</tr>
								<tr>
									<td class="label"><?php _e('Hover', 'maxbuttons') ?></td>
		
		
		
									<?php foreach($hover_colors as $color) 
									{
										?>
									<td>
										<span class="colorpicker-box square" id="<?php echo $color ?>_box">
											<span></span>
										</span>
							<input style="display: none;" type="text" id="<?php echo $color ?>" name="<?php echo $color ?>" 
							value="<?php echo $$color  ?>" />
										<div class="clear"></div>
									</td>
										<?php
									}
									?>
									
		
								
									
 
								</tr>
							<!--	<tr>
									<td valign="top" style="padding-top: 20px;" class="label"><?php _e('Shortcuts', 'maxbuttons') ?></td>
									<td valign="top" style="padding-top: 20px;" colspan="6">
										<p style="margin-top: 0;"><a href="#" id="copy-normal-colors-to-hover" style="text-decoration: none;"><?php _e('Copy normal colors to hover', 'maxbuttons') ?></a></p>
										<p><a href="#" id="copy-hover-colors-to-normal" style="text-decoration: none;"><?php _e('Copy hover colors to normal', 'maxbuttons') ?></a></p>
										<p><a href="#" id="swap-normal-hover-colors" style="text-decoration: none;"><?php _e('Swap normal and hover colors', 'maxbuttons') ?></a></p>
										<p><a href="#" id="copy-invert-normal-colors" style="text-decoration: none;"><?php _e('Copy and invert normal colors', 'maxbuttons') ?></a></p>
									</td>
								</tr> --> 
							</table>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
<?php
} // admin fields			

} // class


?>
