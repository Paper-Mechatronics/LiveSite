<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package GeneratePress
 */

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 */
function generate_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'generate_page_menu_args' );

/**
 * Adds custom classes to the array of body classes.
 * @since 0.1
 */
add_filter( 'body_class', 'generate_body_classes' );
function generate_body_classes( $classes ) 
{
	// Get Customizer settings
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Add the GeneratePress class
	$classes[] = 'generatepress';
	
	// Get the layout
	$layout = generate_get_layout();
	
	// Get the footer widgets
	$widgets = generate_get_footer_widgets();
	
	// Let us know if a featured image is being used
	if ( has_post_thumbnail() ) :
		$classes[] = 'featured-image-active';
	endif;
	
	// Layout classes
	$classes[] = ( $layout ) ? $layout : 'right-sidebar';
	$classes[] = ( $generate_settings['nav_position_setting'] ) ? $generate_settings['nav_position_setting'] : 'nav-below-header';
	$classes[] = ( $generate_settings['header_layout_setting'] ) ? $generate_settings['header_layout_setting'] : 'fluid-header';
	$classes[] = ( $generate_settings['content_layout_setting'] ) ? $generate_settings['content_layout_setting'] : 'separate-containers';
	$classes[] = ( '' !== $widgets ) ? 'active-footer-widgets-' . $widgets : 'active-footer-widgets-3';
	$classes[] = ( 'enable' == $generate_settings['nav_search'] ) ? 'nav-search-enabled' : '';
	
	// Navigation alignment class
	if ( $generate_settings['nav_alignment_setting'] == 'left' ) :
		$classes[] = 'nav-aligned-left';
	elseif ( $generate_settings['nav_alignment_setting'] == 'center' ) :
		$classes[] = 'nav-aligned-center';
	elseif ( $generate_settings['nav_alignment_setting'] == 'right' ) :
		$classes[] = 'nav-aligned-right';
	else :
		$classes[] = 'nav-aligned-left';
	endif;
	
	// Header alignment class
	if ( $generate_settings['header_alignment_setting'] == 'left' ) :
		$classes[] = 'header-aligned-left';
	elseif ( $generate_settings['header_alignment_setting'] == 'center' ) :
		$classes[] = 'header-aligned-center';
	elseif ( $generate_settings['header_alignment_setting'] == 'right' ) :
		$classes[] = 'header-aligned-right';
	else :
		$classes[] = 'header-aligned-left';
	endif;
	
	// Navigation dropdown type
	if ( 'click' == $generate_settings[ 'nav_dropdown_type' ] ) {
		$classes[] = 'dropdown-click';
		$classes[] = 'dropdown-click-menu-item';
	} elseif ( 'click-arrow' == $generate_settings[ 'nav_dropdown_type' ] ) {
		$classes[] = 'dropdown-click-arrow';
		$classes[] = 'dropdown-click';
	} else {
		$classes[] = 'dropdown-hover';
	}
	
	// Adds a class of group-blog to blogs with more than 1 published author
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	return $classes;
}

/**
 * Adds custom classes to the right sidebar
 * @since 0.1
 */
add_filter( 'generate_right_sidebar_class', 'generate_right_sidebar_classes');
function generate_right_sidebar_classes( $classes )
{

	$right_sidebar_width = apply_filters( 'generate_right_sidebar_width', '25' );
	$left_sidebar_width = apply_filters( 'generate_left_sidebar_width', '25' );
	
	$right_sidebar_tablet_width = apply_filters( 'generate_right_sidebar_tablet_width', $right_sidebar_width );
	$left_sidebar_tablet_width = apply_filters( 'generate_left_sidebar_tablet_width', $left_sidebar_width );

	$classes[] = 'widget-area';
	$classes[] = 'grid-' . $right_sidebar_width;
	$classes[] = 'tablet-grid-' . $right_sidebar_tablet_width;
	$classes[] = 'grid-parent';
	$classes[] = 'sidebar';

	// Get the layout
	$layout = generate_get_layout();
	
	if ( '' !== $layout ) {
		switch ( $layout ) {
			case 'both-left' :
				$total_sidebar_width = $left_sidebar_width + $right_sidebar_width;
				$classes[] = 'pull-' . ( 100 - $total_sidebar_width );
				
				$total_sidebar_tablet_width = $left_sidebar_tablet_width + $right_sidebar_tablet_width;
				$classes[] = 'tablet-pull-' . ( 100 - $total_sidebar_tablet_width );
			break;
		}
	}

	return $classes;
	
}

/**
 * Adds custom classes to the left sidebar
 * @since 0.1
 */
add_filter( 'generate_left_sidebar_class', 'generate_left_sidebar_classes');
function generate_left_sidebar_classes( $classes )
{
	$right_sidebar_width = apply_filters( 'generate_right_sidebar_width', '25' );
	$left_sidebar_width = apply_filters( 'generate_left_sidebar_width', '25' );
	$total_sidebar_width = $left_sidebar_width + $right_sidebar_width;
	
	$right_sidebar_tablet_width = apply_filters( 'generate_right_sidebar_tablet_width', $right_sidebar_width );
	$left_sidebar_tablet_width = apply_filters( 'generate_left_sidebar_tablet_width', $left_sidebar_width );
	$total_sidebar_tablet_width = $left_sidebar_tablet_width + $right_sidebar_tablet_width;
	
	$classes[] = 'widget-area';
	$classes[] = 'grid-' . $left_sidebar_width;
	$classes[] = 'tablet-grid-' . $left_sidebar_tablet_width;
	$classes[] = 'grid-parent';
	$classes[] = 'sidebar';

	// Get the layout
	$layout = generate_get_layout();
	
	if ( '' !== $layout ) {
		switch ( $layout ) {
			case 'left-sidebar' :
				$classes[] = 'pull-' . ( 100 - $left_sidebar_width );
				$classes[] = 'tablet-pull-' . ( 100 - $left_sidebar_tablet_width );
			break;
			
			case 'both-sidebars' :
			case 'both-left' :
				$classes[] = 'pull-' . ( 100 - $total_sidebar_width );
				$classes[] = 'tablet-pull-' . ( 100 - $total_sidebar_tablet_width );
			break;
		}
	}

	return $classes;
	
}

/**
 * Adds custom classes to the content container
 * @since 0.1
 */
add_filter( 'generate_content_class', 'generate_content_classes');
function generate_content_classes( $classes )
{
	$right_sidebar_width = apply_filters( 'generate_right_sidebar_width', '25' );
	$left_sidebar_width = apply_filters( 'generate_left_sidebar_width', '25' );
	$total_sidebar_width = $left_sidebar_width + $right_sidebar_width;
	
	$right_sidebar_tablet_width = apply_filters( 'generate_right_sidebar_tablet_width', $right_sidebar_width );
	$left_sidebar_tablet_width = apply_filters( 'generate_left_sidebar_tablet_width', $left_sidebar_width );
	$total_sidebar_tablet_width = $left_sidebar_tablet_width + $right_sidebar_tablet_width;
	
	$classes[] = 'content-area';
	$classes[] = 'grid-parent';

	// Get the layout
	$layout = generate_get_layout();
	
	if ( '' !== $layout ) {
		switch ( $layout ) {
			
			case 'right-sidebar' :
				$classes[] = 'grid-' . ( 100 - $right_sidebar_width );
				$classes[] = 'tablet-grid-' . ( 100 - $right_sidebar_tablet_width );
			break;
			
			case 'left-sidebar' :
				$classes[] = 'push-' . $left_sidebar_width;
				$classes[] = 'grid-' . ( 100 - $left_sidebar_width );
				$classes[] = 'tablet-push-' . $left_sidebar_tablet_width;
				$classes[] = 'tablet-grid-' . ( 100 - $left_sidebar_tablet_width );
			break;
			
			case 'no-sidebar' :
				$classes[] = 'grid-100';
				$classes[] = 'tablet-grid-100';
			break;
			
			case 'both-sidebars' :
				$classes[] = 'push-' . $left_sidebar_width;
				$classes[] = 'grid-' . ( 100 - $total_sidebar_width );
				$classes[] = 'tablet-push-' . $left_sidebar_tablet_width;
				$classes[] = 'tablet-grid-' . ( 100 - $total_sidebar_tablet_width );
			break;
			
			case 'both-right' :
				$classes[] = 'grid-' . ( 100 - $total_sidebar_width );
				$classes[] = 'tablet-grid-' . ( 100 - $total_sidebar_tablet_width );
			break;
			
			case 'both-left' :
				$classes[] = 'push-' . $total_sidebar_width;
				$classes[] = 'grid-' . ( 100 - $total_sidebar_width );
				$classes[] = 'tablet-push-' . $total_sidebar_tablet_width;
				$classes[] = 'tablet-grid-' . ( 100 - $total_sidebar_tablet_width );
			break;
		}
	}

	return $classes;
	
}
  
/**
 * Filter in a link to a content ID attribute for the next/previous image links on image attachment pages
 */
add_filter( 'attachment_link', 'generate_enhanced_image_navigation', 10, 2 );
function generate_enhanced_image_navigation( $url, $id ) {
	if ( ! is_attachment() && ! wp_attachment_is_image( $id ) )
		return $url;

	$image = get_post( $id );
	if ( ! empty( $image->post_parent ) && $image->post_parent != $id )
		$url .= '#main';

	return $url;
}

/**
 * Adds custom classes to the header
 * @since 0.1
 */
add_filter( 'generate_header_class', 'generate_header_classes');
function generate_header_classes( $classes )
{
	
	$classes[] = 'site-header';

	// Get theme options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	$header_layout = $generate_settings['header_layout_setting'];
	
	if ( $header_layout == 'contained-header' ) :
		$classes[] = 'grid-container';
		$classes[] = 'grid-parent';
	endif;

	return $classes;
	
}

/**
 * Adds custom classes to inside the header
 * @since 0.1
 */
add_filter( 'generate_inside_header_class', 'generate_inside_header_classes');
function generate_inside_header_classes( $classes )
{
	
	$classes[] = 'inside-header';

	// Get theme options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	$header_layout = $generate_settings['header_layout_setting'];
	
	if ( $header_layout == 'fluid-header' || $header_layout == '' ) :
		$classes[] = 'grid-container';
		$classes[] = 'grid-parent';
	endif;

	return $classes;
	
}

/**
 * Adds custom classes to the navigation
 * @since 0.1
 */
add_filter( 'generate_navigation_class', 'generate_navigation_classes');
function generate_navigation_classes( $classes )
{
	
	$classes[] = 'main-navigation';

	// Get theme options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	$nav_layout = $generate_settings['nav_layout_setting'];
	
	if ( $nav_layout == 'contained-nav' ) :
		$classes[] = 'grid-container';
		$classes[] = 'grid-parent';
	endif;

	return $classes;
	
}

/**
 * Adds custom classes to the menu
 * @since 0.1
 */
add_filter( 'generate_menu_class', 'generate_menu_classes');
function generate_menu_classes( $classes )
{
	
	$classes[] = 'menu';
	$classes[] = 'sf-menu';
	return $classes;
	
}

/**
 * Adds custom classes to the footer
 * @since 0.1
 */
add_filter( 'generate_footer_class', 'generate_footer_classes');
function generate_footer_classes( $classes )
{
	$classes[] = 'site-footer';

	// Get theme options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	$footer_layout = $generate_settings['footer_layout_setting'];
	
	if ( $footer_layout == 'contained-footer' ) :
		$classes[] = 'grid-container';
		$classes[] = 'grid-parent';
	endif;

	return $classes;
	
}

/**
 * Adds custom classes to the <main> element
 * @since 1.1.0
 */
add_filter( 'generate_main_class', 'generate_main_classes');
function generate_main_classes( $classes )
{

	$classes[] = 'site-main';
	return $classes;
	
}