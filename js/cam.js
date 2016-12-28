// generate small gear
openCloseMod = false
camModule = true
var rectBase = 600
var pivotValue = 0
var c = 432
var originalWidth1
var originalWidth2
var camMod = true;
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
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
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
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
    }
  }
  
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
    if(compositeArray[1].shape == "cam"){
      changeBody2(1)
    }
    else if(compositeArray[1].shape == "shell"){
      changeShell()
      // console.log(compositeArray[1].bodies[0].parts[0].render.strokeStyle = "#8d2f2f")
    }
  }
  
}
function cam(){
  //deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  steps = 40;
  camWidth = 40;
  changeBody5(0,200);
  changeBody2(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y - 200})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:(window.innerHeight)*(0.75)})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.75)
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y - 60
  compositeArray[1].alternate = false;
  createUIConstraintsSingle(compositeArray[0], 50, 100,10)
  // Body.setPosition(compositeArray[0].bodies[0],{x:(window.innerWidth)*(0.75*0.5), y:compositeArray[0].constraints[0].pointA.y - 100})
  
}
function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "upDown"){
    pivotValue = 0
    prevSpaceValue = 50
    prevPivotValue = 100;
    openCloseMod = false;
    removeUIConstraints(compositeArray[0])
    if(!compositeArray[0].bodies[1]){
      createUIConstraintsSingle(compositeArray[0], 50, 0,10)
    }
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
    //cam()
  }
  else if(string == "openClose"){
    pivotValue = 0
    prevSpaceValue = 50
    prevPivotValue = 0;
    removeUIConstraintsSingle(compositeArray[0])
    openCloseMod = true;
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.5)-200,compositeArray[0].constraints[0].pointA.y-400)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.5)+200,compositeArray[0].constraints[0].pointA.y-400)
    createUIConstraints(compositeArray[0], 50, 0,6)
    originalWidth1 = compositeArray[2].width
    originalWidth2 = compositeArray[3].width
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    // constraintPosition(113)
    pivotHeight(0)
    //cam()
  }
  
}

var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
var beamSpace = 50
function beamSpacing(value){
  changeSpaceWidth = value - prevSpaceValue
  if (openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changeSpaceWidth = value - prevSpaceValue
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
      jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
      jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth
    }
    console.log("BeamSpace Value = " + value)
  }
  prevSpaceValue = value
  beamSpace = parseInt(value);
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  if(openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changePivotHeight = value - prevPivotValue
      // if(openCloseModule){
      //   if(crankMod){
      //     deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //     compositeArray[0].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y - changePivotHeight
      //     createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //   }
      // }
      
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y - changePivotHeight
      prevPivotValue = value
      pivotValue = value
      // rotationPoint = value/150
      console.log("Pivot Value = " + value)

    }
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
  
}
function constraintPosition(value){
  if (openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    compositeArray[2].width = originalWidth1 - value
    compositeArray[3].width = originalWidth2 - (-value)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],parseInt(-value),originalWidth1)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],parseInt(value), originalWidth2)
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + (prevSpaceValue - 50)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - (prevSpaceValue - 50)
    // console.log("constraintPosition Value = " + value)
    // console.log(jointComposites[jointComposites.length-1].constraints[0].pointA.x)
    // console.log(changeSpaceWidth)
  }
  
}

Events.on(engine, 'afterUpdate', function(event) {
    // if(crankMod == true){
    //   var gear2CenterY = compositeArray[1].bodies[0].position.y
    //   var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    //   var gear1CenterY = compositeArray[1].bodies[0].position.y
    //   var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    //   Body.setAngle(compositeArray[2].bodies[0], (gear2CenterChangeY)/-170)
    //   Body.setAngle(compositeArray[3].bodies[0], (gear1CenterChangeY)/170)
    //   console.log(jointComposites[totalJointComposites-1].constraints[0])
    // }
    // if(camMod == true){
    //   var camChangeY = compositeArray[0].constraints[0].pointA.y- compositeArray[0].bodies[0].position.y
    //   var factor = (camChangeY-8)/100
    //   // console.log((camChangeY-8)/40)
    //   var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
    //   var gear1CenterY = compositeArray[1].bodies[0].position.y
    //   var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
    //   Body.setAngle(compositeArray[2].bodies[0], 0 + factor)
    //   Body.setAngle(compositeArray[3].bodies[0], 0 + -factor)
    // }
    // if(rackPinionMod == true){
      if(openCloseMod){
        var bottom = compositeArray[0].constraints[0].pointA.y - rectBase
        var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
        var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
        var rectWidth = compositeArray[2].width
        var b = top  - bottom
        var a = compositeArray[2].width
        // var c = Math.sqrt((rectWidth*rectWidth)+(pivotSpace*pivotSpace))
        // var c = 325
        var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
        var degrees = angleC * (180/Math.PI)
        //console.log(((a*a)+(b*b)-(c*c))/(2*a*b))
        if(angleC){
          Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
          Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
        }
        Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
        Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})

      }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
// addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-550)
// addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-550)
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
cam();
compositeArray[0].constraints[0].stiffness = 0.01
// createUIConstraintsSingle(compositeArray[0], 50, 0,10)
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)
