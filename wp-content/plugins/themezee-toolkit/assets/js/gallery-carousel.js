/**
 * jQuery Gallery Carousel JS
 *
 * @package ThemeZee Toolkit
 */
jQuery(document).ready(function($) {

	// gallery faded layer and container elements
	var overlay, gallery, container, nextButton, previousButton, info, transitionBegin,
	caption, resizeTimeout, photo_info, close_hint, lastSelectedSlide,
	screenPadding = 110, originalOverflow = $('body').css('overflow'), originalHOverflow = $('html').css('overflow'), proportion = 85,
	last_known_location_hash = '', imageMeta, titleAndDescription, leftColWrapper;

	if ( window.innerWidth <= 760 ) {
		screenPadding = Math.round( ( window.innerWidth / 760 ) * 110 );

		if ( screenPadding < 40 && ( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch ) ) {
			screenPadding = 0;
		}
	}

	var keyListener = function(e){
		switch(e.which){
			case 38: // up
				e.preventDefault();
				container.scrollTop(container.scrollTop() - 100);
				break;
			case 40: // down
				e.preventDefault();
				container.scrollTop(container.scrollTop() + 100);
				break;
			case 39: // right
				e.preventDefault();
				gallery.tztk_carousel('next');
				break;
			case 37: // left
			case 8: // backspace
				e.preventDefault();
				gallery.tztk_carousel('previous');
				break;
			case 27: // escape
				e.preventDefault();
				container.tztk_carousel('close');
				break;
			default:
				// making jslint happy
				break;
		}
	};

	var resizeListener = function(/*e*/){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){
			gallery
				.tztk_carousel('slides')
				.tztk_carousel('fitSlide', true);
			gallery.tztk_carousel('updateSlidePositions', true);
			gallery.tztk_carousel('fitMeta', true);
		}, 200);
	};

	var prepareGallery = function( /*dataCarouselExtra*/ ){
		if (!overlay) {
			overlay = $('<div></div>')
				.addClass('tztk-carousel-overlay')
				.css({
					'position' : 'absolute',
					'top'      : 0,
					'right'    : 0,
					'bottom'   : 0,
					'left'     : 0
				});

			caption    = $('<h2></h2>');
			photo_info = $('<div class="tztk-carousel-photo-info"></div>').append(caption);

			imageMeta = $('<div></div>')
				.addClass('tztk-carousel-image-meta')
				.css({
					'float'      : 'right',
					'margin-top' : '20px',
					'width'      :  '250px'
				});

			imageMeta.append( '<a class=\'tztk-carousel-image-download\' style=\'display:none;\'></a>' );

			titleAndDescription = $('<div></div>')
				.addClass('tztk-carousel-titleanddesc')
				.css({
					'width'      : '100%',
					'margin-top' : imageMeta.css('margin-top')
				});

			var leftWidth = ( $(window).width() - ( screenPadding * 2 ) ) - (imageMeta.width() + 40);
			leftWidth += 'px';

			leftColWrapper = $('<div></div>')
				.addClass('tztk-carousel-left-column-wrapper')
				.css({
					'width' : Math.floor( leftWidth )
				})
				.append(titleAndDescription);

			var fadeaway = $('<div></div>')
				.addClass('tztk-carousel-fadeaway');

			info = $('<div></div>')
				.addClass('tztk-carousel-info')
				.css({
					'top'   : Math.floor( ($(window).height() / 100) * proportion ),
					'left'  : screenPadding,
					'right' : screenPadding
				})
				.append(photo_info)
				.append(imageMeta);

			if ( window.innerWidth <= 760 ) {
				photo_info.remove().insertAfter( titleAndDescription );
				info.prepend( leftColWrapper );
			}
			else {
				info.append( leftColWrapper );
			}

			var targetBottomPos = ( $(window).height() - parseInt( info.css('top'), 10 ) ) + 'px';

			nextButton = $('<div><span></span></div>')
				.addClass('tztk-carousel-next-button')
				.css({
					'right'    : '15px'
				});

			previousButton = $('<div><span></span></div>')
				.addClass('tztk-carousel-previous-button')
				.css({
					'left'     : 0
				});

			nextButton.add( previousButton ).css( {
				'position' : 'fixed',
				'top' : '40px',
				'bottom' : targetBottomPos,
				'width' : screenPadding
			} );

			gallery = $('<div></div>')
				.addClass('tztk-carousel')
				.css({
					'position' : 'absolute',
					'top'      : 0,
					'bottom'   : targetBottomPos,
					'left'     : 0,
					'right'    : 0
				});

			close_hint = $('<div class="tztk-carousel-close-hint"><span>&times;</span></div>')
				.css({
					position : 'fixed'
				});

			container = $('<div></div>')
				.addClass('tztk-carousel-wrap')
				.addClass( 'tztk-carousel-transitions' );

			container.css({
					'position'   : 'fixed',
					'top'        : 0,
					'right'      : 0,
					'bottom'     : 0,
					'left'       : 0,
					'z-index'    : 2147483647,
					'overflow-x' : 'hidden',
					'overflow-y' : 'auto',
					'direction'  : 'ltr'
				})
				.hide()
				.append(overlay)
				.append(gallery)
				.append(fadeaway)
				.append(info)
				.append(nextButton)
				.append(previousButton)
				.append(close_hint)
				.appendTo($('body'))
				.click(function(e){
					var target = $(e.target), wrap = target.parents('div.tztk-carousel-wrap'), data = wrap.data('carousel-extra'),
						slide = wrap.find('div.selected'), attachment_id = slide.data('attachment-id');
					data = data || [];

					if ( target.is(gallery) || target.parents().add(target).is(close_hint) ) {
						container.tztk_carousel('close');
					} else if ( ! target.parents( '.tztk-carousel-info' ).length ) {
						container.tztk_carousel('next');
					}
				})
				.bind('tztk_carousel.afterOpen', function(){
					$(window).bind('keydown', keyListener);
					$(window).bind('resize', resizeListener);
					gallery.opened = true;

					resizeListener();
				})
				.bind('tztk_carousel.beforeClose', function(){
					var scroll = $(window).scrollTop();

					$(window).unbind('keydown', keyListener);
					$(window).unbind('resize', resizeListener);
					$(window).scrollTop(scroll);
				})
				.bind('tztk_carousel.afterClose', function(){
					if ( history.pushState ) {
						history.pushState('', document.title, window.location.pathname + window.location.search);
					} else {
						last_known_location_hash = '';
						window.location.hash = '';
					}
					gallery.opened = false;
				})
				.on( 'transitionend.tztk-carousel ', '.tztk-carousel-slide', function ( e ) {
					// If the movement transitions take more than twice the allotted time, disable them.
					// There is some wiggle room in the 2x, since some of that time is taken up in
					// JavaScript, setting up the transition and calling the events.
					if ( 'transform' === e.originalEvent.propertyName ) {
						var transitionMultiplier = ( ( Date.now() - transitionBegin ) / 1000 ) / e.originalEvent.elapsedTime;

						container.off( 'transitionend.tztk-carousel' );

						if ( transitionMultiplier >= 2 ) {
							$( '.tztk-carousel-transitions' ).removeClass( 'tztk-carousel-transitions' );
						}
					}
				} );

				$( '.tztk-carousel-wrap' ).touchwipe( {
					wipeLeft : function ( e ) {
						e.preventDefault();
						gallery.tztk_carousel( 'next' );
					},
					wipeRight : function ( e ) {
						e.preventDefault();
						gallery.tztk_carousel( 'previous' );
					},
					preventDefaultEvents : false
				} );

			nextButton.add(previousButton).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				if ( nextButton.is(this) ) {
					gallery.tztk_carousel('next');
				} else {
					gallery.tztk_carousel('previous');
				}
			});
		}
	};

	var methods = {
		testForData: function(gallery) {
			gallery = $( gallery ); // make sure we have it as a jQuery object.
			return !( ! gallery.length || ! gallery.data( 'carousel-extra' ) );
		},

		testIfOpened: function() {
			return !!( 'undefined' !== typeof(gallery) && 'undefined' !== typeof(gallery.opened) && gallery.opened );
		},

		openOrSelectSlide: function( index ) {
			// The `open` method triggers an asynchronous effect, so we will get an
			// error if we try to use `open` then `selectSlideAtIndex` immediately
			// after it. We can only use `selectSlideAtIndex` if the carousel is
			// already open.
			if ( ! $( this ).tztk_carousel( 'testIfOpened' ) ) {
				// The `open` method selects the correct slide during the
				// initialization.
				$( this ).tztk_carousel( 'open', { start_index: index } );
			} else {
				gallery.tztk_carousel( 'selectSlideAtIndex', index );
			}
		},

		open: function(options) {
			var settings = {
				'items_selector' : '.gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id]',
				'start_index': 0
			},
			data = $(this).data('carousel-extra');

			if ( !data ) {
				return; // don't run if the default gallery functions weren't used
			}

			prepareGallery( data );

			if ( gallery.tztk_carousel( 'testIfOpened' ) ) {
				return; // don't open if already opened
			}

			// make sure to stop the page from scrolling behind the carousel overlay, so we don't trigger
			// infiniscroll for it when enabled (Reader, theme infiniscroll, etc).
			originalOverflow = $('body').css('overflow');
			$('body').css('overflow', 'hidden');
			// prevent html from overflowing on some of the new themes.
			originalHOverflow = $('html').css('overflow');
			$('html').css('overflow', 'hidden');

			container.data('carousel-extra', data);

			return this.each(function() {
				// If options exist, lets merge them
				// with our default settings
				var $this = $(this);

				if ( options ) {
					$.extend( settings, options );
				}
				if ( -1 === settings.start_index ) {
					settings.start_index = 0; //-1 returned if can't find index, so start from beginning
				}

				container.trigger('tztk_carousel.beforeOpen').fadeIn('fast',function(){
					container.trigger('tztk_carousel.afterOpen');
					gallery
						.tztk_carousel('initSlides', $this.find(settings.items_selector), settings.start_index)
						.tztk_carousel('selectSlideAtIndex', settings.start_index);
				});
				gallery.html('');
			});
		},

		selectSlideAtIndex : function(index){
			var slides = this.tztk_carousel('slides'), selected = slides.eq(index);

			if ( 0 === selected.length ) {
				selected = slides.eq(0);
			}

			gallery.tztk_carousel('selectSlide', selected, false);
			return this;
		},

		close : function(){
			// make sure to let the page scroll again
			$('body').css('overflow', originalOverflow);
			$('html').css('overflow', originalHOverflow);
			return container
				.trigger('tztk_carousel.beforeClose')
				.fadeOut('fast', function(){
					container.trigger('tztk_carousel.afterClose');
				});

		},

		next : function(){
			var slide = gallery.tztk_carousel( 'nextSlide' );
			container.animate({scrollTop:0}, 'fast');

			if ( slide ) {
				this.tztk_carousel('selectSlide', slide);
			}
		},

		previous : function(){
			var slide = gallery.tztk_carousel( 'prevSlide' );
			container.animate({scrollTop:0}, 'fast');

			if ( slide ) {
				this.tztk_carousel('selectSlide', slide);
			}
		},

		selectedSlide : function(){
			return this.find('.selected');
		},

		setSlidePosition : function(x) {
			transitionBegin = Date.now();

			return this.css({
					'-webkit-transform':'translate3d(' + x + 'px,0,0)',
					'-moz-transform':'translate3d(' + x + 'px,0,0)',
					'-ms-transform':'translate(' + x + 'px,0)',
					'-o-transform':'translate(' + x + 'px,0)',
					'transform':'translate3d(' + x + 'px,0,0)'
			});
		},

		updateSlidePositions : function(animate) {
			var current = this.tztk_carousel( 'selectedSlide' ),
				galleryWidth = gallery.width(),
				currentWidth = current.width(),
				previous = gallery.tztk_carousel( 'prevSlide' ),
				next = gallery.tztk_carousel( 'nextSlide' ),
				previousPrevious = previous.prev(),
				nextNext = next.next(),
				left = Math.floor( ( galleryWidth - currentWidth ) * 0.5 );

			current.tztk_carousel( 'setSlidePosition', left ).show();

			// minimum width
			gallery.tztk_carousel( 'fitInfo', animate );

			// prep the slides
			var direction = lastSelectedSlide.is( current.prevAll() ) ? 1 : -1;

			// Since we preload the `previousPrevious` and `nextNext` slides, we need
			// to make sure they technically visible in the DOM, but invisible to the
			// user. To hide them from the user, we position them outside the edges
			// of the window.
			//
			// This section of code only applies when there are more than three
			// slides. Otherwise, the `previousPrevious` and `nextNext` slides will
			// overlap with the `previous` and `next` slides which must be visible
			// regardless.
			if ( 1 === direction ) {
				if ( ! nextNext.is( previous ) ) {
					nextNext.tztk_carousel( 'setSlidePosition', galleryWidth + next.width() ).show();
				}

				if ( ! previousPrevious.is( next ) ) {
					previousPrevious.tztk_carousel( 'setSlidePosition', -previousPrevious.width() - currentWidth ).show();
				}
			} else {
				if ( ! nextNext.is( previous ) ) {
					nextNext.tztk_carousel( 'setSlidePosition', galleryWidth + currentWidth ).show();
				}
			}

			previous.tztk_carousel( 'setSlidePosition', Math.floor( -previous.width() + ( screenPadding * 0.75 ) ) ).show();
			next.tztk_carousel( 'setSlidePosition', Math.ceil( galleryWidth - ( screenPadding * 0.75 ) ) ).show();
		},

		selectSlide : function(slide, animate){
			lastSelectedSlide = this.find( '.selected' ).removeClass( 'selected' );

			var slides = gallery.tztk_carousel( 'slides' ).css({ 'position': 'fixed' }),
				current = $( slide ).addClass( 'selected' ).css({ 'position': 'relative' }),
				attachmentId = current.data( 'attachment-id' ),
				previous = gallery.tztk_carousel( 'prevSlide' ),
				next = gallery.tztk_carousel( 'nextSlide' ),
				previousPrevious = previous.prev(),
				nextNext = next.next(),
				animated,
				captionHtml;

			// center the main image
			gallery.tztk_carousel( 'loadFullImage', current );

			caption.hide();

			if ( next.length === 0 && slides.length <= 2 ) {
				$( '.tztk-carousel-next-button' ).hide();
			} else {
				$( '.tztk-carousel-next-button' ).show();
			}

			if ( previous.length === 0 && slides.length <= 2 ) {
				$( '.tztk-carousel-previous-button' ).hide();
			} else {
				$( '.tztk-carousel-previous-button' ).show();
			}

			animated = current
				.add( previous )
				.add( previousPrevious )
				.add( next )
				.add( nextNext )
				.tztk_carousel( 'loadSlide' );

			// slide the whole view to the x we want
			slides.not( animated ).hide();

			gallery.tztk_carousel( 'updateSlidePositions', animate );

			container.trigger( 'tztk_carousel.selectSlide', [current] );

			gallery.tztk_carousel( 'getTitleDesc', {
				title: current.data( 'title' ),
				desc: current.data( 'desc' )
			});

			gallery.tztk_carousel( 'updateFullSizeLink', current );
			
			// Increase the height of the background, semi-transparent overlay to match the new length
			$('.tztk-carousel-overlay').height( $(window).height() + titleAndDescription.height() + imageMeta.height() );

			// $('<div />').text(sometext).html() is a trick to go to HTML to plain
			// text (including HTML entities decode, etc)
			if ( current.data( 'caption' ) ) {
				captionHtml = $( '<div />' ).text( current.data( 'caption' ) ).html();

				if ( captionHtml === $( '<div />' ).text( current.data( 'title' ) ).html() ) {
					$( '.tztk-carousel-titleanddesc-title' ).fadeOut( 'fast' ).empty();
				}

				if ( captionHtml === $( '<div />' ).text( current.data( 'desc' ) ).html() ) {
					$( '.tztk-carousel-titleanddesc-desc' ).fadeOut( 'fast' ).empty();
				}

				caption.html( current.data( 'caption' ) ).fadeIn( 'slow' );
			} else {
				caption.fadeOut( 'fast' ).empty();
			}


			// Load the images for the next and previous slides.
			$( next ).add( previous ).each( function() {
				gallery.tztk_carousel( 'loadFullImage', $( this ) );
			});

			window.location.hash = last_known_location_hash = '#tztk-carousel-' + attachmentId;
		},

		slides : function(){
			return this.find('.tztk-carousel-slide');
		},

		slideDimensions : function(){
			return {
				width: $(window).width() - (screenPadding * 2),
				height: Math.floor( $(window).height() / 100 * proportion - 60 )
			};
		},

		loadSlide : function() {
			return this.each(function(){
				var slide = $(this);
				slide.find('img')
					.one('load', function(){
						// set the width/height of the image if it's too big
						slide
							.tztk_carousel('fitSlide',false);
					});
			});
		},

		bestFit : function(){
			var max        = gallery.tztk_carousel('slideDimensions'),
			    orig       = this.tztk_carousel('originalDimensions'),
			    orig_ratio = orig.width / orig.height,
			    w_ratio    = 1,
			    h_ratio    = 1,
			    width, height;

			if ( orig.width > max.width ) {
				w_ratio = max.width / orig.width;
			}
			if ( orig.height > max.height ) {
				h_ratio = max.height / orig.height;
			}

			if ( w_ratio < h_ratio ) {
				width = max.width;
				height = Math.floor( width / orig_ratio );
			} else if ( h_ratio < w_ratio ) {
				height = max.height;
				width = Math.floor( height * orig_ratio );
			} else {
				width = orig.width;
				height = orig.height;
			}

			return {
				width: width,
				height: height
			};
		},

		fitInfo : function(/*animated*/){
			var current = this.tztk_carousel('selectedSlide'),
				size = current.tztk_carousel('bestFit');

			photo_info.css({
				'left'  : Math.floor( (info.width() - size.width) * 0.5 ),
				'width' : Math.floor( size.width )
			});

			return this;
		},

		fitMeta : function(animated){
			var newInfoTop   = { top: Math.floor( $(window).height() / 100 * proportion + 5 ) + 'px' };
			var newLeftWidth = { width: ( info.width() - (imageMeta.width() + 80) ) + 'px' };

			if (animated) {
				info.animate(newInfoTop);
				leftColWrapper.animate(newLeftWidth);
			} else {
				info.animate(newInfoTop);
				leftColWrapper.css(newLeftWidth);
			}
		},

		fitSlide : function(/*animated*/){
			return this.each(function(){
				var $this      = $(this),
				    dimensions = $this.tztk_carousel('bestFit'),
				    method     = 'css',
				    max        = gallery.tztk_carousel('slideDimensions');

				dimensions.left = 0;
				dimensions.top = Math.floor( (max.height - dimensions.height) * 0.5 ) + 40;
				$this[method](dimensions);
			});
		},

		texturize : function(text) {
				text = '' + text; // make sure we get a string. Title "1" came in as int 1, for example, which did not support .replace().
				text = text.replace(/'/g, '&#8217;').replace(/&#039;/g, '&#8217;').replace(/[\u2019]/g, '&#8217;');
				text = text.replace(/"/g, '&#8221;').replace(/&#034;/g, '&#8221;').replace(/&quot;/g, '&#8221;').replace(/[\u201D]/g, '&#8221;');
				text = text.replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g, '$1="$2"'); // untexturize allowed HTML tags params double-quotes
				return $.trim(text);
		},

		initSlides : function(items, start_index){
			if ( items.length < 2 ) {
				$( '.tztk-carousel-next-button, .tztk-carousel-previous-button' ).hide();
			} else {
				$( '.tztk-carousel-next-button, .tztk-carousel-previous-button' ).show();
			}

			// Calculate the new src.
			items.each(function(/*i*/){
				var src_item  = $(this),
					orig_size = src_item.data('orig-size') || '',
					max       = gallery.tztk_carousel('slideDimensions'),
					parts     = orig_size.split(','),
					medium_file     = src_item.data('medium-file') || '',
					large_file      = src_item.data('large-file') || '',
					src;
				orig_size = {width: parseInt(parts[0], 10), height: parseInt(parts[1], 10)};

					src = src_item.data('orig-file');

					src = gallery.tztk_carousel('selectBestImageSize', {
						orig_file   : src,
						orig_width  : orig_size.width,
						orig_height : orig_size.height,
						max_width   : max.width,
						max_height  : max.height,
						medium_file : medium_file,
						large_file  : large_file
					});

				// Set the final src
				$(this).data( 'gallery-src', src );
			});

			// If the start_index is not 0 then preload the clicked image first.
			if ( 0 !== start_index ) {
				$('<img/>')[0].src = $(items[start_index]).data('gallery-src');
			}

			var useInPageThumbnails = items.first().closest( '.tiled-gallery.type-rectangular' ).length > 0;

			// create the 'slide'
			items.each(function(i){
				var src_item        = $(this),
					attachment_id   = src_item.data('attachment-id') || 0,
					orig_size       = src_item.data('orig-size') || '',
					thumb_size      = { width : src_item[0].naturalWidth, height : src_item[0].naturalHeight },
					title           = src_item.data('image-title') || '',
					description     = src_item.data('image-description') || '',
					caption         = src_item.parents('.gallery-item').find('.gallery-caption').html() || '',
					src				= src_item.data('gallery-src') || '',
					medium_file     = src_item.data('medium-file') || '',
					large_file      = src_item.data('large-file') || '',
					orig_file	= src_item.data('orig-file') || '';

				var tiledCaption = src_item.parents('div.tiled-gallery-item').find('div.tiled-gallery-caption').html();
				if ( tiledCaption ) {
					caption = tiledCaption;
				}

				if ( attachment_id && orig_size.length ) {
					title       = gallery.tztk_carousel('texturize', title);
					description = gallery.tztk_carousel('texturize', description);
					caption     = gallery.tztk_carousel('texturize', caption);

					// Initially, the image is a 1x1 transparent gif.  The preview is shown as a background image on the slide itself.
					var image = $( '<img/>' )
						.attr( 'src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' )
						.css( 'width', '100%' )
						.css( 'height', '100%' );

					var slide = $('<div class="tztk-carousel-slide"></div>')
							.hide()
							.css({
								//'position' : 'fixed',
								'left'     : i < start_index ? -1000 : gallery.width()
							})
							.append( image )
							.appendTo(gallery)
							.data('src', src )
							.data('title', title)
							.data('desc', description)
							.data('caption', caption)
							.data('attachment-id', attachment_id)
							.data('permalink', src_item.parents('a').attr('href'))
							.data('orig-size', orig_size)
							.data('medium-file', medium_file)
							.data('large-file', large_file)
							.data('orig-file', orig_file)
							.data('thumb-size', thumb_size)
							;

						if ( useInPageThumbnails ) {
							// Use the image already loaded in the gallery as a preview.
							slide
								.data( 'preview-image', src_item.attr( 'src' ) )
								.css( {
									'background-image' : 'url("' + src_item.attr( 'src' ) + '")',
									'background-size' : '100% 100%',
									'background-position' : 'center center'
								} );
						}

						slide.tztk_carousel( 'fitSlide', false );
				}
			});
			return this;
		},

		selectBestImageSize: function(args) {
			if ( 'object' !== typeof args ) {
				args = {};
			}

			if ( 'undefined' === typeof args.orig_file ) {
				return '';
			}

			if ( 'undefined' === typeof args.orig_width || 'undefined' === typeof args.max_width ) {
				return args.orig_file;
			}

			if ( 'undefined' === typeof args.medium_file || 'undefined' === typeof args.large_file ) {
				return args.orig_file;
			}

			var medium_size       = args.medium_file.replace(/-([\d]+x[\d]+)\..+$/, '$1'),
				medium_size_parts = (medium_size !== args.medium_file) ? medium_size.split('x') : [args.orig_width, 0],
				medium_width      = parseInt( medium_size_parts[0], 10 ),
				medium_height     = parseInt( medium_size_parts[1], 10 ),
				large_size        = args.large_file.replace(/-([\d]+x[\d]+)\..+$/, '$1'),
				large_size_parts  = (large_size !== args.large_file) ? large_size.split('x') : [args.orig_width, 0],
				large_width       = parseInt( large_size_parts[0], 10 ),
				large_height      = parseInt( large_size_parts[1], 10 );

			// Give devices with a higher devicePixelRatio higher-res images (Retina display = 2, Android phones = 1.5, etc)
			if ( 'undefined' !== typeof window.devicePixelRatio && window.devicePixelRatio > 1 ) {
				args.max_width  = args.max_width * window.devicePixelRatio;
				args.max_height = args.max_height * window.devicePixelRatio;
			}

			if ( large_width >= args.max_width || large_height >= args.max_height ) {
				return args.large_file;
			}

			if ( medium_width >= args.max_width || medium_height >= args.max_height ) {
				return args.medium_file;
			}

			return args.orig_file;
		},

		originalDimensions: function() {
			var splitted = $(this).data('orig-size').split(',');
			return {width: parseInt(splitted[0], 10), height: parseInt(splitted[1], 10)};
		},

		format: function( args ) {
			if ( 'object' !== typeof args ) {
				args = {};
			}
			if ( ! args.text || 'undefined' === typeof args.text ) {
				return;
			}
			if ( ! args.replacements || 'undefined' === typeof args.replacements ) {
				return args.text;
			}
			return args.text.replace(/{(\d+)}/g, function( match, number ) {
				return typeof args.replacements[number] !== 'undefined' ? args.replacements[number] : match;
			});
		},

		parseTitleDesc: function( value ) {
			if ( !value.match(' ') && value.match('_') ) {
				return '';
			}
			// Prefix list originally based on http://commons.wikimedia.org/wiki/MediaWiki:Filename-prefix-blacklist
			$([
				'CIMG',                   // Casio
				'DSC_',                   // Nikon
				'DSCF',                   // Fuji
				'DSCN',                   // Nikon
				'DUW',                    // some mobile phones
				'GEDC',                   // GE
				'IMG',                    // generic
				'JD',                     // Jenoptik
				'MGP',                    // Pentax
				'PICT',                   // misc.
				'Imagen',                 // misc.
				'Foto',                   // misc.
				'DSC',                    // misc.
				'Scan',                   // Scanners
				'SANY',                   // Sanyo
				'SAM',                    // Samsung
				'Screen Shot [0-9]+'      // Mac screenshots
			])
			.each(function(key, val){
				var regex = new RegExp('^' + val);
				if ( regex.test(value) ) {
					value = '';
					return;
				}
			});
			return value;
		},

		getTitleDesc: function( data ) {
			var title ='', desc = '', markup = '', target;

			target = $( 'div.tztk-carousel-titleanddesc', 'div.tztk-carousel-wrap' );
			target.hide();

			title = gallery.tztk_carousel('parseTitleDesc', data.title) || '';
			desc  = gallery.tztk_carousel('parseTitleDesc', data.desc)  || '';

			if ( title.length || desc.length ) {
				// $('<div />').text(sometext).html() is a trick to go to HTML to plain text (including HTML entities decode, etc)
				if ( $('<div />').text(title).html() === $('<div />').text(desc).html() ) {
					title = '';
				}

				markup  = ( title.length ) ? '<div class="tztk-carousel-titleanddesc-title">' + title + '</div>' : '';
				markup += ( desc.length )  ? '<div class="tztk-carousel-titleanddesc-desc">' + desc + '</div>'   : '';

				target.html( markup ).fadeIn('slow');
			}

		},

		// updateFullSizeLink updates the contents of the tztk-carousel-image-download link
		updateFullSizeLink: function(current) {
			if(!current || !current.data) {
				return false;
			}
			var original  = current.data('orig-file').replace(/\?.+$/, ''),
				origSize  = current.data('orig-size').split(','),
				permalink = $( '<a>'+gallery.tztk_carousel('format', {'text': tztkGalleryCarousel.download_original, 'replacements': origSize})+'</a>' )
					.addClass( 'tztk-carousel-image-download' )
					.attr( 'href', original )
					.attr( 'target', '_blank' );

			// Update (replace) the content of the anchor
			$( 'div.tztk-carousel-image-meta a.tztk-carousel-image-download' ).replaceWith( permalink );
		},

		nextSlide : function () {
			var slides = this.tztk_carousel( 'slides' );
			var selected = this.tztk_carousel( 'selectedSlide' );

			if ( selected.length === 0 || ( slides.length > 2 && selected.is( slides.last() ) ) ) {
				return slides.first();
			}

			return selected.next();
		},

		prevSlide : function () {
			var slides = this.tztk_carousel( 'slides' );
			var selected = this.tztk_carousel( 'selectedSlide' );

			if ( selected.length === 0 || ( slides.length > 2 && selected.is( slides.first() ) ) ) {
				return slides.last();
			}

			return selected.prev();
		},

		loadFullImage : function ( slide ) {
			var image = slide.find( 'img:first' );

			if ( ! image.data( 'loaded' ) ) {
				// If the width of the slide is smaller than the width of the "thumbnail" we're already using,
				// don't load the full image.

				image.on( 'load.jetpack', function () {
					image.off( 'load.jetpack' );
					$( this ).closest( '.tztk-carousel-slide' ).css( 'background-image', '' );
				} );

				if ( ! slide.data( 'preview-image' ) || ( slide.data( 'thumb-size' ) && slide.width() > slide.data( 'thumb-size' ).width ) ) {
					image.attr( 'src', image.closest( '.tztk-carousel-slide' ).data( 'src' ) );
				} else {
					image.attr( 'src', slide.data( 'preview-image' ) );
				}

				image.data( 'loaded', 1 );
			}
		}
	};

	$.fn.tztk_carousel = function(method){
		// ask for the HTML of the gallery
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.open.apply( this, arguments );
		} else {
			$.error( 'Method ' +	method + ' does not exist on jQuery.tztk_carousel' );
		}

	};

	// register the event listener for starting the gallery
	$( document.body ).on( 'click', 'div.gallery,div.tiled-gallery', function(e) {
		if ( ! $(this).tztk_carousel( 'testForData', e.currentTarget ) ) {
			return;
		}
		if ( $(e.target).parent().hasClass('gallery-caption') ) {
			return;
		}
		e.preventDefault();

		// Stopping propagation in case there are parent elements
		// with .gallery or .tiled-gallery class
		e.stopPropagation();
		$(this).tztk_carousel('open', {start_index: $(this).find('.gallery-item, .tiled-gallery-item').index($(e.target).parents('.gallery-item, .tiled-gallery-item'))});
	});

	// Makes carousel work on page load and when back button leads to same URL with carousel hash (ie: no actual document.ready trigger)
	$( window ).on( 'hashchange', function () {
		var hashRegExp = /tztk-carousel-(\d+)/,
			matches, attachmentId, galleries, selectedThumbnail;

		if ( ! window.location.hash || ! hashRegExp.test( window.location.hash ) ) {
			return;
		}

		if ( window.location.hash === last_known_location_hash ) {
			return;
		}

		last_known_location_hash = window.location.hash;
		matches = window.location.hash.match( hashRegExp );
		attachmentId = parseInt( matches[1], 10 );
		galleries = $( 'div.gallery, div.tiled-gallery' );

		// Find the first thumbnail that matches the attachment ID in the location
		// hash, then open the gallery that contains it.
		galleries.each( function( _, galleryEl ) {
			$( galleryEl ).find('img').each( function( imageIndex, imageEl ) {
				if ( $( imageEl ).data( 'attachment-id' ) === parseInt( attachmentId, 10 ) ) {
					selectedThumbnail = { index: imageIndex, gallery: galleryEl };
					return false;
				}
			});

			if ( selectedThumbnail ) {
				$( selectedThumbnail.gallery )
					.tztk_carousel( 'openOrSelectSlide', selectedThumbnail.index );
			}
		});
	});

	if ( window.location.hash ) {
		$( window ).trigger( 'hashchange' );
	}
});

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * Version 1.1.1, modified to pass the touchmove event to the callbacks.
 */
(function($) {
$.fn.touchwipe = function(settings) {
	var config = {
			min_move_x: 20,
			min_move_y: 20,
			wipeLeft: function(/*e*/) { },
			wipeRight: function(/*e*/) { },
			wipeUp: function(/*e*/) { },
			wipeDown: function(/*e*/) { },
			preventDefaultEvents: true
	};

	if (settings) {
		$.extend(config, settings);
	}

	this.each(function() {
		var startX;
		var startY;
		var isMoving = false;

		function cancelTouch() {
			this.removeEventListener('touchmove', onTouchMove);
			startX = null;
			isMoving = false;
		}

		function onTouchMove(e) {
			if(config.preventDefaultEvents) {
				e.preventDefault();
			}
			if(isMoving) {
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				var dx = startX - x;
				var dy = startY - y;
				if(Math.abs(dx) >= config.min_move_x) {
					cancelTouch();
					if(dx > 0) {
						config.wipeLeft(e);
					} else {
						config.wipeRight(e);
					}
				}
				else if(Math.abs(dy) >= config.min_move_y) {
						cancelTouch();
						if(dy > 0) {
							config.wipeDown(e);
						} else {
							config.wipeUp(e);
						}
					}
			}
		}

		function onTouchStart(e)
		{
			if (e.touches.length === 1) {
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
				isMoving = true;
				this.addEventListener('touchmove', onTouchMove, false);
			}
		}
		if ('ontouchstart' in document.documentElement) {
			this.addEventListener('touchstart', onTouchStart, false);
		}
	});

	return this;
};
})(jQuery);
