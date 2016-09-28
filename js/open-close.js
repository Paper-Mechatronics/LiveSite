// generate small gear
openCloseModule = true
rackPinionMod = true;
camMod = false;
crankMod = false;
var c = 369
var rectBase = 600
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
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
  // document.getElementById("")
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
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
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
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
}
function rackPinion(){
  rectBase = 600
  var c = 369
  pivotValue = 0
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody4(0);
  changeBody(1);
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.68) + rackPinBase})
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.8) + rackPinBase})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.68) + rackPinBase
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.8) + rackPinBase
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-rectBase
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-rectBase
  compositeArray[1].alternate = true;
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  constraintPosition(0)
  module.connectorLength = c
  module.pivotPoint = 0
  module.verticalSpace = 0;
}
function cam(){
  rectBase = 400
  pivotValue = 0
  c = 267
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  steps = 40;
  camWidth = 40;
  changeBody5(0);
  changeBody2(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.6)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)- basePoint
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)- basePoint - 240
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
  compositeArray[1].alternate = false;
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  constraintPosition(113)
  module.connectorLength = c
  module.pivotPoint = Math.round((113/300)*100)

}
function crank(){
  rectBase = 600
  c = 423
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1);
  changeBody3(0);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint-300})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)- basePoint
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = (window.innerHeight)- basePoint-300
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-300
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-300
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  compositeArray[1].alternate = false;
  constraintPosition(150)
  module.connectorLength = c
  module.pivotPoint = (150/300)*100
  module.verticalSpace = 75;
}
function changeMech(){
  var string = document.getElementById("changeMech").value;
  if(string == "rack-pinion"){
    rackPinionMod = true;
    camMod = false;
    crankMod = false;
    rackPinion();
    compositeArray[0].constraints[0].stiffness = 0.001
    c = 369
    pivotValue = 36
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

var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
function beamSpacing(value){
  if(compositeArray[2] && compositeArray[3]){
    changeSpaceWidth = value - prevSpaceValue
    compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
    compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
    if(!crankMod){
      jointComposites[totalJointComposites-1].constraints[0].pointA.x = jointComposites[totalJointComposites-1].constraints[0].pointA.x + changeSpaceWidth
      jointComposites[totalJointComposites-2].constraints[0].pointA.x = jointComposites[totalJointComposites-2].constraints[0].pointA.x - changeSpaceWidth
    }
    prevSpaceValue = value
    beamSpace = parseInt(value);
  }
  console.log("BeamSpace Value = " + value)
  document.getElementById("horizontalSpaceValue").innerHTML = value
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  if(compositeArray[2] && compositeArray[3]){
    if(crankMod){
      circleJointHeight(value)
    }
    else{
      changePivotHeight = value - prevPivotValue
      // if(openCloseModule){
      //   if(crankMod){
      //     deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //     compositeArray[0].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y - changePivotHeight
      //     createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //   }
      // }
      jointComposites[totalJointComposites-1].constraints[0].pointA.y = jointComposites[totalJointComposites-1].constraints[0].pointA.y - changePivotHeight
      jointComposites[totalJointComposites-2].constraints[0].pointA.y = jointComposites[totalJointComposites-2].constraints[0].pointA.y - changePivotHeight
      prevPivotValue = value
      pivotValue = value
      // rotationPoint = value/150
      console.log("Pivot Value = " + value)
    }
  }
}

function constraintLength(value){
  c = parseInt(value)
  console.log("c Value = " + value)
}
function constraintPosition(value){
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  compositeArray[2].width = originalWidth1 - value
  compositeArray[3].width = originalWidth2 - (-value)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,originalWidth1)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, originalWidth2)
  console.log("constraintPosition Value = " + value)

}
var prevHeightValue = 50;
var changeHeightValue;
function circleJointHeight(value){
  changeHeightValue = value - 50
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<jointComposites.length; i++){
    if(jointComposites[i].constraints[0].bodyA == compositeArray[0].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[1].bodies[0]){
      jointComposites[i].constraints[0].length = 300 + changeHeightValue
    }
    else if(jointComposites[i].constraints[0].bodyA == compositeArray[1].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[0].bodies[0]){
      jointComposites[i].constraints[0].length = 300 + changeHeightValue
    }
  }
}

Events.on(engine, 'afterUpdate', function(event) {
  // console.log(jointComposites[0])
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
      
        rotationPoint =1
        // var bottom = compositeArray[0].constraints[0].pointA.y - 200 - pivotValue
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
        if(compositeArray[1].alternate == false && rackPinionMod == true){
          // console.log(compositeArray[1].bodies[0].angle)
          if(compositeArray[1].bodies[0].angle >= (2*Math.PI) ){
            Body.setAngle(compositeArray[1].bodies[0], 0)
          }
          if(compositeArray[1].bodies[0].angle > Math.PI+0.5 || compositeArray[1].bodies[0].angle < 0.5){
            if(compositeArray[0].bodies[0].position.y >= compositeArray[0].constraints[0].pointA.y){
              Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].constraints[0].pointA.y})
              Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:0})
            }
            else{
              //Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].bodies[0].position.y+4})
              Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:3})
            } 
          }
          // var camChangeY = compositeArray[0].constraints[0].pointA.y- compositeArray[0].bodies[0].position.y
          // var factor = (camChangeY-8)/300
          // // console.log((camChangeY-8)/40)
          // var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
          // var gear1CenterY = compositeArray[1].bodies[0].position.y
          // var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
          // Body.setAngle(compositeArray[2].bodies[0], 0 + factor)
          // Body.setAngle(compositeArray[3].bodies[0], 0 + -factor)
        }
        // compositeArray[1].bodies[0].render.sprite.texture = "./img/crank160px.png"
        // console.log(compositeArray[1].bodies[0].render.sprite)
    // }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
compositeArray[0].constraints[0].stiffness = 0.0000001;
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
var originalWidth1 = compositeArray[2].width
var originalWidth2 = compositeArray[3].width
createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
compositeArray[1].motorSpeed = 0.021
module.motorSpeed = compositeArray[1].motorSpeed*1000
pivotHeight(0)
Engine.run(engine);
Render.run(render);

// var x1 = jointComposites[jointComposites.length-1].constraints[0].pointA.x
// var x2 = jointComposites[jointComposites.length-1].constraints[0].pointB.x
// var y1 = jointComposites[jointComposites.length-1].constraints[0].pointA.y
// var y2 = jointComposites[jointComposites.length-1].constraints[0].pointB.y
var x1 = compositeArray[0].constraints[0].pointA.x
var x2 = compositeArray[2].constraints[0].pointA.x +300
var y1 = compositeArray[0].constraints[0].pointA.y-300
var y2 = compositeArray[2].constraints[0].pointA.y

console.log(x1)
console.log(x2)
console.log(y1)
console.log(y2)
var d = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
console.log("Constraint Length = " + d)
console.log("Height to Beam = " + (compositeArray[3].constraints[0].pointA.y - (compositeArray[0].constraints[0].pointA.y-300)))
console.log(compositeArray[0].constraints[0].pointA.x-compositeArray[2].constraints[0].pointA.x)
