<?php
/**
 * Template Name: Post Slider
 *
 * Description: A custom page template which displays the post slider and page content
 *
 * @package Tortuga
 */



get_header(); 

get_template_part( 'template-parts/content' );
?>

	<section id="primary" class="content-single content-area">
		<main id="main" class="site-main" role="main">
			
			<?php while (have_posts()) : the_post();

				get_template_part( 'template-parts/content', 'page' );
				
				comments_template();

				//get_template_part( 'template-parts/content' );
				

			endwhile; ?>
			
		
		</main><!-- #main -->
	</section><!-- #primary -->
	
	<?php get_sidebar(); ?>

<?php get_footer(); ?>


