<?php

class WPDM_Messages {
    public static function Message($msg, $die = 0){
        if(is_array($msg))
            $message = "<div class='w3eden'><div class='alert alert-{$msg['type']}'><strong>{$msg['title']}</strong><br/>{$msg['message']}</div></div>";
        else
            $message = $msg;
        if($die==-1) return $message;
        echo $message;
        if($die==1) die();
        return true;
    }

    public static function Error($msg, $die = 0){
        if(!is_array($msg)) {
            $message = $msg;
            $msg = array();
            $msg['message'] = $message;
        }
        if(!isset($msg['title'])) $msg['title'] = 'Error!';
        $msg['type'] = 'danger';
        $msg['icon'] = 'exclamation-triangle';
        return self::Message($msg, $die);
    }

    public static function Warning($msg, $die = 0){
        if(!is_array($msg)) {
            $message = $msg;
            $msg = array();
            $msg['message'] = $message;
        }
        if(!isset($msg['title'])) $msg['title'] = 'Warning!';
        $msg['type'] = 'warning';
        $msg['icon'] = 'exclamation-circle';
        return self::Message($msg, $die);
    }

    public static function Info($msg, $die = 0){
        if(!is_array($msg)) {
            $message = $msg;
            $msg = array();
            $msg['message'] = $message;
        }
        if(!isset($msg['title'])) $msg['title'] = 'Attention!';
        $msg['type'] = 'info';
        $msg['icon'] = 'info-circle';
        return self::Message($msg, $die);
    }

    public static function Success($msg, $die = 0){
        if(!is_array($msg)) {
            $message = $msg;
            $msg = array();
            $msg['message'] = $message;
        }
        if(!isset($msg['title'])) $msg['title'] = 'Awesome!';
        $msg['type'] = 'success';
        $msg['icon'] = 'check-circle';
        return self::Message($msg, $die);
    }
} 