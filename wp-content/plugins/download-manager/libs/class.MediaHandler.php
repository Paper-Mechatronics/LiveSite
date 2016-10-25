<?php

class WPDM_MediaHandler {

    function __construct(){

        add_action('init', array($this, 'PlayAudio'));

    }

    function PlayAudio(){
        if(isset($_REQUEST['wpdm_play_audio']))
            $url = WPDM_Crypt::Decrypt($_REQUEST['wpdm_play_audio']);
            echo do_shortcode('[audio');
        die();
    }




} 