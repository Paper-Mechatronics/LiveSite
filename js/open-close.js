// generate small gear
openCloseModule = true
rackPinionMod = true;
camMod = false;
crankMod = false;
var c = 369
var rectBase = 600
constraintLength = 0;
function smallGear(){
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(crankMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
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
    changeBody2(1)
  }
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  }
  else{
    changeBody(1);
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
  // document.getElementById("")
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  pivotHeight(constraintLength)
}
function mediumGear(){
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(crankMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
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
    changeBody2(1)
  }
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  }
  else{
    changeBody(1);
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  pivotHeight(constraintLength)
}
function largeGear(){
  removeUIConstraints(compositeArray[0])
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  if(crankMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  }
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
    changeBody2(1)
  }
  else if(rackPinionMod == true && compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else if(crankMod){
    changeBodyCircle(1)
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  }
  else{
    changeBody(1);
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  pivotHeight(constraintLength)
}
function rackPinion(){
  resetRadius()
  removeUIConstraints(compositeArray[0])
  // rectBase = 600
  // var c = 369
  // pivotValue = 0
  // prevSpaceValue = 50
  // prevPivotValue = 0;
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
  constraintPosition(constraintPvalue)
  // constraintPosition(constraintPvalue)
  // module.connectorLength = c
  // module.pivotPoint = 0
  // module.verticalSpace = 0;
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  pivotHeight(constraintLength)
}
function cam(){
  resetRadius()
  removeUIConstraints(compositeArray[0])
  // rectBase = 400
  // pivotValue = 0
  // c = 267
  // prevSpaceValue = 50
  // prevPivotValue = 0;
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  steps = 40;
  camWidth = 40;
  changeBody5(0,200);
  changeBody2(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)*(0.6)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)- basePoint
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y - 60
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-530
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-530
  compositeArray[1].alternate = false;
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  // constraintPosition(constraintPvalue)
  // constraintPosition(113)
  // module.connectorLength = c
  // module.pivotPoint = Math.round((113/300)*100)
  createUIConstraints(compositeArray[0], beamSpace, 0,6)

}
function crank(){
  removeUIConstraints(compositeArray[0])
  // rectBase = 600
  // c = 423
  // pivotValue = 0
  // prevSpaceValue = 50
  // prevPivotValue = 0;
  crankRadius()
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1);
  changeBody3(0);
  createUIConstraints(compositeArray[0], beamSpace, 0,6)
  Body.setPosition(compositeArray[0].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint-250 + 8.0620080523284 - parseInt(pivotValue)})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45), y:(window.innerHeight)- basePoint})
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[1].constraints[0].pointA.y = (window.innerHeight)- basePoint
  compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
  compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y-250
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-400
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
  createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  compositeArray[1].alternate = false;
  constraintPosition(constraintPvalue)
  pivotHeight(constraintLength)
  // constraintPosition(150)
  // module.connectorLength = c
  // module.pivotPoint = (150/300)*100
  // module.verticalSpace = 75;
}
function changeMech(){
  var string = document.getElementById("changeMech").value;
  if(string == "rack-pinion"){
    rackPinionMod = true;
    camMod = false;
    crankMod = false;
    rackPinion();
    compositeArray[0].constraints[0].stiffness = 0.001
    // c = 369
    // pivotValue = 36
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
      // rotationPoint = value/150
      // console.log("Pivot Value = " + value)
    }
    prevPivotValue = parseInt(value)
    pivotValue = parseInt(value)
    constraintLength = parseInt(value)
  }
  compositeArray[0].constraints[2].render.lineWidth = 2
  compositeArray[0].constraints[2].render.strokeStyle = "#666"
  tickFunction()
}
var constraintPvalue = 0
function constraintPosition(value){
  Body.setAngle(compositeArray[2].bodies[0], 0)
  Body.setAngle(compositeArray[3].bodies[0], 0)
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  compositeArray[2].width = newWidth1 - value
  compositeArray[3].width = newWidth2 - (-value)
  // compositeArray[2].width = originalWidth1 - value
  // compositeArray[3].width = originalWidth2 - (-value)
  // console.log("newWidth1 = " + newWidth1)
  // console.log("newWidth2 = " + newWidth2)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,newWidth1)
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, newWidth2)
  if(!crankMod){
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + (prevSpaceValue - 50)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - (prevSpaceValue - 50)
  }
  jointComposites[jointComposites.length-1].constraints[0].pointB.x = jointComposites[jointComposites.length-1].constraints[0].pointB.x + ((newWidth1/2)-150)
  jointComposites[jointComposites.length-2].constraints[0].pointB.x = jointComposites[jointComposites.length-2].constraints[0].pointB.x - ((-newWidth2/2)-150)

  // console.log("constraintPosition Value = " + value)
  // console.log("Composite 2 Width = " + compositeArray[2].width)
  // console.log("JointComposite = " + jointComposites[jointComposites.length-1].constraints[0].pointB.x)
  tickFunction()
  constraintPvalue = parseInt(value)
}
var prevHeightValue = 50;
var changeHeightValue;
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
    // console.log(module.pivot2Point)
  }
  tickFunction()
}
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
function crankRadius(){
  if(radius == 80 || radius == 64 || radius == 48){
      radius = radius + 52
    }
}

Events.on(engine, 'beforeUpdate', function(event){
  if(compositeArray[2].bodies[0].angularVelocity>0.1 || compositeArray[2].bodies[0].angularVelocity<-0.1){
    Body.setAngularVelocity(compositeArray[2].bodies[0], 0)
    Body.setAngularVelocity(compositeArray[3].bodies[0], 0)
    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    removeUIConstraints(compositeArray[0])
  }
})
Events.on(engine, 'afterUpdate', function(event) {
  // console.log(jointComposites[jointComposites.length-3].constraints[0].length)
  // console.log(compositeArray[2].bodies[0].angularVelocity)
  if(crankMod){
    // console.log(jointComposites[jointComposites.length-1].constraints[0].pointB.x)
    jointComposites[jointComposites.length-1].constraints[0].pointA.x = parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-2].constraints[0].pointA.x = -parseInt(prevSpaceValue)
    jointComposites[jointComposites.length-1].constraints[0].pointA.y = -parseInt(pivot2Value)
    jointComposites[jointComposites.length-2].constraints[0].pointA.y = -parseInt(pivot2Value)
  }

  // console.log("x = " + (compositeArray[2].constraints[0].pointA.x - (300* Math.cos(compositeArray[2].bodies[0].angle))))
  // console.log("Y = " + (compositeArray[2].constraints[0].pointA.y - (300* Math.sin(compositeArray[2].bodies[0].angle))))
      var a1 = (compositeArray[2].constraints[0].pointA.x - (300* Math.cos(compositeArray[2].bodies[0].angle)))
      var b1 = (compositeArray[2].constraints[0].pointA.y - (300* Math.sin(compositeArray[2].bodies[0].angle)))
      var a2 = compositeArray[0].bodies[1].position.x
      var b2 = compositeArray[0].bodies[1].position.y
      var d = Math.sqrt( (a1-a2)*(a1-a2) + (b1-b2)*(b1-b2) );
      // console.log(module.connectorLength + newWidth1 + (4*module.horizontalSpace))
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
createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue,6)
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
var originalWidth1 = compositeArray[2].width
var originalWidth2 = compositeArray[3].width
newWidth1 = originalWidth1
newWidth2 = originalWidth2
createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
compositeArray[1].motorSpeed = 0.021
module.motorSpeed = compositeArray[1].motorSpeed*1000
pivotHeight(0)
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)


// var x1 = jointComposites[jointComposites.length-1].constraints[0].pointA.x
// var x2 = jointComposites[jointComposites.length-1].constraints[0].pointB.x
// var y1 = jointComposites[jointComposites.length-1].constraints[0].pointA.y
// var y2 = jointComposites[jointComposites.length-1].constraints[0].pointB.y
var x1 = compositeArray[0].constraints[0].pointA.x
var x2 = compositeArray[2].constraints[0].pointA.x +300
var y1 = compositeArray[0].constraints[0].pointA.y-300
var y2 = compositeArray[2].constraints[0].pointA.y

// console.log(x1)
// console.log(x2)
// console.log(y1)
// console.log(y2)
var d = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
// console.log("Constraint Length = " + d)
// console.log("Height to Beam = " + (compositeArray[3].constraints[0].pointA.y - (compositeArray[0].constraints[0].pointA.y-300)))
// console.log(compositeArray[0].constraints[0].pointA.x-compositeArray[2].constraints[0].pointA.x)
