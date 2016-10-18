////////////// Add Libraries! /////////////
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
    Runner = Matter.Runner,
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
////////////// Create Matter Engine /////////
var engine = Engine.create();

///////////// Create Renderer //////////////
var render = Render.create({
    element: document.body,
    engine: engine,
    options:{
      wireframes: false,
      height: screen.height-63,
      width: (screen.width-56)*0.75
    }
});
var runner = Runner.create();
//////// create mouse dragging //////////
var mouseConstraint = MouseConstraint.create(engine);
var world = engine.world

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
// console.log("Height = " + window.innerHeight) //1011 // 731 // 0.723
// console.log("Width = " + window.innerWidth) //1858 // 1218 // 0.6555

///////////////////// VARIABLES //////////////////////////////////////
// Modules
var openCloseModule = false;
var upDownModule = false;
var flapModule = false;
var rackPinionModule = false;
var camModule = false;
var crankModule = false;
var collisionCategory = 0x0001;
var otherCategory = 0x0002;
// Object Variables
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

var openCloseMod = false;

var angleFactor = 0.35

var mirrored = false;
var paired = false;
var shared = false;
var flipY = false;
var screenScale = (screen.height-63)/1011
var basePoint = (450*(screenScale - 0.7))
var rackPinBase = 300 * (1 - screenScale);

var rotationPoint = 0;
var beamSpace =50
var crankMod = false;

var module = {
  horizontalSpace: 50,
  verticalSpace: 0,
  connectorLength: 369,
  pivotPoint: 0,
  pivot2Point: 0,
  motorSpeed: 40,
  beamWidth: 0
}

var newWidth1;
var newWidth2;

var paused = false;
var pivot2Value
////////////////////// CREATE VERtiCES TO DRAW SHAPES //////////////
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
function drawContinuousGear(){
  //new vertex array
  verts2 = [];
  // draw circle
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
  }
  // add teeth
  for (var i = 0; i < (steps); i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<(steps*(1/3))){
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
    // console.log(radius)
    xValues[i] = ((radius+50) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((radius) * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}
function drawRect(height){
  // new vertex array
  linGearVerts = [];
  // create rectangle shape
  linGearVerts.push({x: 200, y: 200})
  linGearVerts.push({x: 200, y: 200+height})
  linGearVerts.push({x: 230, y: 200+height})
  linGearVerts.push({x: 230, y: 200})
}
function drawPolygon(width, height){
  verts3 = [];
  verts3.push({x:centerX-(width/2),y:centerY});
  verts3.push({x:centerX-(width/2), y:centerY-(height/2)})
  verts3.push({x:centerX-(width/2), y:centerY-(height)})
  verts3.push({x:centerX+(width/2) , y:centerY-height})
  verts3.push({x:centerX+(width/2), y:centerY-(height/2)})
  verts3.push({x:centerX+(width/2), y:centerY})

}
function drawTri(width, height){
  verts3 = [];
  verts3.push({x:centerX+(width/2),y:centerY});
  verts3.push({x:centerX+(width/2), y:centerY-(height)})
  verts3.push({x:centerX-(width/2), y:centerY})
}
/////////////////////// Pop Up Modal ///////////////////////////////////
function overlay3() {
    el3 = document.getElementById("overlay3");
    el3.style.visibility = (el3.style.visibility == "visible") ? "hidden" : "visible";
    flipLabel = document.getElementById("flipYLabel");
    flipCheck = document.getElementById("flipYCheck");
    flipTitle = document.getElementById("flipYTitle");
    flipCheck.style.visibility = "hidden"
    flipLabel.style.visibility = "hidden"
    flipTitle.style.visibility = "hidden"
    //displayConstraints();
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
      collisionFilter: {
        mask: otherCategory
      },
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
  Composite.add(compositeArray[totalComposites-1], Bodies.circle(centerX, centerY, 1))
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
        options:{
          render:{
            fillStyle: "#cccccc"
          }
        },
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
  compositeArray[compositeArray.length-1].bodies[0].render.fillStyle = "#cccccc"
  compositeArray[compositeArray.length-1].bodies[0].render.strokeStyle = "#000"
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
function addCircleComposite(centerX, centerY, radius){
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.circle(centerX, centerY, radius)],
        constraints:[],
        radius: radius,
        bottom: centerY,
        shape: "circle",
        lock: true

      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x:0, y: 0 }, stiffness: 0.0001})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function addTriComposite(centerX, centerY, width, height){
  drawTri(width, height)
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.fromVertices(centerX, centerY, [verts3])],
        constraints:[],
        width: width,
        height: height,
        bottom: centerY,
        shape: "tri"

      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX + (width/3), y: centerY + (height/3) },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x:width/3, y: height/3 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function removeComposite(composite){
  // if the user is in multi-Select mode the loop through the selected objects array selectionArray[] and remove composites
  for(var i=0; i<compositeArray.length;i++){
    if(compositeArray[i].bodies[0] == composite){
      for(var j=0; j<jointComposites.length;j++){
        if(jointComposites[j].constraints[0].bodyA == selected || jointComposites[j].constraints[0].bodyB == selected){
            for(var k=0; k<compositeArray.length;k++){
              if(jointComposites[j].constraints[0].bodyA != selected && jointComposites[j].constraints[0].bodyA == compositeArray[k].bodies[0]){
                compositeArray[k].hasConstraint = false;
              }
              if(jointComposites[j].constraints[0].bodyB != selected && jointComposites[j].constraints[0].bodyB == compositeArray[k].bodies[0]){
                compositeArray[k].hasConstraint = false;
              }
            }
          jointComposites[j].constraints[0].bodyA = null;
          jointComposites[j].constraints[0].bodyB = null;
          jointComposites[j].constraints[0].pointA = null;
          jointComposites[j].constraints[0].pointB = null;
        }
      }
      Composite.clear(compositeArray[i], true);
      compositeArray.splice(i,1);
    }
  }
  totalComposites--;
  
}


///////////////////////////////// CONSTRAINTS ///////////////////////////////////////////


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
  tickFunction()
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
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraint2(constraintStart, constraintDestination){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  var startShape;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear" || compositeArray[i].shape == "circleCrank"){
        // if gear, set offset to 80% of that gears radius
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0
        startShape = "gear"
        // console.log("working")
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
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
        startShape = "poly"
      }
    }
    // set constraint offset for end body based on what type of body it is
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear" || compositeArray[i].shape == "circleCrank"){
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
      }
      else if(compositeArray[i].shape == "circle"){
        if(startShape == "linGear"){
          startOffset2 = -200
        }
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "poly"
      }
    }
  }
  var cLength = 250;
  
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 1
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraint3(constraintStart, constraintDestination){
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
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraintFakeRP(constraintStart, constraintDestination){
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
        // console.log("working")
      }
      else if(compositeArray[i].shape == "rect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = compositeArray[i].width*-0.5;;
        startOffset2 = 0
        startShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -200 - pivotValue
        startShape = "linGear"
      }
      else if(compositeArray[i].shape == "circle"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0
        startShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
        startShape = "poly"
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
        if(startShape == "linGear"){
          if(compositeArray[i].width>0){
            startOffset = spaceValue
          }
          else{
            startOffset = -spaceValue
          }
        }
        destOffset = compositeArray[i].width*-0.5;;
        destOffset2 = 0;
        destShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear"
      }
      else if(compositeArray[i].shape == "circle"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "poly"
      }
    }
  }
  var cLength = 250;
  // console.log(startOffset)
  // console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.00001,
          length: 300
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // console.log(jointComposites[totalJointComposites-1].constraints[0].length)
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraintFake(constraintStart, constraintDestination){
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
        // console.log("working")
      }
      else if(compositeArray[i].shape == "rect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = compositeArray[i].width*-0.5;;
        startOffset2 = 0
        startShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -200 - pivotValue
        startShape = "linGear"
      }
      else if(compositeArray[i].shape == "linRect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -(compositeArray[i].height/2) - pivotValue
        startShape = "linRect"
      }
      else if(compositeArray[i].shape == "circle"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0
        startShape = "circle"
        // console.log(startShape)
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
        startShape = "poly"
      }
      else if(compositeArray[i].shape == "circleCrank"){
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0;
        startShape = "circleCrank"
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
        if(startShape == "linGear" || startShape == "linRect" || startShape == "circle"){
          if(compositeArray[i].width>0){
            startOffset = -module.horizontalSpace
          }
          else{
            startOffset = module.horizontalSpace
          }
        }
        destOffset = compositeArray[i].width*-0.5;;
        destOffset2 = 0;
        destShape = "rect"
      }
      else if(compositeArray[i].shape == "linGear"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear"
      }
      else if(compositeArray[i].shape == "circle"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "poly"
      }
      else if(compositeArray[i].shape == "tri"){
        destOffset = compositeArray[i].width/3;
        destOffset2 = -compositeArray[i].height * (2/3);
        destShape = "tri"
        // console.log(destShape)
      }
    }
  }
  var cLength = 250;
  // console.log(startOffset)
  // console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.00001
          
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // console.log(jointComposites[totalJointComposites-1].constraints[0].length)
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraintFake2(constraintStart, constraintDestination, length, originalWidth){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        // if gear, set offset to 80% of that gears radius
        if(flapModule && i == 1){
          startOffset = compositeArray[i].radius *-0.8;
        }
        else{
          startOffset = compositeArray[i].radius *0.8;
        }
        startOffset2 = 0
        startShape = "gear"
        // console.log("working")
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
        startOffset2 = -200 - pivotValue
        startShape = "linGear"
      }
      else if(compositeArray[i].shape == "linRect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -(compositeArray[i].height/2) - pivotValue
        startShape = "linRect"
      }
      else if(compositeArray[i].shape == "circle"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0
        startShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
        startShape = "poly"
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
        if(startShape == "linGear" || startShape == "linRect"){
          if(compositeArray[i].width>0){
            startOffset = -module.horizontalSpace
          }
          else{
            startOffset = module.horizontalSpace
          }
        }
        destOffset = (originalWidth*-0.5)- length;
        destOffset2 = 0;
        destShape = "rect"
        // console.log("destoffset = " + destOffset)
      }
      else if(compositeArray[i].shape == "linGear"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear"
      }
      else if(compositeArray[i].shape == "circle"){
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "poly"
      }
    }
  }
  var cLength = 250;
  // console.log(startOffset)
  // console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.00001,
          length: 300
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // console.log(jointComposites[totalJointComposites-1].constraints[0].length)
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraintInner(constraintStart, constraintDestination){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  var startShape;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        // if gear, set offset to 80% of that gears radius
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0
        startShape = "gear"
        // console.log("working")
      }
      else if(compositeArray[i].shape == "rect"){
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = compositeArray[i].width*-0.5;;
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
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = 0;
        startShape = "poly"
      }
    }
    // set constraint offset for end body based on what type of body it is
    if(constraintDestination == compositeArray[i].bodies[1]){
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
      }
      else if(compositeArray[i].shape == "circle"){
        if(startShape == "linGear"){
          startOffset2 = -200
        }
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle"
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 0;
        destShape = "poly"
      }
    }
  }
  var cLength = 250;
  // console.log(startOffset)
  // console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.001
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createConstraintFlap(constraintStart, constraintDestination, length, originalWidth){
  var startOffset;
  var startOffset2;
  var destOffset;
  var destOffset2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        if(originalWidth>0){
          startOffset = compositeArray[i].radius *0.8;
        }
        else{
          startOffset = compositeArray[i].radius *-0.8;
        }
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
        if(originalWidth<0){
          destOffset = destOffset = (originalWidth*0.5) - length - 100
        }
        else{
          destOffset = destOffset = (originalWidth*0.5) - length + 100
        }
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
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createTriConstraintFakeCorners(constraintStart, constraintDestination){
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
        // console.log("working")
      }
      else if(compositeArray[i].shape == "triTL"){
        startOffset = compositeArray[i].width/3;
        startOffset2 = -compositeArray[i].height * (2/3);
        startShape = "triTL"
      }
      else if(compositeArray[i].shape == "circleCrank"){
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0;
        startShape = "circleCrank"
      }
    }
    // set constraint offset for end body based on what type of body it is
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *0.8;
        destOffset2 = 0;
        destShape = "gear"
      }
      else if(compositeArray[i].shape == "triTL"){
        destOffset = compositeArray[i].width/3;
        destOffset2 = -compositeArray[i].height * (2/3);
        destShape = "triTL"
      }
      else if(compositeArray[i].shape == "triBL"){
        destOffset = compositeArray[i].width/3;
        destOffset2 = compositeArray[i].height * (1/3);
        destShape = "triTL"
      }
      else if(compositeArray[i].shape == "triTR"){
        destOffset = compositeArray[i].width/3;
        destOffset2 = -compositeArray[i].height * (2/3);
        destShape = "triTL"
      }
      else if(compositeArray[i].shape == "triBR"){
        destOffset = compositeArray[i].width/3;
        destOffset2 = compositeArray[i].height * (1/3);
        destShape = "triTL"
      }
      else if(compositeArray[i].shape == "circleCrank"){
        destOffset = compositeArray[i].radius *0.8;
        destOffset2 = 0;
        destShape = "circleCrank"
      }
    }
  }
  var cLength = 250;
  // console.log(startOffset)
  // console.log(destOffset)
  if(startOffset != null && destOffset !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
          length: 200,
          stiffness: 0.001
          
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    console.log(jointComposites[totalJointComposites-1].constraints[0].length)
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
function createTriConstraintEdges(constraintStart, constraintDestination){
  var beginOffsetX;
  var beginOffsetY;
  var beginOffsetX2;
  var beginOffsetY2;
  var endOffsetX;
  var endOffsetY;
  var endOffsetX2;
  var endOffsetY2;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "triTL"){
        beginOffsetX = compositeArray[i].width/3;
        beginOffsetY = compositeArray[i].height * (1/3);
        beginOffsetX2 = -compositeArray[i].width * (2/3);;
        beginOffsetY2 = compositeArray[i].height * (1/3);
        startShape = "triTL"
      }
      else if(compositeArray[i].shape == "triTR"){
        beginOffsetX = compositeArray[i].width/3;
        beginOffsetY = compositeArray[i].height * (1/3);
        beginOffsetX2 = -compositeArray[i].width * (2/3);;
        beginOffsetY2 = compositeArray[i].height * (1/3);
        startShape = "triTR"
      }
    }
    // set constraint offset for end body based on what type of body it is
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "triBL"){
        endOffsetX = compositeArray[i].width/3;
        endOffsetY = compositeArray[i].height * (1/3);
        endOffsetX2 = -compositeArray[i].width * (2/3);;
        endOffsetY2 = compositeArray[i].height * (1/3);
        destShape = "triBL"
      }
      else if(compositeArray[i].shape == "triBR"){
        endOffsetX = compositeArray[i].width/3;
        endOffsetY = compositeArray[i].height * (1/3);
        endOffsetX2 = -compositeArray[i].width * (2/3);;
        endOffsetY2 = compositeArray[i].height * (1/3);
        destShape = "triBR"
      }
    }
  }
  var cLength = 250;
  // console.log(beginOffsetX)
  // console.log(endOffsetX)
  if(beginOffsetX != null && endOffsetX !=null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      constraintLength = 250;
    }
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: beginOffsetX*Math.cos(constraintStart.angle), y: beginOffsetX*Math.sin(constraintStart.angle) + beginOffsetY*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: endOffsetX*Math.cos(constraintDestination.angle) + endOffsetY*Math.sin(constraintDestination.angle), y: endOffsetX*Math.sin(constraintDestination.angle) + endOffsetY*Math.cos(constraintDestination.angle)}, 
          stiffness: 0.05
          
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    jointComposites.push(Composite.create({
        constraints: [Constraint.create({pointA: { x: beginOffsetX2*Math.cos(constraintStart.angle), y: beginOffsetX2*Math.sin(constraintStart.angle) + beginOffsetY2*Math.cos(constraintStart.angle) },
          bodyA: constraintStart ,
          bodyB: constraintDestination ,
          pointB: { x: endOffsetX2*Math.cos(constraintDestination.angle) + endOffsetY2*Math.sin(constraintDestination.angle), y: endOffsetX2*Math.sin(constraintDestination.angle) + endOffsetY2*Math.cos(constraintDestination.angle)}, 
          stiffness: 1
          
        })]
    }))
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    console.log(jointComposites[totalJointComposites-1].constraints[0].length)
    // console.log("added")
    // console.log(jointComposites[0])
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
    for(var i = 0; i<jointComposites.length;i++){
      // console.log(jointComposites[i].constraints[0].bodyA);
    }
  }
  tickFunction()
}
// Create Pivot Balls 
function createUIConstraints(composite, initialXSpace, initialYSpace, radius){
  if(composite.shape == "linGear"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x - initialXSpace, composite.bodies[0].position.y - 200 - initialYSpace, radius))
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x + initialXSpace, composite.bodies[0].position.y - 200 - initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[2].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    composite.bodies[2].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({bodyA: composite.bodies[1], bodyB: composite.bodies[2], stiffness: 0.00001}))
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y-200 - initialYSpace}, pointB: {x:0, y:-200}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    // UIJointComposites.push(Composite.create({
    //     constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
    //     bodyA: constraintStart ,
    //     bodyB: constraintDestination ,
    //     pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
    //     stiffness: 0.00001
    //     })]
    // }))
  }
  if(composite.shape == "linRect"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x - initialXSpace, composite.bodies[0].position.y - (composite.height/2) - initialYSpace, radius))
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x + initialXSpace, composite.bodies[0].position.y - (composite.height/2) - initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[2].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    composite.bodies[2].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({bodyA: composite.bodies[1], bodyB: composite.bodies[2], stiffness: 0.00001}))
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y - initialYSpace}, pointB: {x:0, y:0}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    // UIJointComposites.push(Composite.create({
    //     constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
    //     bodyA: constraintStart ,
    //     bodyB: constraintDestination ,
    //     pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
    //     stiffness: 0.00001
    //     })]
    // }))
  }
  if(composite.shape == "circle"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x - initialXSpace, composite.bodies[0].position.y - initialYSpace, radius))
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x + initialXSpace, composite.bodies[0].position.y - initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[2].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    composite.bodies[2].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({bodyA: composite.bodies[1], bodyB: composite.bodies[2], stiffness: 0.00001}))
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y}, pointB: {x:0, y:0}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    // UIJointComposites.push(Composite.create({
    //     constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
    //     bodyA: constraintStart ,
    //     bodyB: constraintDestination ,
    //     pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
    //     stiffness: 0.00001
    //     })]
    // }))
  }
  tickFunction()
}
function createUIConstraintsMirror(composite, initialXSpace, initialYSpace, radius){
  if(composite.shape == "linGear"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x - initialXSpace, composite.bodies[0].position.y + 200 + initialYSpace, radius))
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x + initialXSpace, composite.bodies[0].position.y + 200 + initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[2].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    composite.bodies[2].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({bodyA: composite.bodies[1], bodyB: composite.bodies[2], stiffness: 0.00001}))
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y+200 + initialYSpace}, pointB: {x:0, y:-200}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    // UIJointComposites.push(Composite.create({
    //     constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
    //     bodyA: constraintStart ,
    //     bodyB: constraintDestination ,
    //     pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
    //     stiffness: 0.00001
    //     })]
    // }))
  }
  tickFunction()
}
function createUIConstraintsMirrorSingle(composite, initialXSpace, initialYSpace, radius){
  if(composite.shape == "linGear"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x, composite.bodies[0].position.y + 200 + initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y+200 + initialYSpace}, pointB: {x:0, y:-200}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    // UIJointComposites.push(Composite.create({
    //     constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) + startOffset2*Math.cos(constraintStart.angle) },
    //     bodyA: constraintStart ,
    //     bodyB: constraintDestination ,
    //     pointB: { x: destOffset*Math.cos(constraintDestination.angle) + destOffset2*Math.sin(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) + destOffset2*Math.cos(constraintDestination.angle)}, 
    //     stiffness: 0.00001
    //     })]
    // }))
  }
  tickFunction()
}
function createUIConstraintsSingle(composite, initialXSpace, initialYSpace, radius){
  console.log(composite.shape)
  if(composite.shape == "linGear"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x, composite.bodies[0].position.y - 200 - initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y-200 - initialYSpace}, pointB: {x:0, y:-200}, bodyB: composite.bodies[0], stiffness: 0.00001}))
  }
  if(composite.shape == "linRect"){
    if(!openCloseModule){
      Composite.add(composite, Bodies.circle(composite.bodies[0].position.x, composite.bodies[0].position.y - initialYSpace, radius))
      composite.bodies[1].render.fillStyle = "#bc98f9"
      composite.bodies[1].render.strokeStyle = "#000"
      Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y - initialYSpace}, pointB: {x:0, y:0}, bodyB: composite.bodies[0], stiffness: 0.00001}))

    }
    else{
      Composite.add(composite, Bodies.circle(composite.bodies[0].position.x, composite.bodies[0].position.y - (composite.height/2) - initialYSpace, radius))
      composite.bodies[1].render.fillStyle = "#bc98f9"
      composite.bodies[1].render.strokeStyle = "#000"
      Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y-(composite.height/2) - initialYSpace}, pointB: {x:0, y:-(composite.height/2)}, bodyB: composite.bodies[0], stiffness: 0.00001}))
    }
    console.log("hello")
  }
  if(composite.shape == "circle"){
    Composite.add(composite, Bodies.circle(composite.bodies[0].position.x, composite.bodies[0].position.y - initialYSpace, radius))
    composite.bodies[1].render.fillStyle = "#bc98f9"
    composite.bodies[1].render.strokeStyle = "#000"
    Composite.add(composite, Constraint.create({pointA: {x:composite.bodies[0].position.x, y: composite.bodies[0].position.y - initialYSpace}, pointB: {x:0, y:0}, bodyB: composite.bodies[0], stiffness: 0.00001}))
  }
  tickFunction()
}
function removeUIConstraints(composite){
  if(composite.bodies[1] && composite.bodies[2]){
    composite.constraints.splice(composite.constraints.length-1,1);
    composite.constraints.splice(composite.constraints.length-1,1);
    composite.bodies.splice(1,1);
    composite.bodies.splice(1,1);
  }
  tickFunction()
}
function removeUIConstraintsSingle(composite){
  if(composite.bodies[1]){
    composite.constraints.splice(composite.constraints.length-1,1);
    composite.bodies.splice(1,1);
  }
  tickFunction()
}
//////////////////////////// BODIES ////////////////////////////////
// redraw and generate shape if any parameters are modified (WIP) ignore for now
function changeBody(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawGear();
    compositeArray[index].radius = radius;
    compositeArray[index].shape = "gear"
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    if(compositeArray[index].shape == "gear"){
      Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1))
    }
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
  tickFunction()
}
function changeBodyContinuous(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawContinuousGear();
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
    compositeArray[index].shape = "gear"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
  tickFunction()
}
function changeBody2(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    if(index == 0){
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x-75
    }
    else{
      tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x-75
    }
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawCam();
    Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint+75, y: tmpConstraintYPoint },
        pointB: { x: 75, y: 0 },
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
  tickFunction()
}
function changeBody3(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
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
  tickFunction()
}
function changeBody4(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
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
  tickFunction()
}
function changeBody5(index, height){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
    var tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    linGearVerts = [];
    // drawRect(height);
    if(upDownModule){
      Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 15))
    }
    else{
      // Composite.add(compositeArray[index], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [linGearVerts]))
      Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 15))
    }
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    //compositeArray[index].radius = radius;
    compositeArray[index].shape = "linRect"
    compositeArray[index].height = height
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
  tickFunction()
}

function changeBodyCircle(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
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
    Composite.add(compositeArray[index], Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, radius))
    Composite.add(compositeArray[index], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[index].bodies[0], 
        stiffness: 1
      })
    )
    compositeArray[index].radius = radius;
    compositeArray[index].shape = "circleCrank"
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
  tickFunction()
}
////////////////// MODIFY BODY FUNCTIONS ///////////////////////
function alternateMotor(){
  // compositeArray[1].motorSpeed = 0.031;
  // compositeArray[0].motorSpeed = 0.031;
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<2; i++){
    if(compositeArray[i].isMotor == true){
      compositeArray[i].alternate = true;
    }
  }
}
function continuousMotor(){
  // compositeArray[1].motorSpeed = 0.031;
  // compositeArray[0].motorSpeed = 0.031;
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  for(var i = 0; i<2; i++){
    if(compositeArray[i].isMotor == true){
      compositeArray[i].alternate = false;
    }
  }
}
function changeMotorSpeed(value){
  for(var i = 0; i<compositeArray.length;i++){
    if(compositeArray[i].isMotor){
      compositeArray[i].motorSpeed = value/1000
    }
  }
}
/////////////////////// UI FUNCTIONS ////////////////////////////
function updateSliders(){
  if(document.getElementById("horizontalSpace")){
    document.getElementById("horizontalSpaceValue").innerHTML = module.horizontalSpace
    document.getElementById("horizontalSpace").value = module.horizontalSpace

  }
  if(document.getElementById("verticalSpace")){
    document.getElementById("verticalSpaceValue").innerHTML = module.verticalSpace
    document.getElementById("verticalSpace").value = module.verticalSpace
  }
  if(document.getElementById("connectorLength")){
    document.getElementById("connectorLengthValue").innerHTML = module.connectorLength
    document.getElementById("connectorLength").value = module.connectorLength
  }
  if(document.getElementById("pivotPoint")){
    document.getElementById("pivotPointValue").innerHTML = module.pivotPoint
    document.getElementById("pivotPoint").value = Math.round(module.pivotPoint)
  }
  if(document.getElementById("pivot2Point")){
    document.getElementById("pivot2PointValue").innerHTML = module.pivot2Point
    document.getElementById("pivot2Point").value = Math.round(module.pivot2Point)
  }
  if(document.getElementById("motorSpeed")){
    document.getElementById("motorSpeedValue").innerHTML = module.motorSpeed
    document.getElementById("motorSpeed").value = module.motorSpeed
  }
  if(document.getElementById("beamWidth")){
    document.getElementById("beamWidthValue").innerHTML = module.beamWidth
    //document.getElementById("beamWidth").value = module.beamWidth
  }
}
// slider input functions
var redLineWidth = 8
function horizontalInput(value){
  if(document.getElementById("horizontalSpace")){
    module.horizontalSpace = value;
  }
  compositeArray[0].constraints[1].render.lineWidth = redLineWidth
  compositeArray[0].constraints[1].render.strokeStyle = "#FF3318"
  if(mirrored){
    if(openCloseMod){
        compositeArray[compositeArray.length -3].constraints[1].render.lineWidth = redLineWidth
        compositeArray[compositeArray.length -3].constraints[1].render.strokeStyle = "#FF3318"
      }
      else{
        compositeArray[compositeArray.length -1].constraints[1].render.lineWidth = redLineWidth
        compositeArray[compositeArray.length -1].constraints[1].render.strokeStyle = "#FF3318"
      }
  }
}
function verticalInput(value){
  if(document.getElementById("verticalSpace")){
    module.verticalSpace = value
  }
  if(crankMod || crankModule){
    for(var i = 0; i<jointComposites.length; i++){
      if(jointComposites[i].constraints[0].bodyA == compositeArray[0].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[1].bodies[0]){
        jointComposites[i].constraints[0].render.lineWidth = redLineWidth
        jointComposites[i].constraints[0].render.strokeStyle = "#FF3318"
      }
      else if(jointComposites[i].constraints[0].bodyA == compositeArray[1].bodies[0] && jointComposites[i].constraints[0].bodyB == compositeArray[0].bodies[0]){
        jointComposites[i].constraints[0].render.lineWidth = redLineWidth
        jointComposites[i].constraints[0].render.strokeStyle = "#FF3318"
      }
    }
  }
  else{
    compositeArray[0].constraints[2].render.lineWidth = redLineWidth
    compositeArray[0].constraints[2].render.strokeStyle = "#FF3318"
    if(mirrored){
      if(openCloseMod){
        compositeArray[compositeArray.length -3].constraints[2].render.lineWidth = redLineWidth
        compositeArray[compositeArray.length -3].constraints[2].render.strokeStyle = "#FF3318"
      }
      else{
        compositeArray[compositeArray.length -1].constraints[2].render.lineWidth = redLineWidth
        compositeArray[compositeArray.length -1].constraints[2].render.strokeStyle = "#FF3318"
      }
    }
  }
}
function connectorInput(value){
  if(document.getElementById("connectorLength")){
    module.connectorLength = value
  }
  // console.log(jointComposites[jointComposites.length-1].constraints[0].render.lineWidth)
  // console.log(jointComposites[jointComposites.length-1].constraints[0].render.strokeStyle)
  jointComposites[jointComposites.length-1].constraints[0].render.lineWidth = redLineWidth
  jointComposites[jointComposites.length-1].constraints[0].render.strokeStyle = "#FF3318"
  jointComposites[jointComposites.length-2].constraints[0].render.lineWidth = redLineWidth
  jointComposites[jointComposites.length-2].constraints[0].render.strokeStyle = "#FF3318"
  if(mirrored){
    jointComposites[jointComposites.length-3].constraints[0].render.lineWidth = redLineWidth
    jointComposites[jointComposites.length-3].constraints[0].render.strokeStyle = "#FF3318"
    jointComposites[jointComposites.length-4].constraints[0].render.lineWidth = redLineWidth
    jointComposites[jointComposites.length-4].constraints[0].render.strokeStyle = "#FF3318"
  }
}
function pivotInput(value){
  if(document.getElementById("pivotPoint")){
    if(compositeArray[2]){
      if(flapModule){
        // module.pivotPoint = Math.round((value/module.beamWidth)*100)
        module.pivotPoint = Math.round(value)
      }
      else{
        // module.pivotPoint = Math.round((value/module.beamWidth)*100)
        module.pivotPoint = Math.round(value)
      }
    }
  }
}function pivot2Input(value){
  if(document.getElementById("pivot2Point")){
    if(!openCloseMod){
      module.pivot2Point = Math.round(value)
      if(crankMod){
        jointComposites[jointComposites.length-1].constraints[0].render.lineWidth = redLineWidth
        jointComposites[jointComposites.length-1].constraints[0].render.strokeStyle = "#FF3318"
      }
      else{
        compositeArray[0].constraints[1].render.lineWidth = redLineWidth
        compositeArray[0].constraints[1].render.strokeStyle = "#FF3318"
      }
    }
    else{
      module.pivot2Point =Math.round(value)
      compositeArray[0].constraints[2].render.lineWidth = redLineWidth
      compositeArray[0].constraints[2].render.strokeStyle = "#FF3318"
    }
  }
}
function speedInput(value){
  if(document.getElementById("motorSpeed")){
    module.motorSpeed = value
  }
}
function beamWidthInput(value){
  if(document.getElementById("beamWidth")){
    module.beamWidth = value
    compositeArray[2].bodies[0].render.lineWidth = 3
    compositeArray[2].bodies[0].render.strokeStyle = "#FF3318"
    compositeArray[3].bodies[0].render.lineWidth = 3
    compositeArray[3].bodies[0].render.strokeStyle = "#FF3318"
  }
}

function motorAngle(angle){
  angleEl = document.getElementById("motorAngleValue")
  var rotAngle = 0
  var degreeAngle = 0
  if(angleEl){
    var rotationNumber = Math.floor(angle/(2*Math.PI))
    var rotAngle = angle - ((2*Math.PI)*rotationNumber)
    degreeAngle = Math.round(rotAngle * (180/Math.PI))
    // if(degreeAngle>360){
    //   degreeAngle = degreeAngle - 360
    // }
    // var degreeAngle = Math.round(rotAngle * (180/Math.PI))
    angleEl.innerHTML = degreeAngle
    // console.log(angle)
    // console.log(rotationNumber)
  }
}
/////////////// SLIDER FUNCTIONS /////////////////////
function constraintLength(value){
  c = parseInt(value)
  if(flapModule){
    c = parseInt(value)+100
  }
  console.log("c Value = " + value)
  if(jointComposites[jointComposites.length-1] && jointComposites[jointComposites.length-2]){
    jointComposites[jointComposites.length-1].constraints[0].render.lineWidth = 2
    jointComposites[jointComposites.length-1].constraints[0].render.strokeStyle = "#666"
    jointComposites[jointComposites.length-2].constraints[0].render.lineWidth = 2
    jointComposites[jointComposites.length-2].constraints[0].render.strokeStyle = "#666"
  }
  if(mirrored){
    jointComposites[jointComposites.length-3].constraints[0].render.lineWidth = 2
    jointComposites[jointComposites.length-3].constraints[0].render.strokeStyle = "#666"
    jointComposites[jointComposites.length-4].constraints[0].render.lineWidth = 2
    jointComposites[jointComposites.length-4].constraints[0].render.strokeStyle = "#666"
  }
  tickFunction()
}
var beamWidthChange = 0
function beamWidth(value){
  if(compositeArray[2] && compositeArray[3]){
    Body.setAngle(compositeArray[2].bodies[0], 0)
    Body.setAngle(compositeArray[3].bodies[0], 0)
    if(!flapModule){
      deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
      deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
      compositeArray[2].bodies[0].vertices[0].x = compositeArray[2].bodies[0].position.x - 150 - value
      compositeArray[2].bodies[0].vertices[3].x = compositeArray[2].bodies[0].position.x - 150 - value
      compositeArray[3].bodies[0].vertices[0].x = compositeArray[3].bodies[0].position.x + 150 + parseInt(value)
      compositeArray[3].bodies[0].vertices[3].x = compositeArray[3].bodies[0].position.x + 150 + parseInt(value)
      createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0], parseInt(value), originalWidth1)
      createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0], -parseInt(value), originalWidth2)
      // compositeArray[2].bodies[0].vertices[0].x = compositeArray[2].bodies[0].vertices[0].x + value
      // compositeArray[2].bodies[0].vertices[3].x = compositeArray[2].bodies[0].vertices[3].x + value
    }
    else{
      Body.setAngle(compositeArray[0].bodies[0], 0)
      Body.setAngle(compositeArray[1].bodies[0], 0)
      deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0])
      deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
      compositeArray[2].bodies[0].vertices[0].x = compositeArray[2].bodies[0].position.x + 150 + parseInt(value)
      compositeArray[2].bodies[0].vertices[3].x = compositeArray[2].bodies[0].position.x + 150 + parseInt(value)
      compositeArray[3].bodies[0].vertices[0].x = compositeArray[3].bodies[0].position.x - 150 - parseInt(value)
      compositeArray[3].bodies[0].vertices[3].x = compositeArray[3].bodies[0].position.x - 150 - parseInt(value)
      createConstraintFake2(compositeArray[1].bodies[0], compositeArray[2].bodies[0], -parseInt(value), originalWidth1)
      createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0], parseInt(value), originalWidth2)
      // compositeArray[2].bodies[0].vertices[0].x = compositeArray[2].bodies[0].vertices[0].x + value
      // compositeArray[2].bodies[0].vertices[3].x = compositeArray[2].bodies[0].vertices[3].x + value
    }
    compositeArray[2].width = originalWidth1 + parseInt(value)
    compositeArray[3].width = originalWidth2 + (-parseInt(value))
    newWidth1 = compositeArray[2].width
    newWidth2 = compositeArray[3].width
    // console.log(compositeArray[2].width)
    beamWidthChange = parseInt(value)
    compositeArray[2].bodies[0].render.fillStyle = "#cccccc"
    compositeArray[2].bodies[0].render.strokeStyle = "#000"
    compositeArray[2].bodies[0].render.lineWidth = 2
    compositeArray[3].bodies[0].render.fillStyle = "#cccccc"
    compositeArray[3].bodies[0].render.strokeStyle = "#000"
    compositeArray[3].bodies[0].render.lineWidth = 2
  }
  tickFunction()
}
var pivot2Value = 50
var changePivot2Height
var prevPivot2Value = 0
function pivot3Height(value){
  if(!openCloseMod){
    pivot2Value = 50 + parseInt(value)
    compositeArray[0].constraints[1].render.lineWidth = 2
    compositeArray[0].constraints[1].render.strokeStyle = "#666"
  }
  else{
    changePivot2Height = parseInt(value) - prevPivot2Value
    pivot2Value = 50 + parseInt(value)
    // jointComposites[totalJointComposites-1].constraints[0].pointA.y = jointComposites[totalJointComposites-1].constraints[0].pointA.y - parseInt(changePivot2Height)
    // jointComposites[totalJointComposites-2].constraints[0].pointA.y = jointComposites[totalJointComposites-2].constraints[0].pointA.y - parseInt(changePivot2Height)
    compositeArray[0].constraints[2].render.lineWidth = 2
    compositeArray[0].constraints[2].render.strokeStyle = "#666"
    prevPivot2Value = parseInt(value)
  }
  tickFunction()
}
function startRunner(){
  if(paused){
    Runner.start(runner, engine)
    paused = false;
  }
}
function stopRunner(){
  Runner.stop(runner)
  paused = true
}
function tickFunction(){
  if(paused){
    tickRunner()
  }
}
function tickRunner(){
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
  Runner.tick(runner, engine, 10)
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function pause(){
  module.motorSpeed = 0
}
//////////////////// FRAME UPDATE /////////////////////////////////////
Events.on(engine, 'beforeUpdate', function(event) {
  // console.log("screen = " + screen.height + "  window = " + window.innerHeight )
  updateSliders()
  // console.log(jointComposites[jointComposites.length-2].constraints[0].pointA.x)
  // console.log(compositeArray[0].bodies[0].position.y)
  // pivotHeight()
  // compositeArray[3].bodies[0].vertices[0].x = 1000
    // increment counter just in case we need to do something that happens ever couple of frames
    counter += 1;
    // functions that need to be called every frame on each body in the world
    for(var i = 0; i<compositeArray.length;i++){
      if(compositeArray[i].bodies[1]){
        compositeArray[i].bodies[1].collisionFilter.mask = otherCategory
        if(compositeArray[i].bodies[2]){
          compositeArray[i].bodies[2].collisionFilter.mask = otherCategory
        }
        if(compositeArray[i].shape == "linGear"){
          if(i == 0){
            // console.log(jointComposites[jointComposites.length-2])
            if(jointComposites[jointComposites.length-2] && jointComposites[jointComposites.length-2].constraints[0].pointA != null){
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-2].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y  - 200 - prevPivotValue})
              if(compositeArray[i].bodies[2]){
                Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-1].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y  - 200 - prevPivotValue})
                // console.log(prevSpaceValue)
              }
            }
            else{
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x, y:compositeArray[i].bodies[0].position.y  - 200 - pivot2Value})
              // if(compositeArray[i].bodies[2]){
              //   Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  - 200 - prevPivotValue})
              //   // console.log(prevSpaceValue)
              // }
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y
          }
          else{
            if(jointComposites[jointComposites.length-2] && jointComposites[jointComposites.length-2].constraints[0].pointA != null){
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x - parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  + 200 + parseInt(prevPivotValue)})
              if(compositeArray[i].bodies[2]){
                Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  + 200 + parseInt(prevPivotValue)})
                console.log(prevSpaceValue)
              }
            }
            else{
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x, y:compositeArray[i].bodies[0].position.y  + 200 + parseInt(pivot2Value)})
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y

          }
        }
        else if(compositeArray[i].shape == "linRect"){
          if(i == 0){
            // console.log(jointComposites[jointComposites.length-2])
            if(jointComposites[jointComposites.length-2] && jointComposites[jointComposites.length-2].constraints[0].pointA != null){
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-2].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y  - (compositeArray[i].height/2) - prevPivotValue})
              if(compositeArray[i].bodies[2]){
                Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-1].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y  - (compositeArray[i].height/2) - prevPivotValue})
                // console.log(prevSpaceValue)
              }
            }
            else{
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x, y:compositeArray[i].bodies[0].position.y  - (compositeArray[i].height/2) - pivot2Value})
              // if(compositeArray[i].bodies[2]){
              //   Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  - (compositeArray[i].height/2) - prevPivotValue})
              //   // console.log(prevSpaceValue)
              // }
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y
          }
          else{
            if(jointComposites[jointComposites.length-2] && jointComposites[jointComposites.length-2].constraints[0].pointA != null){
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x - parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  + (compositeArray[i].height/2) + parseInt(prevPivotValue)})
              if(compositeArray[i].bodies[2]){
                Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y  + (compositeArray[i].height/2) + parseInt(prevPivotValue)})
                console.log(prevSpaceValue)
              }
            }
            else{
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x, y:compositeArray[i].bodies[0].position.y  + (compositeArray[i].height/2) + parseInt(pivot2Value)})
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y

          }
        }
        else if(compositeArray[i].shape == "circle"){
          if(i == 0){
            // console.log(jointComposites[jointComposites.length-2])
            if(jointComposites[jointComposites.length-2] && jointComposites[jointComposites.length-2].constraints[0].pointA != null){
              // jointComposites[totalJointComposites-1].constraints[0].pointA.y = compositeArray[0].bodies[1].position.y
              // jointComposites[totalJointComposites-2].constraints[0].pointA.y = compositeArray[0].bodies[2].position.y
              Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-2].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y - parseInt(pivot2Value)})
              if(compositeArray[i].bodies[2]){
                Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + jointComposites[jointComposites.length-1].constraints[0].pointA.x , y:compositeArray[i].bodies[0].position.y - parseInt(pivot2Value)})
                // console.log(compositeArray[i].bodies[2].position.y)
                // console.log(compositeArray[i].bodies[1].position.y)
              }
            }
            else{
              if(!openCloseMod){
                // console.log(pivot2Value)
                Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x, y:compositeArray[i].bodies[0].position.y - parseInt(pivot2Value)})
              }
              else{
                Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x - parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y - parseInt(pivot2Value)})
                if(compositeArray[i].bodies[2]){
                  Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y - parseInt(pivot2Value)})
                  // console.log(prevSpaceValue)
                }
              }
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y
          }
          else{
            Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].bodies[0].position.x - parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y + parseInt(prevPivotValue)})
            if(compositeArray[i].bodies[2]){
              Body.setPosition(compositeArray[i].bodies[2], {x:compositeArray[i].bodies[0].position.x + parseInt(prevSpaceValue) , y:compositeArray[i].bodies[0].position.y + parseInt(prevPivotValue)})
              console.log(prevSpaceValue)
            }
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.x = compositeArray[i].bodies[0].position.x
            compositeArray[i].constraints[compositeArray[i].constraints.length-1].pointA.y = compositeArray[i].bodies[1].position.y
          }
        }
        else{
          Body.setPosition(compositeArray[i].bodies[1], {x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].bodies[0].position.y})
          Body.setAngle(compositeArray[i].bodies[1], compositeArray[i].bodies[0].angle)
          if(compositeArray[i].radius == 80){
            if(compositeArray[i].isMotor && compositeArray[i].realMotor){
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_m_large.png"
            }
            else{
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_nm_large.png"
            }
          }
          else if(compositeArray[i].radius == 64){
            if(compositeArray[i].isMotor && compositeArray[i].realMotor){
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_m_med.png"
            }
            else{
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_nm_med.png"
            }
          }
          else if(compositeArray[i].radius == 48){
            if(compositeArray[i].isMotor && compositeArray[i].realMotor){
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_m_small.png"
            }
            else{
              compositeArray[i].bodies[1].render.sprite.texture = "./img/gear_nm_small.png"
            }
          }
        }
      }
      compositeArray[i].constraints[0].render.visible = false;
      
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
            if(compositeArray[i].bodies[1]){
              // Body.setAngle(compositeArray[i].bodies[1], compositeArray[i].rotation);
              // Body.setPosition(compositeArray[i].bodies[1],{x:compositeArray[i].constraints[0].pointA.x, y: compositeArray[i].bodies[1].position.y})
            }
          }
          else{
            compositeArray[i].lock = true;
          }
        }
        if(compositeArray[i].shape == "linRect"){
          if(compositeArray[i].lock == true){
            Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
            if(compositeArray[i].bodies[1]){
              // Body.setAngle(compositeArray[i].bodies[1], compositeArray[i].rotation);
              // Body.setPosition(compositeArray[i].bodies[1],{x:compositeArray[i].constraints[0].pointA.x, y: compositeArray[i].bodies[1].position.y})
            }
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
        if(compositeArray[i].shape == "rect"){
          // newWidth1 = compositeArray[i].bodies[0].vertices[1].x - compositeArray[i].bodies[0].vertices[0].x
          // newWidth2 = compositeArray[i].bodies[0].vertices[1].x - compositeArray[i].bodies[0].vertices[0].x
        }
      }

      // if body is set as a motor
      if(compositeArray[i].isMotor == true){
        if(i < 2){
          motorAngle(compositeArray[i].bodies[0].angle)
        }
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
        if(paused){
          compositeArray[i].motorSpeed = 0;
        }
        else{
          compositeArray[i].motorSpeed = module.motorSpeed/1000
        }
      }
    }    
    //engine.render.options.height = window.innerHeight
    for(var i = 0; i<compositeArray.length; i++){
      if(compositeArray[i].radius != 0){
        for(var j=0; j<compositeArray[i].bodies[0].parts.length;j++){
          if(compositeArray[i].shape == "gear"){
            compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#000000";
          }
          if(compositeArray[i].shape == "rect" || compositeArray[i].shape == "poly"){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#cccccc";
          }
          if(compositeArray[i].radius == 48 || compositeArray[i].radius == 88){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#FF6B6B";
            for(var k = 0; k<compositeArray.length; k++){
              if(compositeArray[k].bodies[1]){
                compositeArray[k].bodies[1].render.fillStyle = "#FF6B6B";
                if(compositeArray[k].bodies[2]){
                  compositeArray[k].bodies[2].render.fillStyle = "#FF6B6B";
                }
              }
              if(compositeArray[k].shape == "linGear" || compositeArray[k].shape == "linRect"){
                for(var p = 0; p<compositeArray[k].bodies[0].parts.length; p++){
                  compositeArray[k].bodies[0].parts[p].render.fillStyle = "#8d2f2f";
                  compositeArray[k].bodies[0].parts[p].render.strokeStyle = "#8d2f2f";
                }
              }
              if(compositeArray[k].shape == "circle"){
                compositeArray[k].bodies[0].render.fillStyle = "#FF6B6B";
              }
              if(compositeArray[k].shape == "circleCrank"){
                compositeArray[k].bodies[0].render.sprite.texture = "./img/crank96px.png"
                if(upDownModule || openCloseModule){ 
                  compositeArray[k].bodies[0].render.sprite.xScale = 88/48
                  compositeArray[k].bodies[0].render.sprite.yScale = 88/48
                }
              }
            }            
          }
          else if(compositeArray[i].radius == 64 || compositeArray[i].radius == 104){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#4ECDC4";
            for(var k = 0; k<compositeArray.length; k++){
              if(compositeArray[k].bodies[1]){
                compositeArray[k].bodies[1].render.fillStyle = "#4ECDC4";
                if(compositeArray[k].bodies[2]){
                  compositeArray[k].bodies[2].render.fillStyle = "#4ECDC4";
                }
              }
              if(compositeArray[k].shape == "linGear" || compositeArray[k].shape == "linRect"){
                for(var p = 0; p<compositeArray[k].bodies[0].parts.length; p++){
                  compositeArray[k].bodies[0].parts[p].render.fillStyle = "#15605b";
                  compositeArray[k].bodies[0].parts[p].render.strokeStyle = "#15605b";
                }
              }
              if(compositeArray[k].shape == "circle"){
                compositeArray[k].bodies[0].render.fillStyle = "#4ECDC4";
              }
              if(compositeArray[k].shape == "circleCrank"){
                compositeArray[k].bodies[0].render.sprite.texture = "./img/crank128px.png"
                if(upDownModule || openCloseModule){
                  compositeArray[k].bodies[0].render.sprite.xScale = 104/64
                  compositeArray[k].bodies[0].render.sprite.yScale = 104/64
                }
              }
            }
          }
          else if(compositeArray[i].radius == 80 || compositeArray[i].radius == 120){
            compositeArray[i].bodies[0].parts[j].render.fillStyle = "#bc98f9";
            for(var k = 0; k<compositeArray.length; k++){
              if(compositeArray[k].bodies[1]){
                compositeArray[k].bodies[1].render.fillStyle = "#bc98f9";
                if(compositeArray[k].bodies[2]){
                  compositeArray[k].bodies[2].render.fillStyle = "#bc98f9";
                }
              }
              if(compositeArray[k].shape == "linGear" || compositeArray[k].shape == "linRect"){
                for(var p = 0; p<compositeArray[k].bodies[0].parts.length; p++){
                  compositeArray[k].bodies[0].parts[p].render.fillStyle = "#7149b6";
                  compositeArray[k].bodies[0].parts[p].render.strokeStyle = "#7149b6";
                }
              }
              if(compositeArray[k].shape == "circle"){
                compositeArray[k].bodies[0].render.fillStyle = "#bc98f9";
              }
              if(compositeArray[k].shape == "circleCrank"){
                compositeArray[k].bodies[0].render.sprite.texture = "./img/crank160px.png"
                if(upDownModule || openCloseModule){
                  compositeArray[k].bodies[0].render.sprite.xScale = 120/80
                  compositeArray[k].bodies[0].render.sprite.yScale = 120/80
                }

              }
              if(compositeArray[k].shape == "gear"){
                compositeArray[k].bodies[0].parts[0].render.sprite.texture = "./img/crank160px.png"
                if(compositeArray[k].isMotor){
                  
                }
                else{

                }
              }
            }
          }
        }
      }
    }
    if(flapModule == true){
      updateFlapUI()
    }
    else{
      updateUI()
    }
    rotationUI()
    if(rackPinionModule || crankModule || camModule){
      sliderDisplay()
    }
    if(upDownModule){
      UDSliderDisplay()
    }
})
// called every frame after physics is applied
// same as above
Events.on(engine, 'afterUpdate', function(event) {
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
      if(compositeArray[i].shape == "linGear" || compositeArray[i].shape == "linRect"){
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
  
  if(upDownModule == true){
    if(rackPinionMod == true){
      if(compositeArray[1].alternate == false){
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
      }
    }
  }
  if(camModule == true){
    if(camMod == true){
      // var camChangeY = compositeArray[0].constraints[0].pointA.y- compositeArray[0].bodies[0].position.y
      // var factor = (camChangeY-8)/100
      // // console.log((camChangeY-8)/40)
      // var gear2CenterChangeY = gear2CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
      // var gear1CenterY = compositeArray[1].bodies[0].position.y
      // var gear1CenterChangeY = gear1CenterY - compositeArray[1].bodies[0].position.y + ((radius*0.8) * Math.sin(compositeArray[1].bodies[0].angle*0.64*Math.PI))
      // Body.setAngle(compositeArray[2].bodies[0], 0 + factor)
      // Body.setAngle(compositeArray[3].bodies[0], 0 + -factor)
    }
  }
  // console.log(compositeArray[0].bodies[0].position.y - 200)
  //291.398
  //562.4
  //271
})
// console.log(compositeArray[0].bodies[0].position.y)
// console.log(beamSpace)
