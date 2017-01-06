// module indicators
crankModule = true
crankMod = true;
openCloseMod = false;
// initial values
var c = 369
var rectBase = 600
linkageLength = 0;
var originalWidth1
var originalWidth2
/////////////////////////// CHANGE GEAR SIZE ///////////////////////////////////////////
function smallGear(){
  //remove ui constraints
  removeUIConstraints(compositeArray[0])
  // delete linkages
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
  // reset position and angle
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  // set new radius - 52 larger than normal radius size
  radius = 48+52;
  // set class parameter value
  compositeArray[1].radius = radius;
  // set number of steps to make up gear
  steps = (0.25 * radius)*2;
  // set specific tooth width
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  // redraw circle and shape - functions.js
  changeBodyCircle(1)
  // create the constraints
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    createUIConstraints(compositeArray[0], beamSpace, 0,6)
  }
  pivotHeight(linkageLength)
}
// see small gear comments
function mediumGear(){
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64+52;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1)
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    createUIConstraints(compositeArray[0], beamSpace, 0,6)
  }
  pivotHeight(linkageLength)
}
// see small gear comments
function largeGear(){
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80+52;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1)
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(openCloseMod){
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    createUIConstraints(compositeArray[0], beamSpace, 0,6)
  }
  pivotHeight(linkageLength)
}
////////////////////////////////////////////////////////////////////////////////////////
// module initialization/ reset function
function crank(){
  // remove any UI elements
  removeUIConstraints(compositeArray[0])
  // set radius to +52
  crankRadius()
  // remove constraint between crank and UI
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  // change body shapes - functions.js
  changeBodyCircle(1);
  changeBody3(0);
  // create 2 ui circular orbs
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  // set position of new shapes
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint-250 + 8.0620080523284 - parseInt(pivotValue)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
  // set constraint locations 
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight*0.7)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y-250
  // create linkages
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // make 360 rotating gear
  compositeArray[1].alternate = false;
  pivotHeight(linkageLength)
}
// run this function when change motion from dropdown
function changeMotion(){
  var string = document.getElementById("changeMech").value;
  if(string == "upDown"){
    openCloseMod = false
    removeUIConstraints(compositeArray[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight*0.7)
  }
  else if(string == "openClose"){
    openCloseMod = true
    createUIConstraints(compositeArray[0], beamSpace, 0,6)
    addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
    addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
    originalWidth1 = compositeArray[2].width
    originalWidth2 = compositeArray[3].width
    newWidth1 = originalWidth1
    newWidth2 = originalWidth2
    Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint-250 + 8.0620080523284 - parseInt(pivotValue)})
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)- basePoint
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y-250
    compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
    compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    compositeArray[1].alternate = false;
  }
}
// make motor 360
function continuous(){
  compositeArray[1].alternate = false;
}
// make motor 180
function alternatingGear(){
  compositeArray[1].alternate = true;
}

var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
// horizontal spacing
function beamSpacing(value){
  if(compositeArray[2] && compositeArray[3]){
    changeSpaceWidth = value - prevSpaceValue
    compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
    compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
    prevSpaceValue = value
    beamSpace = parseInt(value);
  }
  document.getElementById("horizontalSpaceValue").innerHTML = value
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
// vertical spacing
function pivotHeight(value){
  circleJointHeight(value)
}
var constraintPvalue = 0
// constraint pivot along beam
function constraintPosition(value){
  Body.setAngle(compositeArray[2].bodies[0], 0)
  Body.setAngle(compositeArray[3].bodies[0], 0)
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  compositeArray[2].width = newWidth1 - value
  compositeArray[3].width = newWidth2 - (-value)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,newWidth1)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, newWidth2)
  if(!crankMod){
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + (prevSpaceValue - 50)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - (prevSpaceValue - 50)
  }
  jointComposites[jointComposites.length-1].constraints[0].pointB.x = jointComposites[jointComposites.length-1].constraints[0].pointB.x + ((newWidth1/2)-150)
  jointComposites[jointComposites.length-2].constraints[0].pointB.x = jointComposites[jointComposites.length-2].constraints[0].pointB.x - ((-newWidth2/2)-150)  
  constraintPvalue = parseInt(value)
}
var prevHeightValue = 50;
var changeHeightValue;
// 
function circleJointHeight(value){
  changeHeightValue = parseInt(value)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<jointComposites.length; i++){
    if(jointComposites[i].constraints[0].bodyA == compositeArray[0].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[1].bodies[0]){
      jointComposites[i].constraints[0].length = 350 + changeHeightValue
      jointComposites[i].constraints[0].render.lineWidth = 2
      jointComposites[i].constraints[0].render.strokeStyle = "#666"
    }
    else if(jointComposites[i].constraints[0].bodyA == compositeArray[1].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[0].bodies[0]){
      jointComposites[i].constraints[0].length = 350 + changeHeightValue
      jointComposites[i].constraints[0].render.lineWidth = 2
      jointComposites[i].constraints[0].render.strokeStyle = "#666"
    }
    module.pivot2Point = parseInt(changeHeightValue)
  }
  
}
// reset radius to normal module -52
function resetRadius(){
  if(!crankMod){
    if(compositeArray[1].radius != 80 && compositeArray[1].radius != 64 && compositeArray[1].radius != 48){
      compositeArray[1].radius = compositeArray[1].radius - 52
    }
    if(radius != 80 && radius != 64 && radius != 48){
      radius = radius - 52
    }
  }
}
// set radius to normal +52
function crankRadius(){
  if(radius == 80 || radius == 64 || radius == 48){
      radius = radius + 52
    }
}
// constant update - prevent bugs and unnecessary movement
Events.on(engine, 'beforeUpdate', function(event){
  if(compositeArray[2] && compositeArray[3]){
    if(compositeArray[2].bodies[0].angularVelocity>0.1 || compositeArray[2].bodies[0].angularVelocity<-0.1){
      Body.setAngularVelocity(compositeArray[2].bodies[0], 0)
      Body.setAngularVelocity(compositeArray[3].bodies[0], 0)
      Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
      Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    }
  }
})
// constant update - set angle of beams based off rotation of crank
Events.on(engine, 'afterUpdate', function(event) {
  if(openCloseMod){
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = -parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-1].constraints[0].pointA.y = -parseInt(pivot2Value)
    jointComposites[jointComposites.length-2].constraints[0].pointA.y = -parseInt(pivot2Value)
    var a1 = (compositeArray[2].constraints[0].pointA.x - (300* Math.cos(compositeArray[2].bodies[0].angle)))
    var b1 = (compositeArray[2].constraints[0].pointA.y - (300* Math.sin(compositeArray[2].bodies[0].angle)))
    var a2 = compositeArray[0].bodies[1].position.x
    var b2 = compositeArray[0].bodies[1].position.y
    var d = Math.sqrt( (a1-a2)*(a1-a2) + (b1-b2)*(b1-b2) );
    var bottom = compositeArray[0].constraints[0].pointA.y - rectBase
    var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
    var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
    var rectWidth = compositeArray[2].width
    var b = top  - bottom
    var a = compositeArray[2].width
    var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
    var degrees = angleC * (180/Math.PI)
    if(angleC){
      if((angleC - 1.5708)<-1){
        
      }
      else if(compositeArray[2].bodies[0].angularVelocity>0.1 || compositeArray[2].angularVelocity<-0.1){
        Body.setAngularVelocity(compositeArray[2].bodies[0], 0)
        Body.setAngularVelocity(compositeArray[3].bodies[0], 0)
      }
      else{
        Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
        Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
      }
    }
    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    if(compositeArray[1].alternate == false && rackPinionMod == true){
      if(compositeArray[1].bodies[0].angle >= (2*Math.PI) ){
        Body.setAngle(compositeArray[1].bodies[0], 0)
      }
      if(compositeArray[1].bodies[0].angle > Math.PI+0.5 || compositeArray[1].bodies[0].angle < 0.5){
        if(compositeArray[0].bodies[0].position.y >= compositeArray[0].constraints[0].pointA.y){
          Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].constraints[0].pointA.y})
          Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:0})
        }
        else{
          Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:3})
        } 
      }
    }
  }
})

function yDistance(){
  var distance = Math.round(compositeArray[0].bodies[0].position.y-200)
  document.getElementById("y-distance").innerHTML = distance
}

Events.on(engine, 'beforeUpdate', function(event){
})
////////////////////// RUN /////////////////////////////

// create initial gear parts
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
compositeArray[0].constraints[0].stiffness = 0.0000001;
createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue,6)
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
compositeArray[1].motorSpeed = 0.021
module.motorSpeed = compositeArray[1].motorSpeed*1000
pivotHeight(0)
///////////// Change to Crank//////////
crankMod = true;
camMod = false;
rackPinionMod = false;
crank();
compositeArray[0].constraints[0].stiffness = 0.001
removeUIConstraints(compositeArray[0])
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)