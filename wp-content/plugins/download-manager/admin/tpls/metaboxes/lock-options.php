<div id="lock-options"  class="tab-pane">
    <?php echo __('You can use one or more of following methods to lock your package download:','wpdmpro'); ?>
    <br/>
    <br/>
    <div class="wpdm-accordion w3eden">
        <!-- Password Lock -->
        <div class="panel panel-default">
        <h3 class="panel-heading"><label><input type="checkbox" class="wpdmlock" rel='password' name="file[password_lock]" <?php if(get_post_meta($post->ID,'__wpdm_password_lock', true)=='1') echo "checked=checked"; ?> value="1"><?php echo __('Enable Password Lock','wpdmpro'); ?></label></h3>
        <div  id="password" class="fwpdmlock panel-body" <?php if(get_post_meta($post->ID,'__wpdm_password_lock', true)!='1') echo "style='display:none'"; ?> >

            <label for="pps_z"><?php echo __('Password:','wpdmpro'); ?></label>

                        <input class="form-control" type="text" name="file[password]" id="pps_z" value="<?php echo get_post_meta($post->ID,'__wpdm_password', true); ?>" />


        </div>
        </div>


        <!-- Captcha Lock -->
        <div class="panel panel-default">
            <h3 class="panel-heading"><label><input type="checkbox" rel="captcha" class="wpdmlock" name="file[captcha_lock]" <?php if(get_post_meta($post->ID,'__wpdm_captcha_lock', true)=='1') echo "checked=checked"; ?> value="1"><?php echo __('Enable Captcha Lock','wpdmpro'); ?></label></h3>
            <div id="captcha" class="frm fwpdmlock panel-body"  <?php if(get_post_meta($post->ID,'__wpdm_captcha_lock', true)!='1') echo "style='display:none'"; ?> >

                <a href="edit.php?post_type=wpdmpro&page=settings"><?php if(!get_option('_wpdm_recaptcha_site_key') || !get_option('_wpdm_recaptcha_secret_key')) _e('Please configure reCAPTCHA', 'wpdmpro'); ?></a>
                <?php _e('Users will be asked for reCAPTCHA verification before download.','wpdmpro'); ?>

            </div>
        </div>



        <?php do_action('wpdm_download_lock_option',$post); ?>
    </div>
    <div class="clear"></div>
</div>