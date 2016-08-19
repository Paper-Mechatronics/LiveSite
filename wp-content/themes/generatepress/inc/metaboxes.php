<?php
/**
 * Generate the layout metabox
 * @since 0.1
 */
function generate_add_layout_meta_box() { 
	
	// Set user role - make filterable
	$allowed = apply_filters( 'generate_metabox_capability', 'edit_theme_options' );
	
	// If not an administrator, don't show the metabox
	if ( ! current_user_can( $allowed ) )
		return;
		
	$post_types = get_post_types();
	foreach ($post_types as $type) {
		add_meta_box
		(  
			'generate_layout_meta_box', // $id  
			__('Sidebar Layout','generatepress'), // $title   
			'generate_show_layout_meta_box', // $callback  
			$type, // $page  
			'side', // $context  
			'high' // $priority  
		); 
	}
}  
add_action('add_meta_boxes', 'generate_add_layout_meta_box');

/**
 * Outputs the content of the metabox
 */
function generate_show_layout_meta_box( $post ) {  

    wp_nonce_field( basename( __FILE__ ), 'generate_layout_nonce' );
    $stored_meta = get_post_meta( $post->ID );
	$stored_meta['_generate-sidebar-layout-meta'][0] = ( isset( $stored_meta['_generate-sidebar-layout-meta'][0] ) ) ? $stored_meta['_generate-sidebar-layout-meta'][0] : '';
	$checked = ( isset($stored_meta['_generate-sidebar-layout-meta'][0]) && '' == $stored_meta['_generate-sidebar-layout-meta'][0] ) ? 'checked="checked"' : '';
    ?>
 
    <p>
		<div class="generate_layouts">
			<label for="meta-generate-layout-global" style="display:block;margin-bottom:10px;">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-global" value="" <?php echo $checked; ?>>
				<?php _e('Global Layout Settings','generatepress');?>
			</label>
			<label for="meta-generate-layout-one" style="display:block;margin-bottom:3px;" title="<?php _e('Right Sidebar','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-one" value="right-sidebar" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'right-sidebar' ); ?>>
				<?php _e('Content','generatepress');?> / <strong><?php _e('Sidebar','generatepress');?></strong>
			</label>
			<label for="meta-generate-layout-two" style="display:block;margin-bottom:3px;" title="<?php _e('Left Sidebar','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-two" value="left-sidebar" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'left-sidebar' ); ?>>
				<strong><?php _e('Sidebar','generatepress');?></strong> / <?php _e('Content','generatepress');?>
			</label>
			<label for="meta-generate-layout-three" style="display:block;margin-bottom:3px;" title="<?php _e('No Sidebars','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-three" value="no-sidebar" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'no-sidebar' ); ?>>
				<?php _e('Content (no sidebars)','generatepress');?>
			</label>
			<label for="meta-generate-layout-four" style="display:block;margin-bottom:3px;" title="<?php _e('Both Sidebars','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-four" value="both-sidebars" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'both-sidebars' ); ?>>
				<strong><?php _e('Sidebar','generatepress');?></strong> / <?php _e('Content','generatepress');?> / <strong><?php _e('Sidebar','generatepress');?></strong>
			</label>
			<label for="meta-generate-layout-five" style="display:block;margin-bottom:3px;" title="<?php _e('Both Sidebars on Left','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-five" value="both-left" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'both-left' ); ?>>
				<strong><?php _e('Sidebar','generatepress');?></strong> / <strong><?php _e('Sidebar','generatepress');?></strong> / <?php _e('Content','generatepress');?>
			</label>
			<label for="meta-generate-layout-six" style="display:block;margin-bottom:3px;" title="<?php _e('Both Sidebars on Right','generatepress');?>">
				<input type="radio" name="_generate-sidebar-layout-meta" id="meta-generate-layout-six" value="both-right" <?php checked( $stored_meta['_generate-sidebar-layout-meta'][0], 'both-right' ); ?>>
				<?php _e('Content','generatepress');?> / <strong><?php _e('Sidebar','generatepress');?></strong> / <strong><?php _e('Sidebar','generatepress');?></strong>
			</label>
		</div>
	</p>
 
    <?php
}
// Save the Data  
function generate_save_layout_meta($post_id) {  
    
	// Checks save status
    $is_autosave = wp_is_post_autosave( $post_id );
    $is_revision = wp_is_post_revision( $post_id );
    $is_valid_nonce = ( isset( $_POST[ 'generate_layout_nonce' ] ) && wp_verify_nonce( $_POST[ 'generate_layout_nonce' ], basename( __FILE__ ) ) ) ? true : false;
 
    // Exits script depending on save status
    if ( $is_autosave || $is_revision || ! $is_valid_nonce ) {
        return;
    }
 
	$key   = '_generate-sidebar-layout-meta';
	$value = filter_input( INPUT_POST, $key, FILTER_SANITIZE_STRING );

	if ( $value )
		update_post_meta( $post_id, $key, $value );
	else
		delete_post_meta( $post_id, $key );
	
}  
add_action('save_post', 'generate_save_layout_meta');

/**
 * Generate the footer widget metabox
 * @since 0.1
 */
function generate_add_footer_widget_meta_box() {  

	// Set user role - make filterable
	$allowed = apply_filters( 'generate_metabox_capability', 'edit_theme_options' );
	
	// If not an administrator, don't show the metabox
	if ( ! current_user_can( $allowed ) )
		return;
		
	$post_types = get_post_types();
	foreach ($post_types as $type) {
		add_meta_box
		(  
			'generate_footer_widget_meta_box', // $id  
			__('Footer Widgets','generatepress'), // $title   
			'generate_show_footer_widget_meta_box', // $callback  
			$type, // $page  
			'side', // $context  
			'high' // $priority  
		); 
	}
}  
add_action('add_meta_boxes', 'generate_add_footer_widget_meta_box');

/**
 * Outputs the content of the metabox
 */
function generate_show_footer_widget_meta_box( $post ) {  

    wp_nonce_field( basename( __FILE__ ), 'generate_footer_widget_nonce' );
    $stored_meta = get_post_meta( $post->ID );
	$stored_meta['_generate-footer-widget-meta'][0] = ( isset( $stored_meta['_generate-footer-widget-meta'][0] ) ) ? $stored_meta['_generate-footer-widget-meta'][0] : '';
	$checked = ( '' == $stored_meta['_generate-footer-widget-meta'][0] ) ? 'checked="checked"' : '';
    ?>
 
    <p>
		<div class="generate_footer_widget">
			<label for="meta-generate-footer-widget-global" style="display:block;margin-bottom:10px;">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-global" value="" <?php echo $checked; ?>>
				<?php _e('Global Footer Widget Settings','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-zero" style="display:block;margin-bottom:3px;" title="<?php _e('0 Widgets','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-zero" value="0" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '0' ); ?>>
				<?php _e('0 Widgets','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-one" style="display:block;margin-bottom:3px;" title="<?php _e('1 Widget','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-one" value="1" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '1' ); ?>>
				<?php _e('1 Widget','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-two" style="display:block;margin-bottom:3px;" title="<?php _e('2 Widgets','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-two" value="2" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '2' ); ?>>
				<?php _e('2 Widgets','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-three" style="display:block;margin-bottom:3px;" title="<?php _e('3 Widgets','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-three" value="3" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '3' ); ?>>
				<?php _e('3 Widgets','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-four" style="display:block;margin-bottom:3px;" title="<?php _e('4 Widgets','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-four" value="4" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '4' ); ?>>
				<?php _e('4 Widgets','generatepress');?>
			</label>
			<label for="meta-generate-footer-widget-five" style="display:block;margin-bottom:3px;" title="<?php _e('5 Widgets','generatepress');?>">
				<input type="radio" name="_generate-footer-widget-meta" id="meta-generate-footer-widget-five" value="5" <?php checked( $stored_meta['_generate-footer-widget-meta'][0], '5' ); ?>>
				<?php _e('5 Widgets','generatepress');?>
			</label>
		</div>
	</p>
 
    <?php
}
// Save the Data  
function generate_save_footer_widget_meta($post_id) {  
    
	// Checks save status
    $is_autosave = wp_is_post_autosave( $post_id );
    $is_revision = wp_is_post_revision( $post_id );
    $is_valid_nonce = ( isset( $_POST[ 'generate_footer_widget_nonce' ] ) && wp_verify_nonce( $_POST[ 'generate_footer_widget_nonce' ], basename( __FILE__ ) ) ) ? true : false;
 
    // Exits script depending on save status
    if ( $is_autosave || $is_revision || ! $is_valid_nonce ) {
        return;
    }
	
	$key   = '_generate-footer-widget-meta';
	$value = filter_input( INPUT_POST, $key, FILTER_SANITIZE_STRING );

	if ( '' !== $value )
		update_post_meta( $post_id, $key, $value );
	else
		delete_post_meta( $post_id, $key );
}  
add_action('save_post', 'generate_save_footer_widget_meta');