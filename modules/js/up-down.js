// module/submodule indicator
upDownModule = true;
rackPinionMod = true;
camMod = false;
crankMod = false;
var constraintLength = 0
pivot2Value = 100
////////////////////////////////GEAR SIZES//////////////////////////////////////////////
function smallGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  if(crankMod){
    radius = radius + 52
  }
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
  }
  else{
    changeBody(1);
  }
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8))
  }
  // document.getElementById("")
  pivotHeight(constraintLength)
}
function mediumGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  if(crankMod){
    radius = radius + 52
  }
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
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
  }
  else{
    changeBody(1);
  }
  console.log(compositeArray[0].bodies[0].position.x);
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8))
  }
  
  pivotHeight(constraintLength)
}
function largeGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  if(crankMod){
    radius = radius + 52
  }
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
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
  }
  else{
    changeBody(1);
  }
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8))
  }
  
  pivotHeight(constraintLength)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// initialize or reset specific module
function rackPinion(){
  // reset radius if module was crank
  resetRadius()
  // remove ui constraints
  removeUIConstraintsSingle(compositeArray[0])
  // delete linkage constraints
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // change steps and tooth width
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  // add new bodies
  changeBody4(0);
  changeBody(1);
  // set new positions for bodies
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.58)})
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.7)})
  // set new constraint positions for new bodies
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8))
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.58)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.7)
  // set as 180 motor
  compositeArray[1].alternate = true;
}
// initialize or reset specific module
function cam(){
  // reset radius if it was crank
  resetRadius()
  // remove ui constraints
  removeUIConstraintsSingle(compositeArray[0])
  // remove linkage constraints
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // change step size
  steps = 40;
  camWidth = 40;
  // draw and change body
  changeBody5(0,200);
  changeBody2(1);
  // change position
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y - 100})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  // change constraint position
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y - 60
  // 360 motor
  compositeArray[1].alternate = false;
  createUIConstraintsSingle(compositeArray[0], 50, 100,10)
}
// initialize or reset specific module
function crank(){
  // remove ui constraints
  removeUIConstraintsSingle(compositeArray[0])
  // set new radius for crank module
  crankRadius()
  // store radius
  compositeArray[1].radius = radius
  // change steps and tooth width
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  // add new bodies
  changeBody3(0);
  changeBodyCircle(1);
  // set position of new bodies
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.5)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  // set constraint positions of new bodies
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
  // create new linkage constraint
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  pivotHeight(constraintLength)
  // 360 motor
  compositeArray[1].alternate = false;
}
// change module if dropdown changes
function changeMech(){
  var string = document.getElementById("changeMech").value;
  if(string == "rack-pinion"){
    rackPinionMod = true;
    camMod = false;
    crankMod = false;
    rackPinion();
    compositeArray[0].constraints[0].stiffness = 0.001
  }
  else if(string == "cam"){
    camMod = true;
    crankMod = false;
    rackPinionMod = false;
    cam();
    compositeArray[0].constraints[0].stiffness = 0.005
  }
  else if(string == "crank"){
    crankMod = true;
    camMod = false;
    rackPinionMod = false;
    crank();
    compositeArray[0].constraints[0].stiffness = 0.001
  }
}
// make gear 360
function continuous(){
  if(rackPinionMod){
    compositeArray[1].alternate = false;
    // change gear body to 360 gear
    changeBodyContinuous(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
    compositeArray[0].constraints[0].stiffness = 0.001
    compositeArray[1].motorDir = 1;
  }
  else{
    compositeArray[1].alternate = false;
  }
  if(compositeArray[1].shape == "shell"){
    compositeArray[1].motorDir = -1;
  }
}
// set gear/motor as 180
function alternatingGear(){
  if(camMod){
    Body.setPosition(compositeArray[0].bodies[0], {x:window.innerWidth*0.45, y: window.innerHeight*0.4})
  }
  if(rackPinionMod){
    changeBody(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
    compositeArray[1].alternate = true;
    compositeArray[0].constraints[0].stiffness = 0.00001
    compositeArray[1].motorDir = 1;
  }
  else{
    compositeArray[1].alternate = true;
  }
}
// if crank module set vertical height
function circleJointHeight(value){
  if(crankMod){
    changeHeightValue = parseInt(value)
    Body.setAngle(compositeArray[1].bodies[0], 0)
    for(var i = 0; i<jointComposites.length; i++){
      if(jointComposites[i].constraints[0].bodyA == compositeArray[0].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[1].bodies[0]){
        jointComposites[i].constraints[0].length = 350 + changeHeightValue
        jointComposites[i].constraints[0].render.lineWidth = 2
        jointComposites[i].constraints[0].render.strokeStyle = "#666"
        console.log(jointComposites[i].constraints[0].length)
      }
      else if(jointComposites[i].constraints[0].bodyA == compositeArray[1].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[0].bodies[0]){
        jointComposites[i].constraints[0].length = 350 + changeHeightValue
        jointComposites[i].constraints[0].render.lineWidth = 2
        jointComposites[i].constraints[0].render.strokeStyle = "#666"
        console.log(jointComposites[i].constraints[0].length)
      }
    }
    constraintLength = parseInt(value)
  }
  
}
// set horizontal spacing
var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
function beamSpacing(value){
  changeSpaceWidth = value - prevSpaceValue
  prevSpaceValue = value
  beamSpace = parseInt(value);
  document.getElementById("horizontalSpaceValue").innerHTML = value
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  
}

var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
// set vertical spacing
function pivotHeight(value){
  if(crankMod){
    circleJointHeight(value)
  }
  if(camMod){
    changePivotHeight = value - prevPivotValue
    prevPivotValue = value
    pivotValue = value
    pivot2Value = 100 + parseInt(value)
    compositeArray[0].constraints[1].render.lineWidth = 2
    compositeArray[0].constraints[1].render.strokeStyle = "#666"
  }
  else{
    changePivotHeight = value - prevPivotValue
    prevPivotValue = value
    pivotValue = value
    console.log("Pivot Value = " + value)
  }
  if(jointComposites[jointComposites.length-1]){
    jointComposites[jointComposites.length-1].constraints[0].render.lineWidth = 2
    jointComposites[jointComposites.length-1].constraints[0].render.strokeStyle = "#666"
  }
  constraintLength = parseInt(value)
  
}
function yDistance(){
  var distance = Math.round(compositeArray[0].bodies[0].position.y-200)
  document.getElementById("y-distance").innerHTML = distance
}
// set radius to original radius -52
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
// set radius for crank +52
function crankRadius(){
  if(radius == 80 || radius == 64 || radius == 48){
      radius = radius + 52
    }
}

Events.on(engine, 'beforeUpdate', function(event){
  resetRadius()
})
////////////////////// RUN /////////////////////////////

// add initial bodies to simulation for rack and pinion up and down
addLinGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*(0.7))
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8)) ,(window.innerHeight)*(0.58))
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
console.log(compositeArray[1].bodies[0].position.x-150)
console.log(compositeArray[1].bodies[0].position.y)
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)