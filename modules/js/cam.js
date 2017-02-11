//Module/submodule indicator
openCloseMod = false
camModule = true
//position from bottom for beams
var rectBase = 600
//initial variable values
var pivotValue = 0
var c = 432
var originalWidth1
var originalWidth2
var camMod = true;


////////////CHANGE GEAR SIZES///////////////////////////////////
function smallGear(){
  //first remove constraint between gear and beam
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  //reset gear position
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  //reset gear angle
  Body.setAngle(compositeArray[1].bodies[0], 0)
  //set radius for new gear to be drawn
  radius = 48;
  //set class variable to new radius value
  compositeArray[1].radius = radius;
  //set number of steps for specific size of gear
  steps = (0.25 * radius)*2;
  //set specific tooth width
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  // call changeBody function from functions.js
  if(camMod == true){
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
}
// see smallGear()
function mediumGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
  
}
// see smallGear()
function largeGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
  
}
//////////////////////////////////////////////////////////////////////////
//inializes/resets cam module
function cam(){
  //reset steps
  steps = 40;
  //reset width
  camWidth = 40;
  //change shape of compositeArray[0] - from functions.js
  changeBody5(0,200);
  //change shape of compositeArray[1] - from functions.js
  changeBody2(1);
  //set positions
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y - 200})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  //set constraint positions
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y - 60
  //set as continuous gear
  compositeArray[1].alternate = false;
  //create constraints to single circular orb
  createUIConstraintsSingle(compositeArray[0], 50, 100,10)  
}
//function that would trigger when you change the motion dropdown
function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "upDown"){
    pivotValue = 0
    prevSpaceValue = 50
    prevPivotValue = 100;
    openCloseMod = false;
    // remove circular ui orbs
    removeUIConstraints(compositeArray[0])
    if(!compositeArray[0].bodies[1]){
      createUIConstraintsSingle(compositeArray[0], 50, 0,10)
    }
    // remove constraints
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    // remove unnecessary shapes if they exist
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
  }
  else if(string == "openClose"){
    pivotValue = 0
    prevSpaceValue = 50
    prevPivotValue = 0;
    // remove ui orbs
    removeUIConstraintsSingle(compositeArray[0])
    openCloseMod = true;
    // add open close beams
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.5)-200,compositeArray[0].constraints[0].pointA.y-400)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.5)+200,compositeArray[0].constraints[0].pointA.y-400)
    // create two ui orbs
    createUIConstraints(compositeArray[0], 50, 0,6)
    // set initial width of beams so we can track when we change length
    originalWidth1 = compositeArray[2].width
    originalWidth2 = compositeArray[3].width
    // create fake constraints between beams and gears
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    pivotHeight(0)
  }
  
}
// initial values for beam parameters
var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
var beamSpace = 50
// horizontal spacing function
function beamSpacing(value){
  changeSpaceWidth = value - prevSpaceValue
  if (openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changeSpaceWidth = value - prevSpaceValue
      // change constraint positions
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
      jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
      jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth
    }
  }
  prevSpaceValue = value
  beamSpace = parseInt(value);
  // change constraint color back to normal
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  
}
// initial pivot values
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
//change vertical height 
function pivotHeight(value){
  if(openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changePivotHeight = value - prevPivotValue  
      // change constraint positions    
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y - changePivotHeight
      prevPivotValue = value
      pivotValue = value
    }
  }
  else{
    changePivotHeight = value - prevPivotValue
    prevPivotValue = value
    pivotValue = value
  }
  compositeArray[0].constraints[2].render.lineWidth = 2
  compositeArray[0].constraints[2].render.strokeStyle = "#666"
  
}
// horizontal constraint position on beams
function constraintPosition(value){
  if (openCloseMod){
    // remove constraints 
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    // change beam width parameter value
    compositeArray[2].width = originalWidth1 - value
    compositeArray[3].width = originalWidth2 - (-value)
    // create fake constraints from ui orbs to beams
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],parseInt(-value),originalWidth1)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],parseInt(value), originalWidth2)
    // change constraint positions
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + (prevSpaceValue - 50)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - (prevSpaceValue - 50)
  }
}
// constant updating 
Events.on(engine, 'afterUpdate', function(event) {
      if(openCloseMod){
        var bottom = compositeArray[0].constraints[0].pointA.y - rectBase
        var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
        var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
        var rectWidth = compositeArray[2].width
        var b = top  - bottom
        var a = compositeArray[2].width
        var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
        var degrees = angleC * (180/Math.PI)
        // update beam rotation angle
        if(angleC){
          Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
          Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
        }
        // prevent any movement on x and y axis
        Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
        Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})

      }
      // console.log(compositeArray[1].shape)
})

////////////////////// RUN /////////////////////////////
// first add composites to scene when it loads
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
// compositeArray[1] is motor and it is 180 rotation
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
// change lingear shape to cam shape
cam();
compositeArray[0].constraints[0].stiffness = 0.01
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)
