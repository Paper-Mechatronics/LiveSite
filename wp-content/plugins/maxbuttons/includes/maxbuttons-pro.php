<?php

$url = MB()->get_plugin_url();
$img_url = $url . "images/gopro"; 
?>
<?php
$admin = MB()->getClass('admin'); 
$page_title = __("Upgrade to Pro","maxbuttons"); 
$version = maxAdmin::getAdversion(); 

$buy_now_top = '<a class="page-title-action add-new-h2 big-maxg-btn" href="
https://maxbuttons.com/pricing/?utm_source=mbf-dash' . $version . '&utm_medium=mbf-plugin&utm_content=buy-now&utm_campaign=buy-now-top' . $version . '" target="_blank">' . __("Buy Now", "maxbuttons") . "</a>"; 

$middle_buy = "https://maxbuttons.com/pricing/?utm_source=mbf-dash$version&utm_medium=mbf-plugin&utm_content=buy-now&utm_campaign=buy-now-1selling$version"; 

$bottom_buy = "https://maxbuttons.com/pricing/?utm_source=mbf-dash$version&utm_medium=mbf-plugin&utm_content=buy-now&utm_campaign=getitnow$version"; 
 
$admin->get_header(array("title" => $page_title, "title_action" => $buy_now_top, 'action' => 'gopro' ) );



?>
   <link rel="stylesheet" type="text/css" href="<?php echo $url ?>assets/css/bootstrap.css">
   <link href='https://fonts.googleapis.com/css?family=Quicksand:400,700' rel='stylesheet' type='text/css'>   
    <div class="wrapper-inner">
 
 

  <div class="default-section">
    <div class="container">
      <h2>Build Even Better WordPress Buttons with MaxButtons Pro!</h2>
      <p>
        Take your WordPress Buttons, Social Share and Social Icons to the next level
      </p>
      <div class="rating bordered">
        <img src="<?php echo $img_url ?>/stars.png" alt="stars" />
        <p>
          300+ 5 Star Ratings
        </p>
      </div>
      <p>
        Join our over 5,000 customers!
      </p>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>Powerful Advanced Features</h2>
      <p>
        Add icons, use Google Fonts and More to Fully Customize your Design to Work on your Site
      </p>
      <div class="icon-row">
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-btn.png" alt="img" />
          <p>
            Basic Buttons Pack Included
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-lines.png" alt="img" />
          <p>
            Two Lines of Text
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-icons.png" alt="img" />
          <p>
            Add Icons
          </p>
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-awesome.png" alt="img" />
          <p>
            Font Awesome Icons
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-search.png" alt="img" />
          <p>
            Button Search
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-google.png" alt="img" />
          <p>
            Google Analytics
            <br>
            Event Tracking
          </p>
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-fonts.png" alt="img" />
          <p>
            Google Fonts
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-visual.png" alt="img" />
          <p>
            Visual Composer
          </p>
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s1-pack.png" alt="img" />
          <p>
            Button Packs
          </p>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>#1 Selling WordPress Button Plugin!</h2>
      <div class="btn-row">
        <img src="<?php echo $img_url ?>/s2-price.png" alt="img" class="inline-block" />
        <a href="<?php echo $middle_buy ?>" target="_blank" class="big-maxg-btn inline-block">Buy Now</a>
      </div>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>More Effective Buttons Are Made with MaxButton Pro's Advanced Features</h2>
      <img src="<?php echo $img_url ?>/s3-btns.png" alt="img" class="bordered" />
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>Purchase Professionally Designed, Production Ready Button Packs</h2>
      <p>
        Button packs are sets of buttons with icons and settings already predefined for you, saving you loads of time. We have an ever-growing collection of button packs that you can buy and import into your website (only $5 each). You can then use those buttons as they are, or customize them to fit your needs (below are a few to get you started).
      </p>
      <div class="icon-row">
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack1.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack2.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack3.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack4.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack5.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack6.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack7.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack8.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s4-pack9.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>10+ Free Sets of Ready to Use Button Packs</h2>
      <p>
        No time to design your own buttons?
      </p>
      <p>
        Download any of our free button packs included with MaxButtons Pro and load them onto your site in seconds!
      </p>
      <div class="icon-row">
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set1.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set2.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set3.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set4.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set5.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set6.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set7.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set8.png" alt="img" class="bordered" />
        </div>
        <div class="width-33">
          <img src="<?php echo $img_url ?>/s5-set9.png" alt="img" class="bordered" />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>Social Share Capabilities</h2>
      <p>
        MaxButtons Pro includes 17 Designed and Configured Social Share Collections to get the Most Value From your Content Marketing.
      </p>
      <p>
        Use one of our Collections out of the Box or Customize Your Icons with MaxButtons Pro's Editor.
      </p>
      <p>
        Here are Samples of Each of Our Collections.
      </p>
      <div class="icon-row">
        <div class="width-100 bordered">
          <p>
            5 Social Share Boxes
          </p>
          <img src="<?php echo $img_url ?>/s6-shares1.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Gray Social Share Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares2.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Minimalistic Share Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares3.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Modern Social Share
          </p>
          <img src="<?php echo $img_url ?>/s6-shares4.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Monochrome Social Share Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares5.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Notched Box Social Share
          </p>
          <img src="<?php echo $img_url ?>/s6-shares6.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Round sharing collection
          </p>
          <img src="<?php echo $img_url ?>/s6-shares7.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Round White Social Share
          </p>
          <img src="<?php echo $img_url ?>/s6-shares8.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Rounded Corner Black Icons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares9.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Share Plus Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares10.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Sharing Circles
          </p>
          <img src="<?php echo $img_url ?>/s6-shares11.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Social Counter Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares12.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Social Share Squares
          </p>
          <img src="<?php echo $img_url ?>/s6-shares13.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Stacked Rectangles
          </p>
          <img src="<?php echo $img_url ?>/s6-shares14.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Stacked Sharing Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares15.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Text Plus Count Share Buttons
          </p>
          <img src="<?php echo $img_url ?>/s6-shares16.png" alt="img" />
        </div>
        <div class="width-100 bordered">
          <p>
            Transparent Social Share Squares
          </p>
          <img src="<?php echo $img_url ?>/s6-shares17.png" alt="img" />
        </div>
      </div>
    </div>
  </div>

  <div class="default-section">
    <div class="container">
      <h2>Get MaxButtons Pro Now!</h2>
      <div class="btn-row">
        <a href="<?php echo $bottom_buy ?>" target="_blank" class="big-maxg-btn inline-block">Get It Now</a>
      </div>
    </div>
  </div>
    </div>
    <!-- wrapper -->
	
 
<?php $admin->get_footer(); ?> 
