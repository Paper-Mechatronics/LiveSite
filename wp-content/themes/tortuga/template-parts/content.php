<?php
/**
 * The template for displaying articles in the loop with post excerpts
 *
 * @package Tortuga
 */
?>
	
	<div class="post-column clearfix">
	
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			
			<a class = "img-link" href="<?php esc_url( the_permalink() ); ?>" rel="bookmark">
				<?php the_post_thumbnail(); ?>
			</a>
			
			<header class="entry-header">

				<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
				
				
			
			</header><!-- .entry-header -->

			<div class="entry-content entry-excerpt clearfix">
				
				<?php the_excerpt(); ?>

				
			</div><!-- .entry-content -->
			<div class="read-more"><?php /*tortuga_entry_meta();*/ ?><?php tortuga_more_link(); ?><?php /*if(function_exists('the_views')) { the_views(); }*/?></div>
			
			
		
		</article>
		
	</div>