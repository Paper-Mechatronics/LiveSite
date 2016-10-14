upDownModule = true;
rackPinionMod = true;
camMod = false;
crankMod = false;
// generate small gear
function smallGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    changeBody2(1)
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
  tickFunction()
}
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
    changeBody2(1)
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
  tickFunction()
}
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
    changeBody2(1)
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
  tickFunction()
}
function rackPinion(){
  removeUIConstraintsSingle(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // radius = 80;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody4(0);
  changeBody(1);
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.58)})
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.7)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8))
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.58)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.7)
  compositeArray[1].alternate = true;
  createUIConstraintsSingle(compositeArray[0], 50, 0,10)
}
function cam(){
  removeUIConstraintsSingle(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // radius = 60;
  steps = 40;
  camWidth = 40;
  changeBody5(0,200);
  changeBody2(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.5)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y - 150
  compositeArray[1].alternate = false;
  createUIConstraintsSingle(compositeArray[0], 50, 0,10)
  tickFunction()
}
function crank(){
  removeUIConstraintsSingle(compositeArray[0])
  // createUIConstraintsSingle(compositeArray[0], 50, 0,10)
  // radius = 80;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody3(0);
  changeBodyCircle(1);
  createUIConstraintsSingle(compositeArray[0], 50, 0,10)
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.5)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  compositeArray[1].alternate = false;
  tickFunction()
}
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
    compositeArray[0].constraints[0].stiffness = 0.01
  }
  else if(string == "crank"){
    crankMod = true;
    camMod = false;
    rackPinionMod = false;
    crank();
    compositeArray[0].constraints[0].stiffness = 0.001
  }
}

function continuous(){
  if(rackPinionMod){
    compositeArray[1].alternate = false;
    changeBodyContinuous(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
    compositeArray[0].constraints[0].stiffness = 0.001
    compositeArray[1].motorDir = 1;
    // engine.world.gravity.y = 0.3;
  }
  else{
    compositeArray[1].alternate = false;
  }
}
function alternatingGear(){
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
  // engine.world.gravity.y = 0.3;
}
function circleJointHeight(value){
  if(crankMod){
    changeHeightValue = value - 50
    Body.setAngle(compositeArray[1].bodies[0], 0)
    for(var i = 0; i<jointComposites.length; i++){
      if(jointComposites[i].constraints[0].bodyA == compositeArray[0].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[1].bodies[0]){
        jointComposites[i].constraints[0].length = 300 + changeHeightValue
        jointComposites[i].constraints[0].render.lineWidth = 2
        jointComposites[i].constraints[0].render.strokeStyle = "#666"
      }
      else if(jointComposites[i].constraints[0].bodyA == compositeArray[1].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[0].bodies[0]){
        jointComposites[i].constraints[0].length = 300 + changeHeightValue
        jointComposites[i].constraints[0].render.lineWidth = 2
        jointComposites[i].constraints[0].render.strokeStyle = "#666"
      }
    }
  }
  tickFunction()
}

var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
function beamSpacing(value){
  changeSpaceWidth = value - prevSpaceValue
  prevSpaceValue = value
  beamSpace = parseInt(value);
  // console.log("BeamSpace Value = " + value)
  document.getElementById("horizontalSpaceValue").innerHTML = value
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  tickFunction()
}

var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  if(crankMod){
    circleJointHeight(value)
  }
  else{
    changePivotHeight = value - prevPivotValue
    // jointComposites[totalJointComposites-1].constraints[0].pointA.y = jointComposites[totalJointComposites-1].constraints[0].pointA.y - changePivotHeight
    // jointComposites[totalJointComposites-2].constraints[0].pointA.y = jointComposites[totalJointComposites-2].constraints[0].pointA.y - changePivotHeight
    prevPivotValue = value
    pivotValue = value
    // rotationPoint = value/150
    console.log("Pivot Value = " + value)
  }
  compositeArray[0].constraints[2].render.lineWidth = 2
  compositeArray[0].constraints[2].render.strokeStyle = "#666"
  tickFunction()
}


////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*(0.7))
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*1.8)) ,(window.innerHeight)*(0.58))
createUIConstraintsSingle(compositeArray[0], 50, 0,10)
// Composite.add(compositeArray[0],Bodies.circle(compositeArray[0].constraints[0].pointA.x,compositeArray[0].constraints[0].pointA.y -275, 10))
// addCircleComposite(compositeArray[0].constraints[0].pointA.x, compositeArray[0].constraints[0].pointA.y - 275, 10)
// createConstraint2(compositeArray[0].bodies[0], compositeArray[0].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
console.log(compositeArray[1].bodies[0].position.x-150)
console.log(compositeArray[1].bodies[0].position.y)
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)