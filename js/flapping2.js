flapModule = true;
var originalWidth1;
var originalWidth2
module.horizontalSpace = 0
module.connectorLength = 300
function changeBodyFlap(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    if(index == 0){
      tmpConstraintXPoint = (window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6))
    }
    else{
      tmpConstraintXPoint = (window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6))
    }
    var tmpConstraintYPoint = (window.innerHeight)*(0.65)
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawGear();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    if(compositeArray[index].shape == "gear"){
      Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1))
    }
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    compositeArray[index].radius = radius;
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
  
}
function smallGearL(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(0);
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  
  
}
function mediumGearL(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[0].radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(0);
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0], beamWidthChange, originalWidth2)
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
}
function largeGearL(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(0);
  createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0], beamWidthChange, originalWidth2)
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
}
function smallGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(1);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0])  
}
function mediumGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(1);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0])  
}
function largeGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyFlap(1);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
}
function motorL(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  compositeArray[0].isMotor = true;
  compositeArray[1].isMotor = false;
}
function motorR(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  compositeArray[0].isMotor = false;
  compositeArray[1].isMotor = true;
}
var c = 300
var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
function beamSpacing(value){
  if(compositeArray[2] && compositeArray[3]){
    Body.setAngle(compositeArray[0].bodies[0], 0)
    Body.setAngle(compositeArray[1].bodies[0], 0)
    changeSpaceWidth = value - prevSpaceValue
    compositeArray[2].constraints[0].pointA.x = compositeArray[2].constraints[0].pointA.x + changeSpaceWidth
    compositeArray[3].constraints[0].pointA.x = compositeArray[3].constraints[0].pointA.x + (changeSpaceWidth*-1)
    prevSpaceValue = value
    beamSpace = parseInt(value);
  }
  console.log("BeamSpace Value = " + value)
  console.log(compositeArray[2].bodies[0].angle)
  console.log(compositeArray[3].bodies[0].angle)
  
}
var prevPivotValue = 80;
var initialPivotValue = 100;
var pivotValue = 80;
var changePivotHeight;

function constraintPosition(value){
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0])
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
  compositeArray[2].width = originalWidth1 - value
  compositeArray[3].width = originalWidth2 - (-value)
  createConstraintFlap(compositeArray[0].bodies[0], compositeArray[3].bodies[0], value, originalWidth2)
  createConstraintFlap(compositeArray[1].bodies[0], compositeArray[2].bodies[0], -value, originalWidth1)
  console.log("constraintPosition Value = " + value)
  
}
Events.on(engine, 'afterUpdate', function(event) {
    var gear2CenterY = compositeArray[1].bodies[0].position.y
    var gear2CenterX = compositeArray[1].bodies[0].position.x
    var gear2CenterChangeY =  ((compositeArray[1].radius*(-0.8)) * Math.sin(compositeArray[1].bodies[0].angle))
    var gear2CenterChangeX =  ((compositeArray[1].radius*-0.8) * Math.cos(compositeArray[1].bodies[0].angle))
    var gear1CenterY = compositeArray[0].bodies[0].position.y
    var gear1CenterX = compositeArray[0].bodies[0].position.x
    var gear1CenterChangeY =  ((compositeArray[0].radius*0.8) * Math.sin(compositeArray[0].bodies[0].angle))
    var gear1CenterChangeX =  ((compositeArray[0].radius*0.8) * Math.cos(compositeArray[0].bodies[0].angle))
    gear1Spacing = ((window.innerWidth)*(0.75*0.5)) - gear1CenterX
    gear2Spacing = gear2CenterX - ((window.innerWidth)*(0.75*0.5))
    beamSpace = Math.round(compositeArray[2].constraints[0].pointA.x - compositeArray[3].constraints[0].pointA.x)
    verticalSpacing = compositeArray[0].constraints[0].pointA.y - compositeArray[2].constraints[0].pointA.y
    // console.log(verticalSpacing)
    var gear1ConstraintX = compositeArray[0].constraints[0].pointA.x + gear1CenterChangeX
    var gear1ConstraintY = compositeArray[0].constraints[0].pointA.y + gear1CenterChangeY
    var gear2ConstraintX = compositeArray[1].constraints[0].pointA.x + gear2CenterChangeX
    var gear2ConstraintY = compositeArray[1].constraints[0].pointA.y + gear2CenterChangeY
    var rect1ConstraintX = compositeArray[3].constraints[0].pointA.x
    var rect1ConstraintY = compositeArray[3].constraints[0].pointA.y
    var rect2ConstraintX = compositeArray[2].constraints[0].pointA.x
    var rect2ConstraintY = compositeArray[2].constraints[0].pointA.y
    var x2 = compositeArray[3].bodies[0].vertices[2].x
    var x1 = gear1ConstraintX
    var y2 = compositeArray[3].bodies[0].vertices[2].y
    var y1 = gear1ConstraintY
    var d = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    flapConnector = d
    // console.log(flapConnector)
    var b = Math.sqrt((gear1ConstraintX-rect1ConstraintX)*(gear1ConstraintX-rect1ConstraintX) + (gear1ConstraintY-rect1ConstraintY)*(gear1ConstraintY-rect1ConstraintY) );
    var b2 = (Math.sqrt( (gear2ConstraintX-rect2ConstraintX)*(gear2ConstraintX-rect2ConstraintX) + (gear2ConstraintY-rect2ConstraintY)*(gear2ConstraintY-rect2ConstraintY) ))
    var a = 300 + module.beamWidth
    var a2 = -1*(300  + module.beamWidth)
    var c2 = -c
    var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
    var angleC2 = Math.acos(((a2*a2)+(b2*b2)-(c2*c2))/(2*a2*b2))
    var degrees = angleC * (180/Math.PI)
    var xAngle1 = Math.asin(gear1CenterChangeX/b)
    var xAngle2 = Math.asin(gear2CenterChangeX/b2)
    if(angleC && angleC2){
      Body.setAngle(compositeArray[3].bodies[0], angleC - 1.5708 - xAngle1 );
      Body.setAngle(compositeArray[2].bodies[0], angleC2 - 1.5708 - xAngle2 );
    }
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
  })
////////////////////// RUN /////////////////////////////
var width = 300;
rectBase = 300
addGearComposite((window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addFlapRectComposite((window.innerWidth)*(0.75*0.5)+((width/2)+60),compositeArray[0].constraints[0].pointA.y-rectBase-87-36.751+150,7,150,50,300)
addFlapRectComposite((window.innerWidth)*(0.75*0.5)-((width/2)+60),compositeArray[0].constraints[0].pointA.y-rectBase-87-36.751+150,7,150,-50,-300)
originalWidth1 = compositeArray[2].width
originalWidth2 = compositeArray[3].width
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
flapBeamSpaceUpdate()
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)
console.log(compositeArray[2].bodies[0])
