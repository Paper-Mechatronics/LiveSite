<?php

class WPDM_Stats{
    
    function __construct(){
        
    }
    
    function NewStat($pid, $uid, $oid){
        global $wpdb, $current_user;
        if(isset($_SESSION['downloaded_'.$pid])) return;
        $ip = $_SERVER['REMOTE_ADDR'];
        $wpdb->insert("{$wpdb->prefix}ahm_download_stats",array('pid'=>(int)$pid, 'uid'=>(int)$uid,'oid'=>$oid, 'year'=> date("Y"), 'month'=> date("m"), 'day'=> date("d"), 'timestamp'=> time(),'ip'=>$ip));
        update_post_meta($pid, '__wpdm_download_count',intval(get_post_meta($pid, '__wpdm_download_count', true))+1);
        if($oid!=''){
            $order = new Order();
            $order->Update(array('download'=>1), $oid);
        }

        $udl = maybe_unserialize(get_post_meta($pid, "__wpdmx_user_download_count", true));
        if (is_user_logged_in()) {
            $index = $current_user->ID;
        }
        else {
            $index = $_SERVER['REMOTE_ADDR'];
        }
        $udl[$index] = isset($udl[$index])?$udl[$index]+1:1;
        update_post_meta($pid, '__wpdmx_user_download_count', $udl);
        $_SESSION['downloaded_'.$pid] = $ip;
    }

    
    
}