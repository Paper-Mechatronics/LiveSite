(function( $ ) {

	$(document).ready(function (){

		// Only needed on customizer page - theme options page handled using Redux core customization
		if( jQuery( 'body' ).hasClass( 'wp-customizer' ) ) {

			// ----------------------------------------------------------------------------------------------------------
			// 1. UPGRADE NOW BUTTON
			// ----------------------------------------------------------------------------------------------------------

			$( '#customize-header-actions' ).after( '<div id="customize-thinkup-upgrade" class=""><p><a href="//www.thinkupthemes.com/themes/minamaze/" target="_blank" class="promotion-button" style="">Upgrade Now</a></p></div>' );


			// ----------------------------------------------------------------------------------------------------------
			// 2. UPGRADE NOW TAB
			// ----------------------------------------------------------------------------------------------------------

			// Add active class to customizer
			$('body.wp-customizer #accordion-section-thinkup_section_upgrade > h3').click(function(e){

				var target_control = '#customize-controls';

				$( target_control ).addClass( 'thinkup-width-950' );
			});

			// Remove width classed WordPress v4.3+
			$('body.wp-customizer #accordion-section-thinkup_section_upgrade .customize-section-back' ).click(function(e){ 

				var target_control = '#customize-controls';
				
				$( target_control ).removeClass( 'thinkup-width-950' );
			});

			// Remove width classed WordPress pre v4.3
			$( 'body.wp-customizer #customize-header-actions .primary-actions > .control-panel-back' ).click(function(e){ 

				var target_control = '#customize-controls';
				
				$( target_control ).removeClass( 'thinkup-width-950' );
			});

		}

	});

})( jQuery );
