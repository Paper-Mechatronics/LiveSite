# PaperMech and FoldMecha
The PaperMech website showcases design tools and techniques for mechanical movements combined with paper crafting. The FoldMecha portion of site provides simulation tools to help users design simple movement machines. It allows users to design their own papercraft machines and then create a printable PDF that can be used to make these machines in real life.

PaperMech live site:
https://www.papermech.net

FoldMecha live site:
https://www.papermech.net/modules/create.php


## Development

### Site Structure
The files in the root folder and the files in `wp-admin`, `wp-content`, and `wp-includes` make up the PaperMech site. The main PaperMech site is built using WordPress.

The files in the `modules` folder make up the FoldMecha site. The FoldMecha site is a mixture of PHP, HTML, CSS, and JavaScript. It is a multi-page web application that relies heavily on JavaScript (much of this was pre-ES6 JavaScript, but updates were done in 2024 to modernize the JavaScript) and a small number of crucial 3rd party libraries. It does not use any bundling or build tools, does not include any linting, and uses jQuery and vanilla JavaScript for simple DOM manipulation (it does not use a modern front-end library like Vue or React).

`create.php` is the main landing page for FoldMecha. From this landing page, the user can select one of five machine types that they want to build. On each machine type page, a control panel is displayed on the left and a canvas element is displayed on the right. The canvas contains an animated machine based on the control panel settings.

### Key Libraries and Dependencies
- `Matter.js`: The animated machine section uses matter.js to render the machine. Matter.js is a JavaScript library that contains a 2D rigid body physics engine.
https://www.npmjs.com/package/matter-js
https://github.com/liabru/matter-js
- `jsPDF`: Users can output a machine as a PDF containing a set of printable components. This is done using jsPDF.  jsPDF is a library which can generate PDFs in JavaScript.  jsPDF also requires html2canvas.
https://www.npmjs.com/package/jspdf
https://github.com/parallax/jsPDF
- `Bootstrap`: Bootstrap components are used in the front-end display of the site.
- `jQuery`: jQuery is used for DOM manipulation.

### Running Locally

#### FoldMecha
At present, the several of the required FoldMecha files are .php files. Running locally requires starting a PHP server. There is discussion around doing this here:

https://stackoverflow.com/questions/9318858/is-it-possible-to-run-php-files-on-my-local-computer

Another option is to temporarily remove the PHP headers and change the files to .html files. For example, in `rotate.php` we would remove the following and change the file to `rotate.html`:
```
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
```
 One of the development tasks is to convert these PHP files to HTML files (so eventually we will not have PHP files in FoldMecha). Once this is done either temporarily or permanently, a local server can be run and the site can be viewed in the browser. There are many ways to start a local server. We can install `http-server` using NPM and then fire up a server from a command line using the command `http-server`. If Python is installed, it can be used to run a local server from the command line using the command `python3 -m http.server`. Or we can use VS Code and a simple extension to run a local server.
- Install the "Live Server" VS Code extension.
- Right-click `create.html`, and select "Open with Live Server".

### Updating the Live Site
The site is hosted on SiteGround and the main file mananger can be accessed here:
https://tools.siteground.com/filemanager
FoldMecha files are uploaded to the `modules` folder. To update a file simply overwrite the existing file in the `modules` folder.

#### Staging
At present there is no staging portion of the site. Ideally, a staging folder will be made on SiteGround where changes can be uploaded and tested. To do so, relative paths need to be added to file imports so files can be uploaded to a folder other than the `modules` folder.

### Features and Bugs
Features and bugs are tracked using GitHub issues. A list of issues can be seen here:
https://github.com/Paper-Mechatronics/LiveSite/issues

When new bugs are found or feature requests are made, open a new GitHub issue to keep track of the bug or request.

#### Original Site Issue list
This list is from the original site creation. These items have not yet been added to the ongoing GitHub issues list:
- support CCW rotation
- support rotation in individual units
- center position calculation for push() translate() rotate()
- calling individual object instance (not only compGear()) when same modules are saved
- linked module does not have rotation buttons
- my sketch widget per saved module should be renamed/reorganized
- my sketch ui should be redesigned as suggested
- slider value updates should be stabilized
- _this.currentModule == pageMode

## Related Works
[Modular Design Principles](http://www.mcs.anl.gov/~itf/dbpp/text/node40.html)

