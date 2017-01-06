<?php
/*
 WARNING: This is a core Generate file. DO NOT edit
 this file under any circumstances. Please do all modifications
 in the form of a child theme.
 */

/**
 * If Generate Typography isn't activated, set the defaults
 *
 * This file is a core Generate file and should not be edited.
 *
 * @package  GeneratePress
 * @author   Thomas Usborne
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     http://www.generatepress.com
 */
 
if ( !function_exists('generate_get_default_fonts') && !function_exists('generate_font_css') && !function_exists('generate_display_google_fonts') ) :
	/**
	 * Set default options
	 */
	function generate_get_default_fonts()
	{
		$generate_font_defaults = array(
			'font_body' => 'Open Sans',
			'body_font_weight' => 'normal',
			'body_font_transform' => 'none',
			'body_font_size' => '17',
			'font_site_title' => 'inherit',
			'site_title_font_weight' => 'bold',
			'site_title_font_transform' => 'none',
			'site_title_font_size' => '45',
			'mobile_site_title_font_size' => '30',
			'font_site_tagline' => 'inherit',
			'site_tagline_font_weight' => 'normal',
			'site_tagline_font_transform' => 'none',
			'site_tagline_font_size' => '15',
			'font_navigation' => 'inherit',
			'navigation_font_weight' => 'normal',
			'navigation_font_transform' => 'none',
			'navigation_font_size' => '15',
			'font_widget_title' => 'inherit',
			'widget_title_font_weight' => 'normal',
			'widget_title_font_transform' => 'none',
			'widget_title_font_size' => '20',
			'widget_content_font_size' => '17',
			'font_heading_1' => 'inherit',
			'heading_1_weight' => '300',
			'heading_1_transform' => 'none',
			'heading_1_font_size' => '40',
			'mobile_heading_1_font_size' => '30',
			'font_heading_2' => 'inherit',
			'heading_2_weight' => '300',
			'heading_2_transform' => 'none',
			'heading_2_font_size' => '30',
			'mobile_heading_2_font_size' => '25',
			'font_heading_3' => 'inherit',
			'heading_3_weight' => 'normal',
			'heading_3_transform' => 'none',
			'heading_3_font_size' => '20',
			'font_heading_4' => 'inherit',
			'heading_4_weight' => 'normal',
			'heading_4_transform' => 'none',
			'heading_4_font_size' => '15',
			'footer_font_size' => '16'
		);
		
		return apply_filters( 'generate_font_option_defaults', $generate_font_defaults );
	}
	/**
	 * Generate the CSS in the <head> section using the Theme Customizer
	 * @since 0.1
	 */
	function generate_font_css()
	{

		$generate_settings = wp_parse_args( 
			get_option( 'generate_settings', array() ), 
			generate_get_default_fonts() 
		);
		
		// Get our sub-navigation font size
		$subnav_font_size = $generate_settings['navigation_font_size'] >= 17 ? $generate_settings['navigation_font_size'] - 3 : $generate_settings['navigation_font_size'] - 1;
		
		// Create all of our font family entries
		$body_family = generate_get_font_family_css( 'font_body', 'generate_settings', generate_get_default_fonts() );
		$site_title_family = generate_get_font_family_css( 'font_site_title', 'generate_settings', generate_get_default_fonts() );
		$site_tagline_family = generate_get_font_family_css( 'font_site_tagline', 'generate_settings', generate_get_default_fonts() );
		$navigation_family = generate_get_font_family_css( 'font_navigation', 'generate_settings', generate_get_default_fonts() );
		$widget_family = generate_get_font_family_css( 'font_widget_title', 'generate_settings', generate_get_default_fonts() );
		$h1_family = generate_get_font_family_css( 'font_heading_1', 'generate_settings', generate_get_default_fonts() );
		$h2_family = generate_get_font_family_css( 'font_heading_2', 'generate_settings', generate_get_default_fonts() );
		$h3_family = generate_get_font_family_css( 'font_heading_3', 'generate_settings', generate_get_default_fonts() );
		
		// Start the magic
		$visual_css = array(
		
			// Body font
			'body, button, input, select, textarea' => array(
				'font-family' => $body_family,
				'font-weight' => 'normal' == $generate_settings['body_font_weight'] ? '' : $generate_settings['body_font_weight'],
				'text-transform' => 'none' == $generate_settings['body_font_transform'] ? '' : $generate_settings['body_font_transform'],
				'font-size' => $generate_settings['body_font_size'] . 'px'
			),
			
			// Main title font
			'.main-title' => array(
				'font-family' => $site_title_family,
				'font-weight' => 'normal' == $generate_settings['site_title_font_weight'] ? '' : $generate_settings['site_title_font_weight'],
				'text-transform' => 'none' == $generate_settings['site_title_font_transform'] ? '' : $generate_settings['site_title_font_transform'],
				'font-size' => $generate_settings['site_title_font_size'] . 'px'
			),
			
			// Main tagline font
			'.site-description' => array(
				'font-family' => $site_tagline_family,
				'font-weight' => 'normal' == $generate_settings['site_tagline_font_weight'] ? '' : $generate_settings['site_tagline_font_weight'],
				'text-transform' => 'none' == $generate_settings['site_tagline_font_transform'] ? '' : $generate_settings['site_tagline_font_transform'],
				'font-size' => $generate_settings['site_tagline_font_size'] . 'px'
			),
			
			// Navigation font
			'.main-navigation a, .menu-toggle' => array(
				'font-family' => $navigation_family,
				'font-weight' => 'normal' == $generate_settings['navigation_font_weight'] ? '' : $generate_settings['navigation_font_weight'],
				'text-transform' => 'none' == $generate_settings['navigation_font_transform'] ? '' : $generate_settings['navigation_font_transform'],
				'font-size' => $generate_settings['navigation_font_size'] . 'px'
			),
			
			'.main-navigation .main-nav ul ul li a' => array(
				'font-size' => $subnav_font_size . 'px'
			),
			
			// Widget title font
			'.widget-title' => array(
				'font-family' => $widget_family,
				'font-weight' => 'normal' == $generate_settings['widget_title_font_weight'] ? '' : $generate_settings['widget_title_font_weight'],
				'text-transform' => 'none' == $generate_settings['widget_title_font_transform'] ? '' : $generate_settings['widget_title_font_transform'],
				'font-size' => $generate_settings['widget_title_font_size'] . 'px'
			),
			
			// Widget font size
			'.sidebar .widget, .footer-widgets .widget' => array(
				'font-size' => $generate_settings['widget_content_font_size'] . 'px'
			),
			
			// Heading 1 font
			'h1' => array(
				'font-family' => $h1_family,
				'font-weight' => 'normal' == $generate_settings['heading_1_weight'] ? '' : $generate_settings['heading_1_weight'],
				'text-transform' => 'none' == $generate_settings['heading_1_transform'] ? '' : $generate_settings['heading_1_transform'],
				'font-size' => $generate_settings['heading_1_font_size'] . 'px'
			),
			
			// Heading 2 font
			'h2' => array(
				'font-family' => $h2_family,
				'font-weight' => 'normal' == $generate_settings['heading_2_weight'] ? '' : $generate_settings['heading_2_weight'],
				'text-transform' => 'none' == $generate_settings['heading_2_transform'] ? '' : $generate_settings['heading_2_transform'],
				'font-size' => $generate_settings['heading_2_font_size'] . 'px'
			),
			
			// Heading 3 font
			'h3' => array(
				'font-family' => $h3_family,
				'font-weight' => 'normal' == $generate_settings['heading_3_weight'] ? '' : $generate_settings['heading_3_weight'],
				'text-transform' => 'none' == $generate_settings['heading_3_transform'] ? '' : $generate_settings['heading_3_transform'],
				'font-size' => $generate_settings['heading_3_font_size'] . 'px'
			),
			
			// Footer font
			'.site-info' => array(
				'font-size' => $generate_settings['footer_font_size'] . 'px'
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
		
		$mobile = apply_filters( 'generate_mobile_breakpoint', '768px' );
		$mobile_site_title = ( isset( $generate_settings[ 'mobile_site_title_font_size' ] ) ) ? $generate_settings[ 'mobile_site_title_font_size' ] : '30';
		$mobile_h1 = ( isset( $generate_settings[ 'mobile_heading_1_font_size' ] ) ) ? $generate_settings[ 'mobile_heading_1_font_size' ] : '30';
		$mobile_h2 = ( isset( $generate_settings[ 'mobile_heading_2_font_size' ] ) ) ? $generate_settings[ 'mobile_heading_2_font_size' ] : '25';
		$output .= '@media (max-width:' . $mobile . ') {
			.main-title {
				font-size: ' . $mobile_site_title . 'px;
			}
			h1 {
				font-size: ' . $mobile_h1 . 'px;
			}
			
			h2 {
				font-size: ' . $mobile_h2 . 'px;
			}
		}';
		$output = str_replace(array("\r", "\n", "\t"), '', $output);
		return $output;
	}
	
	/**
	 * Enqueue scripts and styles
	 */
	add_action( 'wp_enqueue_scripts', 'generate_typography_scripts', 50 );
	function generate_typography_scripts() {

		wp_add_inline_style( 'generate-style', generate_font_css() );
	
	}
	
	/** 
	 * Add Google Fonts to wp_head if needed
	 * @since 0.1
	 */
	add_action('wp_enqueue_scripts','generate_display_google_fonts', 0);
	function generate_display_google_fonts($google_fonts) {
		
		if ( is_admin() )
			return;
		
		// Grab our options
		$generate_settings = wp_parse_args( 
			get_option( 'generate_settings', array() ), 
			generate_get_default_fonts() 
		);
		
		// List our non-Google fonts
		$not_google = array(
			'inherit',
			'Arial,+Helvetica,+sans-serif',
			'Century+Gothic',
			'Comic+Sans+MS',
			'Courier+New',
			'Georgia,+Times+New+Roman,+Times,+serif',
			'Helvetica',
			'Impact',
			'Lucida+Console',
			'Lucida+Sans+Unicode',
			'Palatino+Linotype',
			'Tahoma,+Geneva,+sans-serif',
			'Trebuchet+MS,+Helvetica,+sans-serif',
			'Verdana,+Geneva,+sans-serif'
		);
		
		// Grab our font family settings
		$font_settings = array(
			'font_body',
			'font_site_title',
			'font_site_tagline',
			'font_navigation',
			'font_widget_title',
			'font_heading_1',
			'font_heading_2',
			'font_heading_3'
		);
		
		// Create our Google Fonts array
		$google_fonts = array();
		if ( ! empty( $font_settings ) ) :
		
			foreach ( $font_settings as $key ) {
			
				// If our value is still using the old format, fix it
				if ( strpos( $generate_settings[$key], ':' ) !== false )
					$generate_settings[$key] = current( explode( ':', $generate_settings[$key] ) );
			
				// Replace the spaces in the names with a plus
				$value = str_replace( ' ', '+', $generate_settings[$key] );
				
				// Grab the variants using the plain name
				$variants = generate_get_google_font_variants( $generate_settings[$key] );
				
				// If we have variants, add them to our value
				$value = ! empty( $variants ) ? $value . ':' . $variants : $value;
				
				// Make sure we don't add the same font twice
				if( ! in_array( $value, $google_fonts ) ) {
					$google_fonts[] = $value;
				}
				
			}
			
		endif;

		// Ignore any non-Google fonts
		$google_fonts = array_diff($google_fonts, $not_google);
		
		// Separate each different font with a bar
		$google_fonts = implode('|', $google_fonts);
		
		// Apply a filter to the output
		$google_fonts = apply_filters( 'generate_typography_google_fonts', $google_fonts );
		
		// Get the subset
		$subset = apply_filters( 'generate_fonts_subset','' );
		
		// Set up our arguments
		$font_args = array();
		$font_args[ 'family' ] = $google_fonts;
		if ( '' !== $subset )
			$font_args[ 'subset' ] = urlencode( $subset );
		
		// Create our URL using the arguments
        $fonts_url = add_query_arg( $font_args, '//fonts.googleapis.com/css' );
		
		// Enqueue our fonts
		if ( $google_fonts ) { 
			wp_enqueue_style('generate-fonts', $fonts_url, array(), null, 'all' );
		}
	}
endif;

if ( ! function_exists( 'generate_fonts_customize_register' ) ) :
	add_action( 'customize_register', 'generate_default_fonts_customize_register' );
	function generate_default_fonts_customize_register( $wp_customize ) {
	
		require_once get_template_directory() . '/inc/add-ons/controls.php';

		$defaults = generate_get_default_fonts();

		$wp_customize->add_section(
			// ID
			'font_section',
			// Arguments array
			array(
				'title' => __( 'Typography', 'generatepress' ),
				'capability' => 'edit_theme_options',
				'description' => '',
				'priority' => 30
			)
		);
		
		// Add body fonts
		$wp_customize->add_setting( 
			'generate_settings[font_body]', 
			array(
				'default' => $defaults['font_body'],
				'type' => 'option',
				'sanitize_callback' => 'generate_sanitize_typography'
			)
		);
			
		$wp_customize->add_control( 
			new Generate_Google_Font_Dropdown_Custom_Control( 
				$wp_customize, 
				'google_font_body_control', 
				array(
					'label' => __('Body','generatepress'),
					'section' => 'font_section',
					'settings' => 'generate_settings[font_body]',
					'priority' => 1
				)
			)
		);
		
		$wp_customize->add_setting( 
			'generate_settings[body_font_weight]', 
			array(
				'default' => $defaults['body_font_weight'],
				'type' => 'option',
				'sanitize_callback' => 'generate_sanitize_font_weight'
			)
		);
			
		$wp_customize->add_control( 
			new Generate_Font_Weight_Custom_Control( 
				$wp_customize, 
				'body_font_weight_control', 
				array(
					'label' => __('Font weight','generatepress'),
					'section' => 'font_section',
					'settings' => 'generate_settings[body_font_weight]',
					'priority' => 20,
					'type' => 'weight'
				)
			)
		);
		
		$wp_customize->add_setting( 
			'generate_settings[body_font_transform]', 
			array(
				'default' => $defaults['body_font_transform'],
				'type' => 'option',
				'sanitize_callback' => 'generate_sanitize_text_transform'
				
			)
		);
			
		$wp_customize->add_control( 
			new Generate_Text_Transform_Custom_Control( 
				$wp_customize, 
				'body_font_transform_control', 
				array(
					'label' => __('Text transform','generatepress'),
					'section' => 'font_section',
					'settings' => 'generate_settings[body_font_transform]',
					'priority' => 30,
					'type' => 'transform'
				)
			)
		);
		
		$wp_customize->add_setting( 
			'generate_settings[body_font_size]', 
			array(
				'default' => $defaults['body_font_size'],
				'type' => 'option',
				'sanitize_callback' => 'generate_sanitize_integer'
			)
		);
			
		$wp_customize->add_control( 
			new Generate_Customize_Slider_Control( 
				$wp_customize, 
				'generate_settings[body_font_size]', 
				array(
					'label' => __('Font size','generatepress'),
					'section' => 'font_section',
					'settings' => 'generate_settings[body_font_size]',
					'priority' => 40
				)
			)
		);
		
		if ( !function_exists( 'generate_fonts_customize_register' ) && ! defined( 'GP_PREMIUM_VERSION' ) ) {

			$wp_customize->add_control(
				new Generate_Customize_Misc_Control(
					$wp_customize,
					'typography_get_addon_desc',
					array(
						'section'     => 'font_section',
						'type'        => 'addon',
						'label'			=> __( 'More Settings','generatepress' ),
						'url' => 'http://www.generatepress.com/downloads/generate-typography/',
						'description' => sprintf(
							__( 'Looking to add more typography settings?<br /> %s.', 'generatepress' ),
							sprintf(
								'<a href="%1$s" target="_blank">%2$s</a>',
								esc_url( 'http://www.generatepress.com/downloads/generate-typography/' ),
								__( 'Check out Generate Typography', 'generatepress' )
							)
						),
						'priority'    => 50
					)
				)
			);
		}
		
		
	}
endif;

if ( ! function_exists( 'generate_all_google_fonts' ) ) :
/**
 * Store all Google Fonts in generate_all_google_fonts transient
 * @since 1.3.0
 */
add_action( 'init','generate_all_google_fonts' );
function generate_all_google_fonts()
{
	// Bail if we already have our list of fonts
	if ( get_transient( 'generate_all_google_fonts' ) )
		return;
	
	// Our big list Google Fonts
	$content = json_decode('[{"family":"ABeeZee","category":"sans-serif","variants":["regular","italic"]},{"family":"Abel","category":"sans-serif","variants":["regular"]},{"family":"Abril Fatface","category":"display","variants":["regular"]},{"family":"Aclonica","category":"sans-serif","variants":["regular"]},{"family":"Acme","category":"sans-serif","variants":["regular"]},{"family":"Actor","category":"sans-serif","variants":["regular"]},{"family":"Adamina","category":"serif","variants":["regular"]},{"family":"Advent Pro","category":"sans-serif","variants":["100","200","300","regular","500","600","700"]},{"family":"Aguafina Script","category":"handwriting","variants":["regular"]},{"family":"Akronim","category":"display","variants":["regular"]},{"family":"Aladin","category":"handwriting","variants":["regular"]},{"family":"Aldrich","category":"sans-serif","variants":["regular"]},{"family":"Alef","category":"sans-serif","variants":["regular","700"]},{"family":"Alegreya","category":"serif","variants":["regular","italic","700","700italic","900","900italic"]},{"family":"Alegreya SC","category":"serif","variants":["regular","italic","700","700italic","900","900italic"]},{"family":"Alegreya Sans","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"]},{"family":"Alegreya Sans SC","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"]},{"family":"Alex Brush","category":"handwriting","variants":["regular"]},{"family":"Alfa Slab One","category":"display","variants":["regular"]},{"family":"Alice","category":"serif","variants":["regular"]},{"family":"Alike","category":"serif","variants":["regular"]},{"family":"Alike Angular","category":"serif","variants":["regular"]},{"family":"Allan","category":"display","variants":["regular","700"]},{"family":"Allerta","category":"sans-serif","variants":["regular"]},{"family":"Allerta Stencil","category":"sans-serif","variants":["regular"]},{"family":"Allura","category":"handwriting","variants":["regular"]},{"family":"Almendra","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Almendra Display","category":"display","variants":["regular"]},{"family":"Almendra SC","category":"serif","variants":["regular"]},{"family":"Amarante","category":"display","variants":["regular"]},{"family":"Amaranth","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Amatic SC","category":"handwriting","variants":["regular","700"]},{"family":"Amethysta","category":"serif","variants":["regular"]},{"family":"Amiri","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Amita","category":"handwriting","variants":["regular","700"]},{"family":"Anaheim","category":"sans-serif","variants":["regular"]},{"family":"Andada","category":"serif","variants":["regular"]},{"family":"Andika","category":"sans-serif","variants":["regular"]},{"family":"Angkor","category":"display","variants":["regular"]},{"family":"Annie Use Your Telescope","category":"handwriting","variants":["regular"]},{"family":"Anonymous Pro","category":"monospace","variants":["regular","italic","700","700italic"]},{"family":"Antic","category":"sans-serif","variants":["regular"]},{"family":"Antic Didone","category":"serif","variants":["regular"]},{"family":"Antic Slab","category":"serif","variants":["regular"]},{"family":"Anton","category":"sans-serif","variants":["regular"]},{"family":"Arapey","category":"serif","variants":["regular","italic"]},{"family":"Arbutus","category":"display","variants":["regular"]},{"family":"Arbutus Slab","category":"serif","variants":["regular"]},{"family":"Architects Daughter","category":"handwriting","variants":["regular"]},{"family":"Archivo Black","category":"sans-serif","variants":["regular"]},{"family":"Archivo Narrow","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Arimo","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Arizonia","category":"handwriting","variants":["regular"]},{"family":"Armata","category":"sans-serif","variants":["regular"]},{"family":"Artifika","category":"serif","variants":["regular"]},{"family":"Arvo","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Arya","category":"sans-serif","variants":["regular","700"]},{"family":"Asap","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Asset","category":"display","variants":["regular"]},{"family":"Astloch","category":"display","variants":["regular","700"]},{"family":"Asul","category":"sans-serif","variants":["regular","700"]},{"family":"Atomic Age","category":"display","variants":["regular"]},{"family":"Aubrey","category":"display","variants":["regular"]},{"family":"Audiowide","category":"display","variants":["regular"]},{"family":"Autour One","category":"display","variants":["regular"]},{"family":"Average","category":"serif","variants":["regular"]},{"family":"Average Sans","category":"sans-serif","variants":["regular"]},{"family":"Averia Gruesa Libre","category":"display","variants":["regular"]},{"family":"Averia Libre","category":"display","variants":["300","300italic","regular","italic","700","700italic"]},{"family":"Averia Sans Libre","category":"display","variants":["300","300italic","regular","italic","700","700italic"]},{"family":"Averia Serif Libre","category":"display","variants":["300","300italic","regular","italic","700","700italic"]},{"family":"Bad Script","category":"handwriting","variants":["regular"]},{"family":"Balthazar","category":"serif","variants":["regular"]},{"family":"Bangers","category":"display","variants":["regular"]},{"family":"Basic","category":"sans-serif","variants":["regular"]},{"family":"Battambang","category":"display","variants":["regular","700"]},{"family":"Baumans","category":"display","variants":["regular"]},{"family":"Bayon","category":"display","variants":["regular"]},{"family":"Belgrano","category":"serif","variants":["regular"]},{"family":"Belleza","category":"sans-serif","variants":["regular"]},{"family":"BenchNine","category":"sans-serif","variants":["300","regular","700"]},{"family":"Bentham","category":"serif","variants":["regular"]},{"family":"Berkshire Swash","category":"handwriting","variants":["regular"]},{"family":"Bevan","category":"display","variants":["regular"]},{"family":"Bigelow Rules","category":"display","variants":["regular"]},{"family":"Bigshot One","category":"display","variants":["regular"]},{"family":"Bilbo","category":"handwriting","variants":["regular"]},{"family":"Bilbo Swash Caps","category":"handwriting","variants":["regular"]},{"family":"Biryani","category":"sans-serif","variants":["200","300","regular","600","700","800","900"]},{"family":"Bitter","category":"serif","variants":["regular","italic","700"]},{"family":"Black Ops One","category":"display","variants":["regular"]},{"family":"Bokor","category":"display","variants":["regular"]},{"family":"Bonbon","category":"handwriting","variants":["regular"]},{"family":"Boogaloo","category":"display","variants":["regular"]},{"family":"Bowlby One","category":"display","variants":["regular"]},{"family":"Bowlby One SC","category":"display","variants":["regular"]},{"family":"Brawler","category":"serif","variants":["regular"]},{"family":"Bree Serif","category":"serif","variants":["regular"]},{"family":"Bubblegum Sans","category":"display","variants":["regular"]},{"family":"Bubbler One","category":"sans-serif","variants":["regular"]},{"family":"Buda","category":"display","variants":["300"]},{"family":"Buenard","category":"serif","variants":["regular","700"]},{"family":"Butcherman","category":"display","variants":["regular"]},{"family":"Butterfly Kids","category":"handwriting","variants":["regular"]},{"family":"Cabin","category":"sans-serif","variants":["regular","italic","500","500italic","600","600italic","700","700italic"]},{"family":"Cabin Condensed","category":"sans-serif","variants":["regular","500","600","700"]},{"family":"Cabin Sketch","category":"display","variants":["regular","700"]},{"family":"Caesar Dressing","category":"display","variants":["regular"]},{"family":"Cagliostro","category":"sans-serif","variants":["regular"]},{"family":"Calligraffitti","category":"handwriting","variants":["regular"]},{"family":"Cambay","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Cambo","category":"serif","variants":["regular"]},{"family":"Candal","category":"sans-serif","variants":["regular"]},{"family":"Cantarell","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Cantata One","category":"serif","variants":["regular"]},{"family":"Cantora One","category":"sans-serif","variants":["regular"]},{"family":"Capriola","category":"sans-serif","variants":["regular"]},{"family":"Cardo","category":"serif","variants":["regular","italic","700"]},{"family":"Carme","category":"sans-serif","variants":["regular"]},{"family":"Carrois Gothic","category":"sans-serif","variants":["regular"]},{"family":"Carrois Gothic SC","category":"sans-serif","variants":["regular"]},{"family":"Carter One","category":"display","variants":["regular"]},{"family":"Caudex","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Cedarville Cursive","category":"handwriting","variants":["regular"]},{"family":"Ceviche One","category":"display","variants":["regular"]},{"family":"Changa One","category":"display","variants":["regular","italic"]},{"family":"Chango","category":"display","variants":["regular"]},{"family":"Chau Philomene One","category":"sans-serif","variants":["regular","italic"]},{"family":"Chela One","category":"display","variants":["regular"]},{"family":"Chelsea Market","category":"display","variants":["regular"]},{"family":"Chenla","category":"display","variants":["regular"]},{"family":"Cherry Cream Soda","category":"display","variants":["regular"]},{"family":"Cherry Swash","category":"display","variants":["regular","700"]},{"family":"Chewy","category":"display","variants":["regular"]},{"family":"Chicle","category":"display","variants":["regular"]},{"family":"Chivo","category":"sans-serif","variants":["regular","italic","900","900italic"]},{"family":"Cinzel","category":"serif","variants":["regular","700","900"]},{"family":"Cinzel Decorative","category":"display","variants":["regular","700","900"]},{"family":"Clicker Script","category":"handwriting","variants":["regular"]},{"family":"Coda","category":"display","variants":["regular","800"]},{"family":"Coda Caption","category":"sans-serif","variants":["800"]},{"family":"Codystar","category":"display","variants":["300","regular"]},{"family":"Combo","category":"display","variants":["regular"]},{"family":"Comfortaa","category":"display","variants":["300","regular","700"]},{"family":"Coming Soon","category":"handwriting","variants":["regular"]},{"family":"Concert One","category":"display","variants":["regular"]},{"family":"Condiment","category":"handwriting","variants":["regular"]},{"family":"Content","category":"display","variants":["regular","700"]},{"family":"Contrail One","category":"display","variants":["regular"]},{"family":"Convergence","category":"sans-serif","variants":["regular"]},{"family":"Cookie","category":"handwriting","variants":["regular"]},{"family":"Copse","category":"serif","variants":["regular"]},{"family":"Corben","category":"display","variants":["regular","700"]},{"family":"Courgette","category":"handwriting","variants":["regular"]},{"family":"Cousine","category":"monospace","variants":["regular","italic","700","700italic"]},{"family":"Coustard","category":"serif","variants":["regular","900"]},{"family":"Covered By Your Grace","category":"handwriting","variants":["regular"]},{"family":"Crafty Girls","category":"handwriting","variants":["regular"]},{"family":"Creepster","category":"display","variants":["regular"]},{"family":"Crete Round","category":"serif","variants":["regular","italic"]},{"family":"Crimson Text","category":"serif","variants":["regular","italic","600","600italic","700","700italic"]},{"family":"Croissant One","category":"display","variants":["regular"]},{"family":"Crushed","category":"display","variants":["regular"]},{"family":"Cuprum","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Cutive","category":"serif","variants":["regular"]},{"family":"Cutive Mono","category":"monospace","variants":["regular"]},{"family":"Damion","category":"handwriting","variants":["regular"]},{"family":"Dancing Script","category":"handwriting","variants":["regular","700"]},{"family":"Dangrek","category":"display","variants":["regular"]},{"family":"Dawning of a New Day","category":"handwriting","variants":["regular"]},{"family":"Days One","category":"sans-serif","variants":["regular"]},{"family":"Dekko","category":"handwriting","variants":["regular"]},{"family":"Delius","category":"handwriting","variants":["regular"]},{"family":"Delius Swash Caps","category":"handwriting","variants":["regular"]},{"family":"Delius Unicase","category":"handwriting","variants":["regular","700"]},{"family":"Della Respira","category":"serif","variants":["regular"]},{"family":"Denk One","category":"sans-serif","variants":["regular"]},{"family":"Devonshire","category":"handwriting","variants":["regular"]},{"family":"Dhurjati","category":"sans-serif","variants":["regular"]},{"family":"Didact Gothic","category":"sans-serif","variants":["regular"]},{"family":"Diplomata","category":"display","variants":["regular"]},{"family":"Diplomata SC","category":"display","variants":["regular"]},{"family":"Domine","category":"serif","variants":["regular","700"]},{"family":"Donegal One","category":"serif","variants":["regular"]},{"family":"Doppio One","category":"sans-serif","variants":["regular"]},{"family":"Dorsa","category":"sans-serif","variants":["regular"]},{"family":"Dosis","category":"sans-serif","variants":["200","300","regular","500","600","700","800"]},{"family":"Dr Sugiyama","category":"handwriting","variants":["regular"]},{"family":"Droid Sans","category":"sans-serif","variants":["regular","700"]},{"family":"Droid Sans Mono","category":"monospace","variants":["regular"]},{"family":"Droid Serif","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Duru Sans","category":"sans-serif","variants":["regular"]},{"family":"Dynalight","category":"display","variants":["regular"]},{"family":"EB Garamond","category":"serif","variants":["regular"]},{"family":"Eagle Lake","category":"handwriting","variants":["regular"]},{"family":"Eater","category":"display","variants":["regular"]},{"family":"Economica","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Eczar","category":"serif","variants":["regular","500","600","700","800"]},{"family":"Ek Mukta","category":"sans-serif","variants":["200","300","regular","500","600","700","800"]},{"family":"Electrolize","category":"sans-serif","variants":["regular"]},{"family":"Elsie","category":"display","variants":["regular","900"]},{"family":"Elsie Swash Caps","category":"display","variants":["regular","900"]},{"family":"Emblema One","category":"display","variants":["regular"]},{"family":"Emilys Candy","category":"display","variants":["regular"]},{"family":"Engagement","category":"handwriting","variants":["regular"]},{"family":"Englebert","category":"sans-serif","variants":["regular"]},{"family":"Enriqueta","category":"serif","variants":["regular","700"]},{"family":"Erica One","category":"display","variants":["regular"]},{"family":"Esteban","category":"serif","variants":["regular"]},{"family":"Euphoria Script","category":"handwriting","variants":["regular"]},{"family":"Ewert","category":"display","variants":["regular"]},{"family":"Exo","category":"sans-serif","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"]},{"family":"Exo 2","category":"sans-serif","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"]},{"family":"Expletus Sans","category":"display","variants":["regular","italic","500","500italic","600","600italic","700","700italic"]},{"family":"Fanwood Text","category":"serif","variants":["regular","italic"]},{"family":"Fascinate","category":"display","variants":["regular"]},{"family":"Fascinate Inline","category":"display","variants":["regular"]},{"family":"Faster One","category":"display","variants":["regular"]},{"family":"Fasthand","category":"serif","variants":["regular"]},{"family":"Fauna One","category":"serif","variants":["regular"]},{"family":"Federant","category":"display","variants":["regular"]},{"family":"Federo","category":"sans-serif","variants":["regular"]},{"family":"Felipa","category":"handwriting","variants":["regular"]},{"family":"Fenix","category":"serif","variants":["regular"]},{"family":"Finger Paint","category":"display","variants":["regular"]},{"family":"Fira Mono","category":"monospace","variants":["regular","700"]},{"family":"Fira Sans","category":"sans-serif","variants":["300","300italic","regular","italic","500","500italic","700","700italic"]},{"family":"Fjalla One","category":"sans-serif","variants":["regular"]},{"family":"Fjord One","category":"serif","variants":["regular"]},{"family":"Flamenco","category":"display","variants":["300","regular"]},{"family":"Flavors","category":"display","variants":["regular"]},{"family":"Fondamento","category":"handwriting","variants":["regular","italic"]},{"family":"Fontdiner Swanky","category":"display","variants":["regular"]},{"family":"Forum","category":"display","variants":["regular"]},{"family":"Francois One","category":"sans-serif","variants":["regular"]},{"family":"Freckle Face","category":"display","variants":["regular"]},{"family":"Fredericka the Great","category":"display","variants":["regular"]},{"family":"Fredoka One","category":"display","variants":["regular"]},{"family":"Freehand","category":"display","variants":["regular"]},{"family":"Fresca","category":"sans-serif","variants":["regular"]},{"family":"Frijole","category":"display","variants":["regular"]},{"family":"Fruktur","category":"display","variants":["regular"]},{"family":"Fugaz One","category":"display","variants":["regular"]},{"family":"GFS Didot","category":"serif","variants":["regular"]},{"family":"GFS Neohellenic","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Gabriela","category":"serif","variants":["regular"]},{"family":"Gafata","category":"sans-serif","variants":["regular"]},{"family":"Galdeano","category":"sans-serif","variants":["regular"]},{"family":"Galindo","category":"display","variants":["regular"]},{"family":"Gentium Basic","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Gentium Book Basic","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Geo","category":"sans-serif","variants":["regular","italic"]},{"family":"Geostar","category":"display","variants":["regular"]},{"family":"Geostar Fill","category":"display","variants":["regular"]},{"family":"Germania One","category":"display","variants":["regular"]},{"family":"Gidugu","category":"sans-serif","variants":["regular"]},{"family":"Gilda Display","category":"serif","variants":["regular"]},{"family":"Give You Glory","category":"handwriting","variants":["regular"]},{"family":"Glass Antiqua","category":"display","variants":["regular"]},{"family":"Glegoo","category":"serif","variants":["regular","700"]},{"family":"Gloria Hallelujah","category":"handwriting","variants":["regular"]},{"family":"Goblin One","category":"display","variants":["regular"]},{"family":"Gochi Hand","category":"handwriting","variants":["regular"]},{"family":"Gorditas","category":"display","variants":["regular","700"]},{"family":"Goudy Bookletter 1911","category":"serif","variants":["regular"]},{"family":"Graduate","category":"display","variants":["regular"]},{"family":"Grand Hotel","category":"handwriting","variants":["regular"]},{"family":"Gravitas One","category":"display","variants":["regular"]},{"family":"Great Vibes","category":"handwriting","variants":["regular"]},{"family":"Griffy","category":"display","variants":["regular"]},{"family":"Gruppo","category":"display","variants":["regular"]},{"family":"Gudea","category":"sans-serif","variants":["regular","italic","700"]},{"family":"Gurajada","category":"serif","variants":["regular"]},{"family":"Habibi","category":"serif","variants":["regular"]},{"family":"Halant","category":"serif","variants":["300","regular","500","600","700"]},{"family":"Hammersmith One","category":"sans-serif","variants":["regular"]},{"family":"Hanalei","category":"display","variants":["regular"]},{"family":"Hanalei Fill","category":"display","variants":["regular"]},{"family":"Handlee","category":"handwriting","variants":["regular"]},{"family":"Hanuman","category":"serif","variants":["regular","700"]},{"family":"Happy Monkey","category":"display","variants":["regular"]},{"family":"Headland One","category":"serif","variants":["regular"]},{"family":"Henny Penny","category":"display","variants":["regular"]},{"family":"Herr Von Muellerhoff","category":"handwriting","variants":["regular"]},{"family":"Hind","category":"sans-serif","variants":["300","regular","500","600","700"]},{"family":"Holtwood One SC","category":"serif","variants":["regular"]},{"family":"Homemade Apple","category":"handwriting","variants":["regular"]},{"family":"Homenaje","category":"sans-serif","variants":["regular"]},{"family":"IM Fell DW Pica","category":"serif","variants":["regular","italic"]},{"family":"IM Fell DW Pica SC","category":"serif","variants":["regular"]},{"family":"IM Fell Double Pica","category":"serif","variants":["regular","italic"]},{"family":"IM Fell Double Pica SC","category":"serif","variants":["regular"]},{"family":"IM Fell English","category":"serif","variants":["regular","italic"]},{"family":"IM Fell English SC","category":"serif","variants":["regular"]},{"family":"IM Fell French Canon","category":"serif","variants":["regular","italic"]},{"family":"IM Fell French Canon SC","category":"serif","variants":["regular"]},{"family":"IM Fell Great Primer","category":"serif","variants":["regular","italic"]},{"family":"IM Fell Great Primer SC","category":"serif","variants":["regular"]},{"family":"Iceberg","category":"display","variants":["regular"]},{"family":"Iceland","category":"display","variants":["regular"]},{"family":"Imprima","category":"sans-serif","variants":["regular"]},{"family":"Inconsolata","category":"monospace","variants":["regular","700"]},{"family":"Inder","category":"sans-serif","variants":["regular"]},{"family":"Indie Flower","category":"handwriting","variants":["regular"]},{"family":"Inika","category":"serif","variants":["regular","700"]},{"family":"Inknut Antiqua","category":"serif","variants":["300","regular","500","600","700","800","900"]},{"family":"Irish Grover","category":"display","variants":["regular"]},{"family":"Istok Web","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Italiana","category":"serif","variants":["regular"]},{"family":"Italianno","category":"handwriting","variants":["regular"]},{"family":"Jacques Francois","category":"serif","variants":["regular"]},{"family":"Jacques Francois Shadow","category":"display","variants":["regular"]},{"family":"Jaldi","category":"sans-serif","variants":["regular","700"]},{"family":"Jim Nightshade","category":"handwriting","variants":["regular"]},{"family":"Jockey One","category":"sans-serif","variants":["regular"]},{"family":"Jolly Lodger","category":"display","variants":["regular"]},{"family":"Josefin Sans","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","600","600italic","700","700italic"]},{"family":"Josefin Slab","category":"serif","variants":["100","100italic","300","300italic","regular","italic","600","600italic","700","700italic"]},{"family":"Joti One","category":"display","variants":["regular"]},{"family":"Judson","category":"serif","variants":["regular","italic","700"]},{"family":"Julee","category":"handwriting","variants":["regular"]},{"family":"Julius Sans One","category":"sans-serif","variants":["regular"]},{"family":"Junge","category":"serif","variants":["regular"]},{"family":"Jura","category":"sans-serif","variants":["300","regular","500","600"]},{"family":"Just Another Hand","category":"handwriting","variants":["regular"]},{"family":"Just Me Again Down Here","category":"handwriting","variants":["regular"]},{"family":"Kalam","category":"handwriting","variants":["300","regular","700"]},{"family":"Kameron","category":"serif","variants":["regular","700"]},{"family":"Kantumruy","category":"sans-serif","variants":["300","regular","700"]},{"family":"Karla","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Karma","category":"serif","variants":["300","regular","500","600","700"]},{"family":"Kaushan Script","category":"handwriting","variants":["regular"]},{"family":"Kavoon","category":"display","variants":["regular"]},{"family":"Kdam Thmor","category":"display","variants":["regular"]},{"family":"Keania One","category":"display","variants":["regular"]},{"family":"Kelly Slab","category":"display","variants":["regular"]},{"family":"Kenia","category":"display","variants":["regular"]},{"family":"Khand","category":"sans-serif","variants":["300","regular","500","600","700"]},{"family":"Khmer","category":"display","variants":["regular"]},{"family":"Khula","category":"sans-serif","variants":["300","regular","600","700","800"]},{"family":"Kite One","category":"sans-serif","variants":["regular"]},{"family":"Knewave","category":"display","variants":["regular"]},{"family":"Kotta One","category":"serif","variants":["regular"]},{"family":"Koulen","category":"display","variants":["regular"]},{"family":"Kranky","category":"display","variants":["regular"]},{"family":"Kreon","category":"serif","variants":["300","regular","700"]},{"family":"Kristi","category":"handwriting","variants":["regular"]},{"family":"Krona One","category":"sans-serif","variants":["regular"]},{"family":"Kurale","category":"serif","variants":["regular"]},{"family":"La Belle Aurore","category":"handwriting","variants":["regular"]},{"family":"Laila","category":"serif","variants":["300","regular","500","600","700"]},{"family":"Lakki Reddy","category":"handwriting","variants":["regular"]},{"family":"Lancelot","category":"display","variants":["regular"]},{"family":"Lateef","category":"handwriting","variants":["regular"]},{"family":"Lato","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","700","700italic","900","900italic"]},{"family":"League Script","category":"handwriting","variants":["regular"]},{"family":"Leckerli One","category":"handwriting","variants":["regular"]},{"family":"Ledger","category":"serif","variants":["regular"]},{"family":"Lekton","category":"sans-serif","variants":["regular","italic","700"]},{"family":"Lemon","category":"display","variants":["regular"]},{"family":"Libre Baskerville","category":"serif","variants":["regular","italic","700"]},{"family":"Life Savers","category":"display","variants":["regular","700"]},{"family":"Lilita One","category":"display","variants":["regular"]},{"family":"Lily Script One","category":"display","variants":["regular"]},{"family":"Limelight","category":"display","variants":["regular"]},{"family":"Linden Hill","category":"serif","variants":["regular","italic"]},{"family":"Lobster","category":"display","variants":["regular"]},{"family":"Lobster Two","category":"display","variants":["regular","italic","700","700italic"]},{"family":"Londrina Outline","category":"display","variants":["regular"]},{"family":"Londrina Shadow","category":"display","variants":["regular"]},{"family":"Londrina Sketch","category":"display","variants":["regular"]},{"family":"Londrina Solid","category":"display","variants":["regular"]},{"family":"Lora","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Love Ya Like A Sister","category":"display","variants":["regular"]},{"family":"Loved by the King","category":"handwriting","variants":["regular"]},{"family":"Lovers Quarrel","category":"handwriting","variants":["regular"]},{"family":"Luckiest Guy","category":"display","variants":["regular"]},{"family":"Lusitana","category":"serif","variants":["regular","700"]},{"family":"Lustria","category":"serif","variants":["regular"]},{"family":"Macondo","category":"display","variants":["regular"]},{"family":"Macondo Swash Caps","category":"display","variants":["regular"]},{"family":"Magra","category":"sans-serif","variants":["regular","700"]},{"family":"Maiden Orange","category":"display","variants":["regular"]},{"family":"Mako","category":"sans-serif","variants":["regular"]},{"family":"Mallanna","category":"sans-serif","variants":["regular"]},{"family":"Mandali","category":"sans-serif","variants":["regular"]},{"family":"Marcellus","category":"serif","variants":["regular"]},{"family":"Marcellus SC","category":"serif","variants":["regular"]},{"family":"Marck Script","category":"handwriting","variants":["regular"]},{"family":"Margarine","category":"display","variants":["regular"]},{"family":"Marko One","category":"serif","variants":["regular"]},{"family":"Marmelad","category":"sans-serif","variants":["regular"]},{"family":"Martel","category":"serif","variants":["200","300","regular","600","700","800","900"]},{"family":"Martel Sans","category":"sans-serif","variants":["200","300","regular","600","700","800","900"]},{"family":"Marvel","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Mate","category":"serif","variants":["regular","italic"]},{"family":"Mate SC","category":"serif","variants":["regular"]},{"family":"Maven Pro","category":"sans-serif","variants":["regular","500","700","900"]},{"family":"McLaren","category":"display","variants":["regular"]},{"family":"Meddon","category":"handwriting","variants":["regular"]},{"family":"MedievalSharp","category":"display","variants":["regular"]},{"family":"Medula One","category":"display","variants":["regular"]},{"family":"Megrim","category":"display","variants":["regular"]},{"family":"Meie Script","category":"handwriting","variants":["regular"]},{"family":"Merienda","category":"handwriting","variants":["regular","700"]},{"family":"Merienda One","category":"handwriting","variants":["regular"]},{"family":"Merriweather","category":"serif","variants":["300","300italic","regular","italic","700","700italic","900","900italic"]},{"family":"Merriweather Sans","category":"sans-serif","variants":["300","300italic","regular","italic","700","700italic","800","800italic"]},{"family":"Metal","category":"display","variants":["regular"]},{"family":"Metal Mania","category":"display","variants":["regular"]},{"family":"Metamorphous","category":"display","variants":["regular"]},{"family":"Metrophobic","category":"sans-serif","variants":["regular"]},{"family":"Michroma","category":"sans-serif","variants":["regular"]},{"family":"Milonga","category":"display","variants":["regular"]},{"family":"Miltonian","category":"display","variants":["regular"]},{"family":"Miltonian Tattoo","category":"display","variants":["regular"]},{"family":"Miniver","category":"display","variants":["regular"]},{"family":"Miss Fajardose","category":"handwriting","variants":["regular"]},{"family":"Modak","category":"display","variants":["regular"]},{"family":"Modern Antiqua","category":"display","variants":["regular"]},{"family":"Molengo","category":"sans-serif","variants":["regular"]},{"family":"Molle","category":"handwriting","variants":["italic"]},{"family":"Monda","category":"sans-serif","variants":["regular","700"]},{"family":"Monofett","category":"display","variants":["regular"]},{"family":"Monoton","category":"display","variants":["regular"]},{"family":"Monsieur La Doulaise","category":"handwriting","variants":["regular"]},{"family":"Montaga","category":"serif","variants":["regular"]},{"family":"Montez","category":"handwriting","variants":["regular"]},{"family":"Montserrat","category":"sans-serif","variants":["regular","700"]},{"family":"Montserrat Alternates","category":"sans-serif","variants":["regular","700"]},{"family":"Montserrat Subrayada","category":"sans-serif","variants":["regular","700"]},{"family":"Moul","category":"display","variants":["regular"]},{"family":"Moulpali","category":"display","variants":["regular"]},{"family":"Mountains of Christmas","category":"display","variants":["regular","700"]},{"family":"Mouse Memoirs","category":"sans-serif","variants":["regular"]},{"family":"Mr Bedfort","category":"handwriting","variants":["regular"]},{"family":"Mr Dafoe","category":"handwriting","variants":["regular"]},{"family":"Mr De Haviland","category":"handwriting","variants":["regular"]},{"family":"Mrs Saint Delafield","category":"handwriting","variants":["regular"]},{"family":"Mrs Sheppards","category":"handwriting","variants":["regular"]},{"family":"Muli","category":"sans-serif","variants":["300","300italic","regular","italic"]},{"family":"Mystery Quest","category":"display","variants":["regular"]},{"family":"NTR","category":"sans-serif","variants":["regular"]},{"family":"Neucha","category":"handwriting","variants":["regular"]},{"family":"Neuton","category":"serif","variants":["200","300","regular","italic","700","800"]},{"family":"New Rocker","category":"display","variants":["regular"]},{"family":"News Cycle","category":"sans-serif","variants":["regular","700"]},{"family":"Niconne","category":"handwriting","variants":["regular"]},{"family":"Nixie One","category":"display","variants":["regular"]},{"family":"Nobile","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Nokora","category":"serif","variants":["regular","700"]},{"family":"Norican","category":"handwriting","variants":["regular"]},{"family":"Nosifer","category":"display","variants":["regular"]},{"family":"Nothing You Could Do","category":"handwriting","variants":["regular"]},{"family":"Noticia Text","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Noto Sans","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Noto Serif","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Nova Cut","category":"display","variants":["regular"]},{"family":"Nova Flat","category":"display","variants":["regular"]},{"family":"Nova Mono","category":"monospace","variants":["regular"]},{"family":"Nova Oval","category":"display","variants":["regular"]},{"family":"Nova Round","category":"display","variants":["regular"]},{"family":"Nova Script","category":"display","variants":["regular"]},{"family":"Nova Slim","category":"display","variants":["regular"]},{"family":"Nova Square","category":"display","variants":["regular"]},{"family":"Numans","category":"sans-serif","variants":["regular"]},{"family":"Nunito","category":"sans-serif","variants":["300","regular","700"]},{"family":"Odor Mean Chey","category":"display","variants":["regular"]},{"family":"Offside","category":"display","variants":["regular"]},{"family":"Old Standard TT","category":"serif","variants":["regular","italic","700"]},{"family":"Oldenburg","category":"display","variants":["regular"]},{"family":"Oleo Script","category":"display","variants":["regular","700"]},{"family":"Oleo Script Swash Caps","category":"display","variants":["regular","700"]},{"family":"Open Sans","category":"sans-serif","variants":["300","300italic","regular","italic","600","600italic","700","700italic","800","800italic"]},{"family":"Open Sans Condensed","category":"sans-serif","variants":["300","300italic","700"]},{"family":"Oranienbaum","category":"serif","variants":["regular"]},{"family":"Orbitron","category":"sans-serif","variants":["regular","500","700","900"]},{"family":"Oregano","category":"display","variants":["regular","italic"]},{"family":"Orienta","category":"sans-serif","variants":["regular"]},{"family":"Original Surfer","category":"display","variants":["regular"]},{"family":"Oswald","category":"sans-serif","variants":["300","regular","700"]},{"family":"Over the Rainbow","category":"handwriting","variants":["regular"]},{"family":"Overlock","category":"display","variants":["regular","italic","700","700italic","900","900italic"]},{"family":"Overlock SC","category":"display","variants":["regular"]},{"family":"Ovo","category":"serif","variants":["regular"]},{"family":"Oxygen","category":"sans-serif","variants":["300","regular","700"]},{"family":"Oxygen Mono","category":"monospace","variants":["regular"]},{"family":"PT Mono","category":"monospace","variants":["regular"]},{"family":"PT Sans","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"PT Sans Caption","category":"sans-serif","variants":["regular","700"]},{"family":"PT Sans Narrow","category":"sans-serif","variants":["regular","700"]},{"family":"PT Serif","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"PT Serif Caption","category":"serif","variants":["regular","italic"]},{"family":"Pacifico","category":"handwriting","variants":["regular"]},{"family":"Palanquin","category":"sans-serif","variants":["100","200","300","regular","500","600","700"]},{"family":"Palanquin Dark","category":"sans-serif","variants":["regular","500","600","700"]},{"family":"Paprika","category":"display","variants":["regular"]},{"family":"Parisienne","category":"handwriting","variants":["regular"]},{"family":"Passero One","category":"display","variants":["regular"]},{"family":"Passion One","category":"display","variants":["regular","700","900"]},{"family":"Pathway Gothic One","category":"sans-serif","variants":["regular"]},{"family":"Patrick Hand","category":"handwriting","variants":["regular"]},{"family":"Patrick Hand SC","category":"handwriting","variants":["regular"]},{"family":"Patua One","category":"display","variants":["regular"]},{"family":"Paytone One","category":"sans-serif","variants":["regular"]},{"family":"Peddana","category":"serif","variants":["regular"]},{"family":"Peralta","category":"display","variants":["regular"]},{"family":"Permanent Marker","category":"handwriting","variants":["regular"]},{"family":"Petit Formal Script","category":"handwriting","variants":["regular"]},{"family":"Petrona","category":"serif","variants":["regular"]},{"family":"Philosopher","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Piedra","category":"display","variants":["regular"]},{"family":"Pinyon Script","category":"handwriting","variants":["regular"]},{"family":"Pirata One","category":"display","variants":["regular"]},{"family":"Plaster","category":"display","variants":["regular"]},{"family":"Play","category":"sans-serif","variants":["regular","700"]},{"family":"Playball","category":"display","variants":["regular"]},{"family":"Playfair Display","category":"serif","variants":["regular","italic","700","700italic","900","900italic"]},{"family":"Playfair Display SC","category":"serif","variants":["regular","italic","700","700italic","900","900italic"]},{"family":"Podkova","category":"serif","variants":["regular","700"]},{"family":"Poiret One","category":"display","variants":["regular"]},{"family":"Poller One","category":"display","variants":["regular"]},{"family":"Poly","category":"serif","variants":["regular","italic"]},{"family":"Pompiere","category":"display","variants":["regular"]},{"family":"Pontano Sans","category":"sans-serif","variants":["regular"]},{"family":"Poppins","category":"sans-serif","variants":["300","regular","500","600","700"]},{"family":"Port Lligat Sans","category":"sans-serif","variants":["regular"]},{"family":"Port Lligat Slab","category":"serif","variants":["regular"]},{"family":"Pragati Narrow","category":"sans-serif","variants":["regular","700"]},{"family":"Prata","category":"serif","variants":["regular"]},{"family":"Preahvihear","category":"display","variants":["regular"]},{"family":"Press Start 2P","category":"display","variants":["regular"]},{"family":"Princess Sofia","category":"handwriting","variants":["regular"]},{"family":"Prociono","category":"serif","variants":["regular"]},{"family":"Prosto One","category":"display","variants":["regular"]},{"family":"Puritan","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Purple Purse","category":"display","variants":["regular"]},{"family":"Quando","category":"serif","variants":["regular"]},{"family":"Quantico","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Quattrocento","category":"serif","variants":["regular","700"]},{"family":"Quattrocento Sans","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Questrial","category":"sans-serif","variants":["regular"]},{"family":"Quicksand","category":"sans-serif","variants":["300","regular","700"]},{"family":"Quintessential","category":"handwriting","variants":["regular"]},{"family":"Qwigley","category":"handwriting","variants":["regular"]},{"family":"Racing Sans One","category":"display","variants":["regular"]},{"family":"Radley","category":"serif","variants":["regular","italic"]},{"family":"Rajdhani","category":"sans-serif","variants":["300","regular","500","600","700"]},{"family":"Raleway","category":"sans-serif","variants":["100","200","300","regular","500","600","700","800","900"]},{"family":"Raleway Dots","category":"display","variants":["regular"]},{"family":"Ramabhadra","category":"sans-serif","variants":["regular"]},{"family":"Ramaraja","category":"serif","variants":["regular"]},{"family":"Rambla","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Rammetto One","category":"display","variants":["regular"]},{"family":"Ranchers","category":"display","variants":["regular"]},{"family":"Rancho","category":"handwriting","variants":["regular"]},{"family":"Ranga","category":"display","variants":["regular","700"]},{"family":"Rationale","category":"sans-serif","variants":["regular"]},{"family":"Ravi Prakash","category":"display","variants":["regular"]},{"family":"Redressed","category":"handwriting","variants":["regular"]},{"family":"Reenie Beanie","category":"handwriting","variants":["regular"]},{"family":"Revalia","category":"display","variants":["regular"]},{"family":"Rhodium Libre","category":"serif","variants":["regular"]},{"family":"Ribeye","category":"display","variants":["regular"]},{"family":"Ribeye Marrow","category":"display","variants":["regular"]},{"family":"Righteous","category":"display","variants":["regular"]},{"family":"Risque","category":"display","variants":["regular"]},{"family":"Roboto","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","900","900italic"]},{"family":"Roboto Condensed","category":"sans-serif","variants":["300","300italic","regular","italic","700","700italic"]},{"family":"Roboto Mono","category":"monospace","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic"]},{"family":"Roboto Slab","category":"serif","variants":["100","300","regular","700"]},{"family":"Rochester","category":"handwriting","variants":["regular"]},{"family":"Rock Salt","category":"handwriting","variants":["regular"]},{"family":"Rokkitt","category":"serif","variants":["regular","700"]},{"family":"Romanesco","category":"handwriting","variants":["regular"]},{"family":"Ropa Sans","category":"sans-serif","variants":["regular","italic"]},{"family":"Rosario","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Rosarivo","category":"serif","variants":["regular","italic"]},{"family":"Rouge Script","category":"handwriting","variants":["regular"]},{"family":"Rozha One","category":"serif","variants":["regular"]},{"family":"Rubik Mono One","category":"sans-serif","variants":["regular"]},{"family":"Rubik One","category":"sans-serif","variants":["regular"]},{"family":"Ruda","category":"sans-serif","variants":["regular","700","900"]},{"family":"Rufina","category":"serif","variants":["regular","700"]},{"family":"Ruge Boogie","category":"handwriting","variants":["regular"]},{"family":"Ruluko","category":"sans-serif","variants":["regular"]},{"family":"Rum Raisin","category":"sans-serif","variants":["regular"]},{"family":"Ruslan Display","category":"display","variants":["regular"]},{"family":"Russo One","category":"sans-serif","variants":["regular"]},{"family":"Ruthie","category":"handwriting","variants":["regular"]},{"family":"Rye","category":"display","variants":["regular"]},{"family":"Sacramento","category":"handwriting","variants":["regular"]},{"family":"Sail","category":"display","variants":["regular"]},{"family":"Salsa","category":"display","variants":["regular"]},{"family":"Sanchez","category":"serif","variants":["regular","italic"]},{"family":"Sancreek","category":"display","variants":["regular"]},{"family":"Sansita One","category":"display","variants":["regular"]},{"family":"Sarina","category":"display","variants":["regular"]},{"family":"Sarpanch","category":"sans-serif","variants":["regular","500","600","700","800","900"]},{"family":"Satisfy","category":"handwriting","variants":["regular"]},{"family":"Scada","category":"sans-serif","variants":["regular","italic","700","700italic"]},{"family":"Scheherazade","category":"serif","variants":["regular"]},{"family":"Schoolbell","category":"handwriting","variants":["regular"]},{"family":"Seaweed Script","category":"display","variants":["regular"]},{"family":"Sevillana","category":"display","variants":["regular"]},{"family":"Seymour One","category":"sans-serif","variants":["regular"]},{"family":"Shadows Into Light","category":"handwriting","variants":["regular"]},{"family":"Shadows Into Light Two","category":"handwriting","variants":["regular"]},{"family":"Shanti","category":"sans-serif","variants":["regular"]},{"family":"Share","category":"display","variants":["regular","italic","700","700italic"]},{"family":"Share Tech","category":"sans-serif","variants":["regular"]},{"family":"Share Tech Mono","category":"monospace","variants":["regular"]},{"family":"Shojumaru","category":"display","variants":["regular"]},{"family":"Short Stack","category":"handwriting","variants":["regular"]},{"family":"Siemreap","category":"display","variants":["regular"]},{"family":"Sigmar One","category":"display","variants":["regular"]},{"family":"Signika","category":"sans-serif","variants":["300","regular","600","700"]},{"family":"Signika Negative","category":"sans-serif","variants":["300","regular","600","700"]},{"family":"Simonetta","category":"display","variants":["regular","italic","900","900italic"]},{"family":"Sintony","category":"sans-serif","variants":["regular","700"]},{"family":"Sirin Stencil","category":"display","variants":["regular"]},{"family":"Six Caps","category":"sans-serif","variants":["regular"]},{"family":"Skranji","category":"display","variants":["regular","700"]},{"family":"Slabo 13px","category":"serif","variants":["regular"]},{"family":"Slabo 27px","category":"serif","variants":["regular"]},{"family":"Slackey","category":"display","variants":["regular"]},{"family":"Smokum","category":"display","variants":["regular"]},{"family":"Smythe","category":"display","variants":["regular"]},{"family":"Sniglet","category":"display","variants":["regular","800"]},{"family":"Snippet","category":"sans-serif","variants":["regular"]},{"family":"Snowburst One","category":"display","variants":["regular"]},{"family":"Sofadi One","category":"display","variants":["regular"]},{"family":"Sofia","category":"handwriting","variants":["regular"]},{"family":"Sonsie One","category":"display","variants":["regular"]},{"family":"Sorts Mill Goudy","category":"serif","variants":["regular","italic"]},{"family":"Source Code Pro","category":"monospace","variants":["200","300","regular","500","600","700","900"]},{"family":"Source Sans Pro","category":"sans-serif","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic","900","900italic"]},{"family":"Source Serif Pro","category":"serif","variants":["regular","600","700"]},{"family":"Special Elite","category":"display","variants":["regular"]},{"family":"Spicy Rice","category":"display","variants":["regular"]},{"family":"Spinnaker","category":"sans-serif","variants":["regular"]},{"family":"Spirax","category":"display","variants":["regular"]},{"family":"Squada One","category":"display","variants":["regular"]},{"family":"Sree Krushnadevaraya","category":"serif","variants":["regular"]},{"family":"Stalemate","category":"handwriting","variants":["regular"]},{"family":"Stalinist One","category":"display","variants":["regular"]},{"family":"Stardos Stencil","category":"display","variants":["regular","700"]},{"family":"Stint Ultra Condensed","category":"display","variants":["regular"]},{"family":"Stint Ultra Expanded","category":"display","variants":["regular"]},{"family":"Stoke","category":"serif","variants":["300","regular"]},{"family":"Strait","category":"sans-serif","variants":["regular"]},{"family":"Sue Ellen Francisco","category":"handwriting","variants":["regular"]},{"family":"Sumana","category":"serif","variants":["regular","700"]},{"family":"Sunshiney","category":"handwriting","variants":["regular"]},{"family":"Supermercado One","category":"display","variants":["regular"]},{"family":"Suranna","category":"serif","variants":["regular"]},{"family":"Suravaram","category":"serif","variants":["regular"]},{"family":"Suwannaphum","category":"display","variants":["regular"]},{"family":"Swanky and Moo Moo","category":"handwriting","variants":["regular"]},{"family":"Syncopate","category":"sans-serif","variants":["regular","700"]},{"family":"Tangerine","category":"handwriting","variants":["regular","700"]},{"family":"Taprom","category":"display","variants":["regular"]},{"family":"Tauri","category":"sans-serif","variants":["regular"]},{"family":"Teko","category":"sans-serif","variants":["300","regular","500","600","700"]},{"family":"Telex","category":"sans-serif","variants":["regular"]},{"family":"Tenali Ramakrishna","category":"sans-serif","variants":["regular"]},{"family":"Tenor Sans","category":"sans-serif","variants":["regular"]},{"family":"Text Me One","category":"sans-serif","variants":["regular"]},{"family":"The Girl Next Door","category":"handwriting","variants":["regular"]},{"family":"Tienne","category":"serif","variants":["regular","700","900"]},{"family":"Tillana","category":"handwriting","variants":["regular","500","600","700","800"]},{"family":"Timmana","category":"sans-serif","variants":["regular"]},{"family":"Tinos","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Titan One","category":"display","variants":["regular"]},{"family":"Titillium Web","category":"sans-serif","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic","900"]},{"family":"Trade Winds","category":"display","variants":["regular"]},{"family":"Trocchi","category":"serif","variants":["regular"]},{"family":"Trochut","category":"display","variants":["regular","italic","700"]},{"family":"Trykker","category":"serif","variants":["regular"]},{"family":"Tulpen One","category":"display","variants":["regular"]},{"family":"Ubuntu","category":"sans-serif","variants":["300","300italic","regular","italic","500","500italic","700","700italic"]},{"family":"Ubuntu Condensed","category":"sans-serif","variants":["regular"]},{"family":"Ubuntu Mono","category":"monospace","variants":["regular","italic","700","700italic"]},{"family":"Ultra","category":"serif","variants":["regular"]},{"family":"Uncial Antiqua","category":"display","variants":["regular"]},{"family":"Underdog","category":"display","variants":["regular"]},{"family":"Unica One","category":"display","variants":["regular"]},{"family":"UnifrakturCook","category":"display","variants":["700"]},{"family":"UnifrakturMaguntia","category":"display","variants":["regular"]},{"family":"Unkempt","category":"display","variants":["regular","700"]},{"family":"Unlock","category":"display","variants":["regular"]},{"family":"Unna","category":"serif","variants":["regular"]},{"family":"VT323","category":"monospace","variants":["regular"]},{"family":"Vampiro One","category":"display","variants":["regular"]},{"family":"Varela","category":"sans-serif","variants":["regular"]},{"family":"Varela Round","category":"sans-serif","variants":["regular"]},{"family":"Vast Shadow","category":"display","variants":["regular"]},{"family":"Vesper Libre","category":"serif","variants":["regular","500","700","900"]},{"family":"Vibur","category":"handwriting","variants":["regular"]},{"family":"Vidaloka","category":"serif","variants":["regular"]},{"family":"Viga","category":"sans-serif","variants":["regular"]},{"family":"Voces","category":"display","variants":["regular"]},{"family":"Volkhov","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Vollkorn","category":"serif","variants":["regular","italic","700","700italic"]},{"family":"Voltaire","category":"sans-serif","variants":["regular"]},{"family":"Waiting for the Sunrise","category":"handwriting","variants":["regular"]},{"family":"Wallpoet","category":"display","variants":["regular"]},{"family":"Walter Turncoat","category":"handwriting","variants":["regular"]},{"family":"Warnes","category":"display","variants":["regular"]},{"family":"Wellfleet","category":"display","variants":["regular"]},{"family":"Wendy One","category":"sans-serif","variants":["regular"]},{"family":"Wire One","category":"sans-serif","variants":["regular"]},{"family":"Yanone Kaffeesatz","category":"sans-serif","variants":["200","300","regular","700"]},{"family":"Yantramanav","category":"sans-serif","variants":["100","300","regular","500","700","900"]},{"family":"Yellowtail","category":"handwriting","variants":["regular"]},{"family":"Yeseva One","category":"display","variants":["regular"]},{"family":"Yesteryear","category":"handwriting","variants":["regular"]},{"family":"Zeyada","category":"handwriting","variants":["regular"]}]');
	
	// Loop through them and put what we need into our fonts array
	$fonts = array();
	foreach ( $content as $item ) {
		
		// Grab what we need from our big list
		$atts = array( 
			'name'     => $item->family,
			'category' => $item->category,
			'variants' => $item->variants
		);
		
		// Create an ID using our font family name
		$id = strtolower( str_replace( ' ', '_', $item->family ) );
		
		// Add our attributes to our new array
		$fonts[ $id ] = $atts;
	}
	
	// Filter to allow us to modify the fonts array before saving the transient
	$fonts = apply_filters( 'generate_google_fonts_array', $fonts );
				
	// Set transient for google fonts
	set_transient( 'generate_all_google_fonts', $fonts, 14 * DAY_IN_SECONDS );
}
endif;

if ( ! function_exists( 'generate_get_google_font_variants' ) ) :
/**
 * Wrapper function to find variants for chosen Google Fonts
 * Example: generate_get_google_font_variation( 'Open Sans' )
 * @since 1.3.0
 */
function generate_get_google_font_variants( $font )
{
	
	// Grab all of our fonts
	$fonts = ( get_transient('generate_all_google_fonts') ? get_transient('generate_all_google_fonts') : array() );
	
	// Get the ID from our font
	$id = strtolower( str_replace( ' ', '_', $font ) );
	
	// If the ID doesn't exist within our fonts, we can bail
	if ( ! array_key_exists( $id, $fonts ) )
		return;
	
	// Grab all of the variants associated with our font
	$variants = $fonts[$id]['variants'];
	
	// Loop through them and put them into an array, then turn them into a comma separated list
	$output = array();
	if ( $variants ) :
		foreach ( $variants as $variant ) {
			$output[] = $variant;
		}
		return implode(',', $output);
	endif;
	
}
endif;

if ( ! function_exists( 'generate_get_google_font_category' ) ) :
/**
 * Wrapper function to find the category for chosen Google Font
 * Example: generate_get_google_font_category( 'Open Sans' )
 * @since 1.3.0
 */
function generate_get_google_font_category( $font )
{
	
	// Get all of our fonts
	$fonts = ( get_transient('generate_all_google_fonts') ? get_transient('generate_all_google_fonts') : array() );
	
	// Get the ID from our font
	$id = strtolower( str_replace( ' ', '_', $font ) );
	
	// If the ID doesn't exist within our fonts, we can bail
	if ( ! array_key_exists( $id, $fonts ) )
		return;
	
	// Let's grab our category to go with our font
	$category = ! empty( $fonts[$id]['category'] ) ? ', ' . $fonts[$id]['category'] : '';
	
	// Return it to be used by our function
	return $category;
	
}
endif;

if ( ! function_exists( 'generate_typography_convert_values' ) ) :
/**
 * Take the old body font value and strip it of variants
 * This should only run once
 * @since 1.3.0
 */
add_action('admin_init', 'generate_typography_convert_values');
function generate_typography_convert_values()
{
	// Don't run this if Typography add-on is activated
	if ( function_exists( 'generate_fonts_customize_register' ) )
		return;
	
	// If we've done this before, bail
	if ( 'true' == get_option( 'generate_update_core_typography' ) || 'true' == get_option( 'generate_update_premium_typography' ) )
		return;
	
	// Get all settings
	$generate_settings = wp_parse_args( 
		get_option( 'generate_settings', array() ), 
		generate_get_default_fonts() 
	);
	
	// Get our body font family setting
	$value = $generate_settings[ 'font_body' ];
	
	// Create a new, empty array
	$new_settings = array();
	
	// If our value has : in it, and isn't empty
	if ( strpos( $value, ':' ) !== false && ! empty( $value ) ) :
		
		// Remove the : and anything past it
		$value = current( explode( ':', $value ) );
		
		// Populate our new array with our new, clean value
		$new_settings[ 'font_body' ] = $value;
		
	endif;
	
	// Update our options if our new array isn't empty
	if ( ! empty( $new_settings ) ) :
		$generate_new_typography_settings = wp_parse_args( $new_settings, $generate_settings );
		update_option( 'generate_settings', $generate_new_typography_settings );
	endif;
	
	// All done, set an option so we don't go through this again
	update_option( 'generate_update_core_typography','true' );
}
endif;

if ( ! function_exists( 'generate_get_font_family_css' ) ) :
/**
 * Wrapper function to create font-family value for CSS
 * @since 1.3.0
 */
function generate_get_font_family_css( $font, $settings, $default )
{
	$generate_settings = wp_parse_args( 
		get_option( $settings, array() ), 
		$default 
	);
	
	// We don't want to wrap quotes around these values
	$no_quotes = array(
		'inherit',
		'Arial, Helvetica, sans-serif',
		'Georgia, Times New Roman, Times, serif',
		'Helvetica',
		'Impact',
		'Tahoma, Geneva, sans-serif',
		'Trebuchet MS, Helvetica, sans-serif',
		'Verdana, Geneva, sans-serif'
	);
	
	// Get our font
	$font_family = $generate_settings[ $font ];
	
	// If our value is still using the old format, fix it
	if ( strpos( $font_family, ':' ) !== false )
		$font_family = current( explode( ':', $font_family ) );

	// Set up our wrapper
	if ( in_array( $font_family, $no_quotes ) ) :
		$wrapper_start = null;
		$wrapper_end = null;
	else :
		$wrapper_start = '"';
		$wrapper_end = '"' . generate_get_google_font_category( $font_family );
	endif;
	
	// Output the CSS
	$output = ( 'inherit' == $font_family ) ? '' : $wrapper_start . $font_family . $wrapper_end;
	return $output;
}
endif;