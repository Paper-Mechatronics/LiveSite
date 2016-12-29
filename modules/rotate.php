<?php
include('../wp-blog-header.php');

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
    <title>Rotating</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/png" href="img/logo_webTab.png"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="js/decomp.js" type="text/javascript"></script>
    <script src="matterJS/build/matter.js" type="text/javascript"></script>
    <script src="matterJS/build/Examples.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="css/module.css">
  </head>
  <body>
    <script src="js/functions.js" type="text/javascript"></script>
    <script src="js/rotate.js" type="text/javascript"></script>
    <script src="js/showParts.js" type="text/javascript"></script>
    <script src="js/homeType.js" type="text/javascript"></script>
    <script src="js/updateUI.js" type="text/javascript"></script>
    <script src="js/scaling.js" type="text/javascript"></script>
    <div class = "container">
        <div class = "module-name">
            <p>Rotate +</p>
            <select id = "changeMech" class = "rendering" onchange = "changeMech()">
                <option value="spur">Spur Gear</option>
                <option value="planetary">Planetary Gear</option>
            </select> 
        </div>
        <div class = "controls spur">
            <div id = "preview">
            </div>
            <div id = "vertical-slider" class = "slider-div spur">
                <label>Beam Length: <span id = "spurBeamLengthValue"></span></label>
                <br>
                <input type="range" id="spurBeamLength" value="0" min="0" max="215" oninput = "spurBeamLengthInput(this.value)" onchange = "changeSpurBeamLength()">
            </div>
            <br>
        </div>
        <div class = "controls-dark">
            <div class = "spur">
                <p>Gear 1 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear1" onclick="smallGear1()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear1" onclick="mediumGear1()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear1" onclick="largeGear1()">3</button>
            </div>
            <br class = "spur">
            <div class = "spur">
                <p>Gear 2 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear2" onclick="smallGear2()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear2" onclick="mediumGear2()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear2" onclick="largeGear2()">3</button>
            </div>
            <br class = "spur">
            <div class = "spur">
                <p>Gear 3 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear3" onclick="smallGear3()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear3" onclick="mediumGear3()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear3" onclick="largeGear3()">3</button>
            </div>
            <br class = "spur">
            <div class = "spur">
                <p>Driver Gear:</p>
                <br>
                <button class = "object btn btn-primary" type="button" id="setDriveGearL" onclick="motorL()">Left</button>
                <button class = "object btn btn-primary" type="button" id="setDriveGearR" onclick="motorR()">Right</button>
            </div>
            <br class = "spur">
            <div class = "planetary">
                <p>Motor Gear Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear1P" onclick="smallGear1Planetary()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear1P" onclick="mediumGear1Planetary()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear1P" onclick="largeGear1Planetary()">3</button>
            </div>
            <br class = "planetary">
            <div class = "planetary">
                <p>Static Gear Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear2P" onclick="smallGear2Planetary()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear2P" onclick="mediumGear2Planetary()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear2P" onclick="largeGear2Planetary()">3</button>
            </div>
            <br class = "planetary">
            <!-- <div>
            <p>Motor Rotation:</p>
            <br>
                <button class = "object btn btn-primary" type="button" id="alternate" onclick="alternateMotor()">180</button>
                <button class = "object btn btn-primary" type="button" id="continuous" onclick="continuousMotor()">Continuous</button>
            </div>
            <br> -->
            <div id = "a-slider" class = "slider-div">
                <label>Motor Speed: <span id = "motorSpeedValue"></span> (<span id = "motorAngleValue"></span>&deg;)</label>
                <br>
                <button class = "object btn btn-primary simulation glyphicon glyphicon-pause" type="button" onclick="pause()"><!-- <span class="glyphicon glyphicon-pause" aria-hidden="true"></span> --></button>
                <input class = "simulation" type="range" id="motorSpeed" value="40" min="0" max="50" oninput = "speedInput(this.value)" onchange = "changeMotorSpeed(this.value)">
                <br>
            </div>
            <br>
            <br>
            <!--<div>
            <p>Simulation:</p>
            <br>
                <button class = "object btn btn-primary" type="button" id="alternate" onclick="startRunner()">Start</button>
                <button class = "object btn btn-primary" type="button" id="continuous" onclick="stopRunner()">Stop</button>
            
            </div>-->
        </div>
        <div class = "footer">
            <a href = "http://www.papermech.net/rotate.php">
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/reset.png"></button>
                    <br>
                    <p>Reset</p>
                </div>
            </a>
            <a id = "showParts" href = "#" onclick = "showParts()">
                <div class = "footer-btn-div">
                    <button href = "http://www.papermech.net/jsPDF/parts.html" class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/show_parts.png"></button>
                    <br>
                    <p>Show Parts</p>
                </div>
            </a>
            <a href = "#" onclick="transferType()" >
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/home.png"></button>
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