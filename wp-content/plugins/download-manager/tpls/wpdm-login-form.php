<?php

if(!isset($redirect)) $redirect = get_permalink(get_the_ID());
$redirect = isset($_GET['redirect_to']) ? $_GET['redirect_to'] : $redirect;
$regurl = get_option('__wpdm_register_url');
if($regurl > 0)
    $regurl = get_permalink($regurl);
$log_redirect =  $_SERVER['REQUEST_URI'];
if(isset($params['redirect'])) $log_redirect = esc_url($params['redirect']);
if(isset($_GET['redirect_to'])) $log_redirect = esc_url($_GET['redirect_to']);
?>
<div class="w3eden" id="wpdmlogin">
<?php if(isset($params['logo']) && $params['logo'] != ''){ ?>
    <div class="text-center wpdmlogin-logo">
        <img src="<?php echo $params['logo'];?>" />
    </div>
<?php } ?>

    <?php if(isset($_SESSION['reg_warning'])&&$_SESSION['reg_warning']!=''): ?>  <br>

        <div class="alert alert-warning" align="center" style="font-size:10pt;">
            <?php echo $_SESSION['reg_warning']; unset($_SESSION['reg_warning']); ?>
        </div>

    <?php endif; ?>

    <?php if(isset($_SESSION['sccs_msg'])&&$_SESSION['sccs_msg']!=''): ?><br>

        <div class="alert alert-success" align="center" style="font-size:10pt;">
            <?php echo $_SESSION['sccs_msg'];  unset($_SESSION['sccs_msg']); ?>
        </div>

    <?php endif; ?>
    <?php if(is_user_logged_in()){

        do_action("wpdm_user_logged_in","<div class='alert alert-success'>".__("You are already logged in.","wpdmpro")."<br style='clear:both;display:block;margin-top:5px'/> <a class='btn btn-xs btn-primary' href='".get_permalink(get_option('__wpdm_user_dashboard'))."'>".__("Go To Dashboard","wpdmpro")."</a>  <a class='btn btn-xs btn-danger' href='".wp_logout_url()."'>".__("Logout","wpdmpro")."</a></div>");

    } else {


        ?>

        <form name="loginform" id="loginform" action="" method="post" class="login-form" >

            <input type="hidden" name="permalink" value="<?php the_permalink(); ?>" />

            <?php global $wp_query; if(isset($_SESSION['login_error'])&&$_SESSION['login_error']!='') {  ?>
                <div class="error alert alert-danger" >
                    <b><?php _e('Login Failed!','wpdmpro'); ?></b><br/>
                    <?php echo preg_replace("/<a.*?<\/a>\?/i","",$_SESSION['login_error']); $_SESSION['login_error']=''; ?>
                </div>
            <?php } ?>
            <div class="form-group">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-user"></i></span>
                    <input placeholder="<?php _e('Username','wpdmpro'); ?>" type="text" name="wpdm_login[log]" id="user_login" class="form-control input-lg required text" value="" size="20" tabindex="38" />
                </div>
            </div>
            <div class="form-group">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-key"></i></span>
                    <input type="password" placeholder="<?php _e('Password','wpdmpro'); ?>" name="wpdm_login[pwd]" id="user_pass" class="form-control input-lg required password" value="" size="20" tabindex="39" />
                </div>
            </div>

            <?php do_action("wpdm_login_form"); ?>
            <?php do_action("login_form"); ?>

            <div class="row" style="margin-bottom: 10px">
                <div class="col-md-6"><label class="eden-checkbox"><input name="rememberme" type="checkbox" id="rememberme" value="forever" /><span><i class="fa fa-check"></i></span> <?php _e('Remember Me','wpdmpro'); ?></label></div>
                <div class="col-md-6"><small class="pull-right"><?php _e('Forgot Password?','wpdmpro'); ?> <a href="<?php echo site_url('/wp-login.php?action=lostpassword'); ?>"><?php _e('Request Reset','wpdmpro'); ?></a></small></div>
            </div>
            <div class="row">
                <div class="col-md-<?php echo ($regurl != '')?7:12; ?>"><button type="submit" name="wp-submit" id="loginform-submit" class="btn btn-block btn-primary btn-lg"><i class="fa fa-key"></i> &nbsp; <?php _e('Login','wpdmpro'); ?></button></div>
                <?php if($regurl != ''){ ?>
                <div class="col-md-5"><a href="<?php echo $regurl; ?>" name="wp-submit" id="loginform-submit" class="btn btn-block btn-default btn-lg"><i class="fa fa-user-plus"></i> &nbsp; <?php _e('Register','wpdmpro'); ?></a></div>
                <?php } ?>
            </div>

            <input type="hidden" name="redirect_to" value="<?php echo isset($redirect)?$redirect:$_SERVER['REQUEST_URI']; ?>" />



        </form>


        <script>
            jQuery(function ($) {
                var llbl = $('#loginform-submit').html();
                $('#loginform').submit(function () {
                    $('#loginform-submit').html("<i class='fa fa-spin fa-spinner'></i> Logging In...");
                    $(this).ajaxSubmit({
                        success: function (res) {
                            if (!res.match(/success/)) {
                                $('form .alert-danger').hide();
                                $('#loginform').prepend("<div class='alert alert-danger'><b>Error!</b><br/>Login failed! Please re-check login info.</div>");
                                $('#loginform-submit').html(llbl);
                            } else {
                                location.href = "<?php echo $log_redirect; ?>";
                            }
                        }
                    });
                    return false;
                });

                $('body').on('click', 'form .alert-danger', function(){
                    $(this).slideUp();
                });

            });
        </script>

    <?php } ?></div>

