<header id="header" class="sticky-header 
<?php
$evolve_width_layout = evolve_get_option('evl_width_layout', 'fixed');
if ($evolve_width_layout == "fixed") {
    echo "container row";
}
?>">
    <div class="container">
             <?php
             $evolve_pos_logo = evolve_get_option('evl_pos_logo', 'left');
             if ($evolve_pos_logo == "disable") {
                 ?>
             <?php } else { ?>
                 <?php
                 $evolve_header_logo = evolve_get_option('evl_header_logo', '');
                 if ($evolve_header_logo) {
                     echo "<a class='logo-url' href=" . home_url() . "><img id='logo-image' src=" . $evolve_header_logo . " /></a>";
                 }
                 ?>
             <?php } ?>
             <?php
             $evolve_blog_title = evolve_get_option('evl_blog_title', '0');
             if ($evolve_blog_title == "0") {
                 ?>
            <div id="sticky-logo"><a class='logo-url-text' href="<?php echo home_url(); ?>"><?php bloginfo('name') ?></a></div>
        <?php } ?>
        <nav class="nav nav-holder link-effect">
            <?php wp_nav_menu(array('theme_location' => 'primary-menu', 'menu_class' => 'nav-menu', 'fallback_cb' => 'evolve_link_to_menu_editor', 'walker' => new evolve_Walker_Nav_Menu())); ?>
        </nav>
    </div>
</header>