<?php global $current_user; ?>
<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
<style type="text/css">
    .w3eden.user-dashboard{
        font-family: 'Varela Round', sans-serif;
        font-size: 13px;
    }
    .w3eden.user-dashboard .panel{
        font-size: 10pt;
    }
    .w3eden div.list-group .list-group-item:first-child{
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .w3eden .list-group-item:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        margin-bottom: 0;
    }
    .w3eden .list-group-item{
        border-top: 1px solid #dddddd !important;
    }
    .w3eden .list-group-item .avatar{
        border: 0;
        padding: 0;
        margin: 5px 0 3px;
        border-radius: 2px;
        width: 100%;
        height: auto;
    }
    .w3eden .panel.dashboard-panel{
        border-radius: 3px;
        border-color: #dddddd;
    }
    .w3eden .panel.dashboard-panel .panel-heading{
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        background: transparent;
        border-color: #dddddd;
    }
    .w3eden .panel.dashboard-panel .panel-footer{
        background: rgba(0,0,0,0.03) !important;
        border-top: 1px solid #eeeeee;
    }
    .w3eden.user-dashboard .pagination{
        padding: 0;
    }
    .w3eden .panel.dashboard-panel h3{
        font-family: Montserrat, serif;
        margin: 0;
        padding: 0;
        font-size: 14pt;
        font-weight: 800;
    }
    .w3eden .panel.dashboard-panel h3.popover-title{
        padding: 10px;
        font-size: 9pt;
        font-weight: 400;
        background: #f8f8f8;
    }
    #cppo{
        margin-right: -2px !important;
        margin-top: -3px !important;
    }
    .popover-content .form-control{
        font-family: Courier, monospace;
        font-size: 14pt;
        font-weight: bold;
        margin: 10px 0;
        text-align: center;
    }
    .panel-body .panel-row{
        margin-top: 10px;margin-bottom: 10px !important;display: inline-table;
    }
    .w3eden.user-dashboard .table th,.w3eden.user-dashboard .table td{
        font-size: 9pt;
        vertical-align: middle;
    }
    .w3eden.user-dashboard th{
        background: #f5f5f5;
        border-bottom-width: 1px;
    }
    .card{
        border-radius: 3px;
        overflow: hidden;
    }
    .card img{
        border-radius: 0;
        width: 100%;
    }
    .card .card-body{
        display: table;
    }
    .card .card-footer:hover{
        color: #ffffff !important;
    }
    .w3eden.user-dashboard .card .card-footer{
        background: #1abc9c;
        color: #ffffff !important;
        font-size: 9pt;
        display: block;
        float: left;
        margin-top: -4px;
        width: 100%;
        height: 35px;
        line-height: 35px;
        position: relative;
        text-align: center;
    }
    .card .card-footer:after{
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 0 10px 10px;
        border-color: #1abc9c transparent;
        display: block;
        width: 0;
        z-index: 1;
        margin-left: -10px;
        top: -10px;
        left: 50%;
    }
    .w3eden.user-dashboard #edit-profile-form .col-md-6{
        padding-bottom: 10px;
    }
    .w3eden.user-dashboard label{
        font-size: 10pt;
        color: #777;
    }
    .w3eden.user-dashboard input.form-control{
        padding: 0 15px;
        height: 36px;
        line-height: 40px;
    }
    .w3eden.user-dashboard #edit-profile-form label .fa-star.text-danger{
        float: right;
        color: rgba(179, 0, 0, 0.77);
        font-size: 10px;
    }
    .w3eden.user-dashboard #edit-profile-form label{
        display: block;
    }
    .w3eden.user-dashboard .popover{
        max-width: 800px !important;
        width: 320px;
    }
    .w3eden #wpdm-dashboard-sidebar .list-group-item{
        color: #555555;
    }
    .w3eden #wpdm-dashboard-sidebar .list-group-item.selected{
        background: transparent !important;
        color: #19ad8e;
    }

</style>
<div class="w3eden user-dashboard">
    <div class="row">
        <div class="col-md-3" id="wpdm-dashboard-sidebar">
            <div class="list-group">
                <div class="list-group-item">
                    <?php echo get_avatar( $current_user->user_email, 512 ); ?>
                </div>
                <?php foreach($this->dashboard_menu as $page_id => $menu_item){
                    $menu_url = get_permalink(get_the_ID()).$page_id.($page_id!=''?'/':'');
                    if(isset($params['flaturl']) && $params['flaturl'] == 0 && $page_id != '')
                        $menu_url = get_permalink(get_the_ID()).'?udb_page='.$page_id;
                    ?>
                    <a class="list-group-item <?php echo $udb_page == $page_id?'selected':'';?>" href="<?php echo $menu_url; ?>"><?php echo $menu_item['name']; ?></a>
                <?php } ?>

            </div>

            <?php do_action("wpdm_user_dashboard_sidebar") ?>

        </div>
        <div class="col-md-9" id="wpdm-dashboard-contents">


            <?php echo $dashboard_contents; ?>


        </div>





    </div>
</div>
<script>
    jQuery(function($){
        var fullwidth = 0;
        $('body').on('click','#btn-fullwidth', function(){
            fullwidth = fullwidth == 0?1:0;
                $('#wpdm-dashboard-sidebar').toggle();
            $('#wpdm-dashboard-contents').toggleClass('col-md-8','col-md-12');
        });
    });
</script>


 