<?php
global $wpdm_message, $btnclass;



function wpdm_zip_package($package){
    return \WPDM\Package::Zip($package['ID']);
}

/**
 * Download contents as a file
 * @param $filename
 * @param $content
 */
function wpdm_download_data($filename, $content)
{
    \WPDM\FileSystem::downloadData($filename, $content);
}


/**
 * Cache remote file to local directory and return local file path
 * @param mixed $url
 * @param mixed $filename
 * @return string $path
 */
function wpdm_cache_remote_file($url, $filename = '')
{
    return \WPDM\FileSystem::copyURL($url, $filename);
}

/**
 * @usage Create ZIP from given file list
 * @param $files
 * @param $zipname
 * @return bool|string
 */
function wpdm_zip_files($files, $zipname){

    return \WPDM\FileSystem::zipFiles($files, $zipname);
}

/**
 * @usage Download Given File
 * @param $filepath
 * @param $filename
 * @param int $speed
 * @param int $resume_support
 * @param array $extras
 */

function wpdm_download_file($filepath, $filename, $speed = 0, $resume_support = 1, $extras = array())
{

    if(isset($_GET['play'])) $extras['play'] = $_GET['play'];
     \WPDM\FileSystem::donwloadFile($filepath, $filename, $speed, $resume_support, $extras);

}


/**
 * @param $id
 * @usage Returns the user roles who has access to specified package
 * @return array|mixed
 */
function wpdm_allowed_roles($id){
	return \WPDM\Package::AllowedRoles($id);
}


/**
 * @usage Check if current user has access to package or category
 * @param $id
 * @param string $type
 *
 * @return bool
 */
function wpdm_user_has_access($id, $type = 'package'){
    return \WPDM\Package::UserCanAccess($id, $type);
}


/**
 * @usage Generate download link of a package
 * @param $package
 * @param int $embed
 * @param array $extras
 * @return string
 */
function DownloadLink(&$package, $embed = 0, $extras = array())
{
    global $wpdb, $current_user, $wpdm_download_icon, $wpdm_download_lock_icon, $btnclass;
    if(is_array($extras))
    extract($extras);
    $data = '';
    //get_currentuserinfo();

    $package['link_url'] = home_url('/?download=1&');
    $package['link_label'] = !isset($package['link_label']) || $package['link_label'] == '' ? __("Download", "wpdmpro") : $package['link_label'];

    //Change link label using a button image
    $package['link_label'] = apply_filters('wpdm_button_image', $package['link_label'], $package);


    $package['download_url'] = wpdm_download_url($package);
    if (wpdm_is_download_limit_exceed($package['ID'])) {
        $package['download_url'] = '#';
        $package['link_label'] = __('Download Limit Exceeded','wpdmpro');
    }
    if (isset($package['expire_date']) && $package['expire_date'] != "" && strtotime($package['expire_date']) < time()) {
        $package['download_url'] = '#';
        $package['link_label'] = __('Download was expired on', 'wpdmpro') . " " . date_i18n(get_option('date_format')." h:i A", strtotime($package['expire_date']));
        $package['download_link'] = "<a href='#'>{$package['link_label']}</a>";
        return "<div class='alert alert-warning'><b>" . __('Download:', 'wpdmpro') . "</b><br/>{$package['link_label']}</div>";
    }

    if (isset($package['publish_date']) && $package['publish_date'] !='' && strtotime($package['publish_date']) > time()) {
        $package['download_url'] = '#';
        $package['link_label'] = __('Download will be available from ', 'wpdmpro') . " " . date_i18n(get_option('date_format')." h:i A", strtotime($package['publish_date']));
        $package['download_link'] = "<a href='#'>{$package['link_label']}</a>";
        return "<div class='alert alert-warning'><b>" . __('Download:', 'wpdmpro') . "</b><br/>{$package['link_label']}</div>";
    }

    $link_label = isset($package['link_label']) ? $package['link_label'] : __('Download', 'wpdmpro');

	$package['access'] = wpdm_allowed_roles($package['ID']);

    if ($package['download_url'] != '#')
        $package['download_link'] = "<a class='wpdm-download-link wpdm-download-locked {$btnclass}' rel='nofollow' href='#' onclick=\"location.href='{$package['download_url']}';return false;\"><i class='$wpdm_download_icon'></i>{$link_label}</a>";
    else
        $package['download_link'] = "<div class='alert alert-warning'><b>" . __('Download:', 'wpdmpro') . "</b><br/>{$link_label}</div>";
    $caps = array_keys($current_user->caps);
    $role = array_shift($caps);

    $matched = (is_array(@maybe_unserialize($package['access'])) && is_user_logged_in())?array_intersect($current_user->roles, @maybe_unserialize($package['access'])):array();

    $skiplink = 0;

    if (is_user_logged_in() && count($matched) <= 0 && !@in_array('guest', @maybe_unserialize($package['access']))) {
        $package['download_url'] = "#";
        $package['download_link'] = $package['download_link_extended'] = stripslashes(get_option('wpdm_permission_msg', __('Permission Denied', 'wpdmpro')));
        $package = apply_filters('download_link', $package);
        if (get_option('_wpdm_hide_all', 0) == 1) { $package['download_link'] = $package['download_link_extended'] = 'blocked'; }
        return $package['download_link'];
    }
    if (!@in_array('guest', @maybe_unserialize($package['access'])) && !is_user_logged_in()) {

        $loginform = wpdm_login_form(array('redirect'=>get_permalink($package['ID'])));
        if (get_option('_wpdm_hide_all', 0) == 1) return 'loginform';
        $package['download_url'] = home_url('/wp-login.php?redirect_to=' . urlencode($_SERVER['REQUEST_URI']));
        $package['download_link'] = stripcslashes(str_replace(array("[loginform]","[this_url]"), array($loginform,get_permalink($package['ID'])), get_option('wpdm_login_msg')));
        return get_option('__wpdm_login_form', 0) == 1 ? $loginform : $package['download_link'];

    }

    $package = apply_filters('download_link', $package);

    $unqid = uniqid();
    if (!isset($package['quota']) || (isset($package['quota']) && $package['quota'] > 0 && $package['quota'] > $package['download_count']) || $package['quota'] == 0) {
        $lock = 0;

        if ( $package['password'] != '') {
            $lock = 'locked';
            $data = \WPDM\PackageLocks::AskPassword($package);
        }


        $sociallock = "";

        if (isset($package['captcha_lock']) && (int)$package['captcha_lock'] == 1) {
            $lock = 'locked';
            $sociallock .=  \WPDM\PackageLocks::reCaptchaLock($package , true);

        }

        $extralocks = '';
        $extralocks = apply_filters("wpdm_download_lock", $extralocks, $package);

        if (is_array($extralocks) && $extralocks['lock'] === 'locked') {

            if(isset($extralocks['type']) && $extralocks['type'] == 'social')
                $sociallock .= $extralocks['html'];
            else
                $data .= $extralocks['html'];

            $lock = 'locked';
        }

        if($sociallock!=""){
            $data .= "<div class='panel panel-default'><div class='panel-heading'>".__("Download","wpdmpro")."</div><div class='panel-body wpdm-social-locks text-center'>{$sociallock}</div></div>";
        }

        if ($lock === 'locked') {
            $popstyle = isset($popstyle) && in_array($popstyle, array('popup', 'pop-over')) ? $popstyle : 'pop-over';
            if ($embed == 1)
                $adata = "</strong><table class='table all-locks-table' style='border:0px'><tr><td style='padding:5px 0px;border:0px;'>" . $data . "</td></tr></table>";
            else {
                $dataattrs = $popstyle == 'pop-over'? 'data-title="<button type=button id=\'close\' class=\'btn btn-link btn-xs pull-right po-close\' style=\'margin-top:-4px;margin-right:-10px\'><i class=\'fa fa-times text-danger\'></i></button> '.__('Download','wpdmpro').' ' . $package['title'] . '"' : 'data-toggle="modal" data-target="#pkg_' . $package['ID'] . "_" . $unqid . '"';
                $adata = '<a href="#pkg_' . $package['ID'] . "_" . $unqid . '" '.$dataattrs.' class="wpdm-download-link wpdm-download-locked ' . $popstyle . ' ' . $btnclass . '"><i class=\'' . $wpdm_download_lock_icon . '\'></i>' . $package['link_label'] . '</a>';
                if ($popstyle == 'pop-over')
                    $adata .= '<div class="modal fade"><div class="row all-locks"  id="pkg_' . $package['ID'] . "_" . $unqid . '">' . $data . '</div></div>';
                else
                    $adata .= '<div class="modal fade" role="modal" id="pkg_' . $package['ID'] . "_" . $unqid . '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><strong style="margin:0px;font-size:12pt">' . __('Download') . '</strong></div><div class="modal-body">' . $data . '</div><div class="modal-footer text-right"><button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button></div></div></div></div>';
            }

            $data = $adata;
        }
        if ($lock !== 'locked') {

            $data = $package['download_link'];


        }
    }
    else {
        $data = __("Download limit exceeded!",'wpdmpro');
    }


    //return str_replace(array("\r","\n"),"",$data);
    return $data;

}


/**
 * @usage Verify Email Address
 * @param $email
 * @return bool
 */
function wpdm_verify_email($email){
    $dns_verify = get_option('__wpdm_verify_dns',0);
    $blocked_domains = explode("\n",str_replace("\r","",get_option('__wpdm_blocked_domains','')));
    $blocked_emails = explode("\n",str_replace("\r","",get_option('__wpdm_blocked_emails','')));
    $eparts = explode("@", $email);
    $domain = $eparts[1];
    if(!is_email($email)) return false;
    if(in_array($email, $blocked_emails)) return false;
    if(in_array($domain, $blocked_domains)) return false;
    if($dns_verify && !checkdnsrr($domain, 'MX')) return false;
    return true;
}


/**
 * return download link after verifying password
 * data format: json
 */
function wpdm_getlink()
{
    global $wpdb;
    if (!isset($_POST['id'])) return;
    $id = (int)$_POST['id'];
    $password = isset($_POST['password']) ? addslashes($_POST['password']) : '';
    $file = get_post($id, ARRAY_A);
    //$file['ID'] = $file['ID'];
    $file = wpdm_setup_package_data($file);
    $key = uniqid();
    $file1 = $file;
    // and( password='$password' or password like '%[$password]%')
    $plock = isset($file['password']) && $file['password'] != '' ? 1 : 0;

    $data = array('error' => '', 'downloadurl' => '');

    if(isset($_POST['reCaptchaVerify'])){
        $ret = remote_post('https://www.google.com/recaptcha/api/siteverify', array('secret' => get_option('_wpdm_recaptcha_secret_key'), 'response' => $_POST['reCaptchaVerify'], 'remoteip' => $_SERVER['REMOTE_ADDR']));
        $ret = json_decode($ret);
        if($ret->success == 1){
            $_SESSION['_wpdm_unlocked_'.$file['ID']] = 1;
            update_post_meta($file['ID'], "__wpdmkey_".$key, 3);
            $download_url = wpdm_download_url($file, "_wpdmkey={$key}");
            $data['downloadurl'] = $download_url;
        }
        else{
            $data['error'] = __("Captcha Verification Failed!", "wpmdpro");
        }
        header("Content-type: application/json");
        echo json_encode($data);
        die();
    }


    if ($plock == 1 && $password != $file['password'] && !strpos("__" . $file['password'], "[$password]")) {
        $data['error'] = __('Wrong Password!','wpdmpro');
        $file = array();
    }
    if ($plock == 1 && $password == '') {
        $data['error'] = __('Wrong Password!', 'wpdmpro');
        $file = array();
    }
    $ux = "";
    if ($plock == 1 && isset($file['ID'])) {
        update_post_meta($file['ID'], "__wpdmkey_" .$key, 3);
    }

    if ( isset($file['ID']) && $file['ID'] != '') {
        $pu = isset($file['password_usage']) && is_array($file['password_usage'])?$file['password_usage']:array();
        $pul = isset($file['password_usage_limit'])?(int)$file['password_usage_limit']:99999999999;

        if (is_array($pu) && isset($pu[$password]) && $pu[$password] >= $pul && $pul > 0)
            $data['error'] = __('Password usages limit exceeded','wpdmpro');
        else {
            if(!is_array($pu)) $pu = array();
            $pu[$password] = isset($pu[$password])?$pu[$password]+1:1;
            update_post_meta($file['ID'], '__wpdm_password_usage', $pu);
        }
    }
    if (isset($_COOKIE['unlocked_' . $file1['ID']]) && $_COOKIE['unlocked_' . $file1['ID']] == 1) {
        $data['error'] = '';
        $file = $file1;
    }

    if ($data['error'] == '') {
        $_SESSION['_wpdm_unlocked_'.$file['ID']] = 1;
        $data['downloadurl'] = wpdm_download_url($file, "_wpdmkey={$key}");
    } // home_url('/?downloadkey='.md5($file['files']).'&file='.$id.$ux);
    $adata = apply_filters("wpdmgetlink", $data, $file);
    $data = is_array($adata) ? $adata : $data;

	if(!wpdm_is_ajax()){

		@setcookie("wpdm_getlink_data_".$key, json_encode($data));

		if(isset($data['downloadurl']) && $data['downloadurl']!=''){
			header("location: ".$data['downloadurl']);
			die();
		}

		header("location: ".$_SERVER['HTTP_REFERER']."#nojs_popup|ckid:".$key);
		die();
	}

    header("Content-type: application/json");
    die(json_encode($data));
}



function wpdm_package_link_legacy($params)
{
    extract($params);
    $posts = get_posts(array("post_type"=>"wpdmpro","meta_key"=>"__wpdm_legacy_id","meta_value"=>$params['id']));
    $data = (array)$posts[0];
    if(!isset($data['ID'])) return "";
    $data = wpdm_setup_package_data($data);

    if ($data['ID'] == '') {
        return '';
    }

    $templates = maybe_unserialize(get_option("_fm_link_templates", true));

    if(!isset($template) || $template=="" ) $template = $data['template'];

    if(isset($template) && isset($templates[$template]) && isset($templates[$template]['content'])) $template = $templates[$template]['content'];


    return "<div class='w3eden'>" . FetchTemplate($template, $data, 'link') . "</div>";
}


/**
 * Parse shortcode
 * @param mixed $content
 * @return mixed
 */
function wpdm_downloadable($content)
{
    if( defined('WPDM_THEME_SUPPORT') && WPDM_THEME_SUPPORT == true ) return $content;

    global $wpdb, $current_user, $post, $wp_query, $wpdm_package;
    if (isset($wp_query->query_vars[get_option('__wpdm_curl_base', 'downloads')]) && $wp_query->query_vars[get_option('__wpdm_curl_base', 'downloads')] != '')
        return wpdm_embed_category(array("id" => $wp_query->query_vars[get_option('__wpdm_curl_base', 'downloads')]));
    $postlink = site_url('/');
    //get_currentuserinfo();
    $permission_msg = get_option('wpdm_permission_msg') ? stripslashes(get_option('wpdm_permission_msg')) : "<div  style=\"background:url('" . get_option('siteurl') . "/wp-content/plugins/download-manager/images/lock.png') no-repeat;padding:3px 12px 12px 28px;font:bold 10pt verdana;color:#800000\">Sorry! You don't have suffient permission to download this file!</div>";
    $login_msg = get_option('wpdm_login_msg') ? stripcslashes(get_option('wpdm_login_msg')) : "<a href='" . get_option('siteurl') . "/wp-login.php'  style=\"background:url('" . get_option('siteurl') . "/wp-content/plugins/download-manager/images/lock.png') no-repeat;padding:3px 12px 12px 28px;font:bold 10pt verdana;\">Please login to access downloadables</a>";
    $user = new WP_User(null);
    if (isset($_GET[get_option('__wpdm_purl_base', 'download')]) && $_GET[get_option('__wpdm_purl_base', 'download')] != '' && $wp_query->query_vars[get_option('__wpdm_purl_base', 'download')] == '')
        $wp_query->query_vars[get_option('__wpdm_purl_base', 'download')] =  $_GET[get_option('__wpdm_purl_base', 'download')];
    $wp_query->query_vars[get_option('__wpdm_purl_base', 'download')] = isset($wp_query->query_vars[get_option('__wpdm_purl_base', 'download')]) ? urldecode($wp_query->query_vars[get_option('__wpdm_purl_base', 'download')]) : '';

    if (is_singular('wpdmpro')) {
        if (get_option('_wpdm_custom_template') == 1 || current_theme_supports('wpdm')) return $content;

        $template = get_post_meta(get_the_ID(),'__wpdm_page_template', true);
        $data = FetchTemplate($template, get_the_ID(), 'page');
        $siteurl = site_url('/');
        return  "<div class='w3eden'>{$data}</div>";
    }

    return $content;


}


/**
 * @usage Count files in a package
 * @param $id
 * @return int
 */
function wpdm_package_filecount($id){
    return \WPDM\Package::fileCount($id);

}

/**
 * @usage Calculate package size
 * @param $id
 * @return float|int|mixed|string
 */
function wpdm_package_size($id){
    return \WPDM\Package::Size($id);
}


/**
 * @usage Calculate file size
 * @param $file
 * @return float|int|mixed|string
 */
function wpdm_file_size($file){
    if(file_exists($file))
        $size = filesize($file);
    else if(file_exists(UPLOAD_DIR.$file))
        $size = filesize(UPLOAD_DIR.$file);
    else $size = 0;
    $size = $size / 1024;
    if ($size > 1024) $size = number_format($size / 1024, 2) . ' MB';
    else $size = number_format($size, 2) . ' KB';
    return $size;
}



/**
 * @usage Returns icons for package file types
 * @param $id
 * @param bool $img
 * @return array|string
 */
function wpdm_package_filetypes($id, $img = true){

    return \WPDM\Package::fileTypes($id, $img);

}


/**
 * @usage Validate and sanitize input data
 * @param $var
 * @param array $params
 * @return int|null|string|void
 */
function wpdm_query_var($var, $params = array())
{
    $val = isset($_REQUEST[$var]) ? $_REQUEST[$var] : null;
    $validate = is_string($params) ? $params : '';
    $validate = is_array($params) && isset($params['validate']) ? $params['validate'] : $validate;

    switch ($validate) {
        case 'num':
            $val = intval($val);
            break;
        case 'html':

            break;
        default:
            $val = esc_attr($val);
            break;
    }

    return $val;
}


function wpdm_category($params)
{
    $params['order_field'] = isset($params['order_by'])?$params['order_by']:'publish_date';
    unset($params['order_by']);
    if (isset($params['item_per_page']) && !isset($params['items_per_page'])) $params['items_per_page'] = $params['item_per_page'];
    unset($params['item_per_page']);
    return wpdm_embed_category($params);

}

function wpdm_page_links($urltemplate, $total, $page = 1, $items_per_page = 10)
{
    if ($items_per_page <= 0) $items_per_page = 10;
    $page = $page ? $page : 1;
    $pages = ceil($total / $items_per_page);
    $start = ($page - 1) * $items_per_page;
    $pag = new \WPDM\libs\Pagination();
    $pag->items($total);
    $pag->nextLabel(' <i class="icon icon-forward"></i> ');
    $pag->prevLabel(' <i class="icon icon-backward"></i> ');
    $pag->limit($items_per_page);
    $pag->urlTemplate($urltemplate);
    $pag->currentPage($page);
    return $pag->show();
}


function wpdm_embed_category($params = array('id' => '', 'operator' => 'IN' , 'items_per_page' => 10, 'title' => false, 'desc' => false, 'order_field' => 'create_date', 'order' => 'desc', 'paging' => false, 'toolbar' => 1, 'template' => '','cols'=>3, 'colspad'=>2, 'colsphone' => 1))
{
    extract($params);
    $fnparams = $params;
    if(!isset($id) || $id =="") return;
    if(!isset($items_per_page)) $items_per_page = 10;
    if(!isset($template)) $template = 'link-template-calltoaction3.php';
    if(!isset($cols)) $cols = 1;
    if(!isset($colspad)) $colspad = 1;
    if(!isset($colsphone)) $colsphone = 1;
    if(!isset($toolbar)) $toolbar = 1;
    $taxo = 'wpdmcategory';
    if(isset($tag) && $tag==1) $taxo = 'post_tag';
    $cwd_class = "col-md-".(int)(12/$cols);
    $cwdsm_class = "col-sm-".(int)(12/$colspad);
    $cwdxs_class = "col-xs-".(int)(12/$colsphone);

    $id = trim($id, ", ");
    $cids = explode(",", $id);

    global $wpdb, $current_user, $post, $wp_query;

    $order_field = isset($order_field) ? $order_field : 'publish_date';
    $order_field = isset($_GET['orderby']) ? $_GET['orderby'] : $order_field;
    $order = isset($order) ? $order : 'desc';
    $order = isset($_GET['order']) ? $_GET['order'] : $order;
    $operator = isset($operator)?$operator:'IN';
    $cpvar = 'cp_'.$cids[0];
    $cp = wpdm_query_var($cpvar,'num');
    if(!$cp) $cp = 1;

    $params = array(
        'post_type' => 'wpdmpro',
        'paged' => $cp,
        'posts_per_page' => $items_per_page,
        'include_children' => false,
        'tax_query' => array(array(
            'taxonomy' => $taxo,
            'field' => 'slug',
            'terms' => $cids,
            'operator' => $operator
        ))
    );

    if (get_option('_wpdm_hide_all', 0) == 1) {
        $params['meta_query'] = array(
            array(
            'key' => '__wpdm_access',
            'value' => 'guest',
            'compare' => 'LIKE'
            )
        );
        if(is_user_logged_in()){
            global $current_user;
            $params['meta_query'][] = array(
                'key' => '__wpdm_access',
                'value' => $current_user->roles[0],
                'compare' => 'LIKE'
            );
            $params['meta_query']['relation'] = 'OR';
        }
    }

    $params['orderby'] = $order_field;
    $params['order'] = $order;
    $params = apply_filters("wpdm_embed_category_query_params", $params);
    $packs = new WP_Query($params);

    $total = $packs->found_posts;
    $pages = ceil($total / $items_per_page);
    $page = isset($_GET[$cpvar]) ? $_GET[$cpvar] : 1;
    $start = ($page - 1) * $items_per_page;

    if (!isset($paging) || $paging == 1) {
        $pag = new \WPDM\libs\Pagination();
        $pag->items($total);
        $pag->nextLabel(' &#9658; ');
        $pag->prevLabel(' &#9668; ');
        $pag->limit($items_per_page);
        $pag->currentPage($page);
    }

    $burl = get_permalink();
    $url = $_SERVER['REQUEST_URI']; //get_permalink();
    $url = strpos($url, '?') ? $url . '&' : $url . '?';
    $url = preg_replace("/[\&]*{$cpvar}=[0-9]+[\&]*/", "", $url);
    $url = strpos($url, '?') ? $url . '&' : $url . '?';
    if (!isset($paging) || $paging == 1)
        $pag->urlTemplate($url . "$cpvar=[%PAGENO%]");


    $html = '';
    $templates = maybe_unserialize(get_option("_fm_link_templates", true));

    if(isset($templates[$template])) $template = $templates[$template]['content'];

    global $post;
    while($packs->have_posts()) { $packs->the_post();

        $pack = (array)$post;
        $repeater = "<div class='{$cwd_class} {$cwdsm_class} {$cwdxs_class}'>".FetchTemplate($template, $pack)."</div>";
        $html .=  $repeater;

    }
    wp_reset_query();

    $html = "<div class='row'>{$html}</div>";
    $cname = array();
    foreach($cids as $cid){
        $cat = get_term_by('slug', $cid, $taxo);
        $cname[] = $cat->name;

    }
    $cats = implode(", ", $cname);

    //Added from v4.2.1
    $desc = '';

    if(isset($fnparams['title']) && $fnparams['title'] != false && intval($fnparams['title']) != 1) $cats = $fnparams['title'];
    if(isset($fnparams['desc']) && $fnparams['desc'] != false && intval($fnparams['desc']) != 1) $desc = $fnparams['desc'];
    if(isset($fnparams['desc']) && $fnparams['desc'] == 1) $desc = term_description($cids[0], $taxo);

     $cimg = '';


    $subcats = '';
    if (function_exists('wpdm_ap_categories') && $subcats == 1) {
        $schtml = wpdm_ap_categories(array('parent' => $id));
        if ($schtml != '') {
            $subcats = "<fieldset class='cat-page-tilte'><legend>" . __('Sub-Categories', 'wpdmpro') . "</legend>" . $schtml . "<div style='clear:both'></div></fieldset>" . "<fieldset class='cat-page-tilte'><legend>" . __('Downloads', 'wpdmpro') . "</legend>";
            $efs = '</fieldset>';
        }
    }

    if (!isset($paging) || $paging == 1)
        $pgn = "<div style='clear:both'></div>" . $pag->show() . "<div style='clear:both'></div>";
    else
        $pgn = "";
    global $post;

    $sap = get_option('permalink_structure') ? '?' : '&';
    $burl = $burl . $sap;
    if (isset($_GET['p']) && $_GET['p'] != '') $burl .= 'p=' . $_GET['p'] . '&';
    if (isset($_GET['src']) && $_GET['src'] != '') $burl .= 'src=' . $_GET['src'] . '&';
    $orderby = isset($_GET['orderby']) ? $_GET['orderby'] : 'create_date';
    $order = ucfirst($order);
    $order_field = " " . __(ucwords(str_replace("_", " ", $order_field)),"wpdmpro");
    $ttitle = __('Title', 'wpdmpro');
    $tdls = __('Downloads', 'wpdmpro');
    $tcdate = __('Publish Date', 'wpdmpro');
    $tudate = __('Update Date', 'wpdmpro');
    $tasc = __('Asc', 'wpdmpro');
    $tdsc = __('Desc', 'wpdmpro');
    $tsrc = __('Search', 'wpdmpro');
    $order_by_label = __('Order By','wpdmpro');
    if ($toolbar || get_option('__wpdm_cat_tb') == 1)
        $toolbar = <<<TBR

                 <div class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">$cats</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

      <ul class="nav navbar-nav navbar-right">
       <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">{$order_by_label} {$order_field} <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                         <li><a href="{$burl}orderby=title&order=asc">{$ttitle}</a></li>
                         <!-- li><a href="{$burl}orderby=download_count&order=desc">{$tdls}</a></li -->
                         <li><a href="{$burl}orderby=publish_date&order=desc">{$tcdate}</a></li>
                        </ul>
                     </li>
                     <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">$order <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                         <li><a href="{$burl}orderby={$orderby}&order=asc">{$tasc}</a></li>
                         <li><a href="{$burl}orderby={$orderby}&order=desc">{$tdsc}</a></li>
                        </ul>
                     </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</div>
TBR;
    else
        $toolbar = '';
    return "<div class='w3eden'>" . $toolbar . $cimg . $desc . $subcats . $html  . $pgn . "<div style='clear:both'></div></div>";
}



/**
 * @param $file
 * @return array|mixed
 */
function wpdm_basename($file){
    if(strpos("~".$file,"\\"))
        $basename = explode("\\", $file);
    else
       $basename = explode("/", $file);
    $basename = end($basename);
    return $basename;
}


/**
 * @usage Generate thumbnail dynamically
 * @param $path
 * @param $size
 * @return mixed
 */

function wpdm_dynamic_thumb($path, $size)
{
    return \WPDM\FileSystem::imageThumbnail($path, $size[0], $size[1]);
}


/**
 * @usage Return Post Thumbail
 * @param string $size
 * @param bool $echo
 * @param null $extra
 * @return mixed|string|void
 */
function wpdm_post_thumb($size='', $echo = true, $extra = null){
    global $post;
    $size = $size?$size:'thumbnail';
    $class = isset($extra['class'])?$extra['class']:'';
    $alt = $post->post_title;
    if(is_array($size))
    {
        $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');
        $large_image_url = $large_image_url[0];
        if($large_image_url!=''){
            $path = str_replace(site_url('/'), ABSPATH, $large_image_url);
            $thumb = wpdm_dynamic_thumb($path, $size);
            $thumb = str_replace(ABSPATH, site_url('/'), $thumb);
            $alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
            $img = "<img src='".$thumb."' alt='{$alt}' class='{$class}' />";
            if($echo) { echo $img; return; }
            else
                return $img;
        }
    }
    if($echo&&has_post_thumbnail($post->ID ))
        echo get_the_post_thumbnail($post->ID, $size, $extra );
    else if(!$echo&&has_post_thumbnail($post->ID ))
        return get_the_post_thumbnail($post->ID, $size, $extra );
    else if($echo)
        echo "";
    else
        return "";
}

/**
 * @usage Generate Thumnail for the given package
 * @param $post
 * @param string $size
 * @param bool $echo
 * @param null $extra
 * @return mixed|string|void
 */
function wpdm_thumb($post, $size='', $echo = true, $extra = null){
    if(is_int($post))
    $post = get_post($post);
    $size = $size?$size:'thumbnail';
    $class = isset($extra['class'])?$extra['class']:'';
    $alt = $post->post_title;
    if(is_array($size))
    {
        $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');
        $large_image_url = $large_image_url[0];
        if($large_image_url!=''){
            $path = str_replace(site_url('/'), ABSPATH, $large_image_url);
            $thumb = wpdm_dynamic_thumb($path, $size);
            $thumb = str_replace(ABSPATH, site_url('/'), $thumb);
            $alt = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
            if($echo==='url') return $thumb;
            $img = "<img src='".$thumb."' alt='{$alt}' class='{$class}' />";
            if($echo) { echo $img; return; }
            else
                return $img;
        }
    }
    if($echo&&has_post_thumbnail($post->ID ))
        echo get_the_post_thumbnail($post->ID, $size, $extra );
    else if(!$echo&&has_post_thumbnail($post->ID ))
        return get_the_post_thumbnail($post->ID, $size, $extra );
    else if($echo)
        echo "";
    else
        return "";
}

/**
 * @usage Genrate option fields
 * @param $data
 * @return mixed|string
 */
function wpdm_option_field($data) {

    $desc = isset($data['description'])? "<em class='note'>{$data['description']}</em>":"";

    switch($data['type']):
        case 'text':
            return "<input type='text' name='$data[name]' class='form-control' id='$data[id]' value='$data[value]' placeholder='{$data['placeholder']}'  />$desc";
            break;
        case 'select':
        case 'dropdown':
            $html = "<select name='{$data['name']}'  id='{$data['id']}' style='width:100%;min-width:150px;' >";
            foreach($data['options'] as $value => $label){

                $html .= "<option value='{$value}' ".selected($data['selected'],$value,false).">$label</option>";
            }
            $html .= "</select>";
            return $html.$desc;
            break;
        case 'notice':
            return "<div class='alert alert-info' style='margin: 0'>$data[notice]</div>".$desc;
        case 'textarea':
            return "<textarea name='$data[name]' id='$data[id]' class='form-control' style='min-height: 100px'>$data[value]</textarea>$desc";
            break;
        case 'checkbox':
            return "<input type='hidden' name='$data[name]' value='0' /><input type='checkbox' name='$data[name]' id='$data[id]' value='$data[value]' ".checked($data['checked'], $data['value'], false)." />".$desc;
            break;
        case 'callback':
            return call_user_func($data['dom_callback'], $data['dom_callback_params']).$desc;
            break;
        case 'heading':
            return "<h3>".$data['label']."</h3>";
            break;
    endswitch;
}

/**
 * @param $options
 * @return string
 */
function wpdm_option_page($options){
    $html = "<div class='wpdm-settings-fields'>";
    foreach($options as $id => $option){
        if(in_array($option['type'], array('checkbox','radio')))
            $html .= "<div class='form-group'><label>".wpdm_option_field($option)." {$option['label']}</label></div>";
        else if($option['type']=='heading')
            $html .= "<h3>{$option['label']}</h3>";
        else
            $html .= "<div class='form-group'><label>{$option['label']}</label>".wpdm_option_field($option)."</div>";
    }
    $html .="</div>";
    return $html;
}


/**
 * @param $name
 * @param $options
 * @return string
 */
function wpdm_settings_section($name, $options){
    return "<div class='panel panel-default'><div class='panel-heading'>{$name}</div><div class='panel-body'>".wpdm_option_page($options)."</div></div>";
}


/**
 * @usage Get All Custom Data of a Package
 * @param $pid
 * @return array
 */
function wpdm_custom_data($pid)
{
    return \WPDM\Package::metaData($pid);
}

/**
 * @usage Organize package data using all available variable
 * @param $vars
 * @return mixed
 */
function wpdm_setup_package_data($vars)
{
    if (isset($vars['formatted'])) return $vars;
    if (!isset($vars['ID'])) return $vars;
    $pack = new \WPDM\Package($vars['ID']);
    $pack->Prepare();
    return $pack->PackageData;
}

/**
 * @usage Check if a package is locked or public
 * @param $id
 * @return bool
 */
function wpdm_is_locked($id){

    return \WPDM\Package::isLocked($id);

}


/**
 * @usage Fetch link/page template and return generated html
 * @param $template
 * @param $vars
 * @param string $type
 * @return mixed|string|void
 */
function FetchTemplate($template, $vars, $type = 'link')
{
    return \WPDM\Package::FetchTemplate($template, $vars, $type);
}

/**
 * @usage Callback function for [wpdm_login_form] short-code
 * @return string
 */
function wpdm_loginform(){
    return wpdm_login_form(array('redirect'=>$_SERVER['REQUEST_URI']));
}


/**
 * @return bool
 */
function wpdm_is_ajax()
{
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
        return true;
    return false;
}


/**
 * @usage Get Package Data By Package ID
 * @param $ID
 * @return bool|mixed|null|void|WP_Post
 */
function wpdm_get_package($ID){
    return \WPDM\Package::Get($ID);
}

/**
 * @usage Get download manager package data
 * @param $ID
 * @param $meta
 * @return mixed
 */
function get_package_data($ID, $key){
    return \WPDM\Package::Get($ID, $key);
}


/**
 * @usage Validate individual file password
 */
function wpdm_check_invpass()
{
    if (isset($_POST['actioninddlpvr']) && $_POST['actioninddlpvr'] != '') {
        $fileid = intval($_POST['wpdmfileid']);
        $data = get_post_meta($_POST['wpdmfileid'], '__wpdm_fileinfo', true);
        $data = $data ? $data : array();
        $package = get_post($fileid);
        $packagemeta = wpdm_custom_data($fileid);
        $password = $data[$_POST['wpdmfile']]['password'] != "" ? $data[$_POST['wpdmfile']]['password'] : $packagemeta['password'];
        if ($password == $_POST['actioninddlpvr'] || strpos($password, "[" . $_POST['actioninddlpvr'] . "]") !== FALSE) {
            $id = uniqid();
            update_post_meta($fileid, "__wpdmkey_".$id, 8);
            die("|ok|$id|");
        } else
            die('|error|');
    }
}

/**
 * @usage Password generator
 */
function wpdm_generate_password()
{
    include(wpdm_tpl_path('wpdm-generate-password.php'));
    die();

}

/**
 * @usage Quote all elements in an array
 * @param $values
 * @return mixed
 */
function quote_all_array($values)
{
    foreach ($values as $key => $value)
        if (is_array($value))
            $values[$key] = quote_all_array($value);
        else
            $values[$key] = quote_it($value);
    return $values;
}

/**
 * @usage Quoate a value
 * @param $value
 * @return array|string
 */
function quote_it($value)
{
    if (is_null($value))
        return "NULL";

    $value = esc_sql($value);
    return $value;
}

function wpdm_view_countplus(){
    if(isset($_REQUEST['_nonce'])&&wp_verify_nonce($_REQUEST['_nonce'],"__wpdm_view_count")){

        $id = intval($_REQUEST['id']);
        $views = get_post_meta($id, '__wpdm_view_count', true);
        update_post_meta($id, '__wpdm_view_count', $views+1);
        echo $views+1;
        die();

    }
}


function wpdm_array_splice_assoc(&$input, $offset, $length, $replacement) {
    $replacement = (array) $replacement;
    $key_indices = array_flip(array_keys($input));
    if (isset($input[$offset]) && is_string($offset)) {
        $offset = $key_indices[$offset];
    }
    if (isset($input[$length]) && is_string($length)) {
        $length = $key_indices[$length] - $offset;
    }

    $input = array_slice($input, 0, $offset, TRUE)
        + $replacement
        + array_slice($input, $offset + $length, NULL, TRUE);
}

/**
 * Added from v4.1.1
 * WPDM add-on installer
 */
function wpdm_install_addon(){
    if(isset($_REQUEST['addon']) && current_user_can(WPDM_ADMIN_CAP)){
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $upgrader = new Plugin_Upgrader( new Plugin_Installer_Skin( compact('title', 'url', 'nonce', 'plugin', 'api') ) );
        if(strpos($_REQUEST['addon'], '.zip'))
            $downloadlink = $_REQUEST['addon'];
        else
            $downloadlink = 'http://www.wpdownloadmanager.com/?wpdmdl='.$_REQUEST['addon'];
        $upgrader->install($downloadlink);
        die();
    } else {
        die("Only site admin is authorized to install add-on");
    }
}

/**
 * @usage Active premium package add-on / shopping cart
 */
function wpdm_activate_shop(){
    if( current_user_can(WPDM_ADMIN_CAP)){
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $upgrader = new Plugin_Upgrader( new Plugin_Installer_Skin( compact('title', 'url', 'nonce', 'plugin', 'api') ) );
        $downloadlink = 'http://www.wpdownloadmanager.com/?wpdmdl=15671';
        ob_start();
        echo "<div id='acto'>";
        if(file_exists(dirname(dirname(__FILE__)).'/wpdm-premium-packages/'))
            $upgrader->upgrade($downloadlink);
        else
            $upgrader->install($downloadlink);
        echo '</div><style>#acto .wrap { display: none; }</style>';
        $data = ob_get_clean();
        if(file_exists(dirname(WPDM_BASE_DIR).'/wpdm-premium-packages/wpdm-premium-packages.php')) {
            activate_plugin('wpdm-premium-packages/wpdm-premium-packages.php');
            echo "Congratulation! Your Digital Store is Activated. <a href='' class='btn btn-warning'>Refresh The Page!</a>";
        } else
            echo "Automatic Installation Failed! Please <a href='http://www.wpdownloadmanager.com/?wpdmdl=15671' target='_blank' class='btn btn-warning'>Download</a> and install manually";
        die();
    } else {
        die("Only site admin is authorized to install add-on");
    }
}


/**
 * @param $pid
 * @param $w
 * @param $h
 * @param bool $echo
 * @return string
 * @usage Generates thumbnail html from PDF file attached with a Package. [ From v4.1.3 ]
 */
function wpdm_pdf_preview($pid, $w, $h, $echo = true){

    $post = get_post($pid);
    $files = get_post_meta($pid, '__wpdm_files', true);
    $pdf = $files[0];
    $ext = explode(".", $pdf);
    $ext = end($ext);

    $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($pid), 'full');
    $preview = $thumb['0'];

    if($ext=='pdf')
        $pdf_thumb =  wpdm_pdf_thumbnail($pdf, $pid);
    else $pdf_thumb = $preview;

    $imsrc  = wpdm_dynamic_thumb($pdf_thumb, array($w, $h));

    if(!$echo)
        return "<img src='{$imsrc}' alt='{$post->post_title}'/>";

    echo "<img src='{$imsrc}' alt='{$post->post_title}'/>";

}

/**
 * @param $pdf
 * @param $id
 * @return string
 * @usage Generates thumbnail from PDF file. [ From v4.1.3 ]
 */
function wpdm_pdf_thumbnail($pdf, $id){
    return \WPDM\FileSystem::pdfThumbnail($pdf, $id);
}

/**
 * @usage Show admin notices
 */
function wpdm_admin_notices() {
    global $wp_query;
    if(get_post_type()=='wpdmpro' && isset($wp_query->query_vars['posts_per_page'])){
        ?>
        <div class="updated" style="border: 2px solid #ffffff !important;border-radius: 0;">
            <p>
                <strong>Download Manager Pro!</strong><br/>
                <i><a href="http://www.wpdownloadmanager.com/?affid=admin&amp;domain=localhost" target="_blank">Get Download Manager Pro Version Now! </a></i>
                <a style="float:right;margin-top: -23px;margin-right: -6px;border: 0 none;border-radius: 0;box-shadow: none;text-shadow: none !important;font-weight: bold" class="button button-primary button-hero" href="http://www.wpdownloadmanager.com/?affid=admin&amp;domain=localhost#features" target="_blank">Checkout The Features Here &rarr;</a>
            </p>
        </div>
        <?php
    }
}



/**
 * @usage Show Login Form
 */
function wpdm_login_form($params = array()){
    if(is_array($params))
    extract($params);
    if(!isset($redirect)) $redirect = get_permalink(get_option('__wpdm_user_dashboard'));
    ob_start();
    //echo "<div class='w3eden'>";
    include(WPDM_BASE_DIR . 'tpls/wpdm-be-member.php');
    //echo "</div>";
    return ob_get_clean();
}


function wpdm_user_logged_in($msg){
    echo $msg;
}



/**
 * @usage Returns download manager template file path
 * @param $file
 * @param string $tpldir
 * @return string
 */
function wpdm_tpl_path($file, $tpldir = ''){
    if(file_exists(get_stylesheet_directory().'/download-manager/'.$file)) 
        $path = get_stylesheet_directory().'/download-manager/'.$file;
    else if(file_exists(get_template_directory().'/download-manager/'.$file))
        $path = get_template_directory().'/download-manager/'.$file;
    else if($tpldir !='' && file_exists($tpldir.'/'.$file))
        $path = $tpldir.'/'.$file;
    else if($tpldir !='' && file_exists(get_template_directory().'/download-manager/'.$tpldir.'/'.$file))
        $path = get_template_directory().'/download-manager/'.$tpldir.'/'.$file;
    else $path = WPDM_BASE_DIR.'tpls/'.$file;

    return $path;

}


/*** developer fns **/
if(!function_exists('dd')) {
    function dd($data)
    {
        echo "<pre>" . print_r($data, 1) . "</pre>";
        die();
    }
}
if(!function_exists('precho')) {
    function precho($data)
    {
        echo "<pre>" . print_r($data, 1) . "</pre>";
    }
}
/*** developer fns **/

