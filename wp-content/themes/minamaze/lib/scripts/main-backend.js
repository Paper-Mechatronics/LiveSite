/**
 * Wordpress Admin Area Enhancements.
 *
 * Theme options are hidden / shown so the user only see's what is required.
 */

/* ----------------------------------------------------------------------------------
	ADD CLASSES TO MAIN THEME OPTIONS
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){
	jQuery( 'td fieldset' ).each(function() {
		var mainclass = jQuery(this).attr("id");
		jQuery('fieldset[id='+mainclass+']').closest("tr").attr('id', 'section-' + mainclass );
	});
});


/* ----------------------------------------------------------------------------------
	ADD CLASSES TO META THEME OPTIONS
---------------------------------------------------------------------------------- */
jQuery(document).ready(function($){
	$( 'th label' ).each(function() {
		var label = $(this),
		metaclass = label.attr( 'for' );
		if ( metaclass !== '' && metaclass !== undefined ) {
			label.closest( 'tr' ).addClass( metaclass );
		}
	});
});


/* ----------------------------------------------------------------------------------
	HIDE / SHOW PORTFOLIO OPTIONS PANEL (PAGE POST TYPE)
---------------------------------------------------------------------------------- */

jQuery(document).ready(function(){

	// Hide / show portfolio options panel on page load
	if ( jQuery( '#page_template option:selected' ).attr( 'value' ) == 'template-portfolio.php' ) {
		jQuery( '#thinkup_portfolioinfo' ).slideDown();
	} else if ( jQuery( '#page_template option:selected' ).attr( 'value' ) != 'template-portfolio.php' ) {
		jQuery( '#thinkup_portfolioinfo' ).slideUp();
	}

	jQuery( '#page_template' ).change( function() {

		// Hide / show portfolio options panel when template option is changed
		if ( jQuery( '#page_template option:selected' ).attr( 'value' ) == 'template-portfolio.php' ) {
			jQuery( '#thinkup_portfolioinfo' ).slideDown();
		} else if ( jQuery( '#page_template option:selected' ).attr( 'value' ) != 'template-portfolio.php' ) {
			jQuery( '#thinkup_portfolioinfo' ).slideUp();
		}
	});
});


/* ----------------------------------------------------------------------------------
	HIDE / SHOW OPTIONS ON PAGE LOAD
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){

	// Meta General Page Options - Enable Slider
	if(jQuery('tr._thinkup_meta_slider input').is(":checked")){
		jQuery('tr._thinkup_meta_slidername').show();
	}
	else if(jQuery('tr._thinkup_meta_slider input').not(":checked")){
		jQuery('tr._thinkup_meta_slidername').hide();
	}

	// Meta General Page Options - Page Layout (Options 3 & 4)
	if(jQuery('tr._thinkup_meta_layout input[value=option3]').is(":checked") || jQuery('tr._thinkup_meta_layout input[value=option4]').is(":checked")){
		jQuery('tr._thinkup_meta_sidebars').show();
	}
	else if(jQuery('tr._thinkup_meta_layout input[value=option3]').not(":checked") || jQuery('tr._thinkup_meta_layout input[value=option4]').not(":checked")){
		jQuery('tr._thinkup_meta_sidebars').hide();
	}
});


/* ----------------------------------------------------------------------------------
	HIDE / SHOW OPTIONS ON RADIO CLICK
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){
	jQuery('input[type=radio]').change(function() {

		/* Meta General Page Options - Page Layout (Options 3 & 4) */
		if(jQuery('tr._thinkup_meta_layout input[value=option3]').is(":checked") || jQuery('tr._thinkup_meta_layout input[value=option4]').is(":checked")){
			jQuery('tr._thinkup_meta_sidebars').show();
		}
		else if(jQuery('tr._thinkup_meta_layout input[value=option3]').not(":checked") || jQuery('tr._thinkup_meta_layout input[value=option4]').not(":checked")){
			jQuery('tr._thinkup_meta_sidebars').hide();
		}
	});
});


/* ----------------------------------------------------------------------------------
	HIDE / SHOW OPTIONS ON CHECKBOX CLICK
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){
	jQuery('input[type=checkbox]').change(function() {

		/* Meta General Page Options - Enable Slider */
		if(jQuery('tr._thinkup_meta_slider input').is(":checked")){
			jQuery('tr._thinkup_meta_slidername').show();
		}
		else if(jQuery('tr._thinkup_meta_slider input').not(":checked")){
			jQuery('tr._thinkup_meta_slidername').hide();
		}
	});
});


/* ----------------------------------------------------------------------------------
	HIDE / SHOW OPTIONS ON SIDEBAR IMAGE CLICK - MAIN OPTIONS PANEL
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){
	jQuery('input[type=radio]').change(function() {
		// Add relevant code if needed
	});
});