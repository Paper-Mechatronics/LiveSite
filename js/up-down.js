upDownModule = true;
// generate small gear
function smallGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    changeBody2(1)
  }
  else{
    changeBody(1);
  }
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
}
function mediumGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    changeBody2(1)
  }
  else{
    changeBody(1);
  }
  console.log(compositeArray[0].bodies[0].position.x);
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
}
function largeGear(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(camMod == true){
    changeBody2(1)
  }
  else{
    changeBody(1);
  }
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
}
function rackPinion(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // radius = 80;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody4(0);
  changeBody(1);
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.48)})
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.6)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.48)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.6)
  compositeArray[1].alternate = true;
}
function cam(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  // radius = 60;
  steps = 40;
  camWidth = 40;
  changeBody5(0);
  changeBody2(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.4)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.65)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.65)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.4)
  compositeArray[1].alternate = false;
}
function crank(){
  // radius = 80;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody3(0);
  changeBody(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.3)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.65)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.65)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.3)
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  compositeArray[1].alternate = false;
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


////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.6))
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)) ,(window.innerHeight)*(0.48))
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
console.log(compositeArray[1].bodies[0].position.x-150)
console.log(compositeArray[1].bodies[0].position.y)
Engine.run(engine);
Render.run(render);
