<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Paper Mechatronics - Create</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/png" href="img/logo_webTab.png"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="css/create.css">
  </head>
  <body>
    <script src="js/readType.js" type="text/javascript"></script>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://www.papermech.net/">
            <img id = "logo" alt="Brand" src="img/logo_blue-03.png">
          </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="http://www.papermech.net/how-to/">How To</a></li>
        <li><a href="http://www.papermech.net/about/">About</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
      </div>
    </nav>
    <div id = "design-title">
        <h3>Design Your Own Machine. Select your starting </h3>
         <select id = "dropdown" onchange="changeMods()">
            <option value="motion">Motion</option>
            <option value="mechanism">Mechanism</option>
          </select>
    </div>
    <div id="container">
        <a id = "one-href" href = "open-close.php"><div class="box"><div><p id = "one">Open-Close</p></div><img id = "one-img" src="img/OpenClose2.gif"></div></a>
        <a id = "two-href" href = "up-down.php"><div class="box"><div><p id = "two">Up-Down</p></div><img id = "two-img" src="img/UpDown2.gif"></div></a>
        <a id = "three-href" href = "flapping.php"><div class="box"><div><p id = "three">Flapping</p></div><img id = "three-img" src="img/flapping2.gif"></div></a>
        <span class="stretch"></span>
        <br>
        <a id = "four-href" href = "rotate.php"><div class="box"><div><p id = "four">Rotating</p></div><img id = "four-img" src="img/rotate3.gif"></div></a>
        <a id = "five-href" href = "#"><div class="box"><div><p id = "five">Walking</p></div><img id = "five-img" src="img/walking.gif"></div></a>
        <a id = "six-href" style = "visibility:hidden;" href = "#"><div class="box"><div><p id = "six">Jansen Mechanism</p></div><img id = "seven-img" src="img/walking.gif"></div></a>
        <span class="stretch"></span>
        <br>
        <a id = "custom-button" href = "#"><div class="rectangle"><div><p id = "five">Create Your Own Machine!</p></div></div></a>

    </div>
    <script type="text/javascript" src = "js/create.js"></script>
  </body>
</html>
