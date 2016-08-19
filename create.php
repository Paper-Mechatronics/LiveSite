<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Paper Mechatronics - Create</title>
    
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
    <style> 
    body {
        padding: 0; 
        margin: 0;
        background-color: #985ec5;
    } 
    .navbar-default{
    background-color: #fff !important;
    background-image: none;
    height: 57px;
    }
    .navbar-brand{
        position: absolute;
        margin-top: 0;

    }
    #logo{
        margin: 0;
        position: absolute;
        margin-top: -10px;
        height: 45px;
    }
    #container {
        height: auto;
        width: 60%;
        margin: 0 auto;
        margin-top: 100px;
        text-align: justify;
        -ms-text-justify: distribute-all-lines;
        text-justify: distribute-all-lines;

        /* just for demo */
        min-width: 612px;
    }

    .box {
        width: 225px;
        height: 225px;
        border-radius: 7px;
        vertical-align: top;
        display: inline-block;
        *display: inline;
        zoom: 1;
        margin-bottom: 50px;
        padding: 0;
        text-align: center;
    }
    .box:hover{
        box-shadow: none;
    }
    .box img{
        width: 100%;
        height: 100%;
        border-radius: 7px;
    }
    .box div{
        position: absolute;
        width: inherit;
        border-radius: 7px;
    }
    .stretch {
        width: 100%;
        display: inline-block;
        font-size: 0;
        line-height: 0;
    }
    #design-title{
        margin: 0 auto;
        text-align: center;
    }
    #design-title > ul{
        text-align: center;
    }
    .dropdown{
        display: inline-block;
    }
    .box p{
        font-size: 1.3em;
    }
    #bs-example-navbar-collapse-1{
        float: right;
    }
    .navbar-default .navbar-nav > li > a{
        color: #8A46CF;
        font-size: 1.5em;
    }
    .nav > li:hover{
        background-color: #8A46CF;
    }
    .nav > li , .nav > li a{
        height: 56px;
    }
    .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:hover{
        color: #fff;
    }
    .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:focus, .navbar-default .navbar-nav > .open > a:hover{
        background-color: #8A46CF;
        color: #fff;
    }
    .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a{
        height: 54px;
    }
    .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .open > a{
        background-image: none;
    }
    #design-title h3, #design-title select{
        display: inline-block;
    }
    #design-title h3{
        color: #fff;
    }
    select{
        margin-left: 10px;
        color: #000;
    }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://www.papermech.net/">
            <img id = "logo" alt="Brand" src="img/logo_blue-03.png">
          </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="#">How To</a></li>
        <li><a href="#">About</a></li>
        <!--<li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Explore<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>-->
      </ul>
    </div><!-- /.navbar-collapse -->
      </div>
    </nav>
    <div id = "design-title">
        <h3>Design Your Own Machine. Select your starting </h3>
         <select id = "dropdown" name="cars" onchange="changeMods()">
            <option value="motion">Motion</option>
            <option value="mechanism">Mechanism</option>
          </select>
    </div>
    <div id="container">
        <a id = "one-href" href = "open-close.php"><div class="box"><div><p id = "one">Open-Close</p></div><img src="img/flapping.PNG"></div></a>
        <a id = "two-href" href = "up-down.php"><div class="box"><div><p id = "two">Up-Down</p></div><img src="img/flapping.PNG"></div></a>
        <a id = "three-href" href = "flapping.php"><div class="box"><div><p id = "three">Flapping</p></div><img src="img/flapping.PNG"></div></a>
        <span class="stretch"></span>
        <br>
        <a id = "four-href" href = "#"><div class="box"><div><p id = "four">Rotate</p></div><img src="img/flapping.PNG"></div></a>
        <a id = "five-href" href = "#"><div class="box"><div><p id = "five">Zigzag</p></div><img src="img/flapping.PNG"></div></a>
        <a href = "custom.php"><div class="box"><div id = "custom"><p>Custom</p></div><img src="img/flapping.PNG"></div></a>
        <span class="stretch"></span>
        <br>
        <a id = "six-href" style = "display:none;" href = "#"><div class="box"><div><p id = "six">Jansen Mechanism</p></div><img src="img/flapping.PNG"></div></a>
    </div>
    <script type="text/javascript">
        function changeMods(){
            if(document.getElementById("dropdown").value == "mechanism"){
                document.getElementById('one').innerHTML = "Rack & Pinion";
                document.getElementById('one-href').href = "rackandpinion.php";
                document.getElementById('two').innerHTML = "Crank";
                document.getElementById('two-href').href = "crank.php";
                document.getElementById('three').innerHTML = "Cam";
                document.getElementById('three-href').href = "cam.php";
                document.getElementById('four').innerHTML = "Spur Gears";
                document.getElementById('four-href').href = "#";
                document.getElementById('five').innerHTML = "Planetary Gears";
                document.getElementById('five-href').href = "planetary.php";
                document.getElementById("six-href").style.display = "";
            }
            else{
                document.getElementById('one').innerHTML = "Open-Close";
                document.getElementById('one-href').href = "open-close.php";
                document.getElementById('two').innerHTML = "Up-Down";
                document.getElementById('two-href').href = "up-down.php";
                document.getElementById('three').innerHTML = "Flapping";
                document.getElementById('three-href').href = "flapping.php";
                document.getElementById('four').innerHTML = "Rotate";
                document.getElementById('four-href').href = "#";
                document.getElementById('five').innerHTML = "Zigzag";
                document.getElementById('five-href').href = "#";
                document.getElementById("six-href").style.display = "none";
            }
        }
    </script>
  </body>
</html>
