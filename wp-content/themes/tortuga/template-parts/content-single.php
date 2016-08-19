<?php
/**
 * The template for displaying single posts
 *
 * @package Tortuga
 */
?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
		<?php tortuga_post_image_single(); ?>
		
		<header class="entry-header">
			
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			
			<?php tortuga_entry_meta(); ?>

		</header><!-- .entry-header -->

		<div class="entry-content clearfix">
			<h3> Images/Video</h3>
			<hr>
			<?php the_content(); ?>
			<!-- <?php trackback_rdf(); ?> -->
			<div class="page-links"><?php wp_link_pages(); ?></div>
		</div><!-- .entry-content -->
		
		<footer class="entry-footer">
			
			<?php tortuga_entry_tags(); ?>
			<?php tortuga_post_navigation(); ?>
			
		</footer><!-- .entry-footer -->

	</article>