 
var maxAdmin;


jQuery(document).ready(function($) {
 
maxAdmin = function ()
{
 //	$ = jquery;
 	return this;
}
maxAdmin.prototype = {
	//initialized: false,
 	colorUpdateTime: true,
 	fields: null,
 	button_id: null, 
 	form_updated: false,
 	tabs: null,
 
 	
}; // MaxAdmin

maxAdmin.prototype.init = function () {
		//var colorUpdateTime = true; 
		this.button_id = $('input[name="button_id"]').val(); 
		
		// Remove events ( possibly external annoyances ) on 'our' elements
		//$('#maxbuttons').find('a').off('click'); 
		
 		// Prevents the output button from being clickable (also in admin list view )	
		$(document).on('click', ".maxbutton-preview", function(e) { e.preventDefault(); });		

		// Move to it's own file
		//$(document).on('click','.maxbutton_thickbox', $.proxy(this.clickAddButton, this));
		
 		// overview input paging
 		$('#maxbuttons .input-paging').on('change', $.proxy(this.do_paging, this));
	
		$('.manual-toggle').on('click', $.proxy(this.toggleManual, this)); 
		$('.manual-entry').draggable({ 
			cancel: 'p, li',
		}); 

 		$(document).on('submit', 'form.mb_ajax_save', $.proxy(this.formAjaxSave, this)); 
		$(document).on('click', '#maxbuttons [data-form]', $.proxy(this.buttonSubmit, this)); // remove save buttons ( outside form )
		
		// conditionals 
		$(document).on('reInitConditionals', $.proxy(this.initConditionials, this));
		this.initConditionials(); // conditional options

		// init modal : button editor screen / collections
		//$("#view_icons_modal").leanModal({closeButton: ".modal_close"});
		//$("#maxbuttons a[rel*=leanModal]").leanModal( { closeButton: ".modal_close" });
				
		/*
		****
		 ### After this only init for button main edit screen 
		****

		*/
		if ($('#new-button-form').length == 0) 
			return; 

					
		if (this.button_id > 0) {
			$("#maxbuttons .mb-message").show();
		} 
		
		this.initResponsive(); // responsive edit interface 
		
		 $("#maxbuttons .output").draggable({	
		
		});  
		//$("a[rel*=leanModal]").leanModal( { closeButton: ".modal_close" });

		$('.colorpicker-box').each(function () { 
			var input = $(this).attr('id').replace('_box',''); 
 
			$(this).children('span').css('backgroundColor',$('#' + input).val()); 
		});
		
		// init colorpicker
		$('.colorpicker-box span').on('click', this.showColorPicker ); 
		
		if ( typeof buttonFieldMap != 'undefined')
			this.fields = $.parseJSON(buttonFieldMap);
		
 
 		$('input').on('keyup change', $.proxy(this.update_preview,this)); 
 		$('select').on('change', $.proxy(this.update_preview, this)); 
 		$(document).on('colorUpdate', $.proxy(this.update_color, this)); 
		$(window).on('beforeunload', $.proxy(function () { if (this.form_updated) return maxcol_wp.leave_page; }, this));
		
		$(".button-save").click( $.proxy(function() {	
			this.saveIndicator(false); // prevent alert when saving.		
			$("#new-button-form").submit();
			return false;
		}, this) );

		$('#copy-normal-colors-to-hover').click($.proxy(this.copy_colors,this,'normal_to_hover')); 
		$('#copy-hover-colors-to-normal').click($.proxy(this.copy_colors,this,'hover_to_normal')); 
		$('#swap-normal-hover-colors').click($.proxy(this.copy_colors,this,'swap_normal_hover')); 
		$('#copy-invert-normal-colors').click($.proxy(this.copy_colors,this,'invert')); 		
		
		// Expand shortcode tabs for more examples. 
		$('.shortcode-expand').on('click', this.toggleShortcode); 
		
}; // INIT


maxAdmin.prototype.initTwitter = (!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs'));	
	
maxAdmin.prototype.copy_colors = function(action, e)
		{
			// get all colors
 
 			e.preventDefault();
 			
			var text = $("#text_color").val();
			var text_shadow = $("#text_shadow_color").val();
			var start_color = $("#gradient_start_color").val();
			var end_color = $("#gradient_end_color").val();
			var border_color = $("#border_color").val();
			var box_shadow = $("#box_shadow_color").val();
			var text_hover = $("#text_color_hover").val();
			var text_shadow_hover = $("#text_shadow_color_hover").val();
			var start_color_hover = $("#gradient_start_color_hover").val();
			var end_color_hover = $("#gradient_end_color_hover").val();
			var border_color_hover = $("#border_color_hover").val();
			var box_shadow_hover = $("#box_shadow_color_hover").val();	
		
			// copy and moving 
			if (action == 'normal_to_hover' || action == 'invert')
			{
				text_hover = text; 
				text_shadow_hover = text_shadow; 
				start_color_hover = start_color; 
				end_color_hover = end_color; 
				border_color_hover = border_color; 
				box_shadow_hover = box_shadow; 
			}
			if (action == 'hover_to_normal') 
			{
				text = text_hover; 
				text_shadow = text_shadow_hover; 
				start_color = start_color_hover; 
				end_color = end_color_hover; 
				border_color = border_color_hover; 
				box_shadow = box_shadow_hover; 
			}
			if (action == 'swap_normal_hover') 
			{
				var tmp; 
				tmp = text; 
				text = text_hover; 
				text_hover = tmp; 
				
				tmp = text_shadow; 
				text_shadow = text_shadow_hover; 
				text_shadow_hover = tmp; 
				
				tmp = start_color; 
				start_color = start_color_hover; 
				start_color_hover = tmp; 
				
				tmp = end_color; 
				end_color = end_color_hover; 
				end_color_hover = tmp; 
				
				tmp = border_color; 
				border_color = border_color_hover; 
				border_color_hover = tmp; 
				
				tmp = box_shadow;
				box_shadow = box_shadow_hover; 
				box_shadow_hover = tmp; 
			}
			if (action == 'invert') // actual inversion
			{
				end_color_hover = start_color; 
				start_color_hover = end_color; 
			
			}
		
			// put all colors back	
			$("#text_color").val(text);
			$("#text_shadow_color").val(text_shadow)
			$("#gradient_start_color").val(start_color);
			$("#gradient_end_color").val(end_color);
			$("#border_color").val(border_color);
			$("#box_shadow_color").val(box_shadow);
			$("#text_color_hover").val(text_hover);
			$("#text_shadow_color_hover").val(text_shadow_hover);
			$("#gradient_start_color_hover").val(start_color_hover);
			$("#gradient_end_color_hover").val(end_color_hover);
			$("#border_color_hover").val(border_color_hover);
			$("#box_shadow_color_hover").val(box_shadow_hover);		

 
			$(document).trigger('colorUpdate', [ $('#text_color'), text]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#text_shadow_color'), text_shadow]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#gradient_start_color'), start_color]); 
			this.colorUpdateTime = true;	
			$(document).trigger('colorUpdate', [ $('#gradient_end_color'), end_color]); 
			this.colorUpdateTime = true;	
			$(document).trigger('colorUpdate', [ $('#border_color'), border_color]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#box_shadow_color'), box_shadow]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#text_color_hover'), text_hover]);
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#text_shadow_color_hover'), text_shadow_hover]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#gradient_start_color_hover'), start_color_hover]); 
			this.colorUpdateTime = true;	
			$(document).trigger('colorUpdate', [ $('#gradient_end_color_hover'), end_color_hover]); 
			this.colorUpdateTime = true;	
			$(document).trigger('colorUpdate', [ $('#border_color_hover'), border_color_hover]); 	
			this.colorUpdateTime = true;
			$(document).trigger('colorUpdate', [ $('#box_shadow_color_hover'), box_shadow_hover]); 	
																		
			$("#text_color_box span").css("backgroundColor", text);
			$("#text_shadow_color_box span").css("backgroundColor",text_shadow)
			$("#gradient_start_color_box span").css("backgroundColor",start_color);
			$("#gradient_end_color_box span").css("backgroundColor",end_color);
			$("#border_color_box span").css("backgroundColor",border_color);
			$("#box_shadow_color_box span").css("backgroundColor",box_shadow);
			$("#text_color_hover_box span").css("backgroundColor",text_hover);
			$("#text_shadow_color_hover_box span").css("backgroundColor",text_shadow_hover);
			$("#gradient_start_color_hover_box span").css("backgroundColor",start_color_hover);
			$("#gradient_end_color_hover_box span").css("backgroundColor",end_color_hover);
			$("#border_color_hover_box span").css("backgroundColor",border_color_hover);
			$("#box_shadow_color_hover_box span").css("backgroundColor",box_shadow_hover);						
};


maxAdmin.prototype.showColorPicker = function(e)
		{
				$(this).mbColpick({
				//flat: true, 
				layout: 'rgbhex',
				submit: false, 
				colorScheme: 'dark', 
				height: 220, 
			//	flat: true, 
				
				'onBeforeShow': function () { 
					var target = $(this).parent().attr('id'); 
					target = target.replace('_box',''); 
 
					var val = $('#' + target).val();
 
					$('#colorpicker_current').val(target);
					if (typeof val == 'undefined' || val == '') 
						val = '#ffffff';
					
					$(this).mbColpickSetColor(val); 
				},
				 'onChange': function(hsb, hex, rgb, el) {

				 			var current_id = $('#colorpicker_current').val();
 
							var target = $('#' + current_id ); 
							 
 
							$('#' + current_id).attr('value', '#' + hex);
							$('#' + current_id + '_box span').css('background-color', '#' + hex);	
							$(document).trigger('colorUpdate', [target, hex]); 			
				},
				'onShow': function(colpkr) { $(colpkr).fadeIn(500); $(colpkr).css('z-index',500); return false;  },
				'onHide': function(colpkr) { $(colpkr).fadeOut(500); return false; },
										
			});
			

			$(this).mbColpickShow(e);
};
		
maxAdmin.prototype.repaint_preview = function () 
{
	$('.mb_tab input[type="text"]').trigger('change');
	$('.mb_tab input[type="number"]').trigger('change');	 
	$('.mb_tab select').trigger('change'); 
	$('.mb_tab input[type="hidden"]').trigger('change'); 
	$('.mb_tab input[type="radio"]:checked').trigger('change'); 
	$('.mb_tab input[type="checkbox"]:checked').trigger('change'); 
	
	$(document).trigger('colorUpdate', ['#text_color', $('#text_color').val() ]);
	$(document).trigger('colorUpdate', ['#text_color_hover', $('#text_color_hover').val() ]);	
	
}
		
maxAdmin.prototype.update_preview = function(e) 
		{

			e.preventDefault();
			this.saveIndicator(true); 
			var target = $(e.target); 
			
			// migration to data field			
			var field = $(target).data('field'); 
			if (typeof field == 'undefined')
				var id = $(target).attr('id'); // this should change to be ready for the option to have two the same fields on multi locations.
			else
				var id = field;

			var data = this.fields[id]; 
 
			if (typeof data == 'undefined') 
				return; // field doesn't have updates 
 
			if (typeof data.css != 'undefined') 		
			{
 
				value = target.val(); 
				
				
				if (typeof data.css_unit != 'undefined' && value.indexOf(data.css_unit) == -1) 
					value += data.css_unit;
			
				// a target that is checkbox but not checked should unset (empty) value. 
				if (target.is(':checkbox') && ! target.is(':checked') ) 
					value = ''; 

				this.putCSS(data, value);
			}
			if (typeof data.attr != 'undefined') 
			{
				$('.output .result').find('a').attr(data.attr, target.val());
			}
			if (typeof data.func != 'undefined')
			{
 
				eval('this.'+ data.func + '(target)');
			}
		};
		
maxAdmin.prototype.putCSS = function(data,value,state) 
{
	state = state || 'both';
	 
	var element = '.maxbutton';  
	if (state == 'hover') 
		element = 'a.hover '; 
	else if(state == 'normal') 
		element = 'a.normal '; 
	 
	if (typeof data.csspart != 'undefined') 
	{
		var parts = data.csspart.split(",");
		for(i=0; i < parts.length; i++)
		{
			var cpart = parts[i]; 
			//var fullpart = element; 
			var fullpart = element + " ." + cpart;
			/*			
			if ( cpart.indexOf(':hover') !== -1 ) 
			{
				fullpart += cpart.replace(':hover','').trim(); 
			}
			else
				fullpart += ' .maxbutton-' + this.button_id + cpart; 

			*/
  				$('.output .result').find(fullpart).css(data.css, value); 
		  }
	}
	else
		$('.output .result').find(element).css(data.css, value); 
		

}
		
maxAdmin.prototype.update_color = function(event, target, color)
		{
			if (! this.colorUpdateTime) return; // preventing event flood
			this.colorUpdateTime = false;
			setTimeout($.proxy(function() { this.colorUpdateTime = true; },this),250); 
			event.preventDefault();

			this.saveIndicator(true); 			
			if (color.indexOf('#') === -1)
				color = '#' + color; 
				
			var id = $(target).attr('id');

			
			if(id.indexOf('box_shadow') !== -1)
			{
				this.updateBoxShadow(target); 
			}
			else if(id.indexOf('text_shadow') !== -1)
			{
				this.updateTextShadow(target); 
			}			
			else if (id.indexOf('gradient') !== -1)
			{
				if (id.indexOf('hover') == -1)
					this.updateGradient();
				else
					this.updateGradient(true);			
			}
			else if (id == 'button_preview')
			{
				$(".output .result").css('backgroundColor',  color); 
			}
			else  // simple update
			{

				if (id.indexOf('hover') == -1)
				{	
					state = 'normal';
				}
				else
				{
					state = 'hover'; 
				}
				
				var data = this.fields[id]; 
				
				
				this.putCSS(data, color, state);	
				return;
			}
 

		};
		
maxAdmin.prototype.updateGradient = function(hover)
		{
			hover = hover || false;
			
			var hovtarget = ''; 	
			if (hover)
				hovtarget = "_hover"; 

				
			var stop = parseInt($('#gradient_stop').val()); 

			
			if (isNaN(stop) )
				stop = 45;
				 
			var start = this.hexToRgb($('#gradient_start_color' + hovtarget).val());
			var end = this.hexToRgb($('#gradient_end_color' + hovtarget).val());
			var startop = parseInt($('#gradient_start_opacity' + hovtarget).val());
			var endop = parseInt($('#gradient_end_opacity' + hovtarget).val());
 
 			if(isNaN(startop)) startop = 100; 
 			if(isNaN(endop)) endop = 100;
 			
			if (!hover)
				var button = $('.output .result').find('a.normal'); 			
			else
				var button = $('.output .result').find('a.hover');


 			
					
			button.css("background", "linear-gradient( rgba(" + start + "," + (startop/100) + ") " + stop + "%," + " rgba(" + end + "," + (endop/100) + ") )"); 
			button.css("background", "-moz-linear-gradient( rgba(" + start + "," + (startop/100) + ") " + stop + "%," + " rgba(" + end + "," + (endop/100) + ") )"); 
			button.css("background", "-o-linear-gradient( rgba(" + start + "," + (startop/100) + ") " + stop + "%," + " rgba(" + end + "," + (endop/100) + ") )"); 
			button.css("background", "-webkit-gradient(linear, left top, left bottom, color-stop(" +stop+ "%, rgba(" + start + "," + (startop/100) + ")), color-stop(1, rgba(" + end + "," + (endop/100) + ") ));"); 
			
			 		
		}
		
maxAdmin.prototype.hexToRgb = function(hex) {
 
			hex = hex.replace('#','');
			var bigint = parseInt(hex, 16);
			var r = (bigint >> 16) & 255;
			var g = (bigint >> 8) & 255;
			var b = bigint & 255;
 
			return r + "," + g + "," + b;
		}
		
maxAdmin.prototype.updateBoxShadow = function (target)
		{
			target = target || null;

			var left = $("#box_shadow_offset_left").val();
			var top = $("#box_shadow_offset_top").val();
			var width = $("#box_shadow_width").val();						
			
			var color = $("#box_shadow_color").val();
			var hovcolor = $("#box_shadow_color_hover").val();
			
			$('.output .result').find('a.normal').css("boxShadow",left + 'px ' + top + 'px ' + width + 'px ' + color);	
			$('.output .result').find('a.hover').css("boxShadow",left + 'px ' + top + 'px ' + width + 'px ' + hovcolor);		
		}
		
maxAdmin.prototype.updateTextShadow = function(target,hover)
		{
			hover = hover || false; 

			var left = $("#text_shadow_offset_left").val();
			var top = $("#text_shadow_offset_top").val();
			var width = $("#text_shadow_width").val();						
			
			var color = $("#text_shadow_color").val();
			var hovcolor = $("#text_shadow_color_hover").val();
		
			var id = $(target).attr('id');
			var data = this.fields[id]; 
	
			data.css = 'textShadow'; 
			
			var value = left + 'px ' + top + 'px ' + width + 'px ' + color; 
			this.putCSS(data, value, 'normal'); 
			
			value = left + 'px ' + top + 'px ' + width + 'px ' + hovcolor;
			this.putCSS(data, value, 'hover'); 
			
		}
		
maxAdmin.prototype.updateAnchorText = function (target)
		{
			var preview_text = $('.output .result').find('a .mb-text');

			// This can happen when the text is removed, button is saved, so the preview doesn't load the text element. 
			if (preview_text.length === 0) 
			{	
				$('.output .result').find('a').append('<span class="mb-text"></span>'); 
			$('.output .result').find('a .mb-text').css({'display':'block','line-height':'1em','box-sizing':'border-box'}); 
			
				this.repaint_preview();
			}
			$('.output .result').find('a .mb-text').text(target.val());
		}
		
maxAdmin.prototype.updateGradientOpacity = function(target)
		{
			this.updateGradient(true);
			this.updateGradient(false);
		}

maxAdmin.prototype.updateDimension = function (target)
{
	var dimension = $(target).val(); 
	var id = $(target).attr('id'); 
	var data = this.fields[id]; 
	if (dimension > 0) 	
		this.putCSS(data, dimension);
	else
		this.putCSS(data, 'auto'); 
}
	


maxAdmin.prototype.initResponsive = function()
{
	this.checkAutoQuery();	
	$('input[name="auto_responsive"]').on('click', $.proxy(this.checkAutoQuery,this)); 
	$('.add_media_query').on('click', $.proxy(this.addMediaQuery, this)); 
	//$('.removebutton').on('click', ); 
	$(document).on('click', '.removebutton', $.proxy(this.removeMediaQuery, this)); 
	
}	
maxAdmin.prototype.checkAutoQuery = function()
{
	if ( $('input[name="auto_responsive"]').is(':checked') )
	{

		$('.media_queries_options').hide(); 
	}
	else 
	{
		$('.media_queries_options').show(); 
		
	}
}	

maxAdmin.prototype.addMediaQuery = function() 
{
	this.saveIndicator(true); 
	var new_option = $('.media_option_prot').children().clone();
 
	var new_query = $("#new_query").val(); 
	var new_title = $("#new_query :selected").text(); 
	var new_desc = $("#media_desc").children('#' + new_query).text();
 
	$(new_option).data('query', new_query); 
	$(new_option).children('input[name="media_query[]"]').val(new_query);
	$(new_option).children('.title').text(new_title); 
	$(new_option).children('.description').text(new_desc);
	
	if (new_query !== 'custom') 
		$(new_option).children('.custom').hide(); 

	var new_index = $('input[name="next_media_index"]').val();
 
	$(new_option).find('select, input').each(function () { 
 
		name = $(this).attr('name'); 
		id = $(this).attr('id');
		if (typeof id !== 'undefined')
			$(this).attr('id', id.replace('[]','[' + new_index + ']'));
		$(this).attr('name', name.replace('[]','[' + new_index + ']'));
	})
	
	 new_index = parseInt(new_index);
 
	$('input[name="next_media_index"]').val( (new_index+1) ); 

	if (new_query !== 'custom')
	{	
		$('#new_query :selected').prop('disabled', true);
		$('#new_query :selected').prop('selected', false);
	}
	$('.media_queries_options .new_query_space').append(new_option);
 
}

maxAdmin.prototype.removeMediaQuery = function(e) 
{
	var target = e.target;

	var query = $(target).parents('.media_query').data('query'); 
	$(target).parents('.media_query').fadeOut(function() { $(this).remove() } ); 
	
	$('#new_query option[value="' + query + '"]').prop('disabled', false);
}

maxAdmin.prototype.do_paging = function(e)
{
	var page = parseInt($(e.target).val()); 

	if (page <= parseInt($(e.target).attr('max')) )
	{
		var url = $(e.target).data("url"); 
		window.location = url + "&paged=" + page;

	}
}


maxAdmin.prototype.toggleShortcode = function (e)
{
	if ($('.shortcode-expand').hasClass('closed'))
	{
		$(' .mb-message.shortcode .expanded').css('display','inline-block');
		$('.shortcode-expand span').removeClass('dashicons-arrow-down').addClass('dashicons-arrow-up'); 
		$('.shortcode-expand').removeClass('closed').addClass('open');
	}
	else
	{
		$(' .mb-message.shortcode .expanded').css('display','none');
		$('.shortcode-expand span').addClass('dashicons-arrow-down').removeClass('dashicons-arrow-up'); 
		$('.shortcode-expand').addClass('closed').removeClass('open');	
	}
 
}

maxAdmin.prototype.toggleManual = function (e)
{
	e.preventDefault();
	var $target = $(e.target); 
	 
	var subject = $target.data("target"); 
	var $newWindow = $('.manual-entry[data-manual="' + subject + '"]'); 
 
	if ($newWindow.is(':visible')) 
	{
		$newWindow.hide(); 
		return true;
	}

	var offset = $('[data-options="' + subject + '"]').position() ; 
	// top + height to position under manual link.
	var top = offset.top + $target.height();
	
	$newWindow.css('top', top); 
	$newWindow.css('right',15);
	$newWindow.css('left', 'auto');
 
	$newWindow.show();
}

maxAdmin.prototype.initConditionials = function () 
{
	var mAP = this; 


	$('.conditional-option').each(function () { 
		var condition  = $(this).data('show');
		var target = condition.target; 
		var values = condition.values; 
		var self = this; 
 
		$(document).on('change','[name="' + target + '"]', {child: this, values: values}, $.proxy(mAP.updateConditional, mAP) );
		$('[name="' + target + '"]').trigger('change'); 
	}); 


}

maxAdmin.prototype.updateConditional = function (event)
{
	var data = event.data; 
 
	var cond_values = data.values; 
	var cond_child = data.child;
	
	var value = $(event.currentTarget).val(); 
	
	if (cond_values.indexOf(value) >= 0)
	{
 
		$(cond_child).show();
	}
	else
	{
		$(cond_child).hide();
	}

}

maxAdmin.prototype.saveIndicator = function(toggle)
{
	if (toggle)
		this.form_updated = true;
	else
		this.form_updated = false;
}

// General AJAX form save
maxAdmin.prototype.formAjaxSave = function (e)
{
	e.preventDefault(); 
	var url = mb_ajax.ajaxurl;
	var form = $(e.target); 

	var data = form.serialize();

	
	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
 	  
	}).done($.proxy(this.saveDone, this));
}

maxAdmin.prototype.buttonSubmit = function (e)
{	
	e.preventDefault(); 
	$('[data-form]').prop('disabled', true);
	var formName =  $(e.target).data('form'); 
	$('#' + formName).submit();

} 

maxAdmin.prototype.saveDone = function (res)
{
	$('[data-form]').prop('disabled', false);
	
	var json = $.parseJSON(res);
	
	var result = json.result;
	var title = json.title; 

	
	var collection_id = json.data.id; 
 
	if (typeof json.data.new_nonce !== 'undefined')
	{
		var nonce = json.data.new_nonce; 
	 	$('input[name="nonce"]').val(json.data.new_nonce);
	}
	
	if (result)
	{
		// if collection is new - add collection_id to the field
		$('input[name="collection_id"]').val(collection_id); 
		
		// replace the location to the correct collection
		var href = window.location.href; 
		if (href.indexOf('collection_id') === -1)
			window.history.replaceState({}, '', href + '&collection_id=' + collection_id); 
		
		// trigger other updates if needed
		$(document).trigger('mbFormSaved');
		
		// update previous selection to current state;
		var order = $('input[name="sorted"]').val();
		$('input[name="previous_selection"]').val(order);
		
		// in case the interface needs to be reloaded.  
		if (json.data.reload)
		{
			document.location.reload(true);
		}
		
	}
	if (! result)
	{
		$modal = window.maxFoundry.maxmodal; 
		$modal.newModal('collection_error');
		$modal.setTitle(title);
		$modal.setContent(json.body);
 
		$modal.setControls('<button class="modal_close button-primary">' + json.close_text + '</button>'); 		
		$modal.show(); 

	}
}


}); /* END OF JQUERY */


