<?php
/*
Plugin Name: Download Manager
Plugin URI: http://www.wpdownloadmanager.com/purchases/
Description: Manage, Protect and Track File Downloads from your WordPress site
Author: Shaon
Version: 2.9.0
Author URI: http://www.wpdownloadmanager.com/
*/


namespace WPDM;


if(!isset($_SESSION))
@session_start();

define('WPDM_Version','2.9.0');

$content_dir = str_replace('\\','/',WP_CONTENT_DIR);

define('WPDM_ADMIN_CAP','manage_options');

define('WPDM_MENU_ACCESS_CAP','manage_options');

define('WPDM_BASE_DIR',dirname(__FILE__).'/');

define('WPDM_BASE_URL',plugins_url('/download-manager/'));

define('UPLOAD_DIR',$content_dir.'/uploads/download-manager-files/');

define('WPDM_CACHE_DIR',dirname(__FILE__).'/cache/');

define('_DEL_DIR',$content_dir.'/uploads/download-manager-files');

define('UPLOAD_BASE',$content_dir.'/uploads/');

include_once(dirname(__FILE__) . "/wpdm-functions.php");

include(dirname(__FILE__)."/wpdm-core.php");


ini_set('upload_tmp_dir',UPLOAD_DIR.'/cache/');

if(!isset($_POST))    $_SESSION['download'] = 0;


class WordPressDownloadManager{

    function __construct(){

        register_activation_hook(__FILE__, array($this, 'Install'));

        add_action( 'init', array($this, 'registerPostTypeTaxonomy'), 1 );

        add_action( 'plugins_loaded', array($this, 'LoadTextdomain') );
        add_action( 'wp_enqueue_scripts', array($this, 'EnqueueScripts') );

        add_action( 'wp_head', array($this, 'wpHead') );
        add_action( 'wp_footer', array($this, 'wpFooter') );

        spl_autoload_register( array( $this, 'AutoLoad' ) );

        new \WPDM\libs\UserDashboard();
        new \WPDM\libs\Apply();
        new \WPDM\admin\WordPressDownloadManagerAdmin();
        new \WPDM\libs\ShortCodes();

    }

    /**
     * @usage Install Plugin
     */
    function Install(){
        global $wpdb;

        delete_option('wpdm_latest');

        $sqls[] = "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ahm_download_stats` (
              `id` int(11) NOT NULL AUTO_INCREMENT,
              `pid` int(11) NOT NULL,
              `uid` int(11) NOT NULL,
              `oid` varchar(100) NOT NULL,
              `year` int(4) NOT NULL,
              `month` int(2) NOT NULL,
              `day` int(2) NOT NULL,
              `timestamp` int(11) NOT NULL,
              `ip` varchar(20) NOT NULL,
              PRIMARY KEY (`id`)
            )";

        $sqls[] = "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ahm_emails` (
              `id` int(11) NOT NULL AUTO_INCREMENT,
              `email` varchar(255) NOT NULL,
              `pid` int(11) NOT NULL,
              `date` int(11) NOT NULL,
              `custom_data` text NOT NULL,
              `request_status` INT( 1 ) NOT NULL,
              PRIMARY KEY (`id`)
            )";


        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        foreach($sqls as $sql){
            //$wpdb->query($sql);
            dbDelta($sql);
        }


        $this->RegisterPostTypeTaxonomy();
        flush_rewrite_rules();
        self::CreateDir();

    }

    /**
     * @usage Load Plugin Text Domain
     */
    function loadTextdomain(){
        load_plugin_textdomain('wpdmpro', WP_PLUGIN_URL . "/download-manager/languages/", 'download-manager/languages/');
    }

    /**
     * @usage Register WPDM Post Type and Taxonomy
     */
    public function registerPostTypeTaxonomy()
    {
        $labels = array(
            'name' => __('Downloads', 'wpdmpro'),
            'singular_name' => __('File', 'wpdmpro'),
            'add_new' => __('Add New', 'wpdmpro'),
            'add_new_item' => __('Add New File', 'wpdmpro'),
            'edit_item' => __('Edit File', 'wpdmpro'),
            'new_item' => __('New File', 'wpdmpro'),
            'all_items' => __('All Files', 'wpdmpro'),
            'view_item' => __('View File', 'wpdmpro'),
            'search_items' => __('Search Files', 'wpdmpro'),
            'not_found' => __('No File Found', 'wpdmpro'),
            'not_found_in_trash' => __('No Files found in Trash', 'wpdmpro'),
            'parent_item_colon' => '',
            'menu_name' => __('Downloads', 'wpdmpro')

        );


        $args = array(
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => get_option('__wpdm_publicly_queryable', 1),
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'download', 'with_front' => (bool)get_option('__wpdm_purl_with_front', false)), //get_option('__wpdm_purl_base','download')
            'capability_type' => 'post',
            'has_archive' => (get_option('__wpdm_has_archive', false)==false?false:sanitize_title(get_option('__wpdm_archive_page_slug', 'all-downloads'))),
            'hierarchical' => false,
            'taxonomies' => array('post_tag'),
            'menu_icon' => 'dashicons-download',
            'exclude_from_search' => (bool)get_option('__wpdm_exclude_from_search', false),
            'supports' => array('title', 'editor', 'publicize', 'excerpt', 'custom-fields', 'thumbnail', 'tags', 'comments','author')

        );


        register_post_type('wpdmpro', $args);


        $labels = array(
            'name' => __('Categories', 'wpdmpro'),
            'singular_name' => __('Category', 'wpdmpro'),
            'search_items' => __('Search Categories', 'wpdmpro'),
            'all_items' => __('All Categories', 'wpdmpro'),
            'parent_item' => __('Parent Category', 'wpdmpro'),
            'parent_item_colon' => __('Parent Category:', 'wpdmpro'),
            'edit_item' => __('Edit Category', 'wpdmpro'),
            'update_item' => __('Update Category', 'wpdmpro'),
            'add_new_item' => __('Add New Category', 'wpdmpro'),
            'new_item_name' => __('New Category Name', 'wpdmpro'),
            'menu_name' => __('Categories', 'wpdmpro'),
        );

        $args = array(
            'hierarchical' => true,
            'labels' => $labels,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' =>  'download-category'),
        );

        register_taxonomy('wpdmcategory', array('wpdmpro'), $args);


    }

    /**
     * @usage Create upload dir
     */
    public static function createDir()
    {
        if (!file_exists(UPLOAD_BASE)) {
            @mkdir(UPLOAD_BASE, 0755);
        }
        @chmod(UPLOAD_BASE, 0755);
        @mkdir(UPLOAD_DIR, 0755);
        @chmod(UPLOAD_DIR, 0755);
        self::setHtaccess();
        if (isset($_GET['re']) && $_GET['re'] == 1) {
            if (file_exists(UPLOAD_DIR)) $s = 1;
            else $s = 0;
            echo "<script>
        location.href='{$_SERVER['HTTP_REFERER']}&success={$s}';
        </script>";
            die();
        }
    }


    /**
     * @usage Protect Download Dir using .htaccess rules
     */
    public static function setHtaccess()
    {
        \WPDM\FileSystem::blockHTTPAccess(UPLOAD_DIR);
    }

    /**
     * @usage Enqueue all styles and scripts
     */
    function enqueueScripts()
    {
        global $post;

        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-form');

        $wpdmss = maybe_unserialize(get_option('__wpdm_disable_scripts', array()));

        //if((is_object($post) && has_shortcode($post->post_content,'wpdm_frontend')) || get_post_type()=='wpdmpro' )

        if (!in_array('wpdm-font-awesome', $wpdmss))
            wp_enqueue_style('font-awesome', WPDM_BASE_URL.'assets/font-awesome/css/font-awesome.min.css');


        if(is_object($post) && ( has_shortcode($post->post_content,'wpdm_frontend') || has_shortcode($post->post_content,'wpdm-package-form') || has_shortcode($post->post_content,'wpdm_user_dashboard') || has_shortcode($post->post_content,'wpdm-file-browser') ) ){
            wp_enqueue_script('jquery-ui');
            wp_enqueue_script('jquery-ui-datepicker');
            wp_enqueue_script('thickbox');
            wp_enqueue_style('thickbox');
            wp_enqueue_script('media-upload');
            wp_enqueue_media();
        }

        if(get_post_type()=='wpdmpro' && is_single()){
            wp_enqueue_script('wpdm-datatable', plugins_url('/download-manager/assets/js/jquery.dataTables.min.js'), array('jquery'));
        }


        if (!in_array('wpdm-bootstrap-css', $wpdmss))
            wp_enqueue_style('wpdm-bootstrap', plugins_url('/download-manager/assets/bootstrap/css/bootstrap.css'));


        wp_enqueue_style('wpdm-front', plugins_url() . '/download-manager/assets/css/front.css');


        if (!in_array('wpdm-bootstrap-js', $wpdmss))
            wp_enqueue_script('wpdm-bootstrap', plugins_url('/download-manager/assets/bootstrap/js/bootstrap.min.js'), array('jquery'));

        wp_enqueue_script('frontjs', plugins_url('/download-manager/assets/js/front.js'), array('jquery'));

        wp_enqueue_script('jquery-choosen', plugins_url('/download-manager/assets/js/chosen.jquery.min.js'), array('jquery'));
        //wp_enqueue_style('choosen-css', plugins_url('/download-manager/assets/css/chosen.css'), 999999);


    }

    /**
     * @usage insert code in wp head
     */
    function wpHead(){
        ?>

        <script>
            var wpdm_site_url = '<?php echo site_url('/'); ?>';
            var wpdm_home_url = '<?php echo home_url('/'); ?>';
            var ajax_url = '<?php echo admin_url('admin-ajax.php'); ?>';
        </script>


        <?php
    }

    /**
     * @usage insert code in wp footer
     */
    function wpFooter(){
        if(is_single()&&get_post_type()=='wpdmpro'){
            ?>
            <script>
                jQuery(function($){
                    $.get('<?php echo 'index.php?_nonce='.wp_create_nonce('__wpdm_view_count').'&id='.get_the_ID(); ?>');
                });
            </script>
            <?php
        }
    }



    /**
     * @param $name
     * @usage Class autoloader
     */
    function AutoLoad($name) {
        $name = str_replace("WPDM_","", $name);
        $name = str_replace("WPDM\\","", $name);
        $relative_path = str_replace("\\", "/", $name);
        $parts = explode("\\", $name);
        $class_file = end($parts);
        if(file_exists(WPDM_BASE_DIR."libs/class.{$name}.php")){
            require_once WPDM_BASE_DIR."libs/class.{$name}.php";
        } else if(file_exists(WPDM_BASE_DIR.str_replace($class_file, 'class.'.$class_file.'.php', $relative_path))){
            require_once WPDM_BASE_DIR.str_replace($class_file, 'class.'.$class_file.'.php', $relative_path);
        }
    }

}

new \WPDM\WordPressDownloadManager();

