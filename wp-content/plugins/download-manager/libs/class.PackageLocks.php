<?php

namespace WPDM;

global $gp1c, $tbc;


class PackageLocks
{

    public function __construct(){
        global $post;
        //if(has_shortcode($post->post_content, "[wpdm_package]"))
        add_action('wp_enqueue_scripts', array($this, 'Enqueue'));
    }

    function Enqueue(){
       // wp_enqueue_script('wpdm-fb', 'http://connect.facebook.net/en_US/all.js?ver=3.1.3#xfbml=1');
    }


    public static function AskPassword($package){
        ob_start();
        $unqid = uniqid();
        ?>

        <div class="panel panel-default">
            <div class="panel-heading">
                <?php _e('Enter Correct Password to Download','wpdmpro'); ?>
            </div>
            <div class="panel-body" id="wpdmdlp_<?php echo  $unqid . '_' . $package['ID']; ?>">
                <div id="msg_<?php echo $package['ID']; ?>" style="display:none;"><?php _e('Processing...','wpdmpro'); ?></div>
                <form id="wpdmdlf_<?php echo $unqid . '_' . $package['ID']; ?>" method=post action="<?php echo home_url('/'); ?>" style="margin-bottom:0px;">
                    <input type=hidden name="id" value="<?php echo $package['ID']; ?>" />
                    <input type=hidden name="dataType" value="json" />
                    <input type=hidden name="execute" value="wpdm_getlink" />
                    <input type=hidden name="action" value="wpdm_ajax_call" />
                    <div class="input-group">
                        <input type="password"  class="form-control" placeholder="<?php _e('Enter Password','wpdmpro'); ?>" size="10" id="password_<?php echo $unqid . '_' . $package['ID']; ?>" name="password" />
                        <span class="input-group-btn"><input id="wpdm_submit_<?php echo $unqid . '_' . $package['ID']; ?>" class="wpdm_submit btn btn-info" type="submit" value="<?php _e('Submit', 'wpdmpro'); ?>" /></span>
                    </div>

                </form>

                <script type="text/javascript">
                    jQuery("#wpdmdlf_<?php echo $unqid . '_' . $package['ID']; ?>").submit(function(){
                        var ctz = new Date().getMilliseconds();
                        jQuery("#msg_<?php echo  $package['ID']; ?>").html('<?php _e('Processing...','wpdmpro'); ?>').show();
                        jQuery("#wpdmdlf_<?php echo  $unqid . '_' . $package['ID']; ?>").hide();
                        jQuery(this).removeClass("wpdm_submit").addClass("wpdm_submit_wait");
                        jQuery(this).ajaxSubmit({
                            url: "<?php echo home_url('/?nocache='); ?>" + ctz,
                            success: function(res){

                                jQuery("#wpdmdlf_<?php echo  $unqid . '_' . $package['ID']; ?>").hide();
                                jQuery("#msg_<?php echo  $package['ID']; ?>").html("verifying...").css("cursor","pointer").show().click(function(){ jQuery(this).hide();jQuery("#wpdmdlf_<?php echo  $unqid . '_' . $package['ID']; ?>").show(); });
                                if(res.downloadurl!=""&&res.downloadurl!=undefined) {
                                    location.href=res.downloadurl;
                                    jQuery("#wpdmdlf_<?php echo  $unqid . '_' . $package['ID']; ?>").html("<a style='color:#ffffff !important' class='btn btn-success' href='"+res.downloadurl+"'><?php _e('Download','wpdmpro'); ?></a>");
                                    jQuery("#msg_<?php echo  $package['ID']; ?>").hide();
                                    jQuery("#wpdmdlf_<?php echo  $unqid . '_' . $package['ID']; ?>").show();
                                } else {
                                    jQuery("#msg_<?php echo $package['ID']; ?>").html(""+res.error+"");
                                }
                            }
                        });
                        return false;
                    });
                </script>
            </div>
        </div>

        <?php
        $data = ob_get_clean();
        return $data;
    }


    public static function reCaptchaLock($package, $buttononly = false){
        ob_start();
        //wp_enqueue_script('wpdm-recaptcha', 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit');
        $force = str_replace("=", "", base64_encode("unlocked|" . date("Ymdh")));
        ?>
        <script src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'></script>
        <div  id="reCaptchaLock_<?php echo $package['ID']; ?>"></div>
        <div id="msg_<?php echo $package['ID']; ?>"></div>
        <script type="text/javascript">
            var ctz = new Date().getMilliseconds();
            var siteurl = "<?php echo home_url('/?nocache='); ?>"+ctz,force="<?php echo $force; ?>";
            var verifyCallback_<?php echo $package['ID']; ?> = function(response) {
                jQuery.post(siteurl,{id:<?php echo $package['ID'];?>,dataType:'json',execute:'wpdm_getlink',force:force,social:'c',reCaptchaVerify:response,action:'wpdm_ajax_call'},function(res){
                    if(res.downloadurl!='' && res.downloadurl != undefined && res!= undefined ) {
                    location.href=res.downloadurl;
                    jQuery('#reCaptchaLock_<?php echo $package['ID']; ?>').html('<a href="'+res.downloadurl+'" class="wpdm-download-button btn btn-inverse btn-lg"><?php _e('Download', 'wpdmpro'); ?></a>');
                    } else {
                        jQuery('#msg_<?php echo $package['ID']; ?>').html(''+res.error);
                    }
                });
            };
            var widgetId2;
            var onloadCallback = function() {
                grecaptcha.render('reCaptchaLock_<?php echo $package['ID']; ?>', {
                    'sitekey' : '<?php echo get_option('_wpdm_recaptcha_site_key'); ?>',
                    'callback' : verifyCallback_<?php echo $package['ID']; ?>,
                    'theme' : 'light'
                });
            };
        </script>

        <?php
        return ob_get_clean();
    }



}
