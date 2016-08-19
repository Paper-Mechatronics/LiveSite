=== Plugin Name ===
Contributors: matchalabs
Tags: slider,meta slider,wordpress slider,slideshow,image slider,flex slider,nivo slider,responsive slides,coin slider,carousel,responsive slider
Requires at least: 3.5
Tested up to: 4.5
Stable tag: 3.3.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Easy to use WordPress Slider plugin. Create responsive slideshows with Nivo Slider, Flex Slider, Coin Slider and Responsive Slides.

== Description ==

http://www.youtube.com/watch?v=o0f3uAvL6Ic

The most popular WordPress slider plugin. Creating slideshows with [Meta Slider](http://www.metaslider.com/) is fast and easy. Simply select images from your WordPress Media Library, drag and drop them into place, set slide captions, links and SEO fields all from one page. You can choose from 4 different slider types (Flex Slider, Nivo Slider, Responsive Slides & Coin Slider) and use the provided shortcode or template include to easily embed slideshows in your blog.

**Includes**

* **Flex Slider 2** - Responsive, 2 transition effects, carousel mode
* **Nivo Slider** - Responsive, 16 transition effects, 4 themes
* **Responsive Slides** - Responsive & light weight
* **Coin Slider** - 4 transition effects

**Features**

* Simple, easy to use interface
* Create Responsive, SEO optimised slideshows in seconds
* Unrestricted support for Image Slides (supports caption, link, title text, alt text)
* Full Width sliders
* Drag and drop slide reordering
* Admin preview
* Intelligent image cropping
* Built in Widget and Shortcode
* Loads of slider configuration options - transition effect, speed etc (per slideshow)
* Fully localised
* Multi Site compatible
* Compatible with translation plugins (WPML, PolyLang & qTranslate)
* Extensive Developer API
* Fast - only the minimum JavaScript/CSS is included on your page
* Free basic support
* Lightbox support with the [Meta Slider Lightbox](http://wordpress.org/plugins/ml-slider-lightbox/) addon

Upgrade to [Meta Slider Pro](https://www.metaslider.com/upgrade) to add support for:

* YouTube & Vimeo slides
* HTML sliders
* Layer sliders with CSS3 animations & HTML5 Video backgrounds
* Dynamic Post Feed/Featured Image sliders (content slider)
* Custom slider themes
* Thumbnail Navigation
* Premium Support

Read more and thanks to:

* [Flex Slider](http://flexslider.woothemes.com/)
* [Responsive Slides](http://responsiveslides.com/)
* [Coin Slider](http://workshop.rs/projects/coin-slider/)
* [Nivo Slider](https://github.com/gilbitron/Nivo-Slider)

Find out more at https://www.metaslider.com

== Installation ==

The easy way:

1. Go to the Plugins Menu in WordPress
1. Search for "Meta Slider"
1. Click "Install"

The not so easy way:

1. Upload the `ml-slider` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Manage your slideshows using the 'Meta Slider' menu option

== Frequently Asked Questions ==

https://www.metaslider.com/documentation/

= How do I include a slideshow in the header of my site? =

Video Guide:

http://www.youtube.com/watch?v=gSsWgd66Jjk

Text Guide:

You will need to paste the "Template Include" code into your theme (you can find this in the 'Usage' section underneath the slideshow settings)

* Go to Appearance > Editor in WordPress
* Edit a file called 'header.php' (or similar)
* Find the correct place to add it (for example above or below the logo)
* Paste in the code and save.

= I only want to show the slideshow on my homepage, how can I do that? =

Add the 'restrict_to' parameter to the shortcode, eg:

`[metaslider id=XXX restrict_to=home]");`

Theme specific instructions:

httsp://www.metaslider.com/documentation/theme-integration/

= It's not working - what can I do? =

Check out the troubleshooting page here:

http://www.metaslider.com/documentation/troubleshooting/

= Meta Slider is cropping my images in the wrong place - what can I do? =

See https://www.metaslider.com/documentation/image-cropping/

== Screenshots ==

1. Meta Slider - for live demos see https://www.metaslider.com/examples/
2. Nivo Slider example
3. Coin Slider example
4. Flex Slider example
5. Carousel Example
6. Administration panel - selecting slides

== Changelog ==

= 3.3.7 [06/05/15] =

* Fix: "Maximum level reached" error when inserting the shortcode for a slideshow into it's own caption. Thanks to Zhouyuan @ Fortinet for reporting this.

= 3.3.6 [14/12/15] =

* Fix: Save Spinner

= 3.3.5 [22/09/15] =

* Prepare plugin for WordPress.org translation project (rename textdomain from 'metaslider' to 'ml-slider')
* Small styling fix

= 3.3.4.1 [29/07/15] =

* Fix Roots theme CSS conflict

= 3.3.4 [16/07/15] =

* Add HTML5 validation by applying a property="stylesheet" attribute to meta slider <link> CSS tags
* Remove unused "Resource Manager" code
* Chinese language pack updated (thanks to mamsds!)

= 3.3.3 [11/06/15] =

* Ukrainian language pack added (thanks to mister_r!)
* Fix: Meta Slider hoplink incorrectly adding parameters to filtered url
* Add "metaslider_attachment_url" filter

= 3.3.2 [16/04/15] =

* Fix: FPD Security issue. Thanks to Ole Aass (@oleaass) for finding and disclosing this issue.

More information:

The fix will prevent some servers (configured with 'display_errors' set to 'on') from disclosing the full path to certain files within Meta Slider.

http://codex.wordpress.org/Security_FAQ#Why_are_there_path_disclosures_when_directly_loading_certain_files.3F

= 3.3.1 [23/03/15] =

* Fix: Remove 'create video playlist' option from Media Library (on Meta Slider page only)
* Fix: Support for Enhanced Media Library plugin
* Fix: Return public slide when DOING_AJAX
* Improvement: Use admin actions to save slideshow settings

== Upgrade Notice ==