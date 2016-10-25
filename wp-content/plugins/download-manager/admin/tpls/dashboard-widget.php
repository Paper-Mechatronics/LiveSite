<?php
global $wpdb;
echo "<img style='max-width:100%;margin-bottom:10px' src='" . plugins_url('/download-manager/assets/images/wpdm-logo.png') . "' />";
?>




<div class="w3eden">

            <iframe src="//cdn.wpdownloadmanager.com/notice.php?wpdmvarsion=<?php echo WPDM_Version; ?>&origin=<?php echo (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on'?'https://':'http://').$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>" style="height: 350px;width:100%;border:0px"></iframe>

</div>