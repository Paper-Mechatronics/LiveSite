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
var engine = Engine.create(document.body, {
  render: {
    options: {
      height: window.innerHeight,
      width: window.innerWidth*0.75,
      wireframes: false,
      showAngleIndicator: true
    }
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
var selectionMode = false;
var dragMode = true;
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
var radius = 76;
var verts2 = [];
var verts3 = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = 20;
var toothWidthDegree = 3;
var toothWidth = (toothWidthDegree/conversionFactor);
var offset = 0;
var motors = [];
var jointArray;

/////////////////////// Modal /////////////////////////////////////////
function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
function overlay2() {
    el2 = document.getElementById("overlay2");
    el2.style.visibility = (el2.style.visibility == "visible") ? "hidden" : "visible";
}
function overlay3() {
    el3 = document.getElementById("overlay3");
    el3.style.visibility = (el3.style.visibility == "visible") ? "hidden" : "visible";
    //displayConstraints();
}
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
  verts3.push({x:centerX+(width/2), y:centerY})
  verts3.push({x:centerX, y:centerY-height})

}
//drawPolygon();
//World.add(engine.world, Bodies.fromVertices(300, 300, [verts3]))
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
  select(compositeArray[totalComposites-1].bodies[0]);
  console.log(totalComposites)
}
function addRectComposite(centerX, centerY, width, height){
  totalComposites++;
  totalConstraints++;
  compositeArray.push( 
  Composite.create({
        bodies:[Bodies.rectangle(centerX, centerY, width, height)],
        constraints:[],
        shape: "rect",
        width: width,
        height: height,
        lock: true

      })
  )
  constraintArray.push(
    Constraint.create({pointA: { x: centerX+width/2, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/2, y: 0 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
  select(compositeArray[totalComposites-1].bodies[0]);
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
    Constraint.create({pointA: { x: centerX+width/2, y: centerY+25 },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/2, y: 25 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
  select(compositeArray[totalComposites-1].bodies[0]);
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
    Constraint.create({pointA: { x: centerX-width/2, y: centerY+25 },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/-2, y: 25 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
  select(compositeArray[totalComposites-1].bodies[0]);
}
function removeComposite(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(compositeArray[j].bodies[0] == selected){
          for(var k=0; k<jointComposites.length;k++){
            if(jointComposites[k].constraints[0].bodyA == selected || jointComposites[k].constraints[0].bodyB == selected){
              for(var m=0; m<compositeArray.length;m++){
                if(jointComposites[k].constraints[0].bodyA != selected && jointComposites[k].constraints[0].bodyA == compositeArray[m].bodies[0]){
                  compositeArray[m].hasConstraint = false;
                }
                if(jointComposites[k].constraints[0].bodyB != selected && jointComposites[k].constraints[0].bodyB == compositeArray[m].bodies[0]){
                  compositeArray[m].hasConstraint = false;
                }
              }
              jointComposites[k].constraints[0].bodyA = null;
              jointComposites[k].constraints[0].bodyB = null;
              jointComposites[k].constraints[0].pointA = null;
              jointComposites[k].constraints[0].pointB = null;
            }
          }
          Composite.clear(compositeArray[j], true);
          compositeArray.splice(j,1);
        }
      }
      totalComposites--;
    }
  }
  else{
    for(var i=0; i<compositeArray.length;i++){
      if(compositeArray[i].bodies[0] == selected){
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
    for(var i=0; i<compositeArray.length;i++){
      console.log(compositeArray[i]);
    }
    //World.add(engine.world,[compositeArray[i]] );
    totalComposites--;
  }
  console.log(totalComposites)
}
function changeBody(){
  if(selected.label != "Rectangle Body"){
    for(var i=0; i<compositeArray.length;i++){
      if(compositeArray[i].bodies[0] == selected){
        if(motor == compositeArray[i].bodies[0]){
          motor = null;
        }
        Composite.remove(compositeArray[i], compositeArray[i].bodies[0]);
        var tmpConstraintXPoint = compositeArray[i].constraints[0].pointA.x;
        var tmpConstraintYPoint = compositeArray[i].constraints[0].pointA.y;
        Composite.remove(compositeArray[i], compositeArray[i].constraints[0]);
        verts2 = [];
        //console.log(verts2.length)
        drawGear();
        //console.log(verts2.length)
        Composite.add(compositeArray[i], Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2]))
        Composite.add(compositeArray[i], Constraint.create({pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
            bodyB: compositeArray[i].bodies[0], 
            stiffness: 1
          })
        );
        select(compositeArray[i].bodies[0]);
      }
    }
  }
}
function smallGear(){
  radius = 38;
  steps = 20;
  toothHeight = 20;
  toothWidthDegree = 6;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
  addGearComposite();
  radius = 76;
  steps = 40;
  toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
}
function mediumGear(){
  radius = 57;
  steps = 30;
  toothHeight = 20;
  toothWidthDegree = 4.5;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
  addGearComposite();
  radius = 76;
  steps = 40;
  toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
}

//////////////// CONSTRAINTS //////////////////////////////////////

// function displayConstraints(){
//   for(var i = 0;i<constraintArray.length;i++){
//     if(constraintArray[i].bodyB == selected || constraintArray[i].bodyA == selected){
//       document.getElementById("constraint1").innerHTML = constraintArray[i].label;
//       document.getElementById("constraint1Check").value = constraintArray[i].id;
//       //console.log("displayed!!!!!!");
//     }
//   }
// }
// function deleteConstraint(){
//   for(var i = 0;i<jointComposites.length;i++){
//     if(document.getElementById("constraint1Check").checked){
//       if(constraintArray[i].id == document.getElementById("constraint1Check").value){
//         console.log("working");
//         console.log(constraintArray[i].id)
//         console.log(document.getElementById("constraint1Check").value)
//       }
//     }
//   }
// }
function constraintStiffness(){
  for(var i = 0; i<compositeArray.length;i++){
    compositeArray[i].constraints[0].stiffness = 1;
    compositeArray[i].constraints[0].length = 0;
    //compositeArray[i].constraints[0].angularStiffness = 0.1;
  }
}
function deleteConstraint(){
  for(var i=0; i<jointComposites.length;i++){
    console.log(jointComposites[i].constraints[0].bodyA);
    if((jointComposites[i].constraints[0].bodyA == constraintStart && jointComposites[i].constraints[0].bodyB == constraintDestination) || (jointComposites[i].constraints[0].bodyA == constraintDestination && jointComposites[i].constraints[0].bodyB == constraintStart)){
      jointComposites[i].constraints[0].bodyA = null;
      jointComposites[i].constraints[0].bodyB = null;
      jointComposites[i].constraints[0].pointA = null;
      jointComposites[i].constraints[0].pointB = null;
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
  //World.add(engine.world,[compositeArray[i]] );
}
function createConstraint(constraintStart, constraintDestination, length){
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
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = compositeArray[i].height*-0.5;
      }
    }
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        destOffset = compositeArray[i].width*-0.5;
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*-0.5;
        destOffset2 = 25;
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
      }
      else if(compositeArray[i].shape == "poly"){
        startOffset = compositeArray[i].width*-0.5;
        startOffset2 = compositeArray[i].height*-0.5;
      }
    }
    if(constraintDestination == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        destOffset = compositeArray[i].radius *0.8;
      }
      else if(compositeArray[i].shape == "rect"){
        destOffset = compositeArray[i].width*-0.5;
      }
      else if(compositeArray[i].shape == "poly"){
        destOffset = compositeArray[i].width*0.5;
        destOffset2 = 25;
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


World.add(engine.world, mouseConstraint);

////////////////// MODIFICATION FUNCTIONS ////////////////////////////
function createRect(){
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  var width = document.getElementById("widthInput").value;
  var height = document.getElementById("heightInput").value;
  if(width && height){
    addRectComposite(width, height);
  }
}

function changeNumOfTeeth(value){
  if(value){
    if(value % 2 != 0){
      value++;
    }
    steps = value;
    changeBody();
  }
}
function changeSpeed(value){
  for(var i = 0; i<compositeArray.length;i++){
    if(selected == compositeArray[i].bodies[0]){
      compositeArray[i].motorSpeed = parseInt(value)/1000;
    }
  }
}
function changeToothWidth(value){
  toothWidthDegree = parseInt(value)/100;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBody();
}
function changeToothHeight(value){
  toothHeight = parseInt(value);
  changeBody();
}
function changeRadius(value){
  radius = parseInt(value);
  changeBody();
}
// function changeScale(value){
//   Composite.scale(composite1,value/100,value/100,composite1.constraints[0].pointA);
// }
function selectingMode(){
  removeFocusAll();
  selectionMode = true;
  dragMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
  multiSelectionMode = false;
}
function draggingMode(){
  removeFocusAll();
  dragMode = true;
  selectionMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
  multiSelectionMode = false;

}
function constrainingMode(){
  removeFocusAll();
  constraintMode = true;
  addConstraint = true;
  removeConstraint = false;
  selectionMode = false;
  dragMode = false;
  multiSelectionMode = false;
}
function constrainingDeleteMode(){
  removeFocusAll();
  constraintMode = true;
  removeConstraint = true;
  addConstraint = false;
  selectionMode = false;
  dragMode = false;
  multiSelectionMode = false;
}
function multiSelectingMode(){
  removeFocusAll();
  selectionArray = [];
  multiSelectionMode = true;
  selectionMode = false;
  dragMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
}
function removeFocus(){
  if (previousSelection){
    previousSelection.render.strokeStyle = "#000000";
    for(var i=0; i<previousSelection.parts.length;i++){
      previousSelection.parts[i].render.strokeStyle = "#000000";
    }
  }
}
function removeFocusAll(){
  if (previousSelection){
    previousSelection.render.strokeStyle = "#000000";
    for(var i=0; i<previousSelection.parts.length;i++){
      previousSelection.parts[i].render.strokeStyle = "#000000";
    }
    for(var j = 0; j<compositeArray.length;j++){
      if(compositeArray[j].bodies[0]){
        for(var i=0; i<compositeArray[j].bodies[0].parts.length;i++){
          compositeArray[j].bodies[0].parts[i].render.strokeStyle = "#000000";
        }
      }
    }
  }
}
function select(body){
  selected = body;
  //console.log(body);
  selected.render.strokeStyle = "blue";
  for(var i=0; i<selected.parts.length;i++){
    selected.parts[i].render.strokeStyle = "blue";
  }
  if (selected != previousSelection){
    removeFocus();
    previousSelection = selected;
  }
  updateSliders(selected);
}
function multiSelect(body){
  // if(selected){
  //   selectionArray.push(selected);
  // }
  selectionArray.push(body);
  for(var i = 0;i<selectionArray.length;i++){
    selectionArray[i].render.strokeStyle = "blue";
    for(var j=0; j<selected.parts.length;j++){
      selectionArray[i].parts[j].render.strokeStyle = "blue";
    }
  }
}
function updateSliders(body){
  for(var i = 0; i<compositeArray.length;i++){
    if(body == compositeArray[i].bodies[0]){
      //document.getElementById("changeSpeed").value = compositeArray[i].motorSpeed*1000;
      //document.getElementById("changeRotation").value = compositeArray[i].bodies[0].angle*(180/Math.PI);
      // document.getElementById("changeNumOfTeeth").value = compositeArray[i].numOfTeeth;
      // document.getElementById("changeToothHeight").value = compositeArray[i].toothHeight;
      // document.getElementById("changeToothWidth").value = compositeArray[i].toothWidthDegree*100;
      // document.getElementById("changeRadius").value = compositeArray[i].radius;
    }
  }
}
// function motorSet(){
//   for(var i=0;i<motors.length;i++){
//     if(selected == motors[i]){
//       motors[i] = selected;
//     }
//   }
// }
function addMotor(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].isMotor = true;
          compositeArray[j].lock = false;
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].isMotor = true;
        compositeArray[i].lock = false;
      }
    }
  }
}
function removeMotor(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].isMotor = false;
          if(compositeArray[j].shape == "rect"){
            compositeArray[j].lock = true;
          }
          Body.setAngularVelocity(compositeArray[j].bodies[0],0);
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].isMotor = false;
        if(compositeArray[i].shape == "rect"){
          compositeArray[i].lock = true;
        }
        Body.setAngularVelocity(compositeArray[i].bodies[0],0);
      }
    }
  }
}
function reverseMotor(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].motorDir = compositeArray[j].motorDir*-1;
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].motorDir = compositeArray[i].motorDir*-1;
      }
    }
  }
}
function changeTimeInterval(value){
  timeInterval = value;
}
var rotationAngle = 0;
function rotateObject(value){
  //overlay3();
  for(var i = 0; i<compositeArray.length;i++){
    if(selected == compositeArray[i].bodies[0]){
      compositeArray[i].rotation = value*(Math.PI/180);
      Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
      //rotationAngle = value*(Math.PI/180);
    }
  }
}
function setObjectRotation(){
  if(multiSelectionMode == true){
    overlay3();
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          
          compositeArray[j].rotation = document.getElementById("changeAngle").value*(Math.PI/180);
          Body.setAngle(compositeArray[j].bodies[0],compositeArray[j].rotation);
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        overlay3();
        compositeArray[i].rotation = document.getElementById("changeAngle").value*(Math.PI/180);
        Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
      }
    }
  } 
}
function resetRotation(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].rotation = 0;
          Body.setAngle(compositeArray[j].bodies[0],compositeArray[j].rotation);
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].rotation = 0;
        Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
        //rotationAngle = value*(Math.PI/180);
      }
    }
  }
}
function lockRotation(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          if(compositeArray[j].isMotor == false){
            compositeArray[j].lock = true;
          }
          Body.setAngle(compositeArray[j].bodies[0],compositeArray[j].rotation);
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        if(compositeArray[i].isMotor == false){
          compositeArray[i].lock = true;
        }
        Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
      }
    }
  }
}
function unlockRotation(){
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(selected == compositeArray[j].bodies[0]){
          if(compositeArray[j].isMotor == false){
            compositeArray[j].lock = false;
          }
          Body.setAngle(compositeArray[j].bodies[0],compositeArray[j].rotation);
        }
      }
    }
  }
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        if(compositeArray[i].isMotor == false){
          compositeArray[i].lock = false;
        }
        Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
      }
    }
  }
}
///////////// Mouse Events ///////////////////////////////////

Events.on(mouseConstraint, 'startdrag', function(event) {
  for(var i = 0; i<jointComposites.length;i++){
      console.log(jointComposites[i].constraints[0]);
    }
  //console.log(event.body);
  mouseConstraint.constraint.stiffness = 0.1;
  if(multiSelectionMode == true){
    multiSelect(event.body);
  }
  else{
    select(event.body);
  }
  var mousePosition = event.mouse.position;
  if (dragMode == true){
    //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
    //console.log('enddrag', event);
    Body.setPosition(event.body,mousePosition);
    for(var i=0; i<compositeArray.length;i++){
      if(Composite.get(compositeArray[i], event.body.id, "body")==event.body){
        clicked = true;
        clickedComposite = compositeArray[i];
        console.log(clickedComposite.label);
        //console.log(composite1.constraints[0].pointA.x);
        clickedComposite.constraints[0].pointA.x = mousePosition.x;
        clickedComposite.constraints[0].pointA.y = mousePosition.y;
        //console.log("it works");
      }
    }
  }
  else if (constraintMode == true){
    mouseConstraint.constraint.stiffness = 0;
    for(var i=0; i<compositeArray.length;i++){
      if(Composite.get(compositeArray[i], event.body.id, "body")==event.body){
        //console.log("it works");
        constraintStart = event.body;

      }
    }
  }
})
  Events.on(mouseConstraint, 'mousemove', function(event) {
    var mousePosition = event.mouse.position;
    if (dragMode == true){
      //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
      //console.log(Composite.get(composite1, event.body.id, "body"));
      if (clicked == true){
        clickedComposite.constraints[0].pointA.x = (Math.round(mousePosition.x/snapDist))*snapDist;
        clickedComposite.constraints[0].pointA.y = (Math.round(mousePosition.y/snapDist))*snapDist;
        //console.log(clickedComposite.constraints[0].pointA.x);
      }
    }
    else if(constraintMode == true){
      var compositeBodies = [];
      for(var i=0; i<compositeArray.length;i++){
        compositeBodies.push(compositeArray[i].bodies[0]);
      }
      constraintDestination = Query.point(compositeBodies, mousePosition)[0];
    }
  })
  Events.on(mouseConstraint, 'enddrag', function(event) {
    var mousePosition = event.mouse.position;
    if(dragMode == true){
      // console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
      // console.log('enddrag', event);
      Body.setPosition(event.body,mousePosition);
      clicked = false;
    }
    else if(constraintMode == true){
      if(removeConstraint){
        deleteConstraint();
      }
      else{
        if(constraintStart){
          if(constraintDestination){
            if(constraintDestination == constraintStart){
            }
            else{
              overlay2();
            }
          }
        }
      }
    }
  })




/////////////////// BOUNDARIES //////////////////////////////////

// add boundaries
// var offset = 5;
// World.add(engine.world, [
//   Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
//   Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
//   Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
//   Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
// ]);

///////////////// Animation /////////////////////////////////////

Events.on(engine, 'beforeUpdate', function(event) {
    //console.log(compositeArray[0].bodies[0].position.y)
    compositeArray[2].constraints[0].length = 0; 
    Body.setPosition(compositeArray[0].bodies[0],{x:(window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), y:600})
    Body.setPosition(compositeArray[1].bodies[0],{x:(window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), y:600})
    //console.log(clickedComposite);
    counter += 1;
    // for(var i = 0; i<motors.length;i++){
    //   var rotationDirection = 1
    //   for(var j = 0; j<compositeArray.length;j++){
    //     if(motors[i] == compositeArray[j].bodies[0]){
    //       rotationDirection = compositeArray[j].motorDir;
    //     }
    //   }
    //   Body.setAngularVelocity(motors[i], rotationSpeed*rotationDirection);
    // }
    //constraintStiffness();
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
        Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
      }
    }
    if (clicked == true){
      if(clickedComposite.lock == true){
        Body.setAngle(clickedComposite.bodies[0], clickedComposite.rotation);
      }
    }
    // every 1.5 sec
    Body.setPosition(compositeArray[0].bodies[0],{x:(window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), y:600})
    Body.setPosition(compositeArray[1].bodies[0],{x:(window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), y:600})
    //Composite.setPosition(compositeArray[0].bodies[0],{x:(window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), y:600})
    //
    if (counter >= 60 * timeInterval) {
        //rotationSpeed = rotationSpeed *-1;
        // reset counter
        counter = 0;
        scaleFactor = 1;
    }
    Body.setAngle(compositeArray[0].bodies[0],compositeArray[1].bodies[0].angle*(-1) - Math.PI)
    if(compositeArray[2].bodies[0].angle>0.51){
      Body.setAngle(compositeArray[2].bodies[0],0.51)
    }
    if(compositeArray[3].bodies[0].angle<-0.51){
      Body.setAngle(compositeArray[2].bodies[0],-0.51)
    }
    //console.log(compositeArray[2].bodies[0].vertices[2])
    compositeArray[2].bodies[0].vertices[2].x = 746;
    compositeArray[2].bodies[0].vertices[2].y = 325;
})
Events.on(engine, 'afterUpdate', function(event) {
    console.log(compositeArray[0].constraints[0].length)
    Body.setPosition(compositeArray[0].bodies[0],{x:(window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), y:600})
    Body.setPosition(compositeArray[1].bodies[0],{x:(window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), y:600})
    Body.setAngle(compositeArray[0].bodies[0],compositeArray[1].bodies[0].angle*(-1) - Math.PI)
    if(compositeArray[2].bodies[0].angle>0.51){
      Body.setAngle(compositeArray[2].bodies[0],0.51)
    }
    if(compositeArray[3].bodies[0].angle<-0.51){
      Body.setAngle(compositeArray[2].bodies[0],-0.51)
    }
    compositeArray[2].bodies[0].vertices[2].x = 746;
    compositeArray[2].bodies[0].vertices[2].y = 325;
    console.log(compositeArray[2].bodies[0].setAngularVelocity)
  })
////////////////////// RUN /////////////////////////////
var width = 350;
addGearComposite((window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), 600);
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), 600);
addPolyComposite2((window.innerWidth)*(0.75*0.5)+((width/2)+50), 300, width, 75)
//compositeArray[2].rotation = Math.PI;
addPolyComposite((window.innerWidth)*(0.75*0.5)-((width/2)+30), 300, width, 75)
compositeArray[0].rotation = Math.PI;
compositeArray[2].bodies[0].mass = 10;
compositeArray[3].bodies[0].mass = 10;
Body.setAngle(compositeArray[0].bodies[0], compositeArray[0].rotation);
//Body.setAngle(compositeArray[2].bodies[0], compositeArray[2].rotation);
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0],350)
createConstraint2(compositeArray[1].bodies[0], compositeArray[2].bodies[0],350)
compositeArray[0].isMotor = true;
compositeArray[1].isMotor = true;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
Engine.run(engine);