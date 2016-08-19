var maxMedia; 

jQuery(document).ready(function($) {

/* Add button for the post editor screen + integrations */ 
var maxMedia = function() {

	callback = null;
	window_loaded =null; 
	maxm = null;
}

maxMedia.prototype.init = function() 
{
 
	this.maxm = new maxModal();
	this.maxm.init(); 
	
	$(document).on('click','.maxbutton_media_button',$.proxy(this.clickAddButton, this));
	this.callback = 'this.buttonToEditor'; // default 
}

maxMedia.prototype.setCallback = function (callback)
{ 
 	
	if (typeof callback !== 'function') 
	{
		if (typeof window[callback] === 'function')
			callback = window[callback];
		else if (typeof eval(callback) === 'function') 
		{
			callback = eval(callback); 
		} 
		else
			return false; 
	}
 
	this.callback = callback;
}

maxMedia.prototype.clickAddButton = function (e) 
{	
	e.preventDefault();
	e.stopPropagation(); 
	$(document).off('click','.pagination span'); // prevent multiple events 
	var self = this; 
	
	if (typeof $(e.target).data('callback') !== 'undefined') 
	{
		this.setCallback($(e.target).data('callback')); 
	}

	$(document).off('click', '.mb_add_button'); 
	$(document).on('click', '.mb_add_button', $.proxy( function (e) 
	{

		e.preventDefault(); 
 		var button_id = $(e.target).data('button');
		
		if (typeof self.callback == 'function')
			self.callback(button_id, $(e.target) ); 
		this.maxm.close();
	}, this) ); 
		
	$(document).on('click','.pagination span, .pagination-links a', function (e)  // eventception
	{
		e.preventDefault();
		if ( $(e.target).hasClass('disabled'))
			return false;
			
		var page = $(e.target).data('page');
		if (page <= 1) page = 1; 
		
		self.loadPostEditScreen(page); 
	}) ;
	$(document).on('change', '.input-paging', function (e)
	{
		e.preventDefault(); 
		var page = parseInt($(e.target).val()); 
		self.loadPostEditScreen(page); 
	});  
	
	this.loadPostEditScreen(0);
}


// Callback is the add function on button select
maxMedia.prototype.loadPostEditScreen = function(page)
{
	if (typeof page == 'undefined') page = 0; 
	
	var data = { action: 'getAjaxButtons', 
				paged : page, 
			 	//callback: callback,
			 }; 
	var url = mbtrans.ajax_url;
 	var self = this; 
 
 	// show load spinner if any 
 	$('.media-buttons .loading').css('visibility', 'visible'); 
 	
	$.ajax({
	  url: url,
	  data: data,
	  success: function (res) 
	  {
	  	self.putResults(res)
 	  }, 
 	  
	});

	return false;
}
maxMedia.prototype.showPostEditScreen = function ()
{
 	//if (this.window_loaded === true) 
 	//	return true; 
 		
	//var editor = this.getEditor(); 

	/*var editor_window = $('<div>', { id: 'mb_media_buttons_window_overlay' }) 
	.add( $('<div>', { id: 'mb_media_buttons_window'})
	.append( $('<div>', { class: 'header'}).html('<h3>' + mbtrans.windowtitle + '</h3><div class="close tb-close-icon"></div>') )
   .append(editor)); */

	this.maxm.parent = '#poststuff'; 
	this.maxm.newModal('media-buttons'); 
 
	this.maxm.setTitle(mbtrans.windowtitle); 
	//this.maxm.setContent('<p class="loading"><span class="spinner"></span> ' + mbtrans.loading + '</p>');
  
	// close events 
	//$(document).off('click', '#mb_media_buttons_window_overlay');
	//$(document).on('click', '#mb_media_buttons_window_overlay', $.proxy(this.removeWindow, this) );
	//$(editor_window).on('click', '.close', $.proxy(this.removeWindow, this) ); 
	
	//$('body').append(editor_window); 
	$(document).trigger('mb_media_buttons_open', this.maxm); 
	
	//editor_window.show();
 
 	this.maxm.show();
 	this.window_loaded = true;
 
}

maxMedia.prototype.putResults = function(res)
{
//	$('#mb_media_buttons').html(res);
	this.showPostEditScreen();
	 $('.media-buttons .loading').css('visibility', 'hidden'); 
	 	
	this.maxm.setContent(res);
	this.maxm.addControl('cancel', '',  $.proxy(this.maxm.close,this.maxm) );	
	this.maxm.setControls();
	this.maxm.checkResize();
	
	// events 
	$(document).on('click', ".maxbutton-preview", function(e) { e.preventDefault(); }); // prevent button clicks
	
			
	$(document).trigger('mb_media_put_results', res); 
	

}

/*
maxMedia.prototype.removeWindow = function () 
{
	this.window_loaded = false; 
	$('#mb_media_buttons_window_overlay').remove(); 
	$('#mb_media_buttons_window').remove(); 
	$(document).trigger('mb_media_buttons_close'); 

} */

maxMedia.prototype.buttonToEditor = function(button_id)
{

	window.send_to_editor('[maxbutton id="' + button_id + '"]');
}

maxMedia.prototype.getEditor = function () 
{
	
	var h2style = 'line-height: 32px; padding-left: 40px; background: url("' + mbtrans.icon  + '") no-repeat';
	var cancelstyle = 'margin-left: 10px; margin-top: 10px;'; 
	var editor = $('<div>', { id: 'maxbutton-add-button', class: 'content' }); 

		//.append( $('<a>', { 'class' : 'button-secondary', 'style' : cancelstyle }).text(mbtrans.cancel)	
	editor.append( $('<h2>', { 'style' : h2style } ).text(mbtrans.insert) )
		.append( $('<p>').text(mbtrans.select) ) 
		.append( $('<div>', { id: 'mb_media_buttons' }).append( '<div class="loading"></div>'  )
				
	
			   );

	return editor;

}

maxMedia = new maxMedia();
maxMedia.init();
window.maxMedia = maxMedia;



}); // jquery 
