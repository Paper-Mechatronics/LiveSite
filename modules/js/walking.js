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
var centerPosX
var centerPosY

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
  Body.setPosition(compositeArray[1].bodies[0], {x: centerPosX, y: centerPosY})
 
  if(init == false){
    Body.setAngle(compositeArray[1].bodies[0], degrees(-90))
  }


  var gearCenterY = compositeArray[1].bodies[0].position.y
  var gearCenterX = compositeArray[1].bodies[0].position.x
  var gearCenterChangeY =  ((compositeArray[1].radius*(0.8)) * Math.sin(compositeArray[1].bodies[0].angle))
  var gearCenterChangeX =  ((compositeArray[1].radius*0.8) * Math.cos(compositeArray[1].bodies[0].angle))
  var gearConstraintX = compositeArray[1].constraints[0].pointA.x + gearCenterChangeX
  var gearConstraintY = compositeArray[1].constraints[0].pointA.y + gearCenterChangeY
  
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

  x1 = compositeArray[0].bodies[0].vertices[0].x
  x2 = compositeArray[0].bodies[0].vertices[1].x
  y1 = compositeArray[0].bodies[0].vertices[0].y
  y2 = compositeArray[0].bodies[0].vertices[1].y
  var triVertDist = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
  
  var triHeight = compositeArray[0].height
  var crankAngle = -compositeArray[1].bodies[0].angle
  var crankAngle2 = compositeArray[1].bodies[0].angle - Math.PI
  var horizontalSpace = gearCenterX - a2
  var x = triDistance
  var x2 = triDistance2
  var pivotRad = compositeArray[1].radius * 0.8
  var xEq1 = Math.acos(((triHeight*triHeight)+(x*x)-(linkageLength*linkageLength))/(2*triVertDist*x))
  var yEq1 = Math.asin((pivotRad*Math.sin(Math.PI - crankAngle))/x)
  var triangleRot = xEq1 + yEq1
  var xEq2 = Math.acos(((triHeight*triHeight)+(x2*x2)-(linkageLength*linkageLength))/(2*triVertDist*x2))
  var yEq2 = Math.asin((pivotRad*Math.sin(Math.PI - crankAngle2))/x2)
  var triangleRot2 = xEq2 + yEq2


  if(init == false){
    initAngle1 = xEq1 + yEq1
    initAngle2 = xEq2 + yEq2
    // console.log()
    init = true
  }
  ///SET ANGLES OF TOP TRIANGLES///////////////
  Body.setAngle(compositeArray[0].bodies[0], -triangleRot + initAngle1)
  Body.setAngle(compositeArray[3].bodies[0], -(-triangleRot2 + initAngle1))
  ////////////////////////////////////////////////////


  jointComposites[1].constraints[0].pointA = jointComposites[0].constraints[0].pointA
  jointComposites[3].constraints[0].pointA = jointComposites[0].constraints[0].pointA
  x1 = compositeArray[0].bodies[0].vertices[1].x
  x2 = compositeArray[2].bodies[0].vertices[1].x
  y1 = compositeArray[0].bodies[0].vertices[1].y
  y2 = compositeArray[2].bodies[0].vertices[1].y
  walkingVert = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
   // console.log(compositeArray[0].bodies[0].vertices[2].y)
  
  if(compositeArray[2].bodies[0].vertices[0].y < compositeArray[0].bodies[0].vertices[2].y){
    Body.setVelocity(compositeArray[2].bodies[0], {x:0,y:20})
  }
  if(compositeArray[4].bodies[0].vertices[0].y < compositeArray[3].bodies[0].vertices[2].y){
    Body.setVelocity(compositeArray[4].bodies[0], {x:0,y:20})
  }
  if(compositeArray[2].bodies[0].velocity.y<-3){
    Body.setVelocity(compositeArray[2].bodies[0], {x:0,y:0})
  }
  if(compositeArray[4].bodies[0].velocity.y<-3){
    Body.setVelocity(compositeArray[4].bodies[0], {x:0,y:0})
  }
  console.log(compositeArray[0].height)
  // compositeArray[0].bodies[0].vertices[0].y = 515
})

////////////////////// RUN /////////////////////////////

// run the engine
radius = 25
addTriComposite((window.innerWidth)*(0.75*0.5) - 127.35 ,((window.innerHeight)*(0.5))-33.3333, triangleWidth, triangleHeight)
compositeArray[0].shape = "triTL"
addCircleComposite((window.innerWidth)*(0.75*0.5) ,(window.innerHeight)*(0.5),radius)
centerPosX = (window.innerWidth)*(0.75*0.5)
centerPosY = (window.innerHeight)*(0.5)
changeBodyCircle(1)
compositeArray[compositeArray.length-1].bodies[0].render.fillStyle = "#FF6B6B"
addTriComposite((window.innerWidth)*(0.75*0.5) - 127.35 ,compositeArray[0].constraints[0].pointA.y + 100, triangleWidth, -triangleHeight)
compositeArray[2].shape = "triBL"
compositeArray[2].constraints[0].stiffness = 0.000001
addTriComposite((window.innerWidth)*(0.75*0.5) + 127.35 ,((window.innerHeight)*(0.5))-33.3333, -triangleWidth, triangleHeight)
compositeArray[3].shape = "triTR"
addTriComposite((window.innerWidth)*(0.75*0.5) + 127.35 ,compositeArray[3].constraints[0].pointA.y + 100, -triangleWidth, -triangleHeight)
compositeArray[4].shape = "triBR"
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[0].bodies[0],111,0.00000001)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[2].bodies[0],111,0.5)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[3].bodies[0],111,0.00000001)
createTriConstraintFakeCorners(compositeArray[1].bodies[0], compositeArray[4].bodies[0],111,0.5)
createTriConstraintEdges(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
createTriConstraintEdges(compositeArray[3].bodies[0], compositeArray[4].bodies[0])
Composite.remove(compositeArray[2], compositeArray[2].constraints[0])
Composite.remove(compositeArray[4], compositeArray[4].constraints[0])
engine.world.gravity.y = 5;
Engine.run(engine);
Render.run(render);

