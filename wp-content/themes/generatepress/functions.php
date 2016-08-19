<?php
/**
 * GeneratePress functions and definitions
 *
 * @package GeneratePress
 */
	
define( 'GENERATE_VERSION', '1.3.31');
define( 'GENERATE_URI', get_template_directory_uri() );
define( 'GENERATE_DIR', get_template_directory() );

add_action( 'after_setup_theme', 'generate_setup' );
if ( ! function_exists( 'generate_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
function generate_setup() 
{
	/**
	 * Make theme available for translation
	 */
	load_theme_textdomain( 'generatepress' );

	/**
	 * Add default posts and comments RSS feed links to head
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Enable support for Post Thumbnails on posts and pages
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * Register primary menu
	 */
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'generatepress' ),
	) );

	/**
	 * Enable support for Post Formats
	 */
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link', 'status' ) );
	
	/**
	 * Enable support for WooCommerce
	 */
	add_theme_support( 'woocommerce' );
	
	/**
	 * Enable support for <title> tag
	 */
	add_theme_support( 'title-tag' );
	
	/*
	 * Add HTML5 theme support
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );
	
	/*
	 * Add Logo support
	 */
	add_theme_support( 'custom-logo', array(
		'height' => false,
		'width' => false,
		'flex-height' => true,
		'flex-width' => true,
	) );
	
	/**
	 * Set the content width to something large
	 * We set a more accurate width in generate_smart_content_width()
	 */
	global $content_width;
	if ( ! isset( $content_width ) )
		$content_width = 1200; /* pixels */
		
	/*
	 * This theme styles the visual editor to resemble the theme style
	 */
	add_editor_style( 'inc/css/editor-style.css' );
}
endif; // generate_setup

/**
 * Set default options
 */
function generate_get_defaults()
{
	$generate_defaults = array(
		'hide_title' => '',
		'hide_tagline' => '',
		'logo' => '',
		'container_width' => '1100',
		'header_layout_setting' => 'fluid-header',
		'nav_alignment_setting' => 'left',
		'header_alignment_setting' => 'left',
		'nav_layout_setting' => 'fluid-nav',
		'nav_position_setting' => 'nav-below-header',
		'nav_dropdown_type' => 'hover',
		'nav_search' => 'disable',
		'content_layout_setting' => 'separate-containers',
		'layout_setting' => 'right-sidebar',
		'blog_layout_setting' => 'right-sidebar',
		'single_layout_setting' => 'right-sidebar',
		'post_content' => 'full',
		'footer_layout_setting' => 'fluid-footer',
		'footer_widget_setting' => '3',
		'back_to_top' => '',
		'background_color' => '#efefef',
		'text_color' => '#3a3a3a',
		'link_color' => '#1e73be',
		'link_color_hover' => '#000000',
		'link_color_visited' => '',
	);
	
	return apply_filters( 'generate_option_defaults', $generate_defaults );
}

/**
 * Register widgetized area and update sidebar with default widgets
 */
add_action( 'widgets_init', 'generate_widgets_init' );
function generate_widgets_init() 
{
	// Set up our array of widgets
	$widgets = array(
		__( 'Right Sidebar', 'generatepress' ) => 'sidebar-1',
		__( 'Left Sidebar', 'generatepress' ) => 'sidebar-2',
		__( 'Header', 'generatepress' ) => 'header',
		__( 'Footer Widget 1', 'generatepress' ) => 'footer-1',
		__( 'Footer Widget 2', 'generatepress' ) => 'footer-2',
		__( 'Footer Widget 3', 'generatepress' ) => 'footer-3',
		__( 'Footer Widget 4', 'generatepress' ) => 'footer-4',
		__( 'Footer Widget 5', 'generatepress' ) => 'footer-5'
	);
	
	// Loop through them to create our widget areas
	foreach ( $widgets as $widget => $id ) {
		register_sidebar( array(
			'name'          => $widget,
			'id'            => $id,
			'before_widget' => '<aside id="%1$s" class="widget inner-padding %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => apply_filters( 'generate_start_widget_title', '<h4 class="widget-title">' ),
			'after_title'   => apply_filters( 'generate_end_widget_title', '</h4>' ),
		) );
	}
}

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Build the navigation
 */
require get_template_directory() . '/inc/navigation.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load element classes
 */
require get_template_directory() . '/inc/element-classes.php';

/**
 * Load metaboxes
 */
require get_template_directory() . '/inc/metaboxes.php';

/**
 * Load options
 */
require get_template_directory() . '/inc/options.php';

/**
 * Load add-on options
 */
require get_template_directory() . '/inc/add-ons.php';

/**
 * Load WooCommerce compatibility
 */
require get_template_directory() . '/inc/woocommerce.php';

/** 
 * Figure out if we should use minified scripts or not
 * @since 1.3.29
 */
function generate_get_min_suffix() 
{
	return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
}

/**
 * Enqueue scripts and styles
 */
add_action( 'wp_enqueue_scripts', 'generate_scripts' );
function generate_scripts() 
{
	// Get our options.
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Get the minified suffix.
	$suffix = generate_get_min_suffix();
	
	// Enqueue our CSS.
	wp_enqueue_style( 'generate-style-grid', get_template_directory_uri() . "/css/unsemantic-grid{$suffix}.css", false, GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'generate-style', get_template_directory_uri() . '/style.css', false, GENERATE_VERSION, 'all' );
	wp_enqueue_style( 'generate-mobile-style', get_template_directory_uri() . "/css/mobile{$suffix}.css", false, GENERATE_VERSION, 'all' );
	wp_add_inline_style( 'generate-style', generate_base_css() );
	
	// Add the child theme CSS if child theme is active.
	if ( is_child_theme() )
		wp_enqueue_style( 'generate-child', get_stylesheet_uri(), true, filemtime( get_stylesheet_directory() . '/style.css' ), 'all' );
	
	// Font Awesome
	$icon_essentials = apply_filters( 'generate_fontawesome_essentials', false );
	$icon_essentials = ( $icon_essentials ) ? '-essentials' : false;
	wp_enqueue_style( "fontawesome{$icon_essentials}", get_template_directory_uri() . "/css/font-awesome{$icon_essentials}{$suffix}.css", false, '4.6.3', 'all' );
	
	// Add jQuery
	wp_enqueue_script( 'jquery' );
	
	// Add our mobile navigation
	wp_enqueue_script( 'generate-navigation', get_template_directory_uri() . "/js/navigation{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	
	// Add our hover or click dropdown menu scripts
	if ( 'click' == $generate_settings[ 'nav_dropdown_type' ] || 'click-arrow' == $generate_settings[ 'nav_dropdown_type' ] ) {
		wp_enqueue_script( 'generate-dropdown-click', get_template_directory_uri() . "/js/dropdown-click{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	} else {
		wp_enqueue_script( 'generate-dropdown', get_template_directory_uri() . "/js/dropdown{$suffix}.js", array( 'jquery' ), GENERATE_VERSION, true );
	}
	
	// Add our navigation search if it's enabled
	if ( 'enable' == $generate_settings['nav_search'] ) {
		wp_enqueue_script( 'generate-navigation-search', get_template_directory_uri() . "/js/navigation-search{$suffix}.js", array('jquery'), GENERATE_VERSION, true );
	}
	
	// Add the back to top script if it's enabled
	if ( 'enable' == $generate_settings['back_to_top'] ) {
		wp_enqueue_script( 'generate-back-to-top', get_template_directory_uri() . "/js/back-to-top{$suffix}.js", array('jquery'), GENERATE_VERSION, true );
	}
	
	// Move the navigation from below the content on mobile to below the header if it's in a sidebar
	if ( 'nav-left-sidebar' == $generate_settings['nav_position_setting'] || 'nav-right-sidebar' == $generate_settings['nav_position_setting'] ) {
		wp_enqueue_script( 'generate-move-navigation', get_template_directory_uri() . "/js/move-navigation{$suffix}.js", array('jquery'), GENERATE_VERSION, true );
	}
	
	// Add the threaded comments script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

/**
 * Get the layout for the current page
 */
function generate_get_layout()
{
	// Get current post
	global $post;
	
	// Get Customizer options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Set up the layout variable for pages
	$layout = $generate_settings['layout_setting'];
	
	// Get the individual page/post sidebar metabox value
	$layout_meta = ( isset( $post ) ) ? get_post_meta( $post->ID, '_generate-sidebar-layout-meta', true ) : '';
	
	// Set up BuddyPress variable
	$buddypress = false;
	if ( function_exists( 'is_buddypress' ) ) :
		$buddypress = ( is_buddypress() ) ? true : false;
	endif;

	// If we're on the single post page
	// And if we're not on a BuddyPress page - fixes a bug where BP thinks is_single() is true
	if ( is_single() && ! $buddypress ) :
		$layout = null;
		$layout = $generate_settings['single_layout_setting'];
	endif;

	// If the metabox is set, use it instead of the global settings
	if ( '' !== $layout_meta && false !== $layout_meta ) :
		$layout = $layout_meta;
	endif;
	
	// If we're on the blog, archive, attachment etc..
	if ( is_home() || is_archive() || is_search() || is_attachment() || is_tax() ) :
		$layout = null;
		$layout = $generate_settings['blog_layout_setting'];
	endif;
	
	// Finally, return the layout
	return apply_filters( 'generate_sidebar_layout', $layout );
}

/**
 * Get the footer widgets for the current page
 */
function generate_get_footer_widgets()
{
	// Get current post
	global $post;
	
	// Get Customizer options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Set up the footer widget variable
	$widgets = $generate_settings['footer_widget_setting'];
	
	// Get the individual footer widget metabox value
	$widgets_meta = ( isset( $post ) ) ? get_post_meta( $post->ID, '_generate-footer-widget-meta', true ) : '';
	
	// If we're not on a single page or post, the metabox hasn't been set
	if ( ! is_singular() ) :
		$widgets_meta = '';
	endif;
	
	// If we have a metabox option set, use it
	if ( '' !== $widgets_meta && false !== $widgets_meta ) :
		$widgets = $widgets_meta;
	endif;
	
	// Finally, return the layout
	return apply_filters( 'generate_footer_widgets', $widgets );
}

/**
 * Construct the sidebars
 * @since 0.1
 */
add_action('generate_sidebars','generate_construct_sidebars');
function generate_construct_sidebars()
{
	// Get the layout
	$layout = generate_get_layout();
	
	// When to show the right sidebar
	$rs = array('right-sidebar','both-sidebars','both-right','both-left');

	// When to show the left sidebar
	$ls = array('left-sidebar','both-sidebars','both-right','both-left');
	
	// If left sidebar, show it
	if ( in_array( $layout, $ls ) ) :
		get_sidebar('left'); 
	endif;
	
	// If right sidebar, show it
	if ( in_array( $layout, $rs ) ) :
		get_sidebar(); 
	endif;
}

add_action('generate_credits','generate_add_footer_info');
function generate_add_footer_info()
{
	?>
	<span class="copyright"><?php _e('Copyright','generatepress');?> &copy; <?php echo date('Y'); ?></span> <?php do_action('generate_copyright_line');?>
	<?php
}

add_action('generate_copyright_line','generate_add_login_attribution');
function generate_add_login_attribution()
{
	?>
	&#x000B7; <a href="<?php echo esc_url('https://generatepress.com');?>" target="_blank" title="GeneratePress" itemprop="url">GeneratePress</a>
	<?php
}

/**
 * Generate the CSS in the <head> section using the Theme Customizer
 * @since 0.1
 */
function generate_base_css()
{
	
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Start the magic
	$visual_css = array (
	
		// Body CSS
		'body'  => array(
			'background-color' => $generate_settings['background_color'],
			'color' => $generate_settings['text_color']
		),
		
		// Link CSS
		'a, a:visited' => array(
			'color'				=> $generate_settings['link_color'],
			'text-decoration' 	=> 'none'
		),
		
		// Visited link color if specified
		'a:visited' => array(
			'color' 			=> ( !empty( $generate_settings['link_color_visited'] ) ) ? $generate_settings['link_color_visited'] : null,
		),
		
		// Link hover
		'a:hover, a:focus, a:active' => array(
			'color' 			=> $generate_settings['link_color_hover'],
			'text-decoration' 	=> null
		),
		
		// Grid container
		'body .grid-container' => array(
			'max-width' => $generate_settings['container_width'] . 'px'
		)
		
	);
	
	// Output the above CSS
	$output = '';
	foreach($visual_css as $k => $properties) {
		if(!count($properties))
			continue;

		$temporary_output = $k . ' {';
		$elements_added = 0;

		foreach($properties as $p => $v) {
			if(empty($v))
				continue;

			$elements_added++;
			$temporary_output .= $p . ': ' . $v . '; ';
		}

		$temporary_output .= "}";

		if($elements_added > 0)
			$output .= $temporary_output;
	}

	$output = str_replace(array("\r", "\n"), '', $output);
	return $output;
}

/** 
 * Add viewport to wp_head
 * @since 1.1.0
 */
add_action('wp_head','generate_add_viewport');
function generate_add_viewport()
{
	echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
}

/** 
 * Add compatibility for IE8 and lower
 * @since 1.1.9
 */
add_action('wp_head','generate_ie_compatibility');
function generate_ie_compatibility()
{
	$suffix = generate_get_min_suffix();
	?>
	<!--[if lt IE 9]>
		<link rel="stylesheet" href="<?php echo get_template_directory_uri();?>/css/ie<?php echo $suffix;?>.css" />
		<script src="<?php echo get_template_directory_uri();?>/js/html5shiv<?php echo $suffix;?>.js"></script>
	<![endif]-->
	<?php
}

if ( ! function_exists( 'generate_remove_caption_padding' ) ) :
/**
 * Remove WordPress's default padding on images with captions
 *
 * @param int $width Default WP .wp-caption width (image width + 10px)
 * @return int Updated width to remove 10px padding
 */
add_filter( 'img_caption_shortcode_width', 'generate_remove_caption_padding' );
function generate_remove_caption_padding( $width ) {
	return $width - 10;
}
endif;

if ( ! function_exists( 'generate_smart_content_width' ) ) :
/**
 * Set the $content_width depending on layout of current page
 * Hook into "wp" so we have the correct layout setting from generate_get_layout()
 * Hooking into "after_setup_theme" doesn't get the correct layout setting
 */
add_action( 'wp', 'generate_smart_content_width' );
function generate_smart_content_width()
{

	global $content_width, $post;
	
	// Get Customizer options
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Get sidebar widths
	$right_sidebar_width = apply_filters( 'generate_right_sidebar_width', '25' );
	$left_sidebar_width = apply_filters( 'generate_left_sidebar_width', '25' );
	
	// Get the layout
	$layout = generate_get_layout();
	
	// Find the real content width
	if ( 'left-sidebar' == $layout ) {
		// If left sidebar is present
		$content_width = $generate_settings['container_width'] * ( ( 100 - $left_sidebar_width ) / 100 );
	} elseif ( 'right-sidebar' == $layout ) {
		// If right sidebar is present
		$content_width = $generate_settings['container_width'] * ( ( 100 - $right_sidebar_width ) / 100 );
	} elseif ( 'no-sidebar' == $layout ) {
		// If no sidebars are present
		$content_width = $generate_settings['container_width'];
	} else {
		// If both sidebars are present
		$content_width = $generate_settings['container_width'] * ( ( 100 - ( $left_sidebar_width + $right_sidebar_width ) ) / 100 );	
	}
}
endif;

if ( ! function_exists( 'generate_body_schema' ) ) :
/** 
 * Figure out which schema tags to apply to the <body> element
 * @since 1.3.15
 */
function generate_body_schema()
{
	// Set up blog variable
	$blog = ( is_home() || is_archive() || is_attachment() || is_tax() || is_single() ) ? true : false;
	
	// Set up default itemtype
	$itemtype = 'WebPage';

	// Get itemtype for the blog
	$itemtype = ( $blog ) ? 'Blog' : $itemtype;
	
	// Get itemtype for search results
	$itemtype = ( is_search() ) ? 'SearchResultsPage' : $itemtype;
	
	// Get the result
	$result = apply_filters( 'generate_body_itemtype', $itemtype );
	
	// Return our HTML
	echo "itemtype='http://schema.org/$result' itemscope='itemscope'";
}
endif;

if ( ! function_exists( 'generate_article_schema' ) ) :
/** 
 * Figure out which schema tags to apply to the <article> element
 * The function determines the itemtype: generate_article_schema( 'BlogPosting' )
 * @since 1.3.15
 */
function generate_article_schema( $type = 'CreativeWork' )
{
	// Get the itemtype
	$itemtype = apply_filters( 'generate_article_itemtype', $type );
	
	// Print the results
	echo "itemtype='http://schema.org/$itemtype' itemscope='itemscope'";
}
endif;

if ( ! function_exists( 'generate_show_excerpt' ) ) :
/** 
 * Figure out if we should show the blog excerpts or full posts
 * @since 1.3.15
 */
function generate_show_excerpt()
{
	// Get current post
	global $post;
	
	// Get Customizer settings
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Check to see if the more tag is being used
	$more_tag = apply_filters( 'generate_more_tag', @strpos( $post->post_content, '<!--more-->' ) );

	// Check the post format
	$format = ( false !== get_post_format() ) ? get_post_format() : 'standard';
	
	// Get the excerpt setting from the Customizer
	$show_excerpt = ( 'excerpt' == $generate_settings['post_content'] ) ? true : false;
	
	// If our post format isn't standard, show the full content
	$show_excerpt = ( 'standard' !== $format ) ? false : $show_excerpt;
	
	// If the more tag is found, show the full content
	$show_excerpt = ( $more_tag ) ? false : $show_excerpt;
	
	// If we're on a search results page, show the excerpt
	$show_excerpt = ( is_search() ) ? true : $show_excerpt;
	
	// Return our value
	return apply_filters( 'generate_show_excerpt', $show_excerpt );
}
endif;

if ( ! function_exists( 'generate_show_title' ) ) :
/** 
 * Check to see if we should show our page/post title or not
 * @since 1.3.18
 */
function generate_show_title()
{
	return apply_filters( 'generate_show_title', true );
}
endif;

/**
 * Migrate the old logo database entry to the new custom_logo theme mod (WordPress 4.5)
 *
 * @since 1.3.29
 */
add_action( 'after_setup_theme', 'generate_update_logo_setting' );
function generate_update_logo_setting() 
{
	// If we're not running WordPress 4.5, bail.
	if ( ! function_exists( 'the_custom_logo' ) )
		return;
	
	// If we already have a custom logo, bail.
	if ( get_theme_mod( 'custom_logo' ) )
		return;
	
	// Get our settings.
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_defaults() 
	);
	
	// Get the old logo value.
	$old_value = $generate_settings['logo'];
	
	// If there's no old value, bail.
	if ( empty( $old_value ) )
		return;
	
	// We made it this far, that means we have an old logo, and no new logo.
	
	// Let's get the ID from our old value.
	$logo = attachment_url_to_postid( $old_value );
	
	// Now let's update the new logo setting with our ID.
	if ( is_int( $logo ) )
		set_theme_mod( 'custom_logo', $logo );
	
	// Got our custom logo? Time to delete the old value
	if ( get_theme_mod( 'custom_logo' ) ) :
		$new_settings[ 'logo' ] = '';
		$update_settings = wp_parse_args( $new_settings, $generate_settings );
		update_option( 'generate_settings', $update_settings );
	endif;
}