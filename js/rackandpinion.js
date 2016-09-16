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
// create mouse dragging
var mouseConstraint = MouseConstraint.create(engine);

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

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

var openCloseMod = false;

var angleFactor = 0.35

var mirrored = false;
var paired = false;
var shared = false;
var flipY = false;

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
       linGearVerts.push({ x: 230 + 20, y: 600- ((400/linSteps)*i)-3.3333});
       linGearVerts.push({ x: 230 + 20, y: 600 - ((400/linSteps)*i) - 9.999999});
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
        destOffset2 = 100;
        destShape = "linGear"
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
    //console.log(verts2.length)
    drawCam();
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
// generate small gear
function smallGear(){
  angleFactor = 0.21
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
}
function mediumGear(){
  angleFactor = 0.28
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
}
function largeGear(){
  angleFactor = 0.35
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody(1);
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
}

function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "upDown"){
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = false;
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.7))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
  }
  else if(string == "openClose"){
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = true;
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite(300, 10,(window.innerWidth)*(0.75*0.45)-200,(window.innerHeight)*(0.5)-350)
    addRectComposite(-300, 10,(window.innerWidth)*(0.75*0.45)+200,(window.innerHeight)*(0.5)-350)
  }
}
function mirrorModal(){
  flipLabel = document.getElementById("flipYLabel");
  flipCheck = document.getElementById("flipYCheck");
  flipTitle = document.getElementById("flipYTitle");
  if(mirrored == false){
    overlay3();
    if (openCloseMod != true){
      flipCheck.style.visibility = "hidden"
      flipLabel.style.visibility = "hidden"
      flipTitle.style.visibility = "hidden"
    }
    else{
      flipCheck.style.visibility = "visible"
      flipLabel.style.visibility = "visible"
      flipTitle.style.visibility = "visible"
    }
  }
}
function mirror(){
  mirrored = true;
  if (openCloseMod != true){
    if(document.getElementById('paired').checked) {
      paired = true;
      compositeArray[0].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x-(radius + toothHeight/2)
      compositeArray[1].constraints[0].pointA.x = compositeArray[1].constraints[0].pointA.x-(radius + toothHeight/2)
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.7))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,(window.innerHeight)*(0.5))
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:(window.innerHeight)*(0.5)+130})
      compositeArray[compositeArray.length-1].rotation = Math.PI

    }else if(document.getElementById('shared').checked) {
      shared = true;
      Body.setAngle(compositeArray[1].bodies[0], 0)
      compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:compositeArray[1].constraints[0].pointA.y+130})
      addLinGearComposite((window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25,compositeArray[1].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].bodies[0].position.x, y:compositeArray[1].constraints[0].pointA.y-130})
      compositeArray[compositeArray.length-1].rotation = Math.PI
    }
  }
  else{
    if(document.getElementById('paired').checked) {
      paired = true;
      compositeArray[0].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x-(radius + toothHeight/2)
      compositeArray[1].constraints[0].pointA.x = compositeArray[1].constraints[0].pointA.x-(radius + toothHeight/2)
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.7))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,compositeArray[0].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.x})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 10,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,(window.innerHeight)*(0.5)+350)
        addRectComposite(-300, 10,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,(window.innerHeight)*(0.5)+350)
      }


    }else if(document.getElementById('shared').checked) {
      shared = true;
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
      addLinGearComposite((window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25,compositeArray[1].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].bodies[0].position.x, y:(window.innerHeight)*(0.5)-130})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      //Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 10,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,(window.innerHeight)*(0.5)+350)
        addRectComposite(-300, 10,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,(window.innerHeight)*(0.5)+350)
      }
    }
  }
  overlay3();
}
function reset(){
  mirrored = false;
  shared = false;
  paired = false;
  flipY = false;
  if(openCloseMod == true){
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite(300, 10,(window.innerWidth)*(0.75*0.45)-200,(window.innerHeight)*(0.5)-350)
    addRectComposite(-300, 10,(window.innerWidth)*(0.75*0.45)+200,(window.innerHeight)*(0.5)-350)
  }
  else{
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.7))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.5)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
  }
}
//////////////////////// ADD TO WORLD //////////////////////

// add mouse constraint to world


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
            //Body.setPosition(compositeArray[i].bodies[0],{x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].constraints[0].pointA.y})
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
    // always keep locked object rotation to specified rotation angle even when clicked
    if (clicked == true){
      if(clickedComposite.lock == true){
        Body.setAngle(clickedComposite.bodies[0], clickedComposite.rotation);
      }
    }

    // every 1.5 sec
    if (counter >= 60 * timeInterval) {
        //rotationSpeed = rotationSpeed *-1;
        // reset counter
        counter = 0;
        scaleFactor = 1;
    }
    if(openCloseMod == true){
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x -25
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x +25
      if(flipY == true ){
        if(paired ==true){
          compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x -25
          compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x +25
        }
        if(shared ==true){
          compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x -25
          compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x +25
        }
      }
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
    }
    else{
      if(compositeArray[i].shape == "gear"){
        if(clickedComposite != compositeArray[i]){
        }
      }
    }
    if(compositeArray[i].isMotor == true){
      Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
    }
  }
  if(openCloseMod == true){
    Body.setAngle(compositeArray[2].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
    Body.setAngle(compositeArray[3].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
  }
  if(paired == true){
    for(var i = 2; i<compositeArray.length; i++){
      if(compositeArray[i].shape == "linGear"){
        Body.setPosition(compositeArray[i].bodies[0], {x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[0].bodies[0].position.y})
      }
    }
  }
  if(shared == true){
    for(var i = 2; i<compositeArray.length; i++){
      if(compositeArray[i].shape == "linGear"){
        var difference = compositeArray[0].bodies[0].position.y - compositeArray[0].constraints[0].pointA.y
        Body.setPosition(compositeArray[i].bodies[0], {x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].constraints[0].pointA.y-difference})
      }
    }
    if(flipY == true){
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
      
    }
  }
  if(paired == true){
    if(flipY == true){
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], -compositeArray[4].bodies[0].angle*-angleFactor);
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], -compositeArray[4].bodies[0].angle*angleFactor);
    }
  }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.5))
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.7)) ,(window.innerHeight)*(0.5))
Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
Engine.run(engine);
Render.run(render);