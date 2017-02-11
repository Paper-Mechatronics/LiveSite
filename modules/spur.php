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
    <title>Spur</title>
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
    <script src="js/spur.js" type="text/javascript"></script>
    <script src="js/showParts.js" type="text/javascript"></script>
    <script src="js/homeType.js" type="text/javascript"></script>
    <script src="js/updateUI.js" type="text/javascript"></script>
    <script src="js/scaling.js" type="text/javascript"></script>
    <div class = "container">
        <div class = "module-name">
            <p>Spur Gear +</p>
            <select id = "changeMotion" class = "rendering" onchange = "changeMotion()">
                <option value="flapping">Flapping</option>
                <option value="rotate">Rotating</option>
            </select>
        </div>
        <div class = "controls">
            <div id = "vertical-slider" class = "slider-div rotate">
                <label>Beam Length: <span id = "spurBeamLengthValue"></span></label>
                <br>
                <input type="range" id="spurBeamLength" value="0" min="0" max="215" oninput = "spurBeamLengthInput(this.value)" onchange = "changeSpurBeamLength()">
            </div>
            <br class = "rotate">

            <div class = "flapping">
                <div id = "a-slider" class = "slider-div">
                    <label>Flapping Parameters:</label>
                    <br>
                    <button class = "object btn btn-primary" type="button" id="symetrical" onclick="changeSymetrical()">Symetrical</button>
                    <button class = "object btn btn-primary" type="button" id="nonSymetrical" onclick="changeNonSymetrical()">Non-symetrical</button>
                </div>
                <br>
                <br>
                <div id = "a-slider" class = "slider-div nonSym">
                    <label>Display:</label>
                    <br>
                    <button class = "object btn btn-primary" type="button" id="leftWing" onclick="displayLeft()">Left Wing</button>
                    <button class = "object btn btn-primary" type="button" id="rightWing" onclick="displayRight()">Right Wing</button>
                </div>
                <br class = "nonSym">
                <br class = "nonSym">
                <div id = "a-slider" class = "slider-div">
                    <label>Horizontal Spacing: <span id = "horizontalSpaceValue"></span></label>
                    <input type="range" id="horizontalSpace" value="40" min="0" max="100" oninput = "horizontalInput(this.value)" onchange = "flapBeamSpaceUpdate()">
                </div>
                <br class = "">
                <div id = "a-slider" class = "slider-div">
                    <label>Vertical Spacing: <span id = "verticalSpaceValue"></span></label>
                    <br>
                    <input type="range" id="verticalSpace" value="0" min="0" max="250" oninput = "verticalInput(this.value)" onchange = "flapVerticalSpace(this.value)">
                </div>
                <br>
                <div id = "a-slider" class = "slider-div left nonSym">
                    <label>Connector Length L: <span id = "flapConnectorLengthValueL"></span></label>
                    <br>
                    <input type="range" id="flapConnectorLengthL" value="320" min="250" max="450" oninput = "flapConnectorInputL(this.value)" onchange = "flapConstraintLengthL(this.value)">
                </div>
                <br class = "left nonSym">
                <div id = "a-slider" class = "slider-div left nonSym">
                    <label>Beam Length L: <span id = "flapBeamWidthValueL"></span></label>
                    <br>
                    <input type="range" id="flapBeamWidthL" value="0" min="0" max="150" oninput = "flapBeamWidthInputL(this.value)" onchange = "flapBeamWidthL(this.value)">
                </div>
                <br class = "left nonSym">
                <div id = "a-slider" class = "slider-div left nonSym">
                    <label>Beam Height L: <span id = "flapBeamHeightValueL"></span></label>
                    <br>
                    <input type="range" id="flapBeamHeightL" value="0" min="0" max="150" oninput = "flapHeightInputL(this.value)" onchange = "flapBeamHeightL(this.value)">
                </div>
                <br class = "left nonSym">
                <div id = "a-slider" class = "slider-div right nonSym">
                    <label>Connector Length R: <span id = "flapConnectorLengthValueR"></span></label>
                    <br>
                    <input type="range" id="flapConnectorLengthR" value="320" min="250" max="450" oninput = "flapConnectorInputR(this.value)" onchange = "flapConstraintLengthR(this.value)">
                </div>
                <br class = "right nonSym">
                <div id = "a-slider" class = "slider-div right nonSym">
                    <label>Beam Length R: <span id = "flapBeamWidthValueR"></span></label>
                    <br>
                    <input type="range" id="flapBeamWidthR" value="0" min="0" max="150" oninput = "flapBeamWidthInputR(this.value)" onchange = "flapBeamWidthR(this.value)">
                </div>
                <br class = "right nonSym">
                <div id = "a-slider" class = "slider-div right nonSym">
                    <label>Beam Height R: <span id = "flapBeamHeightValueR"></span></label>
                    <br>
                    <input type="range" id="flapBeamHeightR" value="0" min="0" max="150" oninput = "flapHeightInputR(this.value)" onchange = "flapBeamHeightR(this.value)">
                </div>
                <br class = "right nonSym">
                <div id = "a-slider" class = "slider-div Sym">
                    <label>Connector Length: <span id = "flapConnectorLengthValue"></span></label>
                    <br>
                    <input type="range" id="flapConnectorLength" value="320" min="250" max="450" oninput = "flapConnectorInput(this.value)" onchange = "flapConstraintLength(this.value)">
                </div>
                <br class = "Sym">
                <div id = "a-slider" class = "slider-div Sym">
                    <label>Beam Length: <span id = "flapBeamWidthValue"></span></label>
                    <br>
                    <input type="range" id="flapBeamWidth" value="0" min="0" max="150" oninput = "flapBeamWidthInput(this.value)" onchange = "flapBeamWidth(this.value)">
                </div>
                <br class = "Sym">
                <div id = "a-slider" class = "slider-div Sym">
                    <label>Beam Height: <span id = "flapBeamHeightValue"></span></label>
                    <br>
                    <input type="range" id="flapBeamHeight" value="0" min="0" max="150" oninput = "flapHeightInput(this.value)" onchange = "flapBeamHeight(this.value)">
                </div>
                <br class = "Sym">
            </div>



            <!-- <div id = "a-slider" class = "slider-div">
                <label>Beam Offset: <span id = "flapBeamOffsetValue"></span></label>
                <br>
                <input type="range" id="flapBeamOffset" value="0" min="0" max="150" oninput = "flapOffsetInput(this.value)" onchange = "flapBeamOffset(this.value)">
            </div>
            <br> -->
        </div>
        <div class = "controls-dark">
            <div class = "rotate">
                <p>Gear 1 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear1" onclick="smallGear1()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear1" onclick="mediumGear1()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear1" onclick="largeGear1()">3</button>
            </div>
            <br class = "rotate">
            <div class = "rotate">
                <p>Gear 2 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear2" onclick="smallGear2()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear2" onclick="mediumGear2()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear2" onclick="largeGear2()">3</button>
            </div>
            <br class = "rotate">
            <div class = "rotate">
                <p>Gear 3 Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear3" onclick="smallGear3()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear3" onclick="mediumGear3()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear3" onclick="largeGear3()">3</button>
            </div>
            <br class = "rotate">

            <div class = "flapping">
                <p>Left Gear Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGearL" onclick="smallGearL()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGearL" onclick="mediumGearL()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGearL" onclick="largeGearL()">3</button>
            </div>
            <br class = "flapping">
            <div class = "flapping">
                <p>Right Gear Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGearR" onclick="smallGearR()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGearR" onclick="mediumGearR()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGearR" onclick="largeGearR()">3</button>
            </div>
            <br class = "flapping">
            <div>
                <p>Driver Gear:</p>
                <br>
                <button class = "object btn btn-primary" type="button" id="setDriveGearL" onclick="motorL()">Left</button>
                <button class = "object btn btn-primary" type="button" id="setDriveGearR" onclick="motorR()">Right</button>
            </div>
            <br>
            <div class = "flapping">
            <p>Motor Rotation:</p>
            <br>
                <button class = "object btn btn-primary" type="button" id="alternate" onclick="alternateMotor()">180</button>
                <button class = "object btn btn-primary" type="button" id="continuous" onclick="continuousMotor()">Continuous</button>
            </div>
            <br>
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
            <a href = "http://www.papermech.net/modules/spur.php">
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
