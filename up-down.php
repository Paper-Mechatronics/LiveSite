<?php
include('wp-blog-header.php');

global $user_identity;
if($user_identity){
	echo $user_identity;
}
else{
	//die('Sorry, you must be <a href="'. get_bloginfo('home') . '/wp-login.php?redirect_to=' . $_SERVER['PHP_SELF'] . '">logged in</a> to view this page.');
}
//echo do_shortcode( '[contact-form-7 id="1234" title="Contact form 1"]' );
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Paper Mechatronics - Flapping</title>
    
    <!--<script src="libraries/p5.js" type="text/javascript"></script>
    <script src="libraries/p5.dom.js" type="text/javascript"></script>
    <script src="libraries/p5.sound.js" type="text/javascript"></script>

    <script src="libraries/p5.svg.js" type="text/javascript"></script>
    <script src="libraries/p5.pdf.js" type="text/javascript"></script>-->
    <!--script language="javascript" type="text/javascript" src="../p5.js"></script-->
    <!-- uncomment lines below to include extra p5 libraries -->
  	<!--<script language="javascript" src="../addons/p5.dom.js"></script>-->
    <!--<script language="javascript" src="../addons/p5.sound.js"></script>-->
    <!--<script language="javascript" type="text/javascript" src="sketch.js"></script>-->
    <!-- ADD extra js files below here-->
    <!--<script language="javascript" type="text/javascript" src="modules/Intro.js"></script>
    <script language="javascript" type="text/javascript" src="modules/OpenClose.js"></script>
    <script language="javascript" type="text/javascript" src="modules/Bird.js"></script>
    <script language="javascript" type="text/javascript" src="modules/Walk.js"></script>
    <script language="javascript" type="text/javascript" src="modules/Planetary.js"></script>
	<script language="javascript" type="text/javascript" src="modules/turtle.js"></script>
    <script language="javascript" type="text/javascript" src="UI.js"></script>-->
    <!-- this line removes any default padding and style. you might only need one of these values set. -->
    <!--<script type="text/javascript" src = "js/phaser.min.js"></script>
    <script type="text/javascript" src = "js/phaserTest.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/png" href="wp-content/uploads/2016/06/cropped-noun_221895_cc-32x32.png"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="js/decomp.js" type="text/javascript"></script>
    <script src="matterJS/build/matter.js" type="text/javascript"></script>
    <script src="matterJS/build/Examples.js" type="text/javascript"></script>
    <!--<script src="js/phaser.min.js" type="text/javascript"></script>-->
    
    <!--<script src="js/p2.js"></script>
    <script src="js/p2.renderer.js"></script>-->
    <style> 
    body {
        padding: 0; 
        margin: 0;
        background-color: #c8c8c8;
        color: #000;
    } 
    canvas {
        position: fixed;
        display: inline-block;
        float: right;
        right: 0;
        vertical-align: top;
        border-left: 2px solid black;
        

    } 
    #content{
        position: absolute;
        float: left;
        width: 25%;
        height: 100%;
        display: inline-block;
    }
    #openClose{
        position:absolute;
        top:70%;
    }
    #flapping{
        position:absolute;
        top:73%;
    }
    .values{
        display: inline-block;
    }
    .p2-container{
    
    }
    #myCanvas{
    }
    #selected{
        float: right;
        display: inline-block;
        position: absolute;
        margin-top: 0px;
    }

    #overlay, #overlay2, #overlay3 {
         visibility: hidden;
         position: absolute;
         left: 0px;
         top: 0px;
         width:100%;
         height:100%;
         text-align:center;
         z-index: 1000;
    }
    #overlay div, #overlay2 div, #overlay3 div {
         width:300px;
         margin: 100px auto;
         background-color: #fff;
         border:1px solid #000;
         padding:15px;
         text-align:center;
    }
    #codeBlock{
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #ccc;
        color: #000;
    }
    pre{
        background-color: #ccc;
    }
    .gear-size{
        border-radius: 3px;
        width: 40px;
        text-align: center;
        margin-left: 31px;
    }
    input[type="range"]{
        width: 75% !important;
    }
    .container{
        position: relative;
        float: left;
        width: 25%;
        height: 100%;
        padding: 0;
    }
    #preview{
        height: 250px;
        width: 100%;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    p {
        display: inline-block;
    }
    .module-name, .footer{
        width: 100%;
        height: 50px;
        background-color: #000;
        color: #fff;
        text-align: center;
    }
    .controls{
        height: auto;
        margin: 20px;
    }
    .controls-dark{
        background-color: #8c8c8c;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-right: 2px solid black;
    }
    .controls label, .controls input{
        display: inline-block;
    }
    .slider-div{
        height: 30px;
        position: relative;
    }
    .slider-div input, .slider-div label{
        position: absolute;
        height: 100%;
    }
    .slider-div label{
        font-size: 1.2em;
    }
    .slider-div input{
        margin-left: 30px;
    }
    input[type=checkbox]
    {
      /* Double-sized Checkboxes */
      -ms-transform: scale(1.2); /* IE */
      -moz-transform: scale(1.2); /* FF */
      -webkit-transform: scale(1.2); /* Safari and Chrome */
      -o-transform: scale(1.2); /* Opera */
      padding: 10px;
    }
    .rendering{
        color: #000;
    }
    input[type=range]::-webkit-slider-runnable-track {
      background: #999;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #999;
    }

    input[type=range]::-moz-range-track {
      background: #999;
    }

    input[type=range]::-ms-track {
        background: #999;
    }
    .footer{
        text-align: justify;
        -ms-text-justify: distribute-all-lines;
        text-justify: distribute-all-lines;
        padding: 10px 40px 10px 40px;
        height: 90px;
    }
    .footer-btn{
        width: 50px;
        height: 50px;
        background-color: #fff;
        background-image: none;
        color: #999;
    }
    .footer-btn-div{
        vertical-align: top;
        display: inline-block;
        *display: inline;
        zoom: 1;
        color: #fff;
        text-align: center;
    }
    .stretch {
        width: 100%;
        display: inline-block;
        font-size: 0;
        line-height: 0
    }
    .module-name p{
        font-size: 1.8em;
    }
    a:focus, a:hover{
        text-decoration: none;  
    }
    </style>
  </head>
  <body>
    <script src="js/up-down.js" type="text/javascript"></script>
    <div class = "container">
        <div class = "module-name">
            <p>Up and Down +</p>
            <select id = "changeMech" class = "rendering" onchange = "changeMech()">
                <option value="rack">Rack and Pinion</option>
                <option value="crank">Crank</option>
                <option value="cam">Cam</option>
            </select> 
        </div>
        <div class = "controls">
            <div id = "preview">
            </div>
            <div id = "a-slider" class = "slider-div">
                <label>A:</label>
                <input type="range" id="changeSpeed" value="40" min="0" max="100">
            </div>
            <div id = "a-slider" class = "slider-div">
                <label>B:</label>
                <input type="range" id="changeTimeInterval" value="3" min="1" max="30">
            </div>
            <div id = "a-slider" class = "slider-div">
                <label>C:</label>
                <input type="range" id="changeTimeInterval" value="3" min="1" max="30">
            </div>
            <div id = "a-slider" class = "slider-div">
                <label>D:</label>
                <input type="range" id="changeTimeInterval" value="3" min="1" max="30">
            </div>
            <br>
        </div>
        <div class = "controls-dark">
            <div>
                <p>Gear Size:</p>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear" onclick="smallGear()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear" onclick="mediumGear()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear" onclick="largeGear()">3</button>
            </div>
            <br>
            <div>
            <p>Motor Rotation:</p>
                <button class = "object btn btn-primary" type="button" id="setSmallGear" onclick="">180</button>
                <button class = "object btn btn-primary" type="button" id="setMedGear" onclick="">Continuous</button>
            </div>
        </div>
        <div class = "controls">
            <div>
                <p>Pairing Gears</p>
                <input class = "checkbox" type="checkbox" onclick=""></button>
            </div>
        </div>
        <div class = "controls-dark">
            <div>
                <p>Rendering: </p>
                    <select class = "rendering">
                        <option value="link_gear">Linkages + Gears</option>
                        <option value="gear">Gear Only</option>
                    </select> 
            </div>
        </div>
        <div class = "footer">
            <a href = "http://www.papermech.net/rackandpinion.php">
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ></button>
                    <br>
                    <p>Reset</p>
                </div>
            </a>
            <a href = "#">
                <div class = "footer-btn-div">
                    <button href = "#" class = "footer-btn object btn btn-primary" type="button" ></button>
                    <br>
                    <p>Show Parts</p>
                </div>
            </a>
            <a href = "http://www.papermech.net/create.php">
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ></button>
                    <br>
                    <p>Home</p>
                </div>
            </a>
            <span class="stretch"></span>
        </div>
    </div>
    <!--<button type="button" id="rotate" onclick="overlay3()">Set Angle</button>-->
    <!--<div  id = "codeBlock">
        <pre>
        #include <Servo.h> 

        Servo myservo;

        void setup() 
        { 
          myservo.attach(9);
          myservo.write(90);  // set servo to mid-point
        } 

        void loop() {} 
        </pre> 
    <div>-->


    <script type="text/javascript">
    </script>
  </body>
</html>
