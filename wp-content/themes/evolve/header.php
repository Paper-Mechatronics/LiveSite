<?php
/**
 * Template: Header.php
 *
 * @package EvoLve
 * @subpackage Template
 */

?>
<!DOCTYPE html>
<!--BEGIN html-->
<html <?php language_attributes(); ?>>
    <!--BEGIN head-->
    <head>

        <?php
        $evolve_favicon = evolve_get_option('evl_favicon');
        if ($evolve_favicon) {
            ?>
            <!-- Favicon -->
            <!-- Firefox, Chrome, Safari, IE 11+ and Opera. -->
            <link href="<?php echo $evolve_favicon; ?>" rel="icon" type="image/x-icon" />
        <?php } ?>

        <!-- Meta Tags -->
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <?php wp_head(); ?>

        <!--[if lt IE 9]>
        <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/ie.css">
        <![endif]-->

    </head><!--END head-->

	<?php $evolve_header_type = evolve_get_option('evl_header_type', 'none'); ?>	

    <!--BEGIN body-->
    <body <?php body_class(); ?>>
        <?php
        $evolve_custom_background = evolve_get_option('evl_custom_background', '1');
        if ($evolve_custom_background == "1") {
            ?>
            <div id="wrapper">
            <?php } ?>
            <div id="top"></div>
			<?php			
				switch ($evolve_header_type) {
				case "none":
					get_template_part('templates/header_v1');
					break;
				case "h1":
					get_template_part('templates/header_v2');
					break;
				}
				?> 
            <div class="menu-container">
                <?php
                $evolve_menu_background = evolve_get_option('evl_disable_menu_back', '1');
                $evolve_width_layout = evolve_get_option('evl_width_layout', 'fixed');
                if ($evolve_width_layout == "fluid" && $evolve_menu_background == "1") {
                    ?>
                    <div class="fluid-width">
                    <?php } ?>

                    <div class="menu-back">
                        <?php
                        // Bootstrap Slider
                        $evolve_slider_page_id = '';
                        $evolve_bootstrap = evolve_get_option('evl_bootstrap_slider', 'homepage');
                        if (!empty($post->ID)) {
                            if (!is_home() && !is_front_page() && !is_archive()) {
                                $evolve_slider_page_id = $post->ID;
                            }
                            if (!is_home() && is_front_page()) {
                                $evolve_slider_page_id = $post->ID;
                            }
                        }
                        if (is_home() && !is_front_page()) {
                            $evolve_slider_page_id = get_option('page_for_posts');
                        }
                        if (get_post_meta($evolve_slider_page_id, 'evolve_slider_type', true) == 'bootstrap' || ($evolve_bootstrap == "homepage" && is_front_page()) || $evolve_bootstrap == "all"):
                            evolve_bootstrap();
                        endif;

                        // Parallax Slider
                        $evolve_slider_page_id = '';
                        $evolve_parallax = evolve_get_option('evl_parallax_slider', 'homepage');
                        if (!empty($post->ID)) {
                            if (!is_home() && !is_front_page() && !is_archive()) {
                                $evolve_slider_page_id = $post->ID;
                            }
                            if (!is_home() && is_front_page()) {
                                $evolve_slider_page_id = $post->ID;
                            }
                        }
                        if (is_home() && !is_front_page()) {
                            $evolve_slider_page_id = get_option('page_for_posts');
                        }
                        if (get_post_meta($evolve_slider_page_id, 'evolve_slider_type', true) == 'parallax' || ($evolve_parallax == "homepage" && is_front_page()) || $evolve_parallax == "all"):
                            $evolve_parallax_slider = evolve_get_option('evl_parallax_slider_support', '1');
                            if ($evolve_parallax_slider == "1"):
                                evolve_parallax();
                            endif;
                        endif;

                        // Posts Slider
                        $evolve_posts_slider = evolve_get_option('evl_posts_slider', 'post');
                        if (get_post_meta($evolve_slider_page_id, 'evolve_slider_type', true) == 'posts' || ($evolve_posts_slider == "homepage" && is_front_page()) || $evolve_posts_slider == "all"):
                            $evolve_carousel_slider = evolve_get_option('evl_carousel_slider', '1');
                            if ($evolve_carousel_slider == "1"):
                                evolve_posts_slider();
                            endif;
                        endif;

                        $evolve_width_layout = evolve_get_option('evl_width_layout', 'fixed');
                        if ($evolve_width_layout == "fluid") {
                            ?>
                            <div class="container">
                                <?php
                            }
                            $evolve_header_widgets_placement = evolve_get_option('evl_header_widgets_placement', 'home');
                            $evolve_widget_this_page = get_post_meta(isset($post->ID), 'evolve_widget_page', true);
                            if (((is_home() || is_front_page()) && $evolve_header_widgets_placement == "home") || (is_single() && $evolve_header_widgets_placement == "single") || (is_page() && $evolve_header_widgets_placement == "page") || ($evolve_header_widgets_placement == "all") || ($evolve_widget_this_page == "yes" && $evolve_header_widgets_placement == "custom")) {
                                $evolve_widgets_header = evolve_get_option('evl_widgets_header', 'disable');
                                // if Header widgets exist
                                if (($evolve_widgets_header == "") || ($evolve_widgets_header == "disable")) {
                                    
                                } else {
                                    $evolve_header_css = '';
                                    if ($evolve_widgets_header == "one") {
                                        $evolve_header_css = 'widget-one-column col-sm-6';
                                    }
                                    if ($evolve_widgets_header == "two") {
                                        $evolve_header_css = 'col-sm-6 col-md-6';
                                    }
                                    if ($evolve_widgets_header == "three") {
                                        $evolve_header_css = 'col-sm-6 col-md-4';
                                    }
                                    if ($evolve_widgets_header == "four") {
                                        $evolve_header_css = 'col-sm-6 col-md-3';
                                    }
                                    ?>
                                    <div class="container">
                                        <div class="header-widgets">
                                            <div class="widgets-back-inside">
                                                <div class="<?php echo $evolve_header_css; ?>">
                                                    <?php if (!dynamic_sidebar('header-1')) : ?>
                                                    <?php endif; ?>
                                                </div>
                                                <div class="<?php echo $evolve_header_css; ?>">
                                                    <?php if (!dynamic_sidebar('header-2')) : ?>
                                                    <?php endif; ?>
                                                </div>
                                                <div class="<?php echo $evolve_header_css; ?>">
                                                    <?php if (!dynamic_sidebar('header-3')) : ?>
                                                    <?php endif; ?>
                                                </div>
                                                <div class="<?php echo $evolve_header_css; ?>">
                                                    <?php if (!dynamic_sidebar('header-4')) : ?>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- /.container -->
                                    <?php
                                }
                            } else {
                                
                            }
                            ?>
                        </div><!-- /.container -->
                    </div><!--/.menu-back-->
                    <?php
                    $evolve_width_layout = evolve_get_option('evl_width_layout', 'fixed');
                    if ($evolve_width_layout == "fluid") {
                        ?>
                    </div><!-- /.fluid-width -->
                <?php } ?>
                <!--BEGIN .content-->
                <div class="content <?php semantic_body(); ?>">
                    <?php if (is_page_template('contact.php')): ?>
                        <div class="gmap" id="gmap"></div>
                    <?php endif; ?>
                    <!--BEGIN .container-->
                    <div class="container container-center row">
                        <!--BEGIN #content-->
                        <div id="content">
                            <?php
                            if (is_front_page()) {
                                evolve_content_boxes();
                            }
                            ?>