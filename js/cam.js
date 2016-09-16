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
var linSteps = 30;
var centerX = 100;
var centerY = 100;
var radius = 80;
var verts2 = [];
var verts3 = [];
var linGearVerts = []
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = .25*64;
var toothWidthDegree = 2;
var toothWidth = (toothWidthDegree/conversionFactor);
var offset = 0;
var motors = [];
var jointArray;
var camWidth = 40;
var openCloseMod = false;

////////////////////// GEAR GENERATION ///////////////////////////////
function drawCam(){
  verts2 = [];
  for (var i = 0; i < steps; i++) {
    console.log(radius)
    xValues[i] = ((radius+camWidth) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((radius) * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}
drawCam();
function drawPolygon(width, height){
  verts3 = [];
  verts3.push({x:centerX-(width/2),y:centerY});
  verts3.push({x:centerX-(width/2), y:centerY-(height/2)})
  verts3.push({x:centerX-(width/2), y:centerY-(height)})
  verts3.push({x:centerX+(width/2), y:centerY-height})
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
       linGearVerts.push({ x: 230 + 30, y: 600- ((400/linSteps)*i)-3.3333});
       linGearVerts.push({ x: 230 + 30, y: 600 - ((400/linSteps)*i) - 9.999999});
    }
  }
  // add last corner
  linGearVerts.push({ x: 230, y: 600 - 400});
}
drawLinGear();
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
      stiffness: 0.01
    })
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function addPolyComposite2(centerX, centerY, width, height){
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
    Constraint.create({pointA: { x: centerX-width/2, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/-2, y: 0 }, stiffness: 1})
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
function changeBody(){
  for(var i=0; i<1;i++){
    Composite.remove(compositeArray[i], compositeArray[i].bodies[0]);
    var tmpConstraintXPoint = compositeArray[0].constraints[0].pointA.x
    var tmpConstraintYPoint = compositeArray[0].constraints[0].pointA.y
    Composite.remove(compositeArray[i], compositeArray[i].constraints[0]);
    verts2 = [];
    //console.log(verts2.length)
    drawCam();
    //console.log(verts2.length)
    Composite.add(compositeArray[i], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
    Composite.add(compositeArray[i], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
        bodyB: compositeArray[i].bodies[0], 
        stiffness: 1
      })
    )
    for(var j=0; j<compositeArray[i].bodies[0].parts.length;j++){
      compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function smallGear(){
  radius = 48;
  compositeArray[0].radius = radius;
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody();
}
function mediumGear(){
  radius = 64;
  compositeArray[0].radius = radius;
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody();
}
function largeGear(){
  radius = 80;
  compositeArray[0].radius = radius;
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody();
}

function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "upDown"){
    openCloseMod = false;
    upDownMod = true;
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*0.65
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: (window.innerHeight)*0.65})
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*0.4
    Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].bodies[0].position.x, y: (window.innerHeight)*0.4})
  }
  else if(string == "openClose"){
    openCloseMod = true;
    upDownMod = false;
    addRectComposite(300, 10,(window.innerWidth)*(0.75*0.5)-200,(window.innerHeight)*(0.58)-400)
    addRectComposite(-300, 10,(window.innerWidth)*(0.75*0.5)+200,(window.innerHeight)*(0.58)-400)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*0.85
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*0.6

  }
}

//////////////// CONSTRAINTS //////////////////////////////////////
function createConstraint(constraintStart, constraintDestination, length){
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
          stiffness: 1,
          length: constraintLength
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
function createConstraint2(constraintStart, constraintDestination, length){
  var startOffset;
  var startOffset2;
  var destOffset;
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
        startOffset2 = 0
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
        destOffset = compositeArray[i].width*0.5;
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
          stiffness: 1,
          length: constraintLength
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
        if(compositeArray[i].shape == "linGear"){
          if(compositeArray[i].lock == true){
            Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
            Body.setPosition(compositeArray[i].bodies[0], {x:(window.innerWidth)*(0.75*0.5), y:compositeArray[i].bodies[0].position.y})
          }
          else{
            compositeArray[i].lock = true;
          }
        }
      }
      if(compositeArray[i].isMotor == true){
        Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
      }
    }
    if (clicked == true){
      if(clickedComposite.lock == true){
        Body.setAngle(clickedComposite.bodies[0], clickedComposite.rotation);
      }
    }
    if (counter >= 60 * timeInterval) {
        // reset counter
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
    updateUI();
})
Events.on(engine, 'afterUpdate', function(event) {
    if(openCloseMod == true){
      var camChangeY = compositeArray[1].constraints[0].pointA.y- compositeArray[1].bodies[0].position.y
      var factor = (camChangeY-8)/100
      console.log((camChangeY-8)/40)
      Body.setAngle(compositeArray[2].bodies[0], 0 + factor)
      Body.setAngle(compositeArray[3].bodies[0], 0 + -factor)
    }
  })
////////////////////// RUN /////////////////////////////
var width = 350;
addGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*0.65)
compositeArray[0].isMotor = true;
addLinGearComposite((window.innerWidth)*(0.75*0.5),(window.innerHeight)*0.4)
// run the engine
Engine.run(engine);
Render.run(render);