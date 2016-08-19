<?php

	$evolve_css_data = '';
	$evolve_template_url = get_template_directory_uri();
	$evolve_pagination_type 			  = evolve_get_option('evl_pagination_type', 'pagination');
	$evolve_layout 						  = evolve_get_option('evl_layout', '2cl');
	$evolve_width_layout 				  = evolve_get_option('evl_width_layout', 'fixed');
	$evolve_content_back 				  = evolve_get_option('evl_content_back', 'light');
    $evolve_menu_back_color               = evolve_get_option('evl_menu_back_color', '#273039');
	$evolve_menu_back 					  = evolve_get_option('evl_menu_back', 'light');
    $evolve_top_menu_back_color           = evolve_get_option('evl_top_menu_back', '#273039');	
	$evolve_custom_main_color 			  = evolve_get_option('evl_header_footer_back_color', '');
    $evolve_custom_header_color           = evolve_get_option('evl_header_background_color', '#313a43');
    $evolve_main_pattern                  = evolve_get_option('evl_pattern', '');
	$evolve_scheme_widgets 				  = evolve_get_option('evl_scheme_widgets', '#595959');
	$evolve_post_layout 				  = evolve_get_option('evl_post_layout', 'two');
	$evolve_header_logo 				  = evolve_get_option('evl_header_logo', '');
	$evolve_pos_logo 					  = evolve_get_option('evl_pos_logo', 'left');
	$evolve_pos_button 					  = evolve_get_option('evl_pos_button', 'right');
	$evolve_custom_background 			  = evolve_get_option('evl_custom_background', '1');
	$evolve_tagline_pos 				  = evolve_get_option('evl_tagline_pos', 'next');
	$evolve_widget_background 			  = evolve_get_option('evl_widget_background', '0');
	$evolve_widget_bgcolor 				  = evolve_get_option('evl_widget_bgcolor', '#273039');		
	$evolve_widget_background_image 	  = evolve_get_option('evl_widget_background_image', '1');
	$evolve_menu_background 			  = evolve_get_option('evl_disable_menu_back', '1');
	$evolve_social_color 				  = evolve_get_option('evl_social_color_scheme', '#999999');
	$evolve_social_icons_size 			  = evolve_get_option('evl_social_icons_size', 'normal');
	$evolve_scheme_background 			  = evolve_get_option('evl_scheme_background', '');
	$evolve_scheme_background_100 		  = evolve_get_option('evl_scheme_background_100', '0');
	$evolve_scheme_background_repeat 	  = evolve_get_option('evl_scheme_background_repeat', 'repeat');
	$evolve_general_link 				  = evolve_get_option('evl_general_link', '#0bb697');
	$evolve_animatecss 					  = evolve_get_option('evl_animatecss', '1');
	$evolve_gmap_address 				  = evolve_get_option('evl_gmap_address', '');
	$evolve_status_gmap 				  = evolve_get_option('evl_status_gmap', '');
	$evolve_gmap_width 					  = evolve_get_option('evl_gmap_width', '100%');
	$evolve_gmap_height 				  = evolve_get_option('evl_gmap_height', '415px');
	$evolve_width_px 					  = evolve_get_option('evl_width_px', '1200');
	$evolve_content_box1_icon_color 	  = evolve_get_option('evl_content_box1_icon_color', '#afbbc1');
	$evolve_content_box2_icon_color 	  = evolve_get_option('evl_content_box2_icon_color', '#afbbc1');
	$evolve_content_box3_icon_color 	  = evolve_get_option('evl_content_box3_icon_color', '#afbbc1');
	$evolve_content_box4_icon_color 	  = evolve_get_option('evl_content_box4_icon_color', '#afbbc1');
	$evolve_min_width_px 				  = $evolve_width_px + 20;
	$evolve_header_image 				  = evolve_get_option('evl_header_image', 'cover');
	$evolve_content_background_image 	  = evolve_get_option('evl_content_background_image');
	$evolve_content_background_color 	  = evolve_get_option('evl_content_background_color', '#ffffff');
    $evolve_content_image_responsiveness  = evolve_get_option('evl_content_image_responsiveness', 'cover' );	
	$evolve_shadow_effect 				  = evolve_get_option('evl_shadow_effect', 'disable');
	$evolve_content_box_background_color  = evolve_get_option('evl_content_box_background_color', '#efefef'); 
    $evolve_responsive_menu               = evolve_get_option('evl_responsive_menu', 'icon');
    $evolve_header_type                   = evolve_get_option('evl_header_type', 'none');
    $evolve_menu_font                     = evolve_get_option('evl_menu_font');	

	$evolve_css_data .= 'body {background-color:#ecebe9;}';

    // menu hover effect color
	$evolve_top_menu_hover_font_color = evolve_get_option('evl_top_menu_hover_font_color', '#ffffff');	
	$evolve_menu_text_transform 	  = evolve_get_option('evl_menu_text_transform', 'none');

	// header social media border box
	$evolve_social_box_radius = evolve_get_option('evl_social_box_radius', 'disabled');
	

    if ( $evolve_content_box_background_color ) {
        $evolve_css_data .= '
.home-content-boxes .content-box {
	background: ' . $evolve_content_box_background_color . ';
	padding:30px 10px;
}

.content-box p {
	margin: 25px 0 50px 0;
}

@media (min-width: 768px) { 
	.home-content-boxes .content-box {
		padding: 30px 20px;
		margin: 0 0.98%;
	}
	.home-content-boxes .col-md-3.content-box {
		width:23%;
	}	
	.home-content-boxes .col-md-4.content-box {
		width:31.33333333%;
	}	
	.home-content-boxes .col-md-6.content-box {
		width:48%;
		margin: 0 0.96%;		
	}	
	.home-content-boxes .col-md-12.content-box {
		width:98%;
	}
}

@media (min-width: 768px) and (max-width: 991px) {
		.home-content-boxes .col-md-3.content-box {
		padding:30px 20px 70px 20px;
		width:23%;
	}		
}

@media (min-width: 992px) {
		.home-content-boxes .col-md-3.content-box {
		padding:30px 20px 70px 20px;
		width:23%;
	}	
}

@media (max-width: 768px) { 
		.cntbox_btn {
		position: relative;
		bottom: 0px;
	}
}	
	';
    }

$evolve_css_data .= '
.sticky-header .nav {
    float: left;
    margin-left: 25px;
}

ul.nav-menu li a:active, ul.nav-menu li:active > a, ul.nav-menu li a:focus, ul.nav-menu li:focus > a, ul.nav-menu li a:hover, ul.nav-menu li:hover> a, ul.nav-menu li:hover, ul.nav-menu li a:hover span, ul.nav-menu li:hover> a span,  ul.nav-menu li:hover> .sf-with-ul::after{
	color:'.$evolve_top_menu_hover_font_color.' !important;
}
';

	if (evolve_get_option('evl_main_menu_hover_effect', 'rollover') != 'disabled') {
    $menu_effect = evolve_get_option('evl_main_menu_hover_effect', 'smooth');
        if ( $menu_effect == 'smooth' ) {
            $evolve_css_data .= '
         @media only screen and (min-width: 768px){
            /* .link-effect a:hover span,
            .link-effect a:focus span {
                    -webkit-transform: translateY(-100%);
                    -moz-transform: translateY(-100%);
                    transform: translateY(-100%);
            } */

            ul.nav-menu li{
                -webkit-transition: all .1s ease-in;
                -moz-transition: all .1s ease-in;
                -o-transition: all .1s ease-in;
                -ms-transition: all .1s ease-in;
                transition: all .1s ease-in;
            }
            ul.nav-menu li span:hover,
            .sticky-header .menu-item a:hover,
            .sc_menu a:hover, .sc_menu a.tipsytext:hover{
              color: '.$evolve_top_menu_hover_font_color.' !important;
            }
            
            ul.nav-menu .sf-with-ul:hover::after {
              color: '.$evolve_top_menu_hover_font_color.';
            }
            
            ul.nav-menu li:hover{
                background: '.$evolve_top_menu_hover_color.' none repeat scroll 0 0;
            }
        }';
        }

		if($menu_effect == 'rollover'){
            $evolve_css_data .= ' @media only screen and (min-width: 768px){
            .link-effect a:hover span,
           .link-effect a:focus span {
                   -webkit-transform: translateY(-100%);
                   -moz-transform: translateY(-100%);
                   transform: translateY(-100%);
           } }';
        }
    }

if ($evolve_width_px && ( $evolve_width_layout == "fixed" )) {
    $evolve_css_data .= '
@media (min-width: ' . $evolve_min_width_px . 'px) {
	.container, #wrapper {
		width: ' . $evolve_width_px . 'px!important;
	}
}
	';
} else {
    $evolve_css_data .= '
@media (min-width: ' . $evolve_min_width_px . 'px) {
	.container {
		width: ' . $evolve_width_px . 'px!important;
	}  
	.menu-back .container:first-child {
		width: 100%!important;
		padding-left:0px!important;
		padding-right:0px!important;
	}
}
	';
}

if ($evolve_gmap_address && $evolve_status_gmap):
    $evolve_css_data .= '#gmap{width:' . $evolve_gmap_width . ';margin:0 auto;';
    if ($evolve_gmap_height):
        $evolve_css_data .= 'height:' . $evolve_gmap_height;
    else:
        $evolve_css_data .= 'height:415px;';
    endif;
    $evolve_css_data .= '}';
endif;

if ($evolve_animatecss == "1") {
    $evolve_css_data .= '
@media only screen and (min-width: 768px){
    .link-effect a:hover span,
    .link-effect a:focus span {
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        transform: translateY(-100%); 
    } 
}

.entry-content .thumbnail-post:hover img {
    -webkit-transform: scale(1.1,1.1);
    -moz-transform: scale(1.1,1.1);
    -o-transform: scale(1.1,1.1);
    -ms-transform: scale(1.1,1.1);
    transform: scale(1.1,1.1);
}

.entry-content .thumbnail-post:hover .mask {
    -ms-filter: "progid: DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
}

.entry-content .thumbnail-post:hover .icon {
    -ms-filter: "progid: DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
    top:50%;
	left:50%;	
    margin-top:-21px;
    -webkit-transition-delay: 0.1s;
    -moz-transition-delay: 0.1s;
    -o-transition-delay: 0.1s;
    -ms-transition-delay: 0.1s;
    transition-delay: 0.1s;
}
	';
}

if ($evolve_layout == "2cr") {
    $evolve_css_data .= '
/**
 * 2 column (aside)(content) fixed layout
 */

@media (min-width: 768px) {
    #primary {
        float:right;
    }  
}

	';
}
if ($evolve_layout == "3cr") {
    $evolve_css_data .= '
/**
 * 3 column (aside)(aside)(content) fixed layout
 */

#secondary, 
#secondary-2 { 
    float: left; 
}

#primary {
    float:right;
}

	';
}
if ($evolve_layout == "3cl") {
    $evolve_css_data .= '
/**
 * 3 column (aside)(aside)(content) fixed layout
 */      

#secondary, 
#secondary-2 { 
    float: right; 
}

	';
}
if ($evolve_layout == "3cm") {
    $evolve_css_data .= '
/**
 *  3 columns (aside)(content)(aside) fixed layout
 */    

#secondary { 
    float: right; 
}

#secondary-2 { 
    float: left; 
}

';
}
if ($evolve_width_layout == "fluid") {
    $evolve_css_data .= '
/**
 * Basic 1 column (content)(aside) fluid layout
 * 
 * @package WPEvoLve
 * @subpackage Layouts
 * @beta
 */

#wrapper {
    margin:0;
    width:100%;
}

	';
}

if ($evolve_layout == "1c") {
    $evolve_css_data .= '
/**
 * 1 column (content) fixed layout
 * 
 * @package WPEvoLve
 * @subpackage Layouts
 * @beta
 */

	';
}

if ($evolve_content_back == "dark") {
    $evolve_css_data .= '
/**
 * Dark content
 * 
 */

body {
    color:#ddd;
}

.entry-title, 
.entry-title a {
    color:#ccc;
    text-shadow:0 1px 0px #000;
}

.entry-title, 
.entry-title a:hover { 
    color: #fff; 
}

input[type="text"], 
input[type="password"],
input[type="email"], 
textarea {
    border:1px solid #111!important;
}

#search-text-top {
    border-color: rgba(0, 0, 0, 0)!important;
}

.entry-content img, 
.entry-content .wp-caption {
    background:#444;
    border: 1px solid #404040;
}

#slide_holder, 
.similar-posts {
    background:rgba(0, 0, 0, 0.2);
}

#slide_holder .featured-title a, 
#slide_holder .twitter-title {
    color:#ddd;
}

#slide_holder .featured-title a:hover {
    color:#fff;
}

#slide_holder .featured-title, 
#slide_holder .twitter-title, 
#slide_holder p {
    text-shadow:0 1px 1px #333;
}

#slide_holder .featured-thumbnail {
    background:#444;
    border-color:#404040;
}   

var, 
kbd, 
samp, 
code, 
pre {
    background-color:#505050;
}

pre {
    border-color:#444;
}

.post-more, 
.anythingSlider .arrow span {
    border-color: #222; 
    border-bottom-color: #111;
    text-shadow: 0 1px 0 #111;
    color: #aaa;
    background: #505050;               
    background: -webkit-gradient(linear,left top,left bottom,color-stop(.2, #505050),color-stop(1, #404040));
    background: -moz-linear-gradient(center top,#505050 20%,#404040 100%);
    background: -o-linear-gradient(top, #505050,#404040) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#505050\', endColorstr=\'#404040\');
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset,0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset,0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
}

a.post-more:hover, 
.anythingSlider .arrow a:hover span {
    color:#fff;
}

.social-title, 
#reply-title {
    color:#fff;
    text-shadow:0 1px 0px #222;
}

#social {
    -webkit-box-shadow:none!important;
    -moz-box-shadow:none!important;
    -box-shadow:none!important;
    box-shadow:none!important;
}

.menu-back {
    border-top-color:#515151;
}

.page-title {
    text-shadow:0 1px 0px #111;
}

.hentry .entry-header .comment-count a { 
    background:none !important;
	-moz-box-shadow:none !important;
}

.content-bottom {
    background:#353535;
}

.entry-header a {
    color:#eee;
}

.entry-meta {
    text-shadow:0 1px 0 #111;
}

.entry-footer a:hover {
    color:#fff;
}

.widget-content {  
    background: #484848;
    border-color: #404040;
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    -box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
    color: #FFFFFF;
}

.tab-holder .tabs li a {
    background:rgba(0, 0, 0, 0.05);
}

.tab-holder .tabs li:last-child a {
    border-right: 1px solid #404040 !important;
}

.tab-holder .tabs li a, 
.tab-holder .news-list li {
    -webkit-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    -moz-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    -box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
}

.tab-holder .tabs li.active a {
    background:#484848;
    border-color: #404040 rgba(0, 0, 0, 0) #484848 #404040 !important;
    color: #eee !important;
}

.tab-holder .tabs-container {
    background:#484848;
    border: 1px solid #404040 !important;
    border-top:0!important;
}

.tab-holder .news-list li .post-holder a {
    color: #eee !important;
}

.tab-holder .news-list li:nth-child(2n) {
    background: rgba(0, 0, 0, 0.05);
}

.tab-holder .news-list li {
    border-bottom: 1px solid #414141;
}

.tab-holder .news-list img {
    background: #393939;
    border: 1px solid #333;
}

.author.vcard .avatar {
    border-color:#222;
}  

.tipsy-inner {
    -moz-box-shadow:0 0 2px #111;
}

#secondary a, 
#secondary-2 a, 
.widget-title  {
    text-shadow:1px 1px 0px #000; 
}

#secondary a, 
#secondary-2 a,
.footer-widgets a, 
.header-widgets a {
    color: #eee;
} 

h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
    color: #eee;
}

ul.breadcrumbs {
    background:#484848;
    border: 1px solid #404040;
    -webkit-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    -moz-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    -box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
}

ul.breadcrumbs li {
    color: #aaa;
}

ul.breadcrumbs li a {
    color: #eee;
}

ul.breadcrumbs li:after {
    color: rgba(255,255, 255, 0.2);
}

.menu-container, 
.content, 
#wrapper {
    background:#555;
}  

.widgets-back h3 {
    color:#fff !important;
    text-shadow:1px 1px 0px #000 !important;
}

.widgets-back ul, 
.widgets-back ul ul, 
.widgets-back ul ul ul {
    list-style-image:url(' . $evolve_template_url . '/library/media/images/dark/list-style-dark.gif) !important;
}

.widgets-back a:hover {
    color:orange
}

.widgets-holder a {
    text-shadow: 0 1px 0 #000 !important;
}

#search-text, 
#search-text-top:focus, 
#respond input#author, 
#respond input#url, 
#respond input#email, 
#respond textarea {
    -moz-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    -webkit-box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    -box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
}

.widgets-back .widget-title a {
    color:#fff !important;
    text-shadow:0 1px 3px #444 !important;
}

.comment, 
.trackback, 
.pingback {
    text-shadow:0 1px 0 #000;
    background: #505050; 
    border-color: #484848;
}

.comment-header {
    background:#484848;
    border-bottom: 1px solid #484848;
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
}

.avatar {  
    background:#444444;
    border-color: #404040;
}

#leave-a-reply {
    text-shadow:0 1px 1px #333333;
}

.entry-content .read-more a, 
#page-links a, 
.page-navigation .current,
.pagination .current {
	text-shadow: 0 1px 0 #111;
    color: #aaa;
    background: #505050;               
    background: -webkit-gradient(linear,left top,left bottom,color-stop(.2, #505050),color-stop(1, #404040));
    background: -moz-linear-gradient(center top,#505050 20%,#404040 100%);
    background: -o-linear-gradient(top, #505050,#404040);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#505050\', endColorstr=\'#404040\');
    -webkit-box-shadow:  1px 1px 0 rgba(255, 255, 255, 0.1) inset,0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow:  1px 1px 0 rgba(255, 255, 255, 0.1) inset,0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow:   1px 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
}

.share-this a { 
    text-shadow:0 1px 0px #111; 
}

.share-this a:hover {
    color:#fff;
}

.share-this strong {
    color:#999;
	border:1px solid #222;
	text-shadow:0 1px 0px #222;
	background:#505050;
    background: -moz-linear-gradient(center top , #505050 20%, #404040 100%) repeat scroll 0 0 transparent;
    background: -webkit-gradient(linear,left top,left bottom,color-stop(.2, #505050),color-stop(1, #404040)) !important;
    background: -o-linear-gradient(top, #505050,#404040) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#505050\', endColorstr=\'#404040\');
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
    -box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
}

.entry-content .read-more {
    text-shadow: 0 1px 0 #111111;
}

.entry-header .comment-count a {
    color:#aaa;
}

.share-this:hover strong {
    color:#fff;
}

.page-navigation .nav-next, 
.single-page-navigation .nav-next, 
.page-navigation .nav-previous, 
.single-page-navigation .nav-previous {
    color:#777;
}

.page-navigation .nav-previous a, 
.single-page-navigation .nav-previous a, 
.page-navigation .nav-next a, 
.single-page-navigation .nav-next a {
    color:#999999;
    text-shadow:0 1px 0px #333;
}

.page-navigation .nav-previous a:hover, 
.single-page-navigation .nav-previous a:hover, 
.page-navigation .nav-next a:hover, 
.single-page-navigation .nav-next a:hover {
    color:#eee;
}

.icon-big:before {
    color:#666;
}

.page-navigation .nav-next:hover a, 
.single-page-navigation .nav-next:hover a, 
.page-navigation .nav-previous:hover a, 
.single-page-navigation .nav-previous:hover a, 
.icon-big:hover:before, 
.btn:hover, 
.btn:focus {
    color:#fff;
}

/* Page Navi */

.wp-pagenavi a, 
.wp-pagenavi span {
    -moz-box-shadow:0 1px 2px #333;
    background:#555;
	color:#999999;
    text-shadow:0 1px 0px #333;
}

.wp-pagenavi a:hover, 
.wp-pagenavi span.current {
    background:#333;
    color:#eee;
}

#page-links a:hover {
    background:#333;
    color:#eee;
}

blockquote {
    color:#bbb;
    text-shadow:0 1px 0px #000;
    border-color:#606060;
}

blockquote:before, 
blockquote:after {
    color: #606060;
}

table {
    background:#505050;
    border-color: #494949;
}

thead, 
thead th, 
thead td {
    background:rgba(0, 0, 0, 0.1);
    color:#FFFFFF;
    text-shadow:0 1px 0px #000;
}

thead {
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1) inset;
}

th, 
td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.02);
}   

table#wp-calendar th, 
table#wp-calendar tbody tr td {
    color:#888;
	text-shadow:0 1px 0px #111;
}

table#wp-calendar tbody tr td {
    border-right:1px solid #484848;
    border-top:1px solid #555;
}

table#wp-calendar th {
    color:#fff;
    text-shadow:0 1px 0px #111;
}

table#wp-calendar tbody tr td a {
    text-shadow:0 1px 0px #111;
}

';
}
if ($evolve_menu_back == "dark" && empty($evolve_menu_back_color)) {
    $evolve_css_data .= '

ul.nav-menu a {
    color:#fff;
    text-shadow:0 1px 0px #333; 
}

ul.nav-menu li.nav-hover ul { 
    background: #505050; 
}

ul.nav-menu ul li a {
    border-bottom-color:#484848;
}

ul.nav-menu ul li:hover > a, 
ul.nav-menu li.current-menu-item > a, 
ul.nav-menu li.current-menu-ancestor > a  {
    border-top-color:#666!important;
}

ul.nav-menu li.current-menu-ancestor li.current-menu-item > a, 
ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a {
	border-top-color:#666; 
}

ul.nav-menu li li, 
ul.nav-menu li li li,
ul.nav-menu li li li li {
	border-color:#444;
}

ul.nav-menu ul {
    border: 1px solid #444; 
	border-bottom:0;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 2px rgba(255, 255, 255, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    -box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 2px rgba(255, 255, 255, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 2px rgba(255, 255, 255, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 2px rgba(255, 255, 255, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
}

ul.nav-menu li {
    border-left-color: #444;
    border-right-color:  #666;
}

.menu-header,
body #header.sticky-header {
    background:#505050;
    background:url(' . $evolve_template_url . '/library/media/images/dark/trans.png) 0px -7px repeat-x, -moz-linear-gradient(center top , #606060 20%, #505050 100%);
    background:url(' . $evolve_template_url . '/library/media/images/dark/trans.png) 0px -7px repeat-x, -webkit-gradient(linear,left top,left bottom,color-stop(.2, #606060),color-stop(1, #505050)) !important;
    background: url(' . $evolve_template_url . '/library/media/images/dark/trans.png) 0px -7px repeat-x,-o-linear-gradient(top, #606060,#505050) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#606060\', endColorstr=\'#505050\');
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	text-shadow:0 1px 0px #000;
    border-color:#222;  
} 

body #header.sticky-header a.logo-url-text {
    color:#fff;
}

ul.nav-menu ul { 
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 2px rgba(255, 255, 255, 0.05) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1)!important;
    -box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 2px rgba(255, 255, 255, 0.05) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1)!important;
    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 2px rgba(255, 255, 255, 0.05) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1)!important;
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 2px rgba(255, 255, 255, 0.05) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0.1)!important;
}

ul.nav-menu li.current-menu-item, 
ul.nav-menu li.current-menu-ancestor, 
ul.nav-menu li:hover {
    border-right-color:#666!important;
}

ul.nav-menu > li.current-menu-item, 
ul.nav-menu > li.current-menu-ancestor, 
ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a, 
ul.nav-menu li > li.current-menu-ancestor a,
ul.nav-menu li.current-menu-ancestor li.current-menu-item > a {
	background-color:rgba(0, 0, 0, 0.1)!important;
}

#wrapper .dd-container .dd-selected-text {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dd-option {
    border-bottom: 1px solid #404040!important;          
}

#wrapper .dd-options li { 
    border-bottom: 1px solid #404040 !important; 
}     

#wrapper .dd-options {
    background:#444!important;
    border-color:#404040!important;
}

#wrapper .dd-container label, 
#wrapper .dd-container a {
    color: #eee!important;
}

#wrapper .dd-options li a:hover,
#wrapper .dd-options li.dd-option-selected a{
    background-color:#333 !important;
    color:#fff !important;
}

#search-text-top:focus {
    -webkit-box-shadow:1px 1px 0px rgba(0,0,0,.9);
    -moz-box-shadow:1px 1px 0px rgba(0,0,0,.9);
    -box-shadow:1px 1px 0px rgba(0,0,0,.9);
    box-shadow:1px 1px 0px rgba(0,0,0,.9);
}

	';
}

if (!empty($evolve_menu_back_color)) {
        $evolve_menu_back_color = mb_substr($evolve_menu_back_color, 1);
        $evolve_css_data .= '

ul.nav-menu li.nav-hover ul { 
    background: #' . $evolve_menu_back_color . '; 
}

ul.nav-menu ul li:hover > a, 
ul.nav-menu li.current-menu-item > a, 
ul.nav-menu li.current-menu-ancestor > a  {
    border-top-color:#' . $evolve_menu_back_color . '!important;
}

ul.nav-menu li.current-menu-ancestor li.current-menu-item > a, 
ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a {
    border-top-color:#' . $evolve_menu_back_color . '; 
}

ul.nav-menu ul {
    border: 1px solid ' . evolve_hexDarker($evolve_menu_back_color) . '; 
    border-bottom:0;
}

ul.nav-menu li {
    border-left-color: ' . evolve_hexDarker($evolve_menu_back_color) . ';
    border-right-color:  #' . $evolve_menu_back_color . ';
}

.menu-header,
body #header.sticky-header.sticky {
    background:#' . $evolve_menu_back_color . ';
    background:url(' . $evolve_template_url . '/library/media/images/trans.png) 0px -10px repeat-x,-moz-linear-gradient(center top , #' . $evolve_menu_back_color . ' 20%, #' . evolve_hexDarker($evolve_menu_back_color) . ' 100%);
    background:url(' . $evolve_template_url . '/library/media/images/trans.png) 0px -10px repeat-x,-webkit-gradient(linear,left top,left bottom,color-stop(.2, #' . $evolve_menu_back_color . '),color-stop(1, #' . evolve_hexDarker($evolve_menu_back_color) . ')) !important;
    background:url(' . $evolve_template_url . '/library/media/images/trans.png) 0px -10px repeat-x,-o-linear-gradient(top, #' . $evolve_menu_back_color . ',#' . evolve_hexDarker($evolve_menu_back_color) . ') !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#' . $evolve_menu_back_color . '\', endColorstr=\'#' . evolve_hexDarker($evolve_menu_back_color) . '\');
    border-color:#' . evolve_hexDarker($evolve_menu_back_color) . ';
} 

#wrapper .dd-options {
	background:#' . $evolve_menu_back_color . ';
}

ul.nav-menu li.current-menu-item, 
ul.nav-menu li.current-menu-ancestor, 
ul.nav-menu li:hover {
    border-right-color:#' . $evolve_menu_back_color . '!important;
}

ul.nav-menu ul, 
ul.nav-menu li li, 
ul.nav-menu li li li, 
ul.nav-menu li li li li,
#wrapper .dd-options li,
#wrapper .dd-options {
	border-color:#'.evolve_hexDarker($evolve_menu_back_color).'!important;
}	

#wrapper .dd-container .dd-selected-text,
#wrapper .dd-options li a:hover, 
#wrapper .dd-options li.dd-option-selected a {
	background:#'.evolve_hexDarker($evolve_menu_back_color).'!important; 
}
	';
    }
	
/* header2.php style */
if (!empty($evolve_top_menu_back_color) && $evolve_header_type == 'h1') {
        $evolve_top_menu_back_color = mb_substr($evolve_top_menu_back_color, 1);
        $evolve_css_data .= '
	
.new-top-menu,
.new-top-menu ul.nav-menu li.nav-hover ul,
.new-top-menu form.top-searchform { 
	background: #' . $evolve_top_menu_back_color . '!important; 
}

.new-top-menu ul.nav-menu ul li:hover > a, 
.new-top-menu ul.nav-menu li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor > a  {
	border-top-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a {
	border-top-color:#' . $evolve_top_menu_back_color . '; 
}

.new-top-menu ul.nav-menu ul {
	border: 1px solid ' . evolve_hexDarker($evolve_top_menu_back_color) . '; 
	border-bottom:0;
}

.new-top-menu ul.nav-menu li {
	border-left-color: ' . evolve_hexDarker($evolve_top_menu_back_color) . ';
	border-right-color:  #' . $evolve_top_menu_back_color . ';
}

#wrapper .new-top-menu .dd-options {
	background:#' . $evolve_top_menu_back_color . ';
}

.new-top-menu ul.nav-menu li.current-menu-item, 
.new-top-menu ul.nav-menu li.current-menu-ancestor, 
.new-top-menu ul.nav-menu li:hover {
	border-right-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu ul, 
.new-top-menu ul.nav-menu li li, 
.new-top-menu ul.nav-menu li li li, 
.new-top-menu ul.nav-menu li li li li,
#wrapper .new-top-menu .dd-options li,
#wrapper .new-top-menu .dd-options {
	border-color:#'.evolve_hexDarker($evolve_top_menu_back_color).'!important;
}	

#wrapper .new-top-menu .dd-container .dd-selected-text,
#wrapper .new-top-menu .dd-options li a:hover, 
#wrapper .new-top-menu .dd-options li.dd-option-selected a {
	background:#'.evolve_hexDarker($evolve_top_menu_back_color).'!important; 
}
	';
}	

    // Top Menu Color

    if ( ! empty( $evolve_top_menu_back_color ) && $evolve_header_type == 'h3' ) {
        $evolve_top_menu_back_color = mb_substr( $evolve_top_menu_back_color, 1 );
        $evolve_css_data .= '
	
.new-top-menu,
.new-top-menu ul.nav-menu li.nav-hover ul,
.new-top-menu form.top-searchform { 
	background: #' . $evolve_top_menu_back_color . '!important; 
}

.new-top-menu ul.nav-menu ul li:hover > a, 
.new-top-menu ul.nav-menu li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor > a  {
	border-top-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a {
	border-top-color:#' . $evolve_top_menu_back_color . '; 
}

.new-top-menu ul.nav-menu ul {
	border: 1px solid ' . evolve_hexDarker( $evolve_top_menu_back_color ) . ';
	border-bottom:0;
}

.new-top-menu ul.nav-menu li {
	border-left-color: ' . evolve_hexDarker( $evolve_top_menu_back_color ) . ';
	border-right-color:  #' . $evolve_top_menu_back_color . ';
}



#wrapper .new-top-menu .dd-options {
	background:#' . $evolve_top_menu_back_color . ';
}

.new-top-menu ul.nav-menu li.current-menu-item, 
.new-top-menu ul.nav-menu li.current-menu-ancestor, 
.new-top-menu ul.nav-menu li:hover {
	border-right-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu ul, 
.new-top-menu ul.nav-menu li li, 
.new-top-menu ul.nav-menu li li li, 
.new-top-menu ul.nav-menu li li li li,
#wrapper .new-top-menu .dd-options li,
#wrapper .new-top-menu .dd-options {
	border-color:#' . evolve_hexDarker( $evolve_top_menu_back_color ) . '!important;
}	

#wrapper .new-top-menu .dd-container .dd-selected-text,
#wrapper .new-top-menu .dd-options li a:hover, 
#wrapper .new-top-menu .dd-options li.dd-option-selected a {
	background:#' . evolve_hexDarker( $evolve_top_menu_back_color ) . '!important;
}
	';
    }

    // Top Menu Color

    if ( ! empty( $evolve_top_menu_back_color ) && $evolve_header_type == 'h5' ) {
        $evolve_top_menu_back_color = mb_substr( $evolve_top_menu_back_color, 1 );
        $evolve_css_data .= '
	
.new-top-menu,
.new-top-menu ul.nav-menu li.nav-hover ul,
.new-top-menu form.top-searchform { 
	background: #' . $evolve_top_menu_back_color . '!important; 
}

.new-top-menu ul.nav-menu ul li:hover > a, 
.new-top-menu ul.nav-menu li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor > a  {
	border-top-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-item > a, 
.new-top-menu ul.nav-menu li.current-menu-ancestor li.current-menu-parent > a {
	border-top-color:#' . $evolve_top_menu_back_color . '; 
}

.new-top-menu ul.nav-menu ul {
	border: 1px solid ' . evolve_hexDarker( $evolve_top_menu_back_color ) . ';
	border-bottom:0;
}

.new-top-menu ul.nav-menu li {
	border-left-color: ' . evolve_hexDarker( $evolve_top_menu_back_color ) . ';
	border-right-color:  #' . $evolve_top_menu_back_color . ';
}

#wrapper .new-top-menu .dd-options {
	background:#' . $evolve_top_menu_back_color . ';
}

.new-top-menu ul.nav-menu li.current-menu-item, 
.new-top-menu ul.nav-menu li.current-menu-ancestor, 
.new-top-menu ul.nav-menu li:hover {
	border-right-color:#' . $evolve_top_menu_back_color . '!important;
}

.new-top-menu ul.nav-menu ul, 
.new-top-menu ul.nav-menu li li, 
.new-top-menu ul.nav-menu li li li, 
.new-top-menu ul.nav-menu li li li li,
#wrapper .new-top-menu .dd-options li,
#wrapper .new-top-menu .dd-options {
	border-color:#' . evolve_hexDarker( $evolve_top_menu_back_color ) . '!important;
}	

#wrapper .new-top-menu .dd-container .dd-selected-text,
#wrapper .new-top-menu .dd-options li a:hover, 
#wrapper .new-top-menu .dd-options li.dd-option-selected a {
	background:#' . evolve_hexDarker( $evolve_top_menu_back_color ) . '!important;
}
	';
    }	

if (!empty($evolve_custom_main_color)) {
    $evolve_css_data .= '
.footer {
	background:' . $evolve_custom_main_color . ';
}
	';
}

if (!empty($evolve_custom_header_color)) {
    $evolve_css_data .= '
.header-pattern {
	background:' . $evolve_custom_header_color . ';
}
	';
}

//@since 2.0.2 mod by denzel
//do not remove the extra slash, it's a folder path mistake in option-init.php at line 806, try to fix now will cause problem to users.
    $none = $evolve_template_url . '/library/media/images//header-two/none.jpg';
    if ( $evolve_main_pattern != $none && ! empty( $evolve_main_pattern ) && @getimagesize( $evolve_main_pattern ) ) {
//fix it here, remove the extra slash, before we produce background image url. 
    $evolve_main_pattern = str_replace('images//', 'images/', $evolve_main_pattern);
    $evolve_css_data .= '
.header-pattern, 
.footer {
	background-image:url(' . $evolve_main_pattern . ');
}
	';
}

if ($evolve_scheme_widgets != "") {
    $evolve_scheme_color = mb_substr($evolve_scheme_widgets, 1);
    $evolve_css_data .= '
.menu-back {
    background-color:' . $evolve_scheme_widgets . ';
    background: -webkit-gradient(radial, center center, 0, center center, 460, from(' . $evolve_scheme_widgets . '), to(#' . evolve_hexDarker($evolve_scheme_color, 40) . '));
    background: -webkit-radial-gradient(circle, ' . $evolve_scheme_widgets . ', #' . evolve_hexDarker($evolve_scheme_color, 40) . ');
    background: -moz-radial-gradient(circle, ' . $evolve_scheme_widgets . ', #' . evolve_hexDarker($evolve_scheme_color, 40) . ');
    background: -o-radial-gradient(circle, ' . $evolve_scheme_widgets . ', #' . evolve_hexDarker($evolve_scheme_color, 40) . ');
    background: -ms-radial-gradient(circle, ' . $evolve_scheme_widgets . ', #' . evolve_hexDarker($evolve_scheme_color, 40) . ');
}

.da-dots span {
    background:#' . evolve_hexDarker($evolve_scheme_color) . '
}
	';
}

if ($evolve_post_layout == "two") {
    if ($evolve_pagination_type == "infinite") {
        $clear = '';
    } else {
        $clear = 'clear:both;';
    }

    $evolve_css_data .= '
/**
 * Posts Layout
 * 
 */   

.home .type-post .entry-content, 
.archive .type-post .entry-content, 
.search .type-post .entry-content, 
.page-template-blog-page-php .type-post .entry-content {
    font-size:13px;
}

.entry-content {
    margin-top:25px;
}

.home .odd0, 
.archive .odd0, 
.search .odd0, 
.page-template-blog-page-php .odd0 {
    ' . $clear . '
}

.home .odd1, 
.archive .odd1, 
.search .odd1, 
.page-template-blog-page-php .odd1{
    margin-right:0px;
}

.home .entry-title, 
.entry-title a, 
.archive .entry-title, 
.search .entry-title, 
.page-template-blog-page-php .entry-title {
    font-size:120%!important;
    line-height:120%!important;
    margin-bottom:0;
}

.home .entry-header, 
.archive .entry-header, 
.search .entry-header, 
.page-template-blog-page-php .entry-header {
    font-size:12px;
    padding:0;
}

.home .published strong, 
.archive .published strong, 
.search .published strong, 
.page-template-blog-page-php .published strong{
    font-size:15px;
    line-height:15px;
}

.home .hfeed, 
.archive .hfeed,
.single .hfeed, 
.page .hfeed, 
.page-template-blog-page-php .hfeed {
    margin-right:0px;
}

.home .type-post .entry-footer, 
.archive .type-post .entry-footer, 
.search .type-post .entry-footer, 
.page-template-blog-page-php .type-post .entry-footer {
    float:left;
    width:100%
}

.home .type-post .comment-count, 
.archive .type-post .comment-count, 
.search .type-post .comment-count, 
.page-template-blog-page-php .type-post .comment-count {
    background:none!important;
    padding-right:0;
}

	';
}

if ($evolve_post_layout == "three") {
   if ($evolve_pagination_type == "infinite") {
        $clear = '';
    } else {
        $clear = 'clear:both;';
    }
    $evolve_css_data .= '
/**
 * Posts Layout
 * 
 */       

.home .type-post .entry-content, 
.archive .type-post .entry-content, 
.search .type-post .entry-content, 
.page-template-blog-page-php .type-post .entry-content {
    font-size:13px;
}

.entry-content {
    margin-top:25px;
}

.home .odd0, 
.archive .odd0, 
.search .odd0, 
.page-template-blog-page-php .odd0 {
    ' . $clear . '
}

.home .odd2, 
.archive .odd2, 
.search .odd2, 
.page-template-blog-page-php .odd2 {
    margin-right:0px;
}

.home .entry-title, 
.entry-title a, 
.archive .entry-title, 
.search .entry-title, 
.page-template-blog-page-php .entry-title {
    font-size:100%!important;
    line-height:100%!important;
    margin-bottom:0;
}

.home .entry-header, 
.archive .entry-header, 
.search .entry-header, 
.page-template-blog-page-php .entry-header {
    font-size:12px;
    padding:0;
}

.home .published strong, 
.archive .published strong, 
.search .published strong, 
.page-template-blog-page-php .published strong  {
    font-size:15px;
    line-height:15px;
}

.home .type-post .comment-count, 
.archive .type-post .comment-count, 
.search .type-post .comment-count, 
.page-template-blog-page-php .type-post .comment-count {
    background:none!important;
    padding-right:0;
}

	';
}

if (( $evolve_tagline_pos !== "disable" ) && ( $evolve_tagline_pos == "under" )) {
    $evolve_css_data .= '
#tagline {    
    padding:5px 2px;
}

	';
}

if (( $evolve_tagline_pos !== "disable" ) && ( $evolve_tagline_pos == "above" )) {
    $evolve_css_data .= '
#tagline {    
    padding:5px 2px;
}

	';
}

if (( $evolve_tagline_pos !== "disable" ) && ( $evolve_tagline_pos == "next" )) {
    $evolve_css_data .= '
.title-container #logo {
	float:left;
}

.title-container #tagline { 
    padding-top:20px;    
}

.title-container #logo a {
	padding: 0px 20px 0px 0px;
}
	';
}

if(($evolve_pos_logo == "right") || ($evolve_pos_logo == "left") || ($evolve_pos_logo == "disable")) {
		
    $evolve_css_data .= '

.title-container #logo a {
	padding: 0px 20px 0px 3px;
}

	';
}

if(($evolve_header_logo != "") && ($evolve_pos_logo == "left") && ($evolve_tagline_pos == "above")) {
		
    $evolve_css_data .= '

.title-container #logo a {
	margin-left: 0px;
}

	';
}

if(($evolve_header_logo != "") && ($evolve_pos_logo == "left") && ($evolve_tagline_pos == "under")) {
		
    $evolve_css_data .= '

.title-container #logo a {
	margin-left: 0px;
}

	';
}

//Blog Title font
$evolve_css_data .= evolve_print_fonts('evl_title_font', '#logo a', $additional_css = 'letter-spacing:-.03em');

//Blog tagline font
$evolve_css_data .= evolve_print_fonts('evl_tagline_font', '#tagline');

//Post title font
$evolve_css_data .= evolve_print_fonts('evl_post_font', '.entry-title, .entry-title a, .page-title','','','!important');

//Content font
$evolve_css_data .= evolve_print_fonts( 'evl_content_font', 'textarea, .entry-content', $additional_css = 'line-height:1.5em', $additional_color_css_class = 'body', $imp = '!important' );

//Menu blog title font 
$evolve_css_data .= evolve_print_fonts('evl_menu_blog_title_font', '#sticky-logo a', $additional_css = 'letter-spacing:-.03em');

//Main menu font 
$evolve_css_data .= evolve_print_fonts('evl_menu_font', 'ul.nav-menu a, .menu-header, #wrapper .dd-container label, #wrapper .dd-container a');

//Bootstrap Slider --> Slider Title font
$evolve_css_data .= evolve_print_fonts('evl_bootstrap_slide_title_font', '#bootstrap-slider .carousel-caption h2 ', $additional_css = '');

//Bootstrap Slider --> Slider description font
$evolve_css_data .= evolve_print_fonts('evl_bootstrap_slide_subtitle_font', '#bootstrap-slider .carousel-caption p  ', $additional_css = '');

//Parallax Slider --> Slider description font
$evolve_css_data .= evolve_print_fonts('evl_parallax_slide_title_font', '.da-slide h2 ', $additional_css = '');

//Parallax Slider --> Slider Title font
$evolve_css_data .= evolve_print_fonts('evl_parallax_slide_subtitle_font', '.da-slide p ', $additional_css = '');

//Post Slider --> Slider Title font
$evolve_css_data .= evolve_print_fonts('evl_carousel_slide_title_font', '#slide_holder .featured-title a ', $additional_css = '');

//Post Slider --> Slider description font
$evolve_css_data .= evolve_print_fonts('evl_carousel_slide_subtitle_font', '#slide_holder p ', $additional_css = '');

        //Widget title font
        $evolve_css_data .= evolve_print_fonts( 'evl_widget_title_font', '.widget-title', $additional_css = '' );

        //Widget content font
        $evolve_css_data .= evolve_print_fonts( 'evl_widget_content_font', '.widget-content, .aside, .aside a', $additional_css = '', $additional_color_css_class = '.widget-content, .widget-content a, .widget-content .tab-holder .news-list li .post-holder a, .widget-content .tab-holder .news-list li .post-holder .meta' );

        //H1 font, H2 font, H3 font, H4 font, H5 font and H6 font
        for ( $i = 1; $i < 7; $i ++ ) {
            //we get all h1 to h6 fonts, evl_content_h1_font ... to evl_content_h6_font values.
            $evolve_css_data .= evolve_print_fonts( 'evl_content_h' . $i . '_font', ".entry-content h{$i}", $additional_css = '' );
        }

    $bootstrap_100_background = evolve_get_option( 'evl_bootstrap_100', '' );

    if ( $evolve_menu_font['font-size'] < "14px" ) {
        $evolve_css_data .= '
ul.primary-menu-cont.nav-menu li:hover ul,
ul.primary-menu-cont.nav-menu li.nav-hover ul {    
    top: 40px;    
}
	';
    } elseif ( $evolve_menu_font['font-size'] >= "14px" ) {
        $evolve_css_data .= '
ul.primary-menu-cont.nav-menu li:hover ul,
ul.primary-menu-cont.nav-menu li.nav-hover ul {
    top: 52px;
}
	';
    }


    if ( $bootstrap_100_background == '1' ) {

    } else {
        $evolve_css_data .= '
#bootstrap-slider .carousel-inner .img-responsive {
	display: block;
	height: auto;
	width: 100%;
}
	';
    }


if ($evolve_pos_logo == "center") {
    $evolve_css_data .= '
.header #logo-image {
	float:none;
	margin:15px auto;
}
	';

    $evolve_css_data .= '
.container .container-header {
	position:relative;
}
	';

    $evolve_css_data .= '
.title-container{
	text-align:center;
}
	';
}

if (( $evolve_pos_logo == "center" ) && ( $evolve_tagline_pos == "next" )) {
    $evolve_css_data .= '
.title-container #tagline {
	float: left;
}			
	';
}

if ($evolve_pos_logo == "right") {
    $evolve_css_data .= '
#logo-image {
	float:right;
	margin: 15px 0px;
}
			
.header-logo-container {
	clear:right;
}	

.sticky-header #logo {
    float:left;
	padding: 6px 6px 6px 3px;
}

.sticky-header #sticky-logo {
    float:left;
	padding: 0px 6px 0px 3px;
}
	';
}

if ($evolve_pos_logo == "left") {
    $evolve_css_data .= '

.sticky-header #logo {
    float:left;
	padding: 6px 6px 6px 3px;
}

.sticky-header #sticky-logo {
    float:left;
	padding: 0px 6px 0px 3px;
}

body #header.sticky-header img#logo-image {
	margin-left:10px;
	
}
	';
}

if ($evolve_pos_logo == "center") {
    $evolve_css_data .= '

.sticky-header #logo {
    float:left;
	padding: 6px 6px 6px 3px;
}

.sticky-header #sticky-logo {
    float:left;
	padding: 0px 6px 0px 3px;
}

body #header.sticky-header img#logo-image {
	margin-left:10px;
	
}
	';
}

if ($evolve_pos_logo == "disable") {
    $evolve_css_data .= '

.sticky-header #logo {
    float:left;
	padding: 6px 6px 6px 3px;
}

.sticky-header #sticky-logo {
    float:left;
	padding: 0px 6px 0px 3px;
}
	';
}

if ($evolve_pos_button == "left") {
    $evolve_css_data .= '
#backtotop {
	left:2%;
	margin-left:0;
}
	';
}

if ($evolve_pos_button == "right") {
    $evolve_css_data .= '
#backtotop {
	right:2%;
}
	';
}

if ($evolve_pos_button == "middle" || $evolve_pos_button == "") {
    $evolve_css_data .= '
#backtotop {
	left:50%;
}
	';
}

if ($evolve_custom_background == "1") {
    $evolve_css_data .= '
#wrapper {
	position:relative;
	margin:0 auto 30px auto !important;
	background:#f9f9f9;
	box-shadow:0 0 3px rgba(0,0,0,.2);
}

#wrapper:before {
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,0.6);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,0.6);
    box-shadow: 0 0 9px rgba(0,0,0,0.6);
    left: 30px;
	right: 30px;
    position: absolute;
    z-index: -1;
    height: 20px;
    bottom: 0px;
    content: "";
    -webkit-border-radius: 100px / 10px;
    -moz-border-radius: 100px / 10px;
    border-radius: 100px / 10px;		
}
	';
}

if ($evolve_widget_background == "1") {
    if ($evolve_widget_bgcolor != "") {
		$evolve_widget_rgb_bgcolor = mb_substr($evolve_widget_bgcolor, 1);			
    $evolve_css_data .= '
#content h3.widget-title, 
h3.widget-title {
    color:#fff;
    text-shadow:1px 1px 0px #000;
}

.widget-title-background {
    position:absolute;
    top:-1px;
    bottom:0px;
    left:-16px;
    right:-16px; 
    -webkit-border-radius:3px 3px 0 0;
    -moz-border-radius:3px 3px 0 0;
    -border-radius:3px 3px 0 0;
    border-radius:3px 3px 0 0px;
	border:1px solid;
	border-color:' . $evolve_widget_bgcolor . ';
	background:' . $evolve_widget_bgcolor . ';
	/*background:-moz-linear-gradient(center top , #606060 20%, #505050 100%) repeat scroll 0 0 transparent;
	background: -webkit-gradient(linear,left top,left bottom,color-stop(.2, #606060),color-stop(1, #505050)) !important;
    background: -o-linear-gradient(top, #606060,#505050) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#606060\', endColorstr=\'#505050\');*/
	-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 0 5px rgba(0, 0, 0, 0.3) inset, 0 1px 2px rgba(0, 0, 0, 0.29);
	color:#fff;
	/*text-shadow:0 1px 0px #000;*/
	}';
  }
}

if ($evolve_widget_background_image == "1") {
    $evolve_css_data .= '
.widget-content {
    background: none!important;
    border: none!important;
    -webkit-box-shadow:none!important;
    -moz-box-shadow:none!important;
    -box-shadow:none!important;
    box-shadow:none!important;
}

.widget:after, 
.widgets-holder .widget:after {
    content:none!important;
}
	';
}

if ($evolve_layout == "2cr" && ( $evolve_post_layout == "one" ) || $evolve_layout == "2cl" && ( $evolve_post_layout == "one" )) {
    $evolve_css_data .= '
.col-md-8 {
	padding-left:15px;
	padding-right:15px;
}
	';
}

if (!empty($evolve_general_link)) {
    $evolve_css_data .= '
a, 
a:hover,
a:focus,
.entry-content a:link, 
.entry-content a:active, 
.entry-content a:visited, 
#secondary a:hover, 
#secondary-2 a:hover, 
.tooltip-shortcode, 
#jtwt .jtwt_tweet a:hover, 
.contact_info a:hover, 
.widget .wooslider h2.slide-title a, 
.widget .wooslider h2.slide-title a:hover {
	color:' . $evolve_general_link . ';
}
	';
}

if (!empty($evolve_button_color_2)) {
    $evolve_button_color_2_border = mb_substr($evolve_button_color_2, 1);
    $evolve_css_data .= '
a.more-link, 
input[type="submit"], 
button, 
.button, 
input#submit, 
span.more a {
	background:' . $evolve_button_color_2 . ';
	border-color:#' . evolve_hexDarker($evolve_button_color_2_border) . '
}
	';
}

$evolve_header_image_src = '';
if (get_header_image()) {
    $evolve_header_image_src = get_header_image();
}

	$options = get_option('evl_options');
	$evolve_padding_top = $options['evl_header_padding']['padding-top'];
	$evolve_padding_bottom = $options['evl_header_padding']['padding-bottom'];
	$evolve_padding_left = $options['evl_header_padding']['padding-left'];
	$evolve_padding_right = $options['evl_header_padding']['padding-right'];
    $evolve_background_repeat   = evolve_get_option( 'evl_header_image_background_repeat', 'no-repeat' );
    $evolve_background_position = evolve_get_option( 'evl_header_image_background_position', 'center top' );
	$evolve_menu_padding = evolve_get_option('evl_main_menu_padding', '8');

    if ( ! empty( $evolve_padding_top ) ) {
        $evolve_padding_top = $evolve_padding_top;
    } else {
        $evolve_padding_top = '40px';
    }

    if ( ! empty( $evolve_padding_bottom ) ) {
        $evolve_padding_bottom = $evolve_padding_bottom;
    } else {
        $evolve_padding_bottom = '40px';
    }

$evolve_css_data .= '
.header { 
	padding-top:' . $evolve_padding_top . '; 
	padding-bottom:' . $evolve_padding_bottom . '; 
}

.header .container {
	padding-left:' . $evolve_padding_left . '; 
	padding-right:' . $evolve_padding_right . '; 	
}
	
ul.nav-menu > li { 
   padding: 0px ' . $evolve_menu_padding . 'px; 
}
	';

if ( $evolve_header_image_src ) {
    $evolve_css_data .= '
	.custom-header { 
	background:url(' . esc_url( $evolve_header_image_src ) . ') ' . $evolve_background_position . ' ' . $evolve_background_repeat . ';
	border-bottom:0;
	background-size:' . $evolve_header_image . '!important;
	width:100%;
}
	';
}

	$evolve_footer_image_src           = evolve_get_option( 'evl_footer_background_image' );
    $evolve_footer_image               = evolve_get_option( 'evl_footer_image', 'cover' );
    $evolve_footer_background_repeat   = evolve_get_option( 'evl_footer_image_background_repeat', 'no-repeat' );
    $evolve_footer_background_position = evolve_get_option( 'evl_footer_image_background_position', 'center top' );

if ( $evolve_footer_image_src ) {
    $evolve_css_data .= '
.footer {
	background:url(' . esc_url( $evolve_footer_image_src ) . ') ' . $evolve_footer_background_position . ' ' . $evolve_footer_background_repeat . ';
	border-bottom:0;background-size:' . $evolve_footer_image . '!important;
	width:100%;
}
	';
}

if ($evolve_width_layout == "fluid") {
    $evolve_css_data .= '
.custom-header {
	position:relative;
	background:url(' . esc_url( $evolve_header_image_src ) . ') top center no-repeat;
	border-bottom:0;
}
	';
}

if ($evolve_width_layout == "fluid") {
    $evolve_css_data .= '
body #header.sticky-header {
	margin:0px;
	left:0px;
}
	';
}

if ($evolve_width_layout == "fixed") {
    $evolve_css_data .= '
@media only screen and (max-width: 1220px) {
	body #header.sticky-header {
		margin:0px !important;
		left:0px;
	}
}

body #header.sticky-header {
	margin-left: -16px;
}
	';
}

if ($evolve_width_layout == "fixed" && $evolve_menu_background == "1") {
    $evolve_css_data .= '
body #header.sticky-header {
	margin-left: -15px;
}
	';
}

if (!empty($evolve_social_color)) {
    $evolve_css_data .= '
#rss, 
#email-newsletter, 
#facebook, 
#twitter, 
#instagram, 
#skype, 
#youtube, 
#flickr, 
#linkedin, 
#plus, 
#pinterest, 
#tumblr { 
	color: ' . $evolve_social_color . ';
}
.sc_menu li a{
	color: ' . $evolve_social_color . ';
}
	';
}

if (!empty($evolve_social_icons_size)) {
    $evolve_css_data .= '
#rss, 
#email-newsletter, 
#facebook, 
#twitter, 
#instagram, 
#skype, 
#youtube, 
#flickr, 
#linkedin, 
#plus, 
#pinterest, 
#tumblr { 
	font-size: ' . $evolve_social_icons_size . ';
}
.sc_menu li a{
	font-size: ' . $evolve_social_icons_size . ';
}
	';
}

if ($evolve_social_box_radius != 'disabled') {
    $evolve_css_data .= '
                .sc_menu li a {
                        border: 1px solid;
                        border-radius: '.$evolve_social_box_radius.'px;
						padding: 8px;
                }
	';
}	

if ($evolve_scheme_background) {
    $evolve_css_data .= '
.menu-back { 
	background-image: url(' . $evolve_scheme_background . ');
	background-position:top center;
}
	';
}

if ($evolve_scheme_background_100 == '1') {
    $evolve_css_data .= '
.menu-back { 
	background-attachment:fixed;
	background-position:center center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
	';
}

if ($evolve_scheme_background_repeat) {
    $evolve_css_data .= '
.menu-back { 
	background-repeat:' . $evolve_scheme_background_repeat . ';
}
	';
}

if ($evolve_content_box1_icon_color) {
    $evolve_css_data .= '
.content-box-1 i { 
	color:' . $evolve_content_box1_icon_color . ';
}
	';
}

if ($evolve_content_box2_icon_color) {
    $evolve_css_data .= '
.content-box-2 i { 
	color:' . $evolve_content_box2_icon_color . ';
}
	';
}

if ($evolve_content_box3_icon_color) {
    $evolve_css_data .= '
.content-box-3 i { 
	color:' . $evolve_content_box3_icon_color . ';
}
	';
}

if ($evolve_content_box4_icon_color) {
    $evolve_css_data .= '
.content-box-4 i { 
	color:' . $evolve_content_box4_icon_color . ';
}
	';
}

//mod by denzel, content area background image and color
if ($evolve_content_background_image) {
    $evolve_css_data .= '
.content {
	background:url(' . esc_url($evolve_content_background_image) . ') top center no-repeat;
	border-bottom:0;
	background-size:' . $evolve_content_image_responsiveness . ' !important;
	width:100%;
}
	';
}

if ($evolve_content_background_color) {
    $evolve_css_data .= '
.content {
	background-color:' . $evolve_content_background_color . '
}
	';
}

// Theme4Press Buttons

    $evolve_shortcode_button_size                        = evolve_get_option( 'evl_shortcode_button_size', 'Large' );
    $evolve_shortcode_button_shape                       = evolve_get_option( 'evl_shortcode_button_shape', 'Round' );
    $evolve_shortcode_button_type                        = evolve_get_option( 'evl_shortcode_button_type', '3d' );
    $evolve_shortcode_button_gradient_top_color          = evolve_get_option( 'evl_shortcode_button_gradient_top_color', '#0bb697' );
    $evolve_shortcode_button_gradient_bottom_color       = evolve_get_option( 'evl_shortcode_button_gradient_bottom_color', '#0bb697' );
    $evolve_shortcode_button_gradient_top_hover_color    = evolve_get_option( 'evl_shortcode_button_gradient_top_hover_color', '#313a43' );
    $evolve_shortcode_button_gradient_bottom_hover_color = evolve_get_option( 'evl_shortcode_button_gradient_bottom_hover_color', '#313a43' );
    $evolve_shortcode_button_accent_color                = evolve_get_option( 'evl_shortcode_button_accent_color', '#f4f4f4' );
    $evolve_shortcode_button_accent_hover_color          = evolve_get_option( 'evl_shortcode_button_accent_hover_color', '#ffffff' );
    $evolve_shortcode_button_bevel_color                 = evolve_get_option( 'evl_shortcode_button_bevel_color', '#1d6e72' );
    $evolve_shortcode_button_border_color                = evolve_get_option( 'evl_shortcode_button_border_color', '#0bb697' );
    $evolve_shortcode_button_border_hover_color          = evolve_get_option( 'evl_shortcode_button_border_hover_color', '#313a43' );
    $evolve_shortcode_button_border_width                = evolve_get_option( 'evl_shortcode_button_border_width', '1px' );
    $evolve_shortcode_button_shadow                      = evolve_get_option( 'evl_shortcode_button_shadow', '1' );

if( $evolve_shortcode_button_type == '3d' && $evolve_shortcode_button_bevel_color ) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,
a.comment-reply-link,	
.entry-content a.t4p-button-default,
.button.button-3d.button-small, 
.button.default.button-3d.button-small, 
.button.default.small,
#reviews input#submit,
.woocommerce .login .button,
.woocommerce .register .button,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
#wrapper a.read-more,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external {
	-webkit-box-shadow: 0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ';		
}	
.t4p-reading-box-container a.button-default:active,
button:active, 
.button:active, 
.bootstrap-button:active,
input#submit:active, 
.da-slide .da-link:active, 
span.more a:active,
a.read-more:active,
a.comment-reply-link:active,
.entry-content a.t4p-button-default:active,	
.button.button-3d.button-small:active, 
.button.default.button-3d.button-small:active, 
.button.default.small:active,
#reviews input#submit:active,
.woocommerce .login .button:active, 
.woocommerce .register .button:active,
.bbp-submit-wrapper button:active,
.wpcf7-form input[type="submit"]:active, 
.wpcf7-submit:active,
#wrapper a.read-more:active,
input[type="submit"]:active,
.product-buttons .add_to_cart_button:active,
.product-buttons .button.product_type_grouped:active, 
.product-buttons .button.product_type_simple:active,
.product-buttons .button.product_type_external:active {
	-webkit-box-shadow: 0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';		
}
.t4p-reading-box-container a.button-default:hover,
input[type="submit"]:hover, 
button:hover, 
.button:hover, 
.bootstrap-button:hover,
input#submit:hover, 
.da-slide .da-link:hover, 
span.more a:hover,
a.read-more:hover,
a.comment-reply-link:hover,
.entry-content a.t4p-button-default:hover,
.button.button-3d.button-small:hover, 
.button.default.button-3d.button-small:hover, 
.button.default.small:hover,
.t4p-button.button-green.button-3d.button-small:hover,
.button.green.button-3d.button-small:hover,
.t4p-button.button-darkgreen.button-3d.button-small:hover,
.button.darkgreen.button-3d.button-small:hover,
.t4p-button.button-orange.button-3d.button-small:hover,
.button.orange.button-3d.button-small:hover,
.t4p-button.button-blue.button-3d.button-small:hover,
.button.blue.button-3d.button-small:hover,
.t4p-button.button-darkblue.button-3d.button-small:hover,
.button.darkblue.button-3d.button-small:hover,
.t4p-button.button-red.button-3d.button-small:hover,
.button.darkred.button-3d.button-small:hover,
.t4p-button.button-pink.button-3d.button-small:hover,
.button.pink.button-3d.button-small:hover,
.t4p-button.button-darkgray.button-3d.button-small:hover,
.button.darkgray.button-3d.button-small:hover,
.t4p-button.button-lightgray.button-3d.button-small:hover,
.button.lightgray.button-3d.button-small:hover,   
#reviews input#submit:hover,
.woocommerce .login .button:hover, 
.woocommerce .register .button:hover,
.bbp-submit-wrapper button:hover,
.wpcf7-form input[type="submit"]:hover, 
.wpcf7-submit:hover,
#wrapper a.read-more:hover,
.price_slider_amount button:hover,
.product-buttons .add_to_cart_button:hover,
.product-buttons .button.product_type_grouped:hover, 
.product-buttons .button.product_type_simple:hover,
.product-buttons .button.product_type_external:hover {
	-webkit-box-shadow:  0px 2px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	-moz-box-shadow: 	 0px 2px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	box-shadow: 		 0px 2px 0px ' . $evolve_shortcode_button_border_hover_color . ';		
}
.button.button-3d.button-medium, 
.button.default.button-3d.button-medium, 
.button.default.medium,   
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
.bbp-submit-wrapper button.button-medium,
.wpcf7-form input[type="submit"].button-medium, 
.wpcf7-submit.button-medium {
	-webkit-box-shadow:  0px 3px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	 0px 3px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		 0px 3px 0px ' . $evolve_shortcode_button_bevel_color . ';		
}
.button.button-3d.button-medium:active, 
.button.default.button-3d.button-medium:active, 
.button.default.medium:active,#comment-submit:active,
.woocommerce form.checkout #place_order:active,
.woocommerce .single_add_to_cart_button:active,
.bbp-submit-wrapper button.button-medium:active,
.wpcf7-form input[type="submit"].button-medium:active, 
.wpcf7-submit.button-medium:active {
	-webkit-box-shadow:  0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	 0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		 0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';		
}
.button.button-3d.button-medium:hover, 
.button.default.button-3d.button-medium:hover, 
.button.default.medium:hover, 
.t4p-button.button-green.button-3d.button-medium:hover,
.button.green.button-3d.button-medium:hover,
.t4p-button.button-darkgreen.button-3d.button-medium:hover,
.button.darkgreen.button-3d.button-medium:hover,
.t4p-button.button-orange.button-3d.button-medium:hover,
.button.orange.button-3d.button-medium:hover,
.t4p-button.button-blue.button-3d.button-medium:hover,
.button.blue.button-3d.button-medium:hover,
.t4p-button.button-darkblue.button-3d.button-medium:hover,
.button.darkblue.button-3d.button-medium:hover,
.t4p-button.button-red.button-3d.button-medium:hover,
.button.darkred.button-3d.button-medium:hover,
.t4p-button.button-pink.button-3d.button-medium:hover,
.button.pink.button-3d.button-medium:hover,
.t4p-button.button-darkgray.button-3d.button-medium:hover,
.button.darkgray.button-3d.button-medium:hover,
.t4p-button.button-lightgray.button-3d.button-medium:hover,
.button.lightgray.button-3d.button-medium:hover,        
#comment-submit:hover,
.woocommerce form.checkout #place_order:hover,
.woocommerce .single_add_to_cart_button:hover,
.bbp-submit-wrapper button.button-medium:hover,
.wpcf7-form input[type="submit"].button-medium:hover, 
.wpcf7-submit.button-medium:hover {
	-webkit-box-shadow:  0px 3px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	-moz-box-shadow: 	 0px 3px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	box-shadow: 		 0px 3px 0px ' . $evolve_shortcode_button_border_hover_color . ';		
}
.button.button-3d.button-large, 
.button.default.button-3d.button-large, 
.button.default.large,
.bbp-submit-wrapper button.button-large,
.wpcf7-form input[type="submit"].button-large, 
.wpcf7-submit.button-large {
	-webkit-box-shadow:  0px 4px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	 0px 4px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		 0px 4px 0px ' . $evolve_shortcode_button_bevel_color . ';		
}		
.button.button-3d.button-large:active, 
.button.default.button-3d.button-large:active, 
.button.default.large:active,
.bbp-submit-wrapper button.button-large:active,
.wpcf7-form input[type="submit"].button-large:active, 
.wpcf7-submit.button-large:active {
	-webkit-box-shadow:  0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	-moz-box-shadow: 	 0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';
	box-shadow: 		 0px 1px 0px ' . $evolve_shortcode_button_bevel_color . ';				
}
.button.button-3d.button-large:hover, 
.button.default.button-3d.button-large:hover, 
.button.default.large:hover,
.t4p-button.button-green.button-3d.button-large:hover,
.button.green.button-3d.button-large:hover,
.t4p-button.button-darkgreen.button-3d.button-large:hover,
.button.darkgreen.button-3d.button-large:hover,
.t4p-button.button-orange.button-3d.button-large:hover,
.button.orange.button-3d.button-large:hover,
.t4p-button.button-blue.button-3d.button-large:hover,
.button.blue.button-3d.button-large:hover,
.t4p-button.button-darkblue.button-3d.button-large:hover,
.button.darkblue.button-3d.button-large:hover,
.t4p-button.button-red.button-3d.button-large:hover,
.button.darkred.button-3d.button-large:hover,
.t4p-button.button-pink.button-3d.button-large:hover,
.button.pink.button-3d.button-large:hover,
.t4p-button.button-darkgray.button-3d.button-large:hover,
.button.darkgray.button-3d.button-large:hover,
.t4p-button.button-lightgray.button-3d.button-large:hover,
.button.lightgray.button-3d.button-large:hover,   
.bbp-submit-wrapper button.button-large:hover,
.wpcf7-form input[type="submit"].button-large:hover, 
.wpcf7-submit.button-large:hover {
	-webkit-box-shadow:  0px 4px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	-moz-box-shadow: 	 0px 4px 0px ' . $evolve_shortcode_button_border_hover_color . ';
	box-shadow: 		 0px 4px 0px ' . $evolve_shortcode_button_border_hover_color . ';				
}
.button.button-3d.button-xlarge, 
.button.default.button-3d.button-xlarge, 
.button.default.xlarge,
.bbp-submit-wrapper button.button-xlarge,
.wpcf7-form input[type="submit"].button-xlarge, 
.wpcf7-submit.button-xlarge {
	-webkit-box-shadow:  0px 5px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	-moz-box-shadow: 	 0px 5px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	box-shadow: 		 0px 5px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);		
}		
.button.button-3d.button-xlarge:active, 
.button.default.button-3d.button-xlarge:active, 
.button.default.xlarge:active,
.bbp-submit-wrapper button.button-xlarge:active,
.wpcf7-form input[type="submit"].button-xlarge:active, 
.wpcf7-submit.button-xlarge:active {
	-webkit-box-shadow:  0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	-moz-box-shadow: 	 0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	box-shadow: 		 0px 2px 0px ' . $evolve_shortcode_button_bevel_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);					
}
.button.button-3d.button-xlarge:hover, 
.button.default.button-3d.button-xlarge:hover, 
.button.default.xlarge:hover,
.t4p-button.button-green.button-3d.button-xlarge:hover,
.button.green.button-3d.button-xlarge:hover,
.t4p-button.button-darkgreen.button-3d.button-xlarge:hover,
.button.darkgreen.button-3d.button-xlarge:hover,
.t4p-button.button-orange.button-3d.button-xlarge:hover,
.button.orange.button-3d.button-xlarge:hover,
.t4p-button.button-blue.button-3d.button-xlarge:hover,
.button.blue.button-3d.button-xlarge:hover,
.t4p-button.button-darkblue.button-3d.button-xlarge:hover,
.button.darkblue.button-3d.button-xlarge:hover,
.t4p-button.button-red.button-3d.button-xlarge:hover,
.button.darkred.button-3d.button-xlarge:hover,
.t4p-button.button-pink.button-3d.button-xlarge:hover,
.button.pink.button-3d.button-xlarge:hover,
.t4p-button.button-darkgray.button-3d.button-xlarge:hover,
.button.darkgray.button-3d.button-xlarge:hover,
.t4p-button.button-lightgray.button-3d.button-xlarge:hover,
.button.lightgray.button-3d.button-xlarge:hover,   
.bbp-submit-wrapper button.button-xlarge:hover,
.wpcf7-form input[type="submit"].button-xlarge:hover, 
.wpcf7-submit.button-xlarge:hover {
	-webkit-box-shadow:  0px 5px 0px ' . $evolve_shortcode_button_border_hover_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	-moz-box-shadow: 	 0px 5px 0px ' . $evolve_shortcode_button_border_hover_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);
	box-shadow: 		 0px 5px 0px ' . $evolve_shortcode_button_border_hover_color . ', 1px 7px 7px 3px rgba(0,0,0,0.3);					
}
	';
}

if($evolve_shortcode_button_accent_color) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,
.entry-content a.t4p-button-default,	
.t4p-button,
.button,
.button.default,
.gform_wrapper .gform_button,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce .button.view,
.woocommerce .wc-backward,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external,
#content .entry-content .product-buttons a:link {
	color: ' . $evolve_shortcode_button_accent_color . ';
}
	';
}

if($evolve_shortcode_button_accent_hover_color) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default:hover,	
button:hover, 
.bootstrap-button:hover,
input#submit:hover, 
.da-slide .da-link:hover, 
span.more a:hover,
a.read-more:hover,	
a.comment-reply-link:hover,
.entry-content a.t4p-button-default:hover,
.t4p-button:hover,
.button:hover,
.button.default:hover,
.gform_wrapper .gform_button:hover,
#comment-submit:hover,
.woocommerce form.checkout #place_order:hover,
.woocommerce .single_add_to_cart_button:hover,
#reviews input#submit:hover,
.woocommerce .login .button:hover,
.woocommerce .register .button:hover,
.woocommerce .wc-backward,
.woocommerce .button.view:hover,
.bbp-submit-wrapper button:hover,
.wpcf7-form input[type="submit"]:hover, 
.wpcf7-submit:hover,
#wrapper a.read-more:hover,
input[type="submit"]:hover,
.product-buttons .add_to_cart_button:hover,
.product-buttons .button.product_type_grouped:hover, 
.product-buttons .button.product_type_simple:hover,
.product-buttons .button.product_type_external:hover,
#content .entry-content .product-buttons a:hover {
  color: ' . $evolve_shortcode_button_accent_hover_color . ';
}
	';
}

if ($evolve_shortcode_button_shadow == '1' && $evolve_shortcode_button_type == 'Flat') {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
input[type="submit"], 
button, 
.button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button.button-flat,
.home-content-boxes .t4p-button {
	text-shadow:none!important;
	box-shadow: none!important;
}
	';
}

if ($evolve_shortcode_button_shadow == '1' && $evolve_shortcode_button_type == '3d') {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
input[type="submit"], 
button, 
.button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button.button-flat,
.home-content-boxes .t4p-button {
	text-shadow:none!important;
}
	';
}

if($evolve_shortcode_button_border_width) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,
.entry-content a.t4p-button-default,	
.t4p-button,
.button,
.button.default,
.button-default,
.gform_wrapper .gform_button,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
#wrapper a.read-more,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external {
  border-width: ' . $evolve_shortcode_button_border_width . ';
  border-style: solid;
}

.t4p-reading-box-container a.button-default:hover,
input[type="submit"]:hover, 
button:hover, 
.button:hover, 
.bootstrap-button:hover,
input#submit:hover, 
.da-slide .da-link:hover, 
span.more a:hover,
a.read-more:hover,
a.comment-reply-link:hover,
.entry-content a.t4p-button-default:hover,	
.t4p-button:hover,
.button:hover, 
.button.default:hover, 
.t4p-button.button-default:hover,
#wrapper a.read-more:hover,
.t4p-accordian .panel-title a.active,
.price_slider_amount button:hover,
.button:focus,
.button:active {
  border-width: ' . $evolve_shortcode_button_border_width . ';
  border-style: solid;
}
	';
}  

if($evolve_shortcode_button_border_width && $evolve_shortcode_button_border_color) {
		$evolve_css_data .= '
.t4p-reading-box-container a.button-default,
button, 
.button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,		
a.comment-reply-link,		
.entry-content a.t4p-button-default,	
.t4p-button,
.button.default,
.button-default,
.gform_wrapper .gform_button,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
#wrapper a.read-more,
.woocommerce-pagination .current,
.t4p-accordian .panel-title a.active,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external,
.button:focus,
.button:active {
  border-color: ' . $evolve_shortcode_button_border_color . ';
}
	';
}

if($evolve_shortcode_button_border_width && $evolve_shortcode_button_border_hover_color) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default:hover,	
button:hover, 
.bootstrap-button:hover,
input#submit:hover, 
.da-slide .da-link:hover, 
span.more a:hover,
a.read-more:hover,	
a.comment-reply-link:hover,	
.entry-content a.t4p-button-default:hover,	
.t4p-button:hover,
.button:hover,
.button.default:hover,
.button-default:hover,
.gform_wrapper .gform_button:hover,
#comment-submit:hover,
.woocommerce form.checkout #place_order:hover,
.woocommerce .single_add_to_cart_button:hover,
.woocommerce-message .wc-forward:hover,
.woocommerce .wc-backward:hover,
.woocommerce .button.view:hover,
#reviews input#submit:hover,
.woocommerce .login .button:hover,
.woocommerce .register .button:hover,
.bbp-submit-wrapper button:hover,
.wpcf7-form input[type="submit"]:hover, 
.wpcf7-submit:hover,
#wrapper a.read-more:hover,
.woocommerce-pagination .current:hover,
input[type="submit"]:hover,
.price_slider_amount button:hover,
.product-buttons .add_to_cart_button:hover,
.product-buttons .button.product_type_grouped:hover, 
.product-buttons .button.product_type_simple:hover,
.product-buttons .button.product_type_external:hover {
  border-color: ' . $evolve_shortcode_button_border_hover_color . '!important;
}
	';
}

if($evolve_shortcode_button_shape == 'Pill') {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button,
.button,
.button.default,
.button-default,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .evolve-shipping-calculator-form .button,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
a.read-more,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external {
  border-radius: 25px;
}
	';
}

if($evolve_shortcode_button_shape == 'Round') {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button,
.button,
.button.default,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .evolve-shipping-calculator-form .button,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.bbp-submit-wrapper button,
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
a.read-more,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external {
  border-radius: 4px;
}
	';
}

if($evolve_shortcode_button_shape == 'Square') {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button,
.button,
.button.default,
#comment-submit,
.woocommerce form.checkout #place_order,
.woocommerce .single_add_to_cart_button,
#reviews input#submit,
.woocommerce .evolve-shipping-calculator-form .button,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.bbp-submit-wrapper button,     
.wpcf7-form input[type="submit"], 
.wpcf7-submit,
a.read-more,
input[type="submit"],
.price_slider_amount button,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external {
  border-radius: 0px;
}
	';
} 

if($evolve_shortcode_button_gradient_top_color) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default,	
button, 
.bootstrap-button,
input#submit, 
.da-slide .da-link, 
span.more a,
a.read-more,	
a.comment-reply-link,	
.entry-content a.t4p-button-default,	
.t4p-button,
.reading-box .button,
.continue.button,
#wrapper .portfolio-one .button,
#wrapper .comment-submit,
#reviews input#submit,
.comment-form input[type="submit"],
.button,
.button-default,
.button.default,
a.read-more, 
.tagcloud a:hover,
h5.toggle.active a,
h5.toggle.active a:hover,
span.more a, 
.project-content .project-info .project-info-box a.button,
input[type="submit"], 
.price_slider_amount button,
.gform_wrapper .gform_button,
.woocommerce-pagination .current,
.widget_shopping_cart_content .buttons a,
.woocommerce-success-message a.button, 
.woocommerce .order-again .button,
.woocommerce-message .wc-forward,
.woocommerce .wc-backward,
.woocommerce .button.view,
.product-buttons .add_to_cart_button,
.product-buttons .button.product_type_grouped, 
.product-buttons .button.product_type_simple,
.product-buttons .button.product_type_external,
.wpcf7-form input.button,
.wpcf7-form input[type="submit"],
.wpcf7-submit, 
.woocommerce .single_add_to_cart_button,
.woocommerce .button.view,
.woocommerce .shipping-calculator-form .button,
.woocommerce form.checkout #place_order,
.woocommerce .checkout_coupon .button,
.woocommerce .login .button,
.woocommerce .register .button,
.woocommerce .evolve-order-details .order-again .button,
.t4p-accordian .panel-title a.active {
	background: ' . $evolve_shortcode_button_gradient_top_color . ';
	';	
	if($evolve_shortcode_button_gradient_bottom_color) {
	$evolve_css_data .= '		
	background-image: -webkit-gradient( linear, left bottom, left top, from( ' . $evolve_shortcode_button_gradient_bottom_color . ' ), to( ' . $evolve_shortcode_button_gradient_top_color . ' ) );
	background-image: -webkit-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_color . ', ' . $evolve_shortcode_button_gradient_top_color . ' );
	background-image:    -moz-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_color . ', ' . $evolve_shortcode_button_gradient_top_color . ' );
	background-image:      -o-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_color . ', ' . $evolve_shortcode_button_gradient_top_color . ' );
	background-image: linear-gradient( to top, ' . $evolve_shortcode_button_gradient_bottom_color . ', ' . $evolve_shortcode_button_gradient_top_color . ' );	
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' . $evolve_shortcode_button_gradient_top_color . '\', endColorstr=\'' . $evolve_shortcode_button_gradient_bottom_color . '\' );
	';
	} 
	$evolve_css_data .= '	
}
	';
}

if($evolve_shortcode_button_gradient_top_hover_color && $evolve_shortcode_button_accent_hover_color) {
	$evolve_css_data .= '
.t4p-reading-box-container a.button-default:hover,	
input[type="submit"]:hover, 
button:hover, 
.bootstrap-button:hover,
input#submit:hover, 
.da-slide .da-link:hover, 
span.more a:hover,
a.read-more:hover,	
a.comment-reply-link:hover,	
.entry-content a.t4p-button-default:hover,	
.t4p-button:hover,
#wrapper .portfolio-one .button:hover,
#wrapper .comment-submit:hover,
#reviews input#submit:hover,
.comment-form input[type="submit"]:hover,
.wpcf7-form input[type="submit"]:hover,
.wpcf7-submit:hover,
.bbp-submit-wrapper button:hover,
.button:hover,
.button-default:hover,
.button.default:hover,
.price_slider_amount button:hover,
.gform_wrapper .gform_button:hover,
.woocommerce .single_add_to_cart_button:hover,
.woocommerce .shipping-calculator-form .button:hover,
.woocommerce form.checkout #place_order:hover,
.woocommerce .checkout_coupon .button:hover,
.woocommerce .login .button:hover,
.woocommerce .register .button:hover,
.woocommerce .evolve-order-details .order-again .button:hover,
.woocommerce .button.view:hover,
.reading-box .button:hover, 
.continue.button:hover, 
#wrapper .comment-form input[type="submit"]:hover,
.comment-form input[type="submit"]:hover,
.button:hover,
.button .lightgray:hover,
a.read-more:hover,
span.more a:hover, 
a.button:hover, 
.woocommerce-pagination .page-numbers.current:hover,
.product-buttons .add_to_cart_button:hover,
.product-buttons .button.product_type_grouped:hover, 
.product-buttons .button.product_type_simple:hover,
.product-buttons .button.product_type_external:hover {
	background: ' . $evolve_shortcode_button_gradient_top_hover_color . ';
	';	
	if($evolve_shortcode_button_gradient_bottom_hover_color) {	
	$evolve_css_data .= '
	background-image: -webkit-gradient( linear, left bottom, left top, from( ' . $evolve_shortcode_button_gradient_bottom_hover_color . ' ), to( ' . $evolve_shortcode_button_gradient_top_hover_color . ' ) );
	background-image: -webkit-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_hover_color . ', ' . $evolve_shortcode_button_gradient_top_hover_color . ' );
	background-image:    -moz-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_hover_color . ', ' . $evolve_shortcode_button_gradient_top_hover_color . ' );
	background-image:      -o-linear-gradient( bottom, ' . $evolve_shortcode_button_gradient_bottom_hover_color . ', ' . $evolve_shortcode_button_gradient_top_hover_color . ' );
	background-image: linear-gradient( to top, ' . $evolve_shortcode_button_gradient_bottom_hover_color . ', ' . $evolve_shortcode_button_gradient_top_hover_color . ' );
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\\' . $evolve_shortcode_button_gradient_top_hover_color . '\', endColorstr=\\' . $evolve_shortcode_button_gradient_bottom_hover_color . '\');
	';	
	} 	
	$evolve_css_data .= '
}
	';
}

//get option value for the font in --> Large devices (large desktops)
$options = get_option('evl_options');
$evolve_css_data .= '
/* Extra small devices (phones, <768px) */
@media (max-width: 768px) { 
    .da-slide h2, 
	#bootstrap-slider .carousel-caption h2 {
		font-size:120%!important;
		letter-spacing:1px; 
	}
	
    #slide_holder .featured-title a {
		font-size:80%!important;
		letter-spacing:1px;
	} 
	
    .da-slide p, 
	#slide_holder p, 
	#bootstrap-slider .carousel-caption p {
		font-size:90%!important; 
	}
}

/* Small devices (tablets, 768px) */
@media (min-width: 768px) { 
    .da-slide h2 {
		font-size:180%;
		letter-spacing:0; 
	}
	
    #slide_holder .featured-title a {
		font-size:120%;
		letter-spacing:0; 
	}
	
    .da-slide p, 
	#slide_holder p {
		font-size:100%; 
	}
}  

/* Large devices (large desktops) */
@media (min-width: 992px) { 
    .da-slide h2 {
		font-size:' . $options['evl_parallax_slide_title_font']['font-size'] . ';
		line-height:1em; 
	} 
	
    #slide_holder .featured-title a {
		font-size:' . $options['evl_carousel_slide_title_font']['font-size'] . ';
		line-height:1em;
	}
	
    .da-slide p {
		font-size:' . $options['evl_parallax_slide_subtitle_font']['font-size'] . ';
	}
	
    #slide_holder p {
		font-size:' . $options['evl_carousel_slide_subtitle_font']['font-size'] . ';
	}
}
	';

//mod by denzel, set #wrapper box shadow to none.  
if ($evolve_shadow_effect == 'disable') {
      $evolve_css_data .= '
#wrapper,
.entry-content .thumbnail-post,
#search-text, 
#search-text-top:focus,
ul.nav-menu ul,
ul.breadcrumbs,
.entry-content .wp-caption,
thead, 
thead th, 
thead td,
.home .type-post.sticky, 
.home .formatted-post, 
.page-template-blog-page-php .type-post.sticky, 
.page-template-blog-page-php .formatted-post,
.tab-holder .tabs li a,
.tab-holder .news-list li,
#wrapper:before,
#bbpress-forums .bbp-search-form #bbp_search, 
.bbp-search-form #bbp_search,
.bbp-topic-form input#bbp_topic_title, 
.bbp-topic-form input#bbp_topic_tags, 
.bbp-topic-form select#bbp_stick_topic_select, 
.bbp-topic-form select#bbp_topic_status_select,
.bbp-reply-form input#bbp_topic_tags,
.widget-title-background,
.widget-content,
.widget:after {
	-webkit-box-shadow:none!important;
	-moz-box-shadow:none!important;
	-box-shadow:none!important;
	box-shadow:none!important;
}
ul.nav-menu a,
.new_menu_class ul.menu a,
.entry-title, 
.entry-title a,
p#copyright .credits,
p#copyright .credits a,
.home .type-post.sticky .entry-header a, 
.home .formatted-post .entry-header a, 
.home .type-post.sticky .entry-meta, 
.home .formatted-post .entry-meta, 
.home .type-post.sticky .entry-footer a, 
.home .formatted-post .entry-footer a, 
.page-template-blog-page-php .type-post.sticky .entry-header a, 
.page-template-blog-page-php .type-post.sticky .entry-meta, 
.page-template-blog-page-php .formatted-post .entry-header a, 
.page-template-blog-page-php .formatted-post .entry-meta, 
.page-template-blog-page-php .type-post.sticky .entry-footer a, 
.page-template-blog-page-php .formatted-post .entry-footer a,
.home .type-post.sticky .entry-title a, 
.home .formatted-post .entry-title a, 
.page-template-blog-page-php .type-post.sticky .entry-title a, 
.page-template-blog-page-php .formatted-post .entry-title a,
.entry-meta,
thead, 
thead th, 
thead td,
.content-box i,
.carousel-caption,
.menu-header,
body #header.sticky-header,
.close,
#content h3.widget-title, 
h3.widget-title {
	text-shadow:none!important;
}
	';
}

if ($evolve_menu_background == "1") {
	
	if ($evolve_menu_back == "dark" && empty($evolve_menu_back_color)) { $evolve_menu_back_color = "505050"; } 
	elseif ($evolve_menu_back == "light" && empty($evolve_menu_back_color)) { $evolve_menu_back_color = "f5f5f5"; }
	
    $evolve_css_data .= '
.menu-header,
.new_menu_class,
form.top-searchform,
.stuckMenu.isStuck .nav-menu,
.p-menu-stick.stuckMenu .nav-menu,
.p-menu-stick.stuckMenu.isStuck,
body #header.sticky-header.sticky {
	filter:none;
	background:#'.$evolve_menu_back_color.'!important;
	border: none!important;
	border-radius:0!important;
	-webkit-box-shadow:none!important;
	-moz-box-shadow:none!important;
	-box-shadow:none!important;
	box-shadow:none!important;
}
	
.menu-header:before, 
.menu-header:after {
	content:none!important;
}
	
ul.nav-menu li,
ul.nav-menu li li, 
ul.nav-menu li li li, 
ul.nav-menu li li li li {
	border:none;
}
	
ul.nav-menu li.current-menu-item > a, 
ul.nav-menu li.current-menu-ancestor > a, 
ul.nav-menu li a:hover,ul.nav-menu li:hover > a,
#wrapper .dd-container .dd-selected-text {
	box-shadow:none;
}
	
ul.nav-menu li.current-menu-item > a,
ul.nav-menu li.current-menu-ancestor > a,
ul.nav-menu li.current-menu-ancestor > a span, 
ul.nav-menu li.current-menu-item > a span,
ul.nav-menu li.current-menu-item > .sf-with-ul::after, 
ul.nav-menu li.current-menu-ancestor > .sf-with-ul::after, 
ul.nav-menu li.current-menu-item > a.sf-with-ul::after,
.sticky-header ul.nav-menu li.current-menu-item > a {
    color: '.$evolve_top_menu_hover_font_color.' !important;
}
    ';

//disable all menu backgrounds, added by denzel 
    $evolve_css_data.='
.menu-container{
	background:none !important;
}
	
.sub-menu{
	border:none !important;
}
		
.menu-item a{
	border:none !important;
}
	';

//make sticky menu background-color white, added by denzel
    $evolve_css_data.='
body #header.sticky-header {
	background:#'.$evolve_menu_back_color.'!important;
	border:0;	
}
	';
}

    if ( $evolve_responsive_menu == 'disable' ) {
        $evolve_css_data .= '@media only screen and (max-width: 768px) {
		.nav-holder .dd-container, 
		.top-menu .dd-container {
			display: none!important;
		}
		.nav-holder ul#menu-main-nav-menu, 
		.top-menu .menu	{
			display: block!important;
		}		
		.top-menu-social-container {
			clear:both;
		}
	}';
    }

$evolve_css_content = evolve_get_option('evl_css_content', '');
$evolve_css_data .= $evolve_css_content;