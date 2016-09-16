////////////////// INITIALIZATION ////////////////////////////
// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Render = Matter.Render,
    MouseConstraint = Matter.MouseConstraint,
    Vertices = Matter.Vertices,
    Query = Matter.Query,
    Mouse = Matter.Mouse;

// create a Matter.js engine
var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options:{
      wireframes: false,
      height: window.innerHeight,
      width: window.innerWidth*0.75
    }
});

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

///////////////////// VARIABLES //////////////////////////////////////

var mouseConstraint = MouseConstraint.create(engine);

var clicked = false;
var clickedComposite;
var counter = 0;
var rotationSpeed = 0.04;
var selectionMode = true;
var dragMode = false;
var constraintMode = false;
var constraintDeleteMode = false;
var multiSelectionMode = false;
var selected;
var previousSelection;
var motor;
var constraintStart;
var constraintDestination;
var testConstraint;
var addConstraint = false;
var removeConstraint = false;
var timeInterval = 3;
var selectionArray = [];
var snapDist = 1;

var xValues = [];
var yValues = [];
var steps = 40;
var centerX = 100;
var centerY = 100;
var radius = 80;
var verts2 = [];
var verts3 = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = .25*64;
var toothWidthDegree = 2;
var toothWidth = (toothWidthDegree/conversionFactor);
var offset = 0;
var motors = [];
var jointArray;

////////////////////// GEAR GENERATION ///////////////////////////////
function drawGear(){
  verts2 = [];
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<steps){
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+toothWidth))})
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-toothWidth))})
    }
  }
}
drawGear();
function drawPolygon(width, height){
  verts3 = [];
  verts3.push({x:centerX-(width/2),y:centerY});
  verts3.push({x:centerX-(width/2), y:centerY-(height/2)})
  verts3.push({x:centerX-(width/2), y:centerY-(height)})
  verts3.push({x:centerX+(width/2) , y:centerY-height})
  verts3.push({x:centerX+(width/2), y:centerY-(height/2)})
  verts3.push({x:centerX+(width/2), y:centerY})

}
//////////////// COMPOSITES //////////////////////////////////////

var compositeArray = [];
var totalComposites = 0;
var constraintArray = [];
var totalConstraints = 0;
var jointComposites = [];
var totalJointComposites = 0;

function addGearComposite(centerX, centerY){
  //console.log(verts2.length)
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.fromVertices(centerX, centerY, [verts2])],
        constraints:[],
        shape: "gear",
        radius: radius,
        toothWidthDegree: toothWidthDegree,
        toothHeight: toothHeight,
        numOfTeeth: steps,
        lock: false
      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX, y: centerY },
      bodyB: compositeArray[totalComposites-1].bodies[0], 
      stiffness: 1
    })
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function addPolyComposite(centerX, centerY, width, height){
  drawPolygon(width,height);
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.fromVertices(centerX, centerY, [verts3])],
        constraints:[],
        width: width,
        height: height,
        bottom: centerY,
        shape: "poly",
        lock: true

      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX+width/2, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/2, y: 0 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}

function changeBody(index){
  for(var i=0; i<1;i++){
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
    //console.log(verts2.length)
    drawGear();
    //console.log(verts2.length)
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
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
  //toothHeight = 20;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(0);
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
}
function mediumGearL(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[0].radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(0);
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
}
function largeGearL(){
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(0);
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
}
function smallGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  createConstraint2(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
}
function mediumGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  createConstraint2(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
}
function largeGearR(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  createConstraint2(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
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

function alternateMotor(){
  compositeArray[1].motorSpeed = 0.031;
  compositeArray[0].motorSpeed = 0.031;
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<2; i++){
    if(compositeArray[i].isMotor == true){
      compositeArray[i].alternate = true;
    }
  }
}
function continuousMotor(){
  compositeArray[1].motorSpeed = 0.051;
  compositeArray[0].motorSpeed = 0.051;
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<2; i++){
    if(compositeArray[i].isMotor == true){
      compositeArray[i].alternate = false;
    }
  }
}
//////////////// CONSTRAINTS //////////////////////////////////////

function deleteConstraint(constraintStart, constraintDestination){
  // find joints in jointComposites that have same body as start body and/or end body
  for(var i=0; i<jointComposites.length;i++){
    if((jointComposites[i].constraints[0].bodyA == constraintStart && jointComposites[i].constraints[0].bodyB == constraintDestination) || (jointComposites[i].constraints[0].bodyA == constraintDestination && jointComposites[i].constraints[0].bodyB == constraintStart)){
      // set composite to null
      jointComposites[i].constraints[0].bodyA = null;
      jointComposites[i].constraints[0].bodyB = null;
      jointComposites[i].constraints[0].pointA = null;
      jointComposites[i].constraints[0].pointB = null;
      // set any attached shapes to hasConstraint = false
      for(var i = 0; i<compositeArray.length;i++){
        if(constraintStart == compositeArray[i].bodies[0]){
          compositeArray[i].hasConstraint = false;
        }
        if(constraintDestination == compositeArray[i].bodies[0]){
          compositeArray[i].hasConstraint = false;
        }
      }
    }
  }
}

function createConstraint(constraintStart, constraintDestination){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        startOffset = compositeArray[i].radius *0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
      }
    }
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
      }
    }
  }
  var cLength = length;
  if(startOffset && destOffset){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle)  },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.001
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
}
function createConstraint2(constraintStart, constraintDestination){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        startOffset = compositeArray[i].radius *-0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
      }
    }
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *-0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
      }
    }
  }
  var cLength = length;
  if(startOffset && destOffset){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle)  },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.001
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
}

//////////////////////// ADD TO WORLD //////////////////////



///////////////// Animation /////////////////////////////////////

Events.on(engine, 'beforeUpdate', function(event) {
    compositeArray[2].constraints[0].length = 0; 
    counter += 1;
    for(var i = 0; i<compositeArray.length;i++){
      if(compositeArray[i].lock == true){
        if(compositeArray[i].shape == "gear"){
          Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
        }
        if(compositeArray[i].shape == "rect"){
          if(compositeArray[i].hasConstraint == false){
            Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
          }
        }
      }
      if(compositeArray[i].isMotor == true){
        if(compositeArray[i].alternate ==true){
          // if body angle is less than 0 change motor direction
          if(compositeArray[i].bodies[0].angle < 0){
            Body.setAngle(compositeArray[i].bodies[0], 0);
            compositeArray[i].motorDir = 1;
          }
          // if body angle is greater than PI change motor direction
          if(compositeArray[i].bodies[0].angle > Math.PI){
            Body.setAngle(compositeArray[i].bodies[0], Math.PI);
            compositeArray[i].motorDir = -1;
          }
        }
        Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
      }
    }
    if (clicked == true){
      if(clickedComposite.lock == true){
        Body.setAngle(clickedComposite.bodies[0], clickedComposite.rotation);
      }
    }
    if (counter >= 60 * timeInterval) {
        counter = 0;
        scaleFactor = 1;
    }
    for(var i = 0; i<compositeArray.length; i++){
      if(compositeArray[i].radius != 0){
        for(var j=0; j<compositeArray[i].bodies[0].parts.length;j++){
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#000000";
          if(compositeArray[i].radius == 48){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#FF6B6B";
          }
          else if(compositeArray[i].radius == 64){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#4ECDC4";
          }
          else if(compositeArray[i].radius == 80){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#c7f464";
          }
        }
      }
    }
    updateFlapUI()
})
Events.on(engine, 'afterUpdate', function(event) {
    var gear2CenterY = compositeArray[1].bodies[0].position.y
    var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((compositeArray[1].radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    var gear1CenterY = compositeArray[0].bodies[0].position.y
    var gear1CenterChangeY = gear1CenterY - compositeArray[0].bodies[0].position.y + ((compositeArray[0].radius*0.8) * Math.sin(compositeArray[0].bodies[0].angle))
    console.log(compositeArray[2].bodies[0].vertices[1].y)
    Body.setAngle(compositeArray[2].bodies[0], (gear2CenterChangeY+64)/-250)
    Body.setAngle(compositeArray[3].bodies[0], (-gear1CenterChangeY+64)/250)
  })
////////////////////// RUN /////////////////////////////
var width = 350;
addGearComposite((window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addPolyComposite((window.innerWidth)*(0.75*0.5)+((width/2)+50), 300, -width, 10)
addPolyComposite((window.innerWidth)*(0.75*0.5)-((width/2)+50), 300, width, 10)
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
createConstraint2(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
Engine.run(engine);
Render.run(render);