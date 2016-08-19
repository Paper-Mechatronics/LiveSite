<?php
$evolve_css_data = '
.woocommerce-menu-holder {
    float: left;
}

.container-menu {
    z-index: 3;
}

#search-text-top {
    position: absolute;
    right: 0;
}

#search-text-top:focus {
    position: absolute;
    right: 0px;
    left: initial;
}

.header .woocommerce-menu {
    margin-right: 20px;
    padding: 5px;
}

@media (max-width: 768px) {
    .header_v0 .title-container #logo a {
        padding: 0px;
    }
    #search-text-top {
        background: #fff;
        font-size: 12px;
        font-weight: normal;
    }
    .sc_menu {
        float: none;
        text-align: center;
    }
    #search-text-top {
        border: 1px solid #fff;
        height: 36px;
        width: 190px;
    }
    .woocommerce-menu-holder {
        float: none;
    }
    .header .woocommerce-menu {
        float: none;
        margin-right: 0;
    }
    .title-container #logo {
        float: none;
    }
    #righttopcolumn,
    #social,
    .header a,
    #tagline,
    #logo {
        width: auto;
        display: block;
    }
}

@media screen and (min-width: 1200px) {
    .header_v0 div#search-text-box {
        margin-right: 0px
    }
}
';
