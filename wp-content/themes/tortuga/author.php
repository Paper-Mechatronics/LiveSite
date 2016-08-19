<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Tortuga
 */
 
get_header(); 

// Get Theme Options from Database
$theme_options = tortuga_theme_options();
?>
	
	<section id="primary" class="content-archive content-area">
        <?php
        if(isset($_GET['author_name'])) :
        $curauth = get_userdatabylogin($author_name);
        else :
        $curauth = get_userdata(intval($author));
        endif;
        ?>
		<main id="main" class="site-main" role="main">
		
		<?php if ( have_posts() ) : ?>
		
			<header class="page-header">
                <?php $user_id = get_current_user_id();?>
                
                <?php echo get_avatar( $curauth->id,256); ?> 
				
				<h2 class = "archive-title"><?php echo $curauth->nickname; ?></h2>
                <dl>
                <dt>Website</dt>
                <dd><a href="<?php echo $curauth->user_url; ?>"><?php echo $curauth->user_url; ?></a></dd>
                <dt>Profile</dt>
                <dd><?php echo $curauth->user_description; ?></dd>
                </dl>
			
			</header><!-- .page-header -->
			
			<div id="homepage-posts" class="post-wrapper clearfix">
					
				<?php while (have_posts()) : the_post();
			
					get_template_part( 'template-parts/content' );
			
				endwhile; ?>
			
			</div>
			
			<?php tortuga_pagination(); ?>

		<?php endif; ?>
			
		</main><!-- #main -->
	</section><!-- #primary -->

	<?php // Do not display Sidebar on Three Column Post Layout
	if ( $theme_options['post_layout'] <> 'three-columns' ) :
		
		get_sidebar(); 
		
	endif; ?>

<?php get_footer(); ?>


    