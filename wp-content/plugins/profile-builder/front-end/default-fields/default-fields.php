<?php 
// include individual modules
$wppb_generalSettings = get_option('wppb_general_settings', 'not_found' );
if ( ( $wppb_generalSettings != 'not_found' ) && ( $wppb_generalSettings['loginWith'] != 'email' ) )
	include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/username/username.php' );
else{
	add_filter( 'wppb_output_display_form_field', 'wppb_remove_username_field_when_login_with_email', 10, 5 );
	function wppb_remove_username_field_when_login_with_email( $bool, $field, $form_type, $role, $user_id ){
		if( $field['field'] == 'Default - Username'  )
			return false;

		return $bool;
	}
}
	
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/first-name/first-name.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/last-name/last-name.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/password/password.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/password-repeat/password-repeat.php' );

// Default contact methods were removed in WP 3.6. A filter dictates contact methods.
if ( apply_filters( 'wppb_remove_default_contact_methods', get_site_option( 'initial_db_version' ) < 23588 ) ){
	include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/aim/aim.php' );
	include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/yim/yim.php' );
	include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/jabber/jabber.php' );
}

include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/nickname/nickname.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/description/description.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/website/website.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/email/email.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/display-name/display-name.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/headings/name.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/headings/contact-info.php' );
include_once( WPPB_PLUGIN_DIR.'/front-end/default-fields/headings/about-yourself.php' );