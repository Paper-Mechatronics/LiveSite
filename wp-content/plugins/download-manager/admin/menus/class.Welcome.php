<?php


namespace WPDM\admin\menus;


class Welcome
{
    function __construct()
    {
        add_action('admin_menu', array($this, 'Menu'));
        add_action('activated_plugin', array($this, 'welcomeRedirect'));

    }

    function Menu(){
        add_dashboard_page('Welcome', 'Welcome', 'read', 'wpdm-welcome', array($this, 'UI'));
    }



    function UI(){
        remove_submenu_page( 'index.php', 'wpdm-welcome' );
        include(WPDM_BASE_DIR.'admin/tpls/welcome.php');
    }

    function welcomeRedirect($plugin)
    {
        if($plugin=='download-manager/download-manager.php') {
            wp_redirect(admin_url('index.php?page=wpdm-welcome'));
            die();
        }
    }

}