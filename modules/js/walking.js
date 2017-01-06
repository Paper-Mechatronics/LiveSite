// module indicator
walkingModule = true;
var openCloseMod = false;
var rectBase = 600
var c = 400
var originalWidth1
var originalWidth2
var init = false
var initAngle1
var initAngle2

/////////////////////////GEAR SIZES//////////////////////////////////////////////
function smallGear(){
  // delete ui sprite body
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  // reset angle to 0
  Body.setAngle(compositeArray[1].bodies[0], 0)
  // set new radius
  radius = 48;
  // store new radius value
  compositeArray[1].radius = radius
  // change number of steps for drawing gear
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  // draw and add new body
  changeBodyCircle(1);
  // set position of new body
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  // create new linkage constraint
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}
// see smallGear()
function mediumGear(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}
// see smallGear()
function largeGear(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0])
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyCircle(1);
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
  Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[1].constraints[0].pointA.y})
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
}
////////////////////////////////////////////////////////////////////////////////
function degrees(value){
    return value*0.0174533
  }
///////////////// Animation /////////////////////////////////////


// called every frame after physics is applied
// same as above
var motorRot=degrees(-90)
Events.on(engine, 'afterUpdate', function(event) {
  motorRot= motorRot + degrees(2)
  Body.setAngle(compositeArray[1].bodies[0], motorRot)
  Body.setPosition(compositeArray[1].bodies[0], {x: (window.innerWidth)*(0.75*0.5), y: (window.innerHeight)*(0.5)})
  // Body.setAngle(compositeArray[0].bodies[0], 0)
  // Body.setAngle(compositeArray[1].bodies[0], degrees(90))
  // console.log(jointComposites[jointComposites.length - 1].constraints[0].length)
  // console.log(compositeArray[1].bodies[0].position.y)
  // console.log(compositeArray[0].bodies[0].vertices[1].y)







  if(init == false){
    Body.setAngle(compositeArray[1].bodies[0], degrees(-90))
  }
  var gearCenterY = compositeArray[1].bodies[0].position.y
  var gearCenterX = compositeArray[1].bodies[0].position.x
  var gearCenterChangeY =  ((compositeArray[1].radius*(0.8)) * Math.sin(compositeArray[1].bodies[0].angle))
  var gearCenterChangeX =  ((compositeArray[1].radius*0.8) * Math.cos(compositeArray[1].bodies[0].angle))
  var topTriY = compositeArray[0].bodies[0].vertices[0].y
  var topTriX = compositeArray[0].bodies[0].vertices[0].x
  var gearConstraintX = compositeArray[1].constraints[0].pointA.x + gearCenterChangeX
  var gearConstraintY = compositeArray[1].constraints[0].pointA.y + gearCenterChangeY
  // console.log(gearCenterY)
  // console.log(compositeArray[0].constraints[0].pointA.y)
  // calculate spacing
  var a2 = compositeArray[0].constraints[0].pointA.x
  var a1 = gearConstraintX
  var b2 = compositeArray[0].constraints[0].pointA.y
  var b1 = gearConstraintY
  var a3 = compositeArray[3].constraints[0].pointA.x
  var a4 = gearConstraintX
  var b3 = compositeArray[3].constraints[0].pointA.y
  var b4 = gearConstraintY
  triDistance = Math.sqrt((a1-a2)*(a1-a2) + (b1-b2)*(b1-b2));
  var triDistance2 = Math.sqrt((a3-a4)*(a3-a4) + (b3-b4)*(b3-b4));
  // console.log(((window.innerWidth)*(0.75*0.5)) - ((window.innerWidth)*(0.75*0.35)))
  // console.log(compositeArray[1].constraints[0].pointA.x - compositeArray[0].constraints[0].pointA.x)
  // console.log(gearCenterX - a2)
  // console.log(triDistance)
  // console.log(b2)
  var x2 = compositeArray[0].bodies[0].vertices[0].x
  var x1 = gearConstraintX
  var y2 = compositeArray[0].bodies[0].vertices[0].y
  var y1 = gearConstraintY
  var x4 = compositeArray[3].bodies[0].vertices[0].x
  var x3 = gearConstraintX
  var y4 = compositeArray[3].bodies[0].vertices[0].y
  var y3 = gearConstraintY
  // calculate distance from gears to beams for the angle to rotate the beam
  var d = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var d2 = Math.sqrt((x3-x4)*(x3-x4) + (y3-y4)*(y3-y4));
  // console.log(d)
  var angle1 = Math.acos(((111*111)+(100*100)-(triDistance*triDistance))/(2*111*100))
  var angle2 = Math.acos((-(111*111)+(100*100)+(triDistance*triDistance))/(2*triDistance*100))
  var angle3 = Math.acos(((111*111)-(100*100)+(triDistance*triDistance))/(2*111*triDistance))
  if(angle1 && angle2 && angle3){
    // console.log("angle1 = " + angle1*57.2958)
    // console.log("angle2 = " + (90-(angle2*57.2958)))
    // console.log("angle3 = " + ((angle3*57.2958)))
    // Body.setAngle(compositeArray[0].bodies[0], ((-angle2) + (degrees(66.826875139))) )
    // console.log(angle1 + angle2 + angle3)
    // console.log(compositeArray[0].bodies[0].angle)

  }
  compositeArray[1].alternate =false
  if(compositeArray[1].bodies[0].angle > degrees(270) && compositeArray[1].bodies[0].angle < degrees(360)){
    // console.log("side 1 = " + d)
  }
  // console.log("side 1 = " + d)

  // console.log("side 2 = " + 100)
  // console.log("side 3 = " + triDistance)
  // console.log("angle1 = " + angle1*57.2958)
  // console.log("angle2 = " + (angle2*57.2958))
  // console.log("angle3 = " + ((angle3*57.2958)))
  // // console.log(compositeArray[1].bodies[0].angle)
  // console.log("x = " + gearConstraintX)
  // // console.log(gearCenterY)
  // console.log("y = " + gearConstraintY)
  // // console.log(gearCenterX)
  // console.log("x = " + x2)
  // console.log("y = " + y2)
  // console.log(compositeArray[0].bodies[0].angle)
  var yChangePerc = Math.abs(gearCenterChangeY)/(compositeArray[1].radius*(0.8))
  yChangePerc = Math.abs(yChangePerc-1)
  // console.log(yChangePerc)
  // Body.setAngle(compositeArray[0].bodies[0], yChangePerc * degrees(90 - 66.826875139))
  // Body.setAngle(compositeArray[1].bodies[0], degrees(-90))
  var linkageLength = 111
  var triHeight = compositeArray[0].height
  var crankAngle = -compositeArray[1].bodies[0].angle
  var crankAngle2 = compositeArray[1].bodies[0].angle - Math.PI
  var horizontalSpace = gearCenterX - a2
  var x = triDistance
  var x2 = triDistance2
  var pivotRad = compositeArray[1].radius * 0.8
  var xEq1 = Math.acos(((triHeight*triHeight)+(x*x)-(linkageLength*linkageLength))/(2*100*x))
  var yEq1 = Math.asin((pivotRad*Math.sin(Math.PI - crankAngle))/x)
  var triangleRot = xEq1 + yEq1
  var xEq2 = Math.acos(((triHeight*triHeight)+(x2*x2)-(linkageLength*linkageLength))/(2*100*x2))
  var yEq2 = Math.asin((pivotRad*Math.sin(Math.PI - crankAngle2))/x2)
  var triangleRot2 = xEq2 + yEq2
  // console.log("triangleRot = " + triangleRot)
  // console.log("d = " + d)
  // console.log(-triangleRot + initAngle1)
  // console.log()
  // console.log("triangleRot2 = " + triangleRot2)
  // console.log("d2 = " + d2)
  // console.log(-triangleRot2 + initAngle1)
  // console.log()
  if(init == false){
    initAngle1 = xEq1 + yEq1
    initAngle2 = xEq2 + yEq2
    // console.log()
    init = true
  }
  Body.setAngle(compositeArray[0].bodies[0], -triangleRot + initAngle1)
  Body.setAngle(compositeArray[3].bodies[0], -(-triangleRot2 + initAngle1))

//triangleRot = 0.9588724409492403
//d = 111.53232630232534
//0.5952366750780728

  // circle = -90, triangle = 0
  // circle = -45, triangle = 18.2
  // circle = 0 , triangle = 34.3
  // circle = 45, triangle = 44.2
  // circle = 46.19 , triangle = 44.3
  // circle = 90, triangle = 45.4
  // circle = 135, triangle = 33.6
  // circle = 180, triangle = 4
  // circle = 225, triangle = 10.7


  // console.log(gearConstraintY)
  // track length of linkages for part generation
  // calculate angle to rotate beams
  // var b = Math.sqrt((gear1ConstraintX-rect1ConstraintX)*(gear1ConstraintX-rect1ConstraintX) + (gear1ConstraintY-rect1ConstraintY)*(gear1ConstraintY-rect1ConstraintY) );
  // var b2 = (Math.sqrt( (gear2ConstraintX-rect2ConstraintX)*(gear2ConstraintX-rect2ConstraintX) + (gear2ConstraintY-rect2ConstraintY)*(gear2ConstraintY-rect2ConstraintY) ))
  // var a = 300 + module.flapBeamWidthL
  // var a2 = -1*(300  + module.flapBeamWidthR)
  // var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
  // var angleC2 = Math.acos(((a2*a2)+(b2*b2)-(c2*c2))/(2*a2*b2))
  // var degrees = angleC * (180/Math.PI)
  // var xAngle1 = Math.asin(gear1CenterChangeX/b)
  // var xAngle2 = Math.asin(gear2CenterChangeX/b2)




// console.log(compositeArray[2].bodies[0].position.x)
// console.log(compositeArray[2].bodies[0].position.y)
// console.log(compositeArray[4].bodies[0].position.x)
// console.log(compositeArray[4].bodies[0].position.y)

// console.log((window.innerWidth)*(0.75*0.65) - (window.innerWidth)*(0.75*0.5) )





})

////////////////////// RUN /////////////////////////////

// run the engine
radius =48
addTriComposite((window.innerWidth)*(0.75*0.5) - 127.35 ,((window.innerHeight)*(0.5))-33.3333, 100, 100)
compositeArray[0].shape = "triTL"
addGearComposite((window.innerWidth)*(0.75*0.5) ,(window.innerHeight)*(0.5))
changeBodyCircle(1)
addTriComposite((window.innerWidth)*(0.75*0.5) - 127.35 ,compositeArray[0].constraints[0].pointA.y + 100, 100, -100)
compositeArray[2].shape = "triBL"
compositeArray[2].constraints[0].stiffness = 0.000001
addTriComposite((window.innerWidth)*(0.75*0.5) + 127.35 ,((window.innerHeight)*(0.5))-33.3333, -100, 100)
compositeArray[3].shape = "triTR"
addTriComposite((window.innerWidth)*(0.75*0.5) + 127.35 ,compositeArray[3].constraints[0].pointA.y + 100, -100, -100)
compositeArray[4].shape = "triBR"
// compositeArray[4].constraints[0].stiffness = 0.0001
// compositeArray[1].isMotor = true;
// compositeArray[1].motorSpeed = 0.01
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[0].bodies[0],111,0.00000001)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[2].bodies[0],111,0.5)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[3].bodies[0],111,0.00000001)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[4].bodies[0],111,0.5)
// jointComposites[jointComposites.length - 3].constraints[0].stiffness = 0.5
// jointComposites[jointComposites.length - 3].constraints[0].length = 111
// jointComposites[jointComposites.length - 1].constraints[0].stiffness = 0.5
// jointComposites[jointComposites.length - 1].constraints[0].length = 111
createTriConstraintEdges(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
createTriConstraintEdges(compositeArray[3].bodies[0], compositeArray[4].bodies[0])
// jointComposites[jointComposites.length - 1].constraints[0].stiffness = 1
// jointComposites[jointComposites.length - 2].constraints[0].stiffness = 1
// jointComposites[jointComposites.length - 3].constraints[0].stiffness = 1
Composite.remove(compositeArray[2], compositeArray[2].constraints[0])
Composite.remove(compositeArray[4], compositeArray[4].constraints[0])
engine.world.gravity.y = 5;
Engine.run(engine);
Render.run(render);

