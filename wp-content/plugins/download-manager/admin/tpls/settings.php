
<div class="wrap w3eden">

<div style="clear: both;"></div>
    <form method="post" id="wdm_settings_form">
 <div class="panel panel-primary" id="wpdm-wrapper-panel-settings">
     <div class="panel-heading"><button type="submit" class="btn btn-primary pull-right"><i class="sinc fa fa-save"></i> &nbsp; <?php _e("Save Settings","wpdmpro"); ?></button><h3 class="h">&nbsp;&nbsp;<?php _e("Download Manager Settings","wpdmpro"); ?> <div class="pull-left wpdm-loading" id="wdms_loading"></div></h3>

     </div>
     <div class="panel-heading" style="background: #f5f5f5 !important;border: 0;border-radius: 0;border-bottom: 1px solid #eeeeee">
         <div id="msgst" onclick="jQuery(this).html('');" class="pull-right text-success" style="font-weight: normal;font-style: italic"></div>
         <a class="text-success" href='https://wordpress.org/support/view/plugin-reviews/download-manager?rate=5#postform' title="Please consider it when you get some free moments" target="_blank">A <span class="ttip" title="5 Stars"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> rating will inspire me a lot. Thanks for your time &#128522;</a>
     </div>
<div class="panel-body settings-panel-body">
<div class="container-fluid">
<div class="row"><div class="col-md-3">
     <ul id="tabs" class="nav nav-pills nav-stacked settings-tabs">
         <?php \WPDM\admin\menus\Settings::renderMenu($tab=isset($_GET['tab'])?esc_attr($_GET['tab']):'basic'); ?>
     </ul>

        </div><div class="col-md-9">
     <div class="tab-content">
<div onclick="jQuery(this).slideUp();" class="alert alert-info" style="display: none" id="message"></div>

<input type="hidden" name="task" id="task" value="wdm_save_settings" />
<input type="hidden" name="action" id="action" value="wdm_settings" />
<input type="hidden" name="section" id="section" value="<?php echo (isset($_REQUEST['tab']))?esc_attr($_REQUEST['tab']):'basic'; ?>" />
<div id="fm_settings">
<?php
global $stabs;
call_user_func($stabs[$tab]['callback']); ?>
</div> <br>
<br>

         <button type="submit" class="btn btn-primary"><i class="sinc fa fa-save"></i> &nbsp; <?php _e("Save Settings","wpdmpro"); ?></button>

<br>
 
</div>
    </div>

</div>
</div>
</div>

 </div>

    </form>

<script type="text/javascript">
jQuery(document).ready(function(){
    jQuery('select').chosen();
    jQuery("ul#tabs li").click(function() {

    });
    jQuery('#message').removeClass('hide').hide();
    jQuery("ul#tabs li a").click(function() {
        jQuery('#msgst').html('');
        ///jQuert("ul#tabs li").removeClass('active')
        jQuery("ul#tabs li").removeClass("active");
        jQuery(this).parent('li').addClass('active');
        jQuery('#wdms_loading').addClass('wpdm-spin');
        jQuery(this).append('<span class="wpdm-loading wpdm-spin pull-right" id="wpdm-lsp"></span>')
        var section = this.id;
        jQuery.post(ajaxurl,{action:'wdm_settings',section:this.id},function(res){
            jQuery('#fm_settings').html(res);
            jQuery('#section').val(section)
            jQuery('#wdms_loading').removeClass('wpdm-spin');
            jQuery('select').chosen();
            window.history.pushState({"html":res,"pageTitle":"response.pageTitle"},"", "edit.php?post_type=wpdmpro&page=settings&tab="+section);
            jQuery('#wpdm-lsp').fadeOut(function(){
                jQuery(this).remove();
            });
        });
        return false;
    });
    
    window.onpopstate = function(e){
    if(e.state){
        jQuery("#fm_settings").html(e.state.html);
        //document.title = e.state.pageTitle;
    }
    };
    
    <?php /* if(isset($_GET['tab'])&&$_GET['tab']!=''){ ?>
        jQuery("ul#tabs li").removeClass("active");
        jQuery('#wdms_loading').addClass('wpdm-spin');
        jQuery('#<?php echo esc_attr($_GET['tab']); ?>').parents().addClass("active");
        var section = '<?php echo esc_attr($_GET['tab']);?>';
        jQuery.post(ajaxurl,{action:'wdm_settings',section:section},function(res){
            jQuery('#fm_settings').html(res);
            jQuery('#section').val(section)
            jQuery('#wdms_loading').removeClass('wpdm-spin');
        });
    <?php } */ ?>
    
    jQuery('#wdm_settings_form').submit(function(){

        jQuery('.sinc').removeClass('fa-save').addClass('fa-spinner fa-spin');

       jQuery(this).ajaxSubmit({
        url:ajaxurl,
        beforeSubmit: function(formData, jqForm, options){
          jQuery('.wpdm-ssb').addClass('wpdm-spin');
          jQuery('#wdms_loading').addClass('wpdm-spin');
        },
        success: function(responseText, statusText, xhr, $form){
          //jQuery('#message').html("<p>"+responseText+"</p>").slideDown();
          jQuery('#msgst').html('<i class="fa fa-check-circle"></i> '+responseText).slideDown();
          //setTimeout("jQuery('#message').slideUp()",4000);
          jQuery('.wpdm-ssb').removeClass('wpdm-spin');
          jQuery('.sinc').removeClass('fa-spinner fa-spin').addClass('fa-save');
          jQuery('#wdms_loading').removeClass('wpdm-spin');
        }   
       });
        
       return false; 
    });

    jQuery('body').on("click",'.nav-tabs a', function (e) {
        e.preventDefault();
        jQuery(this).tab('show');
    });



});
 
</script>

