crankModule = true;
var openCloseMod = false;

////////////////////// CREATE VERtiCES TO DRAW SHAPES //////////////

// generate small gear
function smallGear(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  // Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}
function mediumGear(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  // Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}
function largeGear(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  // Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}

function openClose(){
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.5)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.9)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.9)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
  addRectComposite(300, 5,(window.innerWidth)*(0.75*0.5)-200,compositeArray[0].constraints[0].pointA.y-300)
  addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.5)+200,compositeArray[0].constraints[0].pointA.y-300)
}
function upDown(){
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.4)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.8)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.8)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.4)
  removeComposite(compositeArray[3].bodies[0])
  removeComposite(compositeArray[2].bodies[0])
}
function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "openClose"){
    openCloseMod = true;
    openClose();
  }
  else if(string == "upDown"){
    openCloseMod = false;
    upDown();
  }
}





///////////////// Animation /////////////////////////////////////


// called every frame after physics is applied
// same as above
Events.on(engine, 'afterUpdate', function(event) {
  if(openCloseMod == true){
    var gear2CenterY = compositeArray[1].bodies[0].position.y
    var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    var gear1CenterY = compositeArray[1].bodies[0].position.y
    var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    Body.setAngle(compositeArray[2].bodies[0], (gear2CenterChangeY)/-150)
    Body.setAngle(compositeArray[3].bodies[0], (gear1CenterChangeY)/150)
  }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*(0.4))
addGearComposite((window.innerWidth)*(0.75*0.5) ,(window.innerHeight)*(0.8))
changeBody3(0)
compositeArray[0].constraints[0].stiffness = 0.0001;
createConstraint2(compositeArray[0].bodies[0],compositeArray[1].bodies[0])
compositeArray[1].isMotor = true;
Engine.run(engine);
Render.run(render);

