<?php
/**
 * Created by PhpStorm.
 * User: shahnuralam
 * Date: 11/9/15
 * Time: 8:01 PM
 */

namespace WPDM\admin\menus;


class Addons
{

    function __construct()
    {
        add_action('admin_menu', array($this, 'Menu'));
    }

    function Menu()
    {
        add_submenu_page('edit.php?post_type=wpdmpro', __('Add-Ons &lsaquo; Download Manager', "wpdmpro"), __('Add-Ons', "wpdmpro"), WPDM_MENU_ACCESS_CAP, 'wpdm-addons', array($this, 'UI'));
    }

    function UI(){
        if (!isset($_SESSION['wpdm_addon_store_data']) || !is_object(json_decode($_SESSION['wpdm_addon_store_data']))) {
            $data = remote_get('http://www.wpdownloadmanager.com/?wpdm_api_req=getPackageList');
            $cats = remote_get('http://www.wpdownloadmanager.com/?wpdm_api_req=getCategoryList');
            $_SESSION['wpdm_addon_store_data'] = $data;
            $_SESSION['wpdm_addon_store_cats'] = $cats;

        } else {
            $data = $_SESSION['wpdm_addon_store_data'];
            $cats = $_SESSION['wpdm_addon_store_cats'];
        }

        $data = json_decode($data);
        $cats = json_decode($cats);

        include(WPDM_BASE_DIR . "/admin/tpls/addons-list.php");
    }

}