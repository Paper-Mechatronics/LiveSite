<?php
/***
 * Gallery Carousel
 *
 * Transform your standard image galleries into an immersive full-screen experience.
 *
 * This class is a fork of the Carousel Module from JetPack. We have simplified it greatly by removing all unnecessary
 * features like comments, exif metadata and carousel settings. We have also replaced all images with the Dashicons font.
 *
 * @package ThemeZee Toolkit
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


// Use class to avoid namespace collisions
if ( ! class_exists( 'TZTK_Gallery_Carousel' ) ) :

class TZTK_Gallery_Carousel {
	/** Singleton *************************************************************/
	
	private static $instance;

	public $first_run = true;

	public $in_gallery = false;

	
	/**
     * Creates or returns an instance of this class.
     *
     * @return TZTK_Gallery_Carousel A single instance of this class.
     */
	public static function instance() {
 
        if ( null == self::$instance ) {
            self::$instance = new self;
        }
 
        return self::$instance;
    }
	
	
	/**
	 * Plugin Setup
	 *
	 * @return void
	*/
	function __construct() {

		if ( is_admin() ) :
			return;
		endif;
		
		// Setup Gallery Carousel
		add_filter( 'post_gallery', array( $this, 'enqueue_assets' ), 1000, 2 ); // load later than other callbacks hooked it
		add_filter( 'post_gallery', array( $this, 'set_in_gallery' ), -1000 );
		add_filter( 'gallery_style', array( $this, 'add_data_to_container' ) );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'add_data_to_images' ), 10, 2 );

	}

	/**
	 * Enqueue Scripts and Styles
	 *
	 * @return void
	*/
	function enqueue_assets( $output ) {

		if ( $this->first_run ) {
			wp_enqueue_script( 'tztk-gallery-carousel', TZTK_PLUGIN_URL . 'assets/js/gallery-carousel.js', array( 'jquery' ), TZTK_VERSION, true );

			$localize_strings = array(
				'download_original'    => sprintf( __( 'View full size <span class="photo-size">%1$s<span class="photo-size-times">&times;</span>%2$s</span>', 'themezee-toolkit' ), '{0}', '{1}' )
			);

			wp_localize_script( 'tztk-gallery-carousel', 'tztkGalleryCarousel', $localize_strings );
			
			// Include Dashicons
			wp_enqueue_style( 'dashicons' );
			
			// Include Stylesheet
			if( is_rtl() ) {
				wp_enqueue_style( 'tztk-gallery-carousel', TZTK_PLUGIN_URL . 'assets/css/rtl/gallery-carousel-rtl.css', array(), TZTK_VERSION );
			} else {
				wp_enqueue_style( 'tztk-gallery-carousel', TZTK_PLUGIN_URL . 'assets/css/gallery-carousel.css', array(), TZTK_VERSION );
			}

			$this->first_run = false;
		}

		return $output;
	}

	function set_in_gallery( $output ) {
		$this->in_gallery = true;
		return $output;
	}

	function add_data_to_images( $attr, $attachment = null ) {

		// not in a gallery?
		if ( ! $this->in_gallery ) {
			return $attr;
		}

		$attachment_id   = intval( $attachment->ID );
		$orig_file       = wp_get_attachment_image_src( $attachment_id, 'full' );
		$orig_file       = isset( $orig_file[0] ) ? $orig_file[0] : wp_get_attachment_url( $attachment_id );
		$meta            = wp_get_attachment_metadata( $attachment_id );
		$size            = isset( $meta['width'] ) ? intval( $meta['width'] ) . ',' . intval( $meta['height'] ) : '';

		 /*
		 * Note: Cannot generate a filename from the width and height wp_get_attachment_image_src() returns because
		 * it takes the $content_width global variable themes can set in consideration, therefore returning sizes
		 * which when used to generate a filename will likely result in a 404 on the image.
		 * $content_width has no filter we could temporarily de-register, run wp_get_attachment_image_src(), then
		 * re-register. So using returned file URL instead, which we can define the sizes from through filename
		 * parsing in the JS, as this is a failsafe file reference.
		 *
		 * EG with Twenty Eleven activated:
		 * array(4) { [0]=> string(82) "http://vanillawpinstall.blah/wp-content/uploads/2012/06/IMG_3534-1024x764.jpg" [1]=> int(584) [2]=> int(435) [3]=> bool(true) }
		 *
		 * EG with Twenty Ten activated:
		 * array(4) { [0]=> string(82) "http://vanillawpinstall.blah/wp-content/uploads/2012/06/IMG_3534-1024x764.jpg" [1]=> int(640) [2]=> int(477) [3]=> bool(true) }
		 */

		$medium_file_info = wp_get_attachment_image_src( $attachment_id, 'medium' );
		$medium_file      = isset( $medium_file_info[0] ) ? $medium_file_info[0] : '';

		$large_file_info  = wp_get_attachment_image_src( $attachment_id, 'large' );
		$large_file       = isset( $large_file_info[0] ) ? $large_file_info[0] : '';

		$attachment       = get_post( $attachment_id );
		$attachment_title = wptexturize( $attachment->post_title );
		$attachment_desc  = wpautop( wptexturize( $attachment->post_content ) );

		$attr['data-attachment-id']     = $attachment_id;
		$attr['data-orig-file']         = esc_attr( $orig_file );
		$attr['data-orig-size']         = $size;
		$attr['data-image-title']       = esc_attr( $attachment_title );
		$attr['data-image-description'] = esc_attr( $attachment_desc );
		$attr['data-medium-file']       = esc_attr( $medium_file );
		$attr['data-large-file']        = esc_attr( $large_file );

		return $attr;
	}

	function add_data_to_container( $html ) {
		global $post;

		if ( isset( $post ) ) {

			$extra_data = array(
				'data-carousel-extra' => array(
					'permalink' => get_permalink( $post->ID )
					)
				);

			foreach ( (array) $extra_data as $data_key => $data_values ) {
				$html = str_replace( '<div ', '<div ' . esc_attr( $data_key ) . "='" . json_encode( $data_values ) . "' ", $html );
			}
		}

		return $html;
	}
}

// Run Gallery Carousel Class
TZTK_Gallery_Carousel::instance();

endif;