<?php
$evolve_css_data = '';

global $evl_options;
$options = $evl_options;

/* WooCommerce Menu */
$evolve_css_data .= '
.woocommerce-menu,
.woocommerce-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1000000;
}

.woocommerce-menu {
    margin-right: 0px;
    float: left;
}

.woocommerce-menu li {
    position: relative;
    margin-left: 20px;
    padding: 0;
    float: left;
}

.my-account ul li {
    margin-left: 0px;
}

.woocommerce-menu li li {
    padding: 0 10px;
    background-image: none;
    position: relative;
}

.woocommerce-menu-holder {
    float: right;
    margin: 15px 0;
}

.fa.fa-user {
    font-size: 18px;
}

.woocommerce-menu li:first-child {
    background-image: none;
}

.woocommerce-menu li .sub-menu {
    display: none;
    width: 100px;
    position: absolute;
    right: 0px;
}

.woocommerce-menu li:hover > .sub-menu {
    display: block;
    position: absolute;
    right: 0px;
}

.woocommerce-menu .sub-menu {
    background: #ffffff;
    border: 1px solid #e0dfdf;
    line-height: normal !important;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
}

ul.woocommerce-menu a {
    display: block;
}

ul.woocommerce-menu ul a {
    padding: 7px 10px;
}

.woocommerce-menu .cart-content a .cart-desc {
    display: inline-block;
    width: 95px;
    float: left;
}

.woocommerce-menu li .sub-menu ul {
    top: -1px!important;
}

.woocommerce-menu .cart-content a img {
    display: inline-block;
    float: left;
    margin-right: 15px;
    max-width: 36px;
}

.woocommerce-menu .cart-contents {
    background: #fff;
    display: none;
    position: absolute;
    right: -1px;
    top: auto;
    z-index: 99999999;
    font-size: 11px;
    border: 1px solid #E0DFDF;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
}

.woocommerce-menu .cart-contents:last-child a {
    border-bottom: 0;
}

.woocommerce-menu .cart:hover .cart-contents {
    display: block;
}

.fa-shopping-cart {
    font-size: 18px;
    margin-right: 5px;
}

.woocommerce-menu .cart-content a .cart-title,
.woocommerce-menu .cart-content a .quantity {
    display: block;
    font-size: 12px;
}

.woocommerce-menu .cart-content a .cart-title {
    margin-bottom: 5px;
}

.woocommerce-menu .cart-checkout {
    border-top: 1px solid #e0dfdf;
    overflow: hidden;
}

.woocommerce-menu .cart-checkout a {
    display: inline-block;
    width: 50%;
    float: left;
    text-indent: 10px;
    padding: 15px 0px!important;
}

.woocommerce-menu .cart-checkout .cart-link a:before {
    font-family: icomoon;
    content: "\e90c";
    margin-right: 6px;
}

.woocommerce-menu .cart-checkout .checkout-link a:before {
    font-family: icomoon;
    content: "\e927";
    margin-right: 6px;
}

.woocommerce-menu .cart-checkout .cart-link a {
    text-indent: 13px;
}

.woocommerce-menu .cart-content a {
    border-bottom: 1px solid;
    display: block;
    line-height: normal;
    overflow: hidden;
    padding: 15px 13px !important;
    width: 190px;
}

#search-text-box #search_label_top .srch-btn {
    width: 182px;
}

#search-text-box #search_label_top .srch-btn::before {
    color: #273039;
    content: "\f0d9";
    cursor: pointer;
    font-family: icomoon;
    font-size: 18px !important;
    font-weight: normal;
    position: absolute;
    right: 47px !important;
    text-align: center;
    top: -5px !important;
    width: 3px;
}

#search-text-box #search_label_top .srch-btn::after {
    background: #273039 none repeat scroll 0 0;
    border-radius: 3px;
    color: '. $evolve_top_menu_hover_font_color .';
    content: "\e91e";
    cursor: pointer;
    font-family: icomoon;
    font-size: 18px !important;
    font-weight: normal;
    line-height: 35px;
    position: absolute;
    right: 7px !important;
    text-align: center;
    top: -10px !important;
    width: 38px;
}

#search-text-top {
    background: #fff none repeat scroll 0 0 !important;
    border: 1px solid #273039 !important;
    border-radius: 4px !important;
    /*box-shadow: 0 2px 5px #b5e9e0 inset;*/
    color: #757575 !important;
    float: right !important;
    font-family: Roboto !important;
    font-size: 14px;
    font-weight: 500;
    text-indent: 1px !important;
    height: 35px;
    padding: 0 0 0 10px !important;
    position: relative;
    transition: all 0.5s ease 0s;
    width: 170px !important;
}

#search_label_top {
    margin-top: 5px !important;
    color: #888;
}

div#search-text-box {
    margin-right: 0;
}

#social {
    float: right;
}

.sc_menu {
    float: none;
    text-align: center;
}

.sc_menu a.tipsytext:hover {
    color: '.$evolve_top_menu_hover_font_color.' !important;
}

.title-container #logo {
    float: none;
}

.searchform {
    float: right;
    clear: none;
}

.title-container #logo a {
    padding: 0px;
}

.menu-header .menu-item {
    text-transform: uppercase;
}

.top-menu-social {
    margin: 20px 0 5px;
}

.header .woocommerce-menu li {
    margin-left: 20px;
}

@media (max-width: 768px) {
    ul.nav-menu ul.sub-menu .sf-with-ul:after {
        top: 12px;
    }
}


/*responsive*/

@media only screen and (max-width: 768px) {
    .searchform {
        clear: both;
        float: none;
    }
    .woocommerce-menu {
        float: none;
        margin-right: 0;
    }
    .woocommerce-menu li {
        background-image: none;
        margin-left: 0px;
    }
    .woocommerce-menu .dd-options li a {
        text-align: left;
    }
    .searchform {
        float: none;
    }
    #search-text-box {
        float: none;
    }
    #search_label_top::after {
        right: 15px !important;
    }
    .woocommerce-menu-holder {
        float: none;
    }
    .header .menu-container .col-md-3 {
        text-align: center;
        width: 100%;
        float: none !important;
    }
    .mobilemenu-icon span {
        display: block;
        background: #FFF none repeat scroll 0% 0%;
        height: 3px;
        width: 40px;
        margin-top: 6px;
    }
    .mobilemenu-icon {
        position: fixed;
        top: 54%;
        left: 45%;
    }
    #wrapper .dd-options li a {
        text-align: left;
    }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
    .header .title-container #tagline {
        padding: 20px 0px;
    }
}

ul.nav-menu {
    padding: 0px;
}

ul.nav-menu li:hover {
    background: none;
}

.woocommerce-menu .my-account a {
    font-size: 12px;
}

.woocommerce-menu .cart > a .t4p-icon-cart::before,
.woocommerce-menu .my-account > a .t4p-icon-user::before {
    margin-right: 10px;
}

.woocommerce-menu .cart > a:before {
    font-family: IcoMoon;
    content: "\e90c";
    margin-right: 10px;
}

#righttopcolumn,
#social,
.sc_menu,
.header a,
#tagline,
#logo {
    display: block;
}
';

if ($options['evl_menu_font']['color'] != '') {
    $color = $options['evl_menu_font']['color'];
    
    $evolve_css_data .= '.woocommerce-menu .my-cart-link:hover,
                        .woocommerce-menu .empty-cart:hover,
                        .woocommerce-menu .my-account-link:hover{ 
                            border:1px solid '. $evolve_top_menu_hover_font_color .'; 
                            color:'. $evolve_top_menu_hover_font_color .' !important;
                        }';
}
if ($options['evl_tagline_font']['color'] != '') {
    $color = $options['evl_tagline_font']['color'];
    
    $evolve_css_data .= '.woocommerce-menu .cart > a, 
                        .woocommerce-menu .my-account > a{
                          border: 1px solid '. $color .';
                          border-radius: 3px;
                          color: '. $color .' !important;
                          font-weight: 500 !important;
                          margin-bottom: 2px;
                          padding: 7px 15px;
                        }';
}