<?php

    if(!isset($redirect)) $redirect = get_permalink(get_the_ID());
    $redirect = isset($_GET['redirect_to']) ? $_GET['redirect_to'] : $redirect;
    $nologo = 1;
    $log_redirect =  $_SERVER['REQUEST_URI'];
    if(isset($params['redirect'])) $log_redirect = esc_url($params['redirect']);
    if(isset($_GET['redirect_to'])) $log_redirect = esc_url($_GET['redirect_to']);
?>



<div class="w3eden be-member">



        <div  style="width: 450px;max-width: 98%;margin: 50px auto">
            <?php if(isset($params['logo']) && $params['logo'] != ''){ ?>
                <div class="text-center wpdmlogin-logo">
                    <img src="<?php echo $params['logo'];?>" /><br/><br/>
                </div>
            <?php } ?>
            <div class="btn-group btn-group-justified" id="be-member-btns">
                <a href="#wpdmlogin" data-toggle="tab" class="btn btn-info btn-lg active"><?php _e('Log In','wpdmpro'); ?></a>
                <a href="#wpdmregister" data-toggle="tab" class="btn btn-info btn-lg"><?php _e('Register','wpdmpro'); ?></a>
            </div>
            <div class="tab-content">
            <div class="tab-pane active" id="wpdmlogin">
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

                    <form name="loginform" id="loginform" action="" method="post" class="login-form" style="margin: 0">

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

                                <p class="login-remember"><label><input name="rememberme" type="checkbox" id="rememberme" value="forever" /> <?php _e('Remember Me','wpdmpro'); ?></label></p>
                                <p class="login-submit">
                                    <button type="submit" name="wp-submit" id="loginform-submit" class="btn btn-primary btn-block btn-lg"><i class="fa fa-key"></i>  Log In</button>
                                    <input type="hidden" name="redirect_to" value="<?php echo isset($redirect)?$redirect:$_SERVER['REQUEST_URI']; ?>" />

                                </p>

                                <?php _e('Forgot Password?','wpdmpro'); ?> <a href="<?php echo site_url('/wp-login.php?action=lostpassword'); ?>"><?php _e('Request New Password.','wpdmpro'); ?></a>

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
            <div class="tab-pane" id="wpdmregister">
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
                <?php include("wpdm-reg-form.php"); ?></div>
            </div>
        </div>




<?php if(isset($_REQUEST['reseted'])): ?>
<div class="row">
<div class="col-md-12">
<div class="alert alert-success"><?php echo $_COOKIE['global_success'];?></div>
</div>
</div>
<?php unset($_COOKIE['global_success']); endif; ?>

</div>

<style>
    .w3eden .input-group .input-group-addon .fa{
        width: 18px;
        text-align: center;
    }
    .w3eden .input-group .input-group-addon{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .w3eden.be-member .form-control{
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        font-size: 10pt;
    }
    .tab-content{
        padding: 0;
        border: 0;
        border-top: 0;
        margin-top: 25px;
    }
    .w3eden.be-member .btn-info{
        color: rgba(255,255,255,0.7) !important;
    }
    .w3eden.be-member .btn-info.active{
        color: #ffffff !important;
    }
    .w3eden.be-member .btn-info.active:after
    {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 10px 10px 0;
        border-color: #35ADF5 transparent;
        display: block;
        width: 0;
        z-index: 1;
        margin-left: -10px;
        bottom: -10px;
        left: 50%;
    }
    .w3eden .btn-info.active, .w3eden .btn-info.focus, .w3eden .btn-info:active, .w3eden .btn-info:focus, .w3eden .btn-info:hover, .w3eden .open > .dropdown-toggle.btn-info{
        background: #35ADF5 !important;
        box-shadow: none;
        outline: none !important;
    }
    .w3eden.be-member .tab-content{
        padding: 10px 0 0 0;
        border: 0;
        background: transparent !important;
    }
</style>
<script>
    jQuery(function($){
        $('#be-member-btns .btn').on('click', function(){
            $('#be-member-btns .btn').removeClass('active');
            $(this).addClass('active');
        });
    });
</script>