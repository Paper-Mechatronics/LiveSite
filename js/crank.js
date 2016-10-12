crankModule = true;
var openCloseMod = false;
var rectBase = 600
var c = 300
var originalWidth1
var originalWidth2
var newWidth1
var newWidth2

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
  changeBodyCircle(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  tickFunction()
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
  changeBodyCircle(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  tickFunction()
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
  changeBodyCircle(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  tickFunction()
}

function openClose(){
  pivot2Value = 50
  removeUIConstraintsSingle(compositeArray[0])
  // deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  // deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.5)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.8)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.8)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
  addRectComposite(300, 5,(window.innerWidth)*(0.75*0.5)-200,compositeArray[0].constraints[0].pointA.y-300)
  addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.5)+200,compositeArray[0].constraints[0].pointA.y-300)
  createUIConstraints(compositeArray[0], 50, 0,6)
  newWidth1 = compositeArray[2].width
  newWidth2 = compositeArray[3].width
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  originalWidth1 = compositeArray[2].width
  originalWidth2 = compositeArray[3].width
  constraintPosition(150)
  tickFunction()
}
function upDown(){
  pivot2Value = 50
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.4)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.7)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.7)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.4)
  removeComposite(compositeArray[3].bodies[0])
  removeComposite(compositeArray[2].bodies[0])
  createUIConstraintsSingle(compositeArray[0], 50, 0,10)
  tickFunction()
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



var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
var beamSpace = 50
function beamSpacing(value){
  if (openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changeSpaceWidth = value - prevSpaceValue
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
      // jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
      // jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth
      // jointComposites[totalJointComposites-1].constraints[0].pointA.x = jointComposites[totalJointComposites-1].constraints[0].pointA.x + changeSpaceWidth
      // jointComposites[totalJointComposites-2].constraints[0].pointA.x = jointComposites[totalJointComposites-2].constraints[0].pointA.x - changeSpaceWidth
      prevSpaceValue = value
      beamSpace = parseInt(value);
    }
    console.log("BeamSpace Value = " + value)
    compositeArray[0].constraints[1].render.lineWidth = 2
    compositeArray[0].constraints[1].render.strokeStyle = "#666"
  }
  tickFunction()
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  circleJointHeight(value)
  tickFunction()
}

// function pivot2Height(value){
  // if(!openCloseMod){
  //     pivot2Height = 50 + parseInt(value)
  // }
//   // compositeArray[0].constraints[2].render.lineWidth = 2
//   // compositeArray[0].constraints[2].render.strokeStyle = "#666"
//   tickFunction()
// }
function constraintPosition(value){
  if (openCloseMod){
    Body.setAngle(compositeArray[2].bodies[0], 0)
    Body.setAngle(compositeArray[3].bodies[0], 0)
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    compositeArray[2].width = newWidth1 - value
    compositeArray[3].width = newWidth2 - (-value)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,newWidth1)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, newWidth2)
    jointComposites[jointComposites.length-1].constraints[0].pointB.x = jointComposites[jointComposites.length-1].constraints[0].pointB.x + ((newWidth1/2)-150)
    jointComposites[jointComposites.length-2].constraints[0].pointB.x = jointComposites[jointComposites.length-2].constraints[0].pointB.x - ((-newWidth2/2)-150)

  }
  tickFunction()
}
var prevHeightValue = 50;
var changeHeightValue;
function circleJointHeight(value){
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
  tickFunction()
}

///////////////// Animation /////////////////////////////////////


// called every frame after physics is applied
// same as above
Events.on(engine, 'afterUpdate', function(event) {

  if(openCloseMod == true){
    // console.log(jointComposites[jointComposites.length-1].constraints[0].pointB.x)
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = -parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-1].constraints[0].pointA.y = -parseInt(pivot2Value)
    jointComposites[jointComposites.length-2].constraints[0].pointA.y = -parseInt(pivot2Value)
    var b = Math.sqrt( (compositeArray[0].bodies[1].position.x-compositeArray[2].bodies[0].position.x)*(compositeArray[0].bodies[1].position.x-compositeArray[2].bodies[0].position.x) + (compositeArray[0].bodies[1].position.y-compositeArray[2].constraints[0].pointA.y)*(compositeArray[0].bodies[1].position.y-compositeArray[2].constraints[0].pointA.y) );
    var bottom = compositeArray[0].constraints[0].pointA.y - 600
    var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
    var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
    var rectWidth = compositeArray[2].width
    // var b = compositeArray[0].position
    var a = compositeArray[2].width
    // var c = Math.sqrt((rectWidth*rectWidth)+(pivotSpace*pivotSpace))
    var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
    var degrees = angleC * (180/Math.PI)
    //console.log(((a*a)+(b*b)-(c*c))/(2*a*b))
    if(angleC && compositeArray[2].bodies[0].angle > -0.7){
      Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
      Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
    }
    console.log(compositeArray[3].bodies[0].angle  )
    if(compositeArray[2].bodies[0].angle < 1 && compositeArray[2].bodies[0].angle > -0.7){
      // Body.setAngle(compositeArray[2].bodies[0], -0.65)
      // Body.setAngle(compositeArray[3].bodies[0], 0.65)
    }

    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
  }
  // console.log(compositeArray[1].bodies[0].render.sprite)
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*(0.4))
addGearComposite((window.innerWidth)*(0.75*0.5) ,(window.innerHeight)*(0.7))
changeBody3(0)
changeBodyCircle(1)
createUIConstraintsSingle(compositeArray[0], 50, 0,10)
compositeArray[0].constraints[0].stiffness = 0.0001;
createConstraint2(compositeArray[0].bodies[0],compositeArray[1].bodies[0])
compositeArray[1].isMotor = true;
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)

