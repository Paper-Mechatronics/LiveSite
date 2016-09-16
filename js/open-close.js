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
    Bounds = Matter.Bounds,
    Vector = Matter.Vector,
    Query = Matter.Query,
    Mouse = Matter.Mouse;

// create a Matter.js engine
// var engine = Engine.create(document.body, {
//   render: {
//     options: {
//       height: window.innerHeight,
//       width: window.innerWidth*0.75,
//       wireframes: false,
//       showAngleIndicator: false
//     }
//   }
// });

// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

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

// create mouse dragging
var mouseConstraint = MouseConstraint.create(engine);
var world = engine.world

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
console.log("Height = " + window.innerHeight) //1011 // 731 // 0.723
console.log("Width = " + window.innerWidth) //1858 // 1218 // 0.6555

///////////////////// VARIABLES //////////////////////////////////////

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
var rotationAngle = 0;
var set = false;

var xValues = [];
var yValues = [];
var steps = 40;
var linSteps = 30;
var centerX = 100;
var centerY = 100;
var radius = 80;
var verts2 = [];
var linGearVerts = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = .25*64;
var toothWidthDegree = 2;
var toothWidth = (toothWidthDegree/conversionFactor);
var offset = 0;
var motors = [];
var jointArray;

var pointXCheck;
var pointYCheck;
var circlePoints1 = []
var pointXCheck2;
var pointYCheck2;
var circlePoints2 = []
var resolution = 100;

var camWidth = 40;

rackPinionMod = true;
camMod = false;
crankMod = false;

var basePoint = (450*((window.innerHeight/1011) - 0.7))
var rackPinBase = 300 * (1 - (window.innerHeight/1011));

////////////////////// CREATE VERtiCES TO DRAW SHAPES //////////////
// function scaleComposites(){
//   for(var i = 0; i<compositeArray.length; i++){
//     if(compositeArray[i].shape != "rect"){
//       Composite.scale(compositeArray[i], scale, scale, compositeArray[i].constraints[0].pointA)
//     }
//   }
// }
function drawGear(){
  //new vertex array
  verts2 = [];
  // draw circle
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
  }
  // add teeth
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<steps){
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+toothWidth))})
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-toothWidth))})
    }
  }
}
drawGear();
function drawLinGear(){
  // new vertex array
  linGearVerts = [];
  // create rectangle shape
  linGearVerts.push({x: 200, y: 200})
  linGearVerts.push({x: 200, y: 600})
  linGearVerts.push({x: 230, y: 600})
  // add teeth
  for (var i = 0; i < linSteps; i++) {
    linGearVerts.push({ x: 230, y: 600 - ((400/linSteps)*i)});
    if(i > 0 && i%2 == 0){
       linGearVerts.push({ x: 230 + 20, y: 600- ((400/linSteps)*i)-2});
       linGearVerts.push({ x: 230 + 20, y: 600 - ((400/linSteps)*i) - 11.3332});
    }
  }
  // add last corner
  linGearVerts.push({ x: 230, y: 600 - 400});
}
drawLinGear();
function drawCam(){
  verts2 = [];
  for (var i = 0; i < steps; i++) {
    console.log(radius)
    xValues[i] = ((radius+40) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((radius) * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}
function drawRect(){
  // new vertex array
  linGearVerts = [];
  // create rectangle shape
  linGearVerts.push({x: 200, y: 200})
  linGearVerts.push({x: 200, y: 600})
  linGearVerts.push({x: 230, y: 600})
  linGearVerts.push({x: 230, y: 200})
}
//////////////// COMPOSITES //////////////////////////////////////
// The Matter.Body module contains methods for creating and manipulating body models. 
// A Matter.Body is a rigid body that can be simulated by a Matter.Engine. 
// Factories for commonly used body configurations (such as rectangles, circles and other polygons) 
// can be found in the module Matter.Bodies

// Constraints are used for specifying that a fixed distance must be maintained between two bodies 
// (or a body and a fixed world-space position). The stiffness of constraints can be modified to create 
// springs or elastic.

// A composite body is a collection of 
// Matter.Body, Matter.Constraint and other Matter.Composite, 
// therefore composites form a tree structure.

var compositeArray = [];
var totalComposites = 0;
var constraintArray = [];
var totalConstraints = 0;
var jointComposites = [];
var totalJointComposites = 0;

// add gear to world
function addGearComposite(centerX, centerY){
  // increase number of composites by 1
  totalComposites++;
  // increase number of constraints by 1
  totalConstraints++;
  // add new composite to composite array
  compositeArray.push( 
    // create composite
    Composite.create({
      // create body from vertex array verts2[]
      bodies:[Bodies.fromVertices(centerX, centerY, [verts2])],
      constraints:[],
      // store information about body
      shape: "gear",
      radius: radius,
      friction: 1,
      density: 0.1,
      toothWidthDegree: toothWidthDegree,
      toothHeight: toothHeight,
      numOfTeeth: steps,
      alternate: false,
      lock: false
    })
  )
  // add constraint to constraint array constraintArray[]
  constraintArray.push(
    // create constraint to rotate around
    Constraint.create({pointA: { x: centerX, y: centerY },
      // body to contrain
      bodyB: compositeArray[totalComposites-1].bodies[0], 
      stiffness: 1
    })
  )
  // add constraint to composite (composite to add to, constraint to add)
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  // add composite to the world
  World.add(engine.world,[compositeArray[totalComposites-1]] );
  // set new composite body as selected
  
  if (totalComposites>1){
    
  }
}
function addLinGearComposite(centerX, centerY){
  // see addGearComposite() comments
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        // create body from linGearVerts[] vertex array
        bodies:[Bodies.fromVertices(centerX, centerY, [linGearVerts], {
          // set object fill and stroke color to black
          render: {
               fillStyle: 'black',
               strokeStyle: 'black',
               lineWidth: 0
          }
        })],
        constraints:[],
        shape: "linGear",
        numOfTeeth: steps,
        friction: 1,
        density: 100,
        lock: true
      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX, y: centerY },
      bodyB: compositeArray[totalComposites-1].bodies[0], 
      // soft spring-like stiffness so it can be moved by the gear
      stiffness: 0.001
    })
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function addRectComposite(width, height, centerX, centerY){
  // see addGearComposite() comments
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.rectangle(centerX, centerY, width, height)],
        constraints:[],
        shape: "rect",
        width: width,
        height: height,
        lock: false

      })
  )
  constraintArray.push(
    // create joint constraint and place it at end of beam or center - width/2
    Constraint.create({pointA: { x: centerX+width/2, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/2, y: 0 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
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
function createConstraint2(constraintStart, constraintDestination){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        // if gear, set offset to 80% of that gears radius
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0
        startShape = "gear"
        console.log("working")
      }
      else if(compositeArray[i].shape == "rect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0
        startShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0
        startShape = "linGear"
      }
      else if(compositeArray[i].shape == "circle"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0
        startShape = "circle"
      }
    }
    // set constraint offset for end body based on what type of body it is
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *0.8;
        destOffset2 = 0;
        destShape = "gear"
      }
      else if(compositeArray[i].shape == "rect"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear"
        console.log("working")
      }
      else if(compositeArray[i].shape == "circle"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
        console.log("working")
      }
    }
  }
  var cLength = 250;
  console.log(startOffset)
  console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    console.log("working2")
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
          stiffness: 1
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    console.log("added")
    console.log(jointComposites[0])
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
// redraw and generate shape if any parameters are modified (WIP) ignore for now
function changeBody(index){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawGear();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    compositeArray[index].radius = radius;
    compositeArray[index].shape = "gear"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function changeBody2(index){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    if(index == 0){
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x
    }
    else{
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x
    }
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawCam();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    compositeArray[index].radius = radius;
    compositeArray[index].shape = "cam"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function changeBody3(index){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    if(index == 0){
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x
    }
    else{
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x
    }
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 10))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    compositeArray[index].radius = radius;
    compositeArray[index].shape = "circle"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function changeBody4(index){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    linGearVerts = [];
    drawLinGear();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [linGearVerts]))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    //compositeArray[index].radius = radius;
    compositeArray[index].shape = "linGear"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function changeBody5(index){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    linGearVerts = [];
    drawRect();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [linGearVerts]))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    //compositeArray[index].radius = radius;
    compositeArray[index].shape = "linGear"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
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
  else{
    changeBody(1);
  }
  if(crankMod == true){
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  }
  if(rackPinionMod == true){
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  }
  document.getElementById("")
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
  compositeArray[2].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-550
  compositeArray[3].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y-550
  compositeArray[1].alternate = true;
}
function cam(){
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
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
}
function crank(){
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
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

//////////////// PARTS //////////////////////////////////////
var numLargeGear = 0
var numMediumGear = 0
var numSmallGear = 0
var numLinearGear = 0
var numLargeCam = 0
var numMediumCam = 0
var numSmallCam = 0

function showParts(){
  numLargeGear = 0
  numMediumGear = 0
  numSmallGear = 0
  numLinearGear = 0
  numLargeCam = 0
  numMediumCam = 0
  numSmallCam = 0
  for(var i = 0; i<compositeArray.length; i++){
    if(compositeArray[i].shape == "gear"){
      if(compositeArray[i].radius == 80){
        numLargeGear ++
      }
      else if(compositeArray[i].radius == 64){
        numMediumGear++
      }
      else if(compositeArray[i].radius == 48){
        numSmallGear++
      }
    }
    if(compositeArray[i].shape == "cam"){
      if(compositeArray[i].radius == 80){
        numLargeCam++
      }
      else if(compositeArray[i].radius == 64){
        numMediumCam++
      }
      else if(compositeArray[i].radius == 48){
        numSmallCam++
      }
    }
    if(compositeArray[i].shape == "linGear"){
      numLinearGear++
    }
  }
  // console.log(numLargeGear)
  var largeGears = numLargeGear.toString(); 
  var mediumGears = numMediumGear.toString(); 
  var smallGears = numSmallGear.toString(); 
  localStorage.setItem("largeGears", largeGears);
  localStorage.setItem("mediumGears", mediumGears);
  localStorage.setItem("smallGears", smallGears);
  window.location.replace("./jsPDF/parts.html")
}


//////////////////////// ADD TO WORLD //////////////////////
// make the world bounds a little bigger than the render bounds
world.bounds.min.x = 300;
world.bounds.min.y = 300;
world.bounds.max.x = window.innerWidth*0.75;
world.bounds.max.y = window.innerHeight;

// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
    boundsScale = {
        x: 1,
        y: 1
};

// console.log(mouseConstraint)
// mouseConstraint.mouse.wheelDelta = 1;

///////////////// Animation /////////////////////////////////////
Events.on(engine, 'beforeUpdate', function(event) {
    // increment counter just in case we need to do something that happens ever couple of frames
    counter += 1;
    // functions that need to be called every frame on each body in the world
    for(var i = 0; i<compositeArray.length;i++){
      // if lock is true then set the angle to whatever the rotation parameter for that body is
      if(compositeArray[i].lock == true){
        if(compositeArray[i].shape == "gear"){
          Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
        }
        // as long as it doesnt have a constraint set the rectangle to rotation parameter
        if(compositeArray[i].shape == "rect"){
          if(compositeArray[i].hasConstraint == false){
            Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
          }
        }
        // always set linear gear to have locked rotation
        if(compositeArray[i].shape == "linGear"){
          if(compositeArray[i].lock == true){
            Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
          }
          else{
            compositeArray[i].lock = true;
          }
        }
      }
      // if locked not true .......... 
      else{
        if(compositeArray[i].shape == "gear"){
          if(clickedComposite != compositeArray[i]){
          }
        }
      }

      // if body is set as a motor
      if(compositeArray[i].isMotor == true){
        // and if alternating is active
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
        // set rotational velocity of gear to the motor speed * motor direction of object
        Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
      }
    }    
    //engine.render.options.height = window.innerHeight
    for(var i = 0; i<compositeArray.length; i++){
      if(compositeArray[i].radius != 0){
        for(var j=0; j<compositeArray[i].bodies[0].parts.length;j++){
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#000000";
          if(compositeArray[i].radius == 48){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#FF6B6B";
            for(var p = 0; p<compositeArray[0].bodies[0].parts.length; p++){
              compositeArray[0].bodies[0].parts[p].render.fillStyle = "#8d2f2f";
              compositeArray[0].bodies[0].parts[p].render.strokeStyle = "#8d2f2f";
            }
            
          }
          else if(compositeArray[i].radius == 64){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#4ECDC4";
            for(var p = 0; p<compositeArray[0].bodies[0].parts.length; p++){
              compositeArray[0].bodies[0].parts[p].render.fillStyle = "#15605b";
              compositeArray[0].bodies[0].parts[p].render.strokeStyle = "#15605b";
            }
            
          }
          else if(compositeArray[i].radius == 80){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#bc98f9";
            for(var p = 0; p<compositeArray[0].bodies[0].parts.length; p++){
              compositeArray[0].bodies[0].parts[p].render.fillStyle = "#7149b6";
              compositeArray[0].bodies[0].parts[p].render.strokeStyle = "#7149b6";
            }

          }
        }
      }
    }
    updateUI()
})
// called every frame after physics is applied
// same as above
var forceDir = -1
Events.on(engine, 'afterUpdate', function(event) {
  if(compositeArray[1].motorDir <1){
    forceDir = 1;
  }
  else{
    forceDir = -1;
  }

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
      if(compositeArray[i].shape == "linGear"){
        if(compositeArray[i].lock == true){
          Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
        }
        else{
          compositeArray[i].lock = true;
        }
        if(clickedComposite != compositeArray[i]){
          Body.setPosition(compositeArray[i].bodies[0],{x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].bodies[0].position.y})
        }
      }
      if(compositeArray[i].shape == "circle"){
        compositeArray[i].bodies[0].position.x = compositeArray[i].constraints[0].pointA.x
        if(compositeArray[i].lock == true){
          Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
        }
      }
    }
    else{
      if(compositeArray[i].shape == "gear"){
        if(clickedComposite != compositeArray[i]){
          //Body.setPosition(compositeArray[i].bodies[0],{x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].constraints[0].pointA.y})
        }
      }
    }
    if(compositeArray[i].isMotor == true){
      Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
    }
  }
  //console.log(compositeArray[0].bodies[0].velocity.y)
  if(crankMod == true){
    var gear2CenterY = compositeArray[1].bodies[0].position.y
    var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    var gear1CenterY = compositeArray[1].bodies[0].position.y
    var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle))
    Body.setAngle(compositeArray[2].bodies[0], (gear2CenterChangeY)/-150)
    Body.setAngle(compositeArray[3].bodies[0], (gear1CenterChangeY)/150)
  }
  if(camMod == true){
    var camChangeY = compositeArray[0].constraints[0].pointA.y- compositeArray[0].bodies[0].position.y
    var factor = (camChangeY-8)/100
    console.log((camChangeY-8)/40)
    var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
    var gear1CenterY = compositeArray[1].bodies[0].position.y
    var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
    Body.setAngle(compositeArray[2].bodies[0], 0 + factor)
    Body.setAngle(compositeArray[3].bodies[0], 0 + -factor)
  }
  if(rackPinionMod == true){
    Body.setAngle(compositeArray[2].bodies[0], compositeArray[1].bodies[0].angle*0.35);
    Body.setAngle(compositeArray[3].bodies[0], compositeArray[1].bodies[0].angle*-0.35);
    // if(compositeArray[1].motorDir == 1){
    //   Body.setPosition(compositeArray[0].bodies[0],compositeArray[0].bodies[0].position.x,compositeArray[0].bodies[0].position.y +1 )
    // }
  }

})


////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
compositeArray[0].constraints[0].stiffness = 0.0000001;
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-550)
addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-550)
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
console.log(compositeArray[1].bodies[0].position.x-150)
console.log(compositeArray[1].bodies[0].position.y)
// if(scale != 1){
//   scaleComposites();
// }
Engine.run(engine);
Render.run(render);
