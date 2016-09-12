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
      showAngleIndicator: false
    }
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
var rotationAngle = 0;
var set = false;

var xValues = [];
var yValues = [];
var steps = 40;
var linSteps = 30;
var centerX = 100;
var centerY = 100;
var radius = 76;
var verts2 = [];
var linGearVerts = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = 20;
var toothWidthDegree = 3;
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

/////////////////////// Pop Up Modal ///////////////////////////////////
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
////////////////////// CREATE VERtiCES TO DRAW SHAPES //////////////
function drawGear(){
  //new vertex array
  verts2 = [];
  // draw circle
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
    console.log("x = " + xValues[i])
    console.log("y = " + yValues[i])
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
       linGearVerts.push({ x: 230 + 30, y: 600- ((400/linSteps)*i)-3.3333});
       linGearVerts.push({ x: 230 + 30, y: 600 - ((400/linSteps)*i) - 9.999999});
    }
  }
  // add last corner
  linGearVerts.push({ x: 230, y: 600 - 400});
}
drawLinGear();
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
function addGearComposite(){
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
  select(compositeArray[totalComposites-1].bodies[0]);
  selectedGearSnapBounds();
  if (totalComposites>1){
    otherGearSnapBounds();
  }
}
function addLinGearComposite(){
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
  select(compositeArray[totalComposites-1].bodies[0]);
}
function addRectComposite(width, height){
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
        lock: true

      })
  )
  constraintArray.push(
    // create joint constraint and place it at end of beam or center - width/2
    Constraint.create({pointA: { x: centerX+width/2, y: centerY },bodyB: compositeArray[totalComposites-1].bodies[0] ,pointB: { x: width/2, y: 0 }, stiffness: 1})
  )
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  World.add(engine.world,[compositeArray[totalComposites-1]] );
  select(compositeArray[totalComposites-1].bodies[0]);
}

function removeComposite(){
  // if the user is in multi-Select mode the loop through the selected objects array selectionArray[] and remove composites
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        if(compositeArray[j].bodies[0] == selected){
          for(var k=0; k<jointComposites.length;k++){
            // if object has joint constraint then loop through composites
            if(jointComposites[k].constraints[0].bodyA == selected || jointComposites[k].constraints[0].bodyB == selected){
              for(var m=0; m<compositeArray.length;m++){
                // set object that isn't being deleted to have property hasConstraint = false
                if(jointComposites[k].constraints[0].bodyA != selected && jointComposites[k].constraints[0].bodyA == compositeArray[m].bodies[0]){
                  compositeArray[m].hasConstraint = false;
                }
                if(jointComposites[k].constraints[0].bodyB != selected && jointComposites[k].constraints[0].bodyB == compositeArray[m].bodies[0]){
                  compositeArray[m].hasConstraint = false;
                }
              }
              // remove joint constraint
              jointComposites[k].constraints[0].bodyA = null;
              jointComposites[k].constraints[0].bodyB = null;
              jointComposites[k].constraints[0].pointA = null;
              jointComposites[k].constraints[0].pointB = null;
            }
          }
          // remove composite
          Composite.clear(compositeArray[j], true);
          compositeArray.splice(j,1);
        }
      }
      // decrease number of composites
      totalComposites--;
    }
  }
  // if normal selection mode is selected 
  // refer to above comments
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
    totalComposites--;
  }
}
// redraw and generate shape if any parameters are modified (WIP) ignore for now
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
// generate small gear
function smallGear(){
  // set parameters to create small gear
  radius = 38;
  steps = 20;
  toothHeight = 20;
  toothWidthDegree = 6;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
  addGearComposite();
  // reset to original parameters so drawGear() still draws large gear
  radius = 76;
  steps = 40;
  toothHeight = 20;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  drawGear();
}
// see smallGear() comments
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

// function constraintStiffness(){
//   for(var i = 0; i<compositeArray.length;i++){
//     compositeArray[i].constraints[0].stiffness = 1;
//     compositeArray[i].constraints[0].length = 0;
//     //compositeArray[i].constraints[0].angularStiffness = 0.1;
//   }
// }




function deleteConstraint(){
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
// generate constraint between two selected bodies
function createConstraint(){
  // offset from center of first body
  var startOffset;
  // offset from center of second body
  var destOffset;
  // set constraint offset for start body based on what type of body it is
  var startShape;
  var destShape;
  for(var i = 0; i<compositeArray.length;i++){
    if(constraintStart == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        // if gear, set offset to 80% of that gears radius
        startOffset = compositeArray[i].radius *0.8;
        startOffset2 = 0
        startShape = "gear"
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
        startOffset2 = -250
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
        destOffset2 = -250;
        destShape = "linGear"
      }
    }
  }
  // close modal
  overlay2();
  // get the input value length from user
  var cLength = document.getElementById("length").value;
  // make sure there is a start body and end body to create constraint
  console.log("start offset = " + startOffset)
  console.log("destination offset = " + destOffset)
  console.log(constraintStart)
  console.log(constraintDestination)
  if(startOffset != null && destOffset != null){
    var constraintLength;
    if(cLength){
      constraintLength = cLength;
    }
    else{
      // default length if no value is input
      constraintLength = 250;
    }
    // add composite to jointComposites[] array
    if(startShape == "linGear"){
      jointComposites.push(Composite.create({
        // create constraint between shapes with proper offsets
          constraints: [Constraint.create({pointA: { x: 0, y: startOffset2},
            bodyA: constraintStart ,
            bodyB: constraintDestination ,
            pointB: { x: destOffset*Math.cos(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) }, 
            stiffness: 1,
            length: constraintLength
          })]
      }))
    }
    else if(destShape == "linGear"){
      jointComposites.push(Composite.create({
        // create constraint between shapes with proper offsets
          constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) },
            bodyA: constraintStart ,
            bodyB: constraintDestination ,
            pointB: { x: 0, y: destOffset2 }, 
            stiffness: 1,
            length: constraintLength
          })]
      }))
    }
    else{
      jointComposites.push(Composite.create({
        // create constraint between shapes with proper offsets
          constraints: [Constraint.create({pointA: { x: startOffset*Math.cos(constraintStart.angle), y: startOffset*Math.sin(constraintStart.angle) },
            bodyA: constraintStart ,
            bodyB: constraintDestination ,
            pointB: { x: destOffset*Math.cos(constraintDestination.angle), y: destOffset*Math.sin(constraintDestination.angle) }, 
            stiffness: 1,
            length: constraintLength
          })]
      }))
    }
    // increase number of joint composites by 1
    totalJointComposites++;
    // add composite to world
    console.log(totalJointComposites)
    World.add(engine.world, jointComposites[totalJointComposites-1]);
    // mark constrained bodies as hasConstraint = true
    for(var i = 0; i<compositeArray.length;i++){
      if(constraintStart == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
      if(constraintDestination == compositeArray[i].bodies[0]){
        compositeArray[i].hasConstraint = true;
      }
    }
  }
}

//////////////////////// ADD TO WORLD //////////////////////

// add mouse constraint to world
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
// modify number of teeth of gear
// function changeNumOfTeeth(value){
//   if(value){
//     // value must be even number
//     if(value % 2 != 0){
//       value++;
//     }
//     steps = value;
//     // modify body
//     changeBody();
//   }
// }
// change motor speed
function changeSpeed(value){
  for(var i = 0; i<compositeArray.length;i++){
    // find selected body in compositeArray[] and change motor speed parameter
    if(selected == compositeArray[i].bodies[0]){
      compositeArray[i].motorSpeed = parseInt(value)/1000;
    }
  }
}
// function changeToothWidth(value){
//   toothWidthDegree = parseInt(value)/100;
//   toothWidth = (toothWidthDegree/conversionFactor);
//   changeBody();
// }
// function changeToothHeight(value){
//   toothHeight = parseInt(value);
//   changeBody();
// }
// function changeRadius(value){
//   radius = parseInt(value);
//   changeBody();
// }
// function changeScale(value){
//   Composite.scale(composite1,value/100,value/100,composite1.constraints[0].pointA);
// }
function selectingMode(){
  // remove focus
  removeFocusAll();
  // set turn other modes off
  selectionMode = true;
  dragMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
  multiSelectionMode = false;
}
function draggingMode(){
  // remove focus
  removeFocusAll();
  // set turn other modes off
  dragMode = true;
  selectionMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
  multiSelectionMode = false;

}
function constrainingMode(){
  // remove focus
  removeFocusAll();
  // set turn other modes off
  constraintMode = true;
  addConstraint = true;
  removeConstraint = false;
  selectionMode = false;
  dragMode = false;
  multiSelectionMode = false;
}
function constrainingDeleteMode(){
  // remove focus
  removeFocusAll();
  // set turn other modes off
  constraintMode = true;
  removeConstraint = true;
  addConstraint = false;
  selectionMode = false;
  dragMode = false;
  multiSelectionMode = false;
}
function multiSelectingMode(){
  // remove focus
  removeFocusAll();
  // set turn other modes off
  selectionArray = [];
  multiSelectionMode = true;
  selectionMode = false;
  dragMode = false;
  constraintMode = false;
  addConstraint = false;
  removeConstraint = false;
}
// deselect function
function removeFocus(){
  if (previousSelection){
    // remove stroke style of previously selected body
    previousSelection.render.strokeStyle = "#000000";
    // change stroke of all parts of previous body 
    for(var i=0; i<previousSelection.parts.length;i++){
      previousSelection.parts[i].render.strokeStyle = "#000000";
    }
  }
}
// deselect all selected bodies
function removeFocusAll(){
  if (previousSelection){
    // remove stroke style of previously selected body
    previousSelection.render.strokeStyle = "#000000";
    for(var i=0; i<previousSelection.parts.length;i++){
      // change stroke of all parts of previous body 
      previousSelection.parts[i].render.strokeStyle = "#000000";
    }
    // loop through all objects and remove their stroke
    for(var j = 0; j<compositeArray.length;j++){
      if(compositeArray[j].bodies[0]){
        for(var i=0; i<compositeArray[j].bodies[0].parts.length;i++){
          compositeArray[j].bodies[0].parts[i].render.strokeStyle = "#000000";
        }
      }
    }
  }
}
// set body as selected
function select(body){
  selected = body;
  // set stroke to blue to indicate selected
  selected.render.strokeStyle = "blue";
  // set all parts to blue stroke
  for(var i=0; i<selected.parts.length;i++){
    selected.parts[i].render.strokeStyle = "blue";
  }
  // delselect previous selection
  if (selected != previousSelection){
    removeFocus();
    // set previous selection to current selection
    previousSelection = selected;
  }
  // update sliders with selected objects parameters (only rotation right now)
  updateSliders(selected);
}
// select multiple objects
function multiSelect(body){
  // add selected body to selectionArray[] 
  selectionArray.push(body);
  // set stroke style of all bodies and parts to blue
  for(var i = 0;i<selectionArray.length;i++){
    selectionArray[i].render.strokeStyle = "blue";
    for(var j=0; j<selected.parts.length;j++){
      selectionArray[i].parts[j].render.strokeStyle = "blue";
    }
  }
}
// update slider positions for selected body
function updateSliders(body){
  for(var i = 0; i<compositeArray.length;i++){
    // find selected body in compositeArray[] and change html element value
    if(body == compositeArray[i].bodies[0]){
      document.getElementById("changeSpeed").value = compositeArray[i].motorSpeed*1000;
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

// set object as having a motor
function addMotor(){
  // for multiSelectionMode
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and set isMotor = true and lock = false
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].isMotor = true;
          compositeArray[j].lock = false;
        }
      }
    }
  }
  // if single selection
  // see above
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].isMotor = true;
        compositeArray[i].lock = false;
      }
    }
  }
}

// remove body as motor
function removeMotor(){
  // for multiSelectionMode
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and set isMotor = false and lock = true if body is a rectangle
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].isMotor = false;
          if(compositeArray[j].shape == "rect"){
            compositeArray[j].lock = true;
          }
          // immediately set speed of rotation to 0 or else is slows to a stop
          Body.setAngularVelocity(compositeArray[j].bodies[0],0);
        }
      }
    }
  }
  // single selection
  // see above
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
// reverse motor direction
function reverseMotor(){
  // for multiselection mode
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and reverse motorDir
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].motorDir = compositeArray[j].motorDir*-1;
        }
      }
    }
  }
  // single selection
  // see above
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].motorDir = compositeArray[i].motorDir*-1;
      }
    }
  }
}
// set motor to alternate directions
function alternateMotor(){
  // for multiselection mode
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and set alternate = true
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].alternate = true;
        }
      }
    }
  }
  // single selection
  // see above
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].alternate = true;
      }
    }
  }
}
// turn off motor direction alternating
function nonAlternateMotor(){
  // for multiselection mode
  if(multiSelectionMode == true){
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and set alternate = false
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].alternate = false;
        }
      }
    }
  }
  // single selection
  // see above
  else{
    for(var i = 0; i<compositeArray.length;i++){
      if(selected == compositeArray[i].bodies[0]){
        compositeArray[i].alternate = false;
      }
    }
  }
}

// function changeTimeInterval(value){
//   timeInterval = value;
// }

// set object rotation with slider
function rotateObject(value){
  for(var i = 0; i<compositeArray.length;i++){
    // find selected body in compositeArray[] and set angle to specified rotation
    if(selected == compositeArray[i].bodies[0]){
      compositeArray[i].rotation = value*(Math.PI/180);
      Body.setAngle(compositeArray[i].bodies[0],compositeArray[i].rotation);
    }
  }
}
// set object rotation with input box
function setObjectRotation(){
  // for multiselection mode
  if(multiSelectionMode == true){
    // display modal for user input
    overlay3();
    for(var i = 0;i<selectionArray.length;i++){
      selected = selectionArray[i];
      for(var j = 0; j<compositeArray.length;j++){
        // find selected body in compositeArray[] and set angle of body to specified rotation
        if(selected == compositeArray[j].bodies[0]){
          compositeArray[j].rotation = document.getElementById("changeAngle").value*(Math.PI/180);
          Body.setAngle(compositeArray[j].bodies[0],compositeArray[j].rotation);
        }
      }
    }
  }
  // single selection
  // see above
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

// set body rotation to 0
// see setObjectRotation()
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

// set body to have locked rotation if is not a motor by lock = true
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

// set body to have lock = false
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

function selectedGearSnapBounds(){
  for(var i = 0; i<compositeArray.length;i++){
    if(selected == compositeArray[i].bodies[0]){
      if(compositeArray[i].shape == "gear"){
        for (var j = 0; j < 20; j++) {
          pointXCheck = compositeArray[i].constraints[0].pointA.x + (compositeArray[i].radius+(compositeArray[i].toothHeight*1.5)) * Math.cos(2 * Math.PI * j / 20)
          pointYCheck = compositeArray[i].constraints[0].pointA.y + (compositeArray[i].radius+(compositeArray[i].toothHeight*1.5)) * Math.sin(2 * Math.PI * j / 20)
          circlePoints1.push({x:pointXCheck, y:pointYCheck})
          //World.add(engine.world,[Bodies.rectangle(pointXCheck, pointYCheck, 2, 2)]);
        }
      }
    }
  }
}
function otherGearSnapBounds(){
  for(var i = 0; i<compositeArray.length;i++){
    if(compositeArray[i].bodies[0] != selected){
      if(compositeArray[i].shape == "gear"){
        circlePoints2 = []
        // for (var j = 0; j < 20; j++) {
        //   pointXCheck2 = compositeArray[i].constraints[0].pointA.x + (compositeArray[i].radius+(compositeArray[i].toothHeight*1.5)) * Math.cos(2 * Math.PI * j / 20)
        //   pointYCheck2 = compositeArray[i].constraints[0].pointA.y + (compositeArray[i].radius+(compositeArray[i].toothHeight*1.5)) * Math.sin(2 * Math.PI * j / 20)
        //   //circlePoints2.push({x:pointXCheck2, y:pointYCheck2})
        //   //World.add(engine.world,[Bodies.rectangle(pointXCheck2, pointYCheck2, 2, 2)]);
          // for(var k = 0;k<circlePoints1.length;k++){
        var a = selected.position.x-compositeArray[i].constraints[0].pointA.x
        var b = selected.position.y-compositeArray[i].constraints[0].pointA.y
        var dist = Math.sqrt( (a)*(a) + (b)*(b) );
        if (dist<(compositeArray[i].radius*3)){
          var distFromRad = compositeArray[i].radius*3
          var slope = (selected.position.y-compositeArray[i].constraints[0].pointA.y)/(selected.position.x-compositeArray[i].constraints[0].pointA.x)
          console.log("Distance to center:" + dist);
          console.log("Distance from radius: " + distFromRad);
          console.log(slope);
          for(var j = 0; j< 230;j++){
            a = selected.position.x-compositeArray[i].constraints[0].pointA.x
            b = selected.position.y-compositeArray[i].constraints[0].pointA.y
            dist = Math.sqrt( (a)*(a) + (b)*(b) );
            if(selected.position.x<compositeArray[i].constraints[0].pointA.x){
              Body.setPosition(selected, {x:selected.position.x + 1, y:selected.position.y + (1*slope)})
              clickedComposite.constraints[0].pointA.x = clickedComposite.constraints[0].pointA.x +1;
              clickedComposite.constraints[0].pointA.y = clickedComposite.constraints[0].pointA.y + (1*slope);
            }
            if(selected.position.x>compositeArray[i].constraints[0].pointA.x){
              Body.setPosition(selected, {x:selected.position.x - 1, y:selected.position.y + (1*slope)})
              clickedComposite.constraints[0].pointA.x = clickedComposite.constraints[0].pointA.x -1;
              clickedComposite.constraints[0].pointA.y = clickedComposite.constraints[0].pointA.y + (1*slope);
            }
            
            //clickedComposite.constraints[0].pointA.y = clickedComposite.constraints[0].pointA.y + (1*slope);
            //console.log(dist)
            if(dist<178){
              clicked = false;
              clickedComposite = null;
              set = true;
              return;
            }
          }
        }
          // }
        // }
      }
    }
  }
}
function compareGearBounds(){
  if (selected){
    for(var i = 0; i<compositeArray.length;i++){
      if(compositeArray[i].bodies[0] != selected){

      }
    }
  }
}

///////////// Mouse Events ///////////////////////////////////

// On mouse down startdrag is called
Events.on(mouseConstraint, 'startdrag', function(event) {
  // set mouse constraint stiffness to 0.1 so the body snaps the mouse to center
  mouseConstraint.constraint.stiffness = 0.1;
  // run multiselect if multiselect mode is active
  if(multiSelectionMode == true){
    multiSelect(event.body);
  }
  // if single select just select one object
  else{
    select(event.body);
  }
  // set mouse position variable
  var mousePosition = event.mouse.position;
  // i like turtles
  // if drag mode is active
  if (dragMode == true){
    //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
    //console.log('enddrag', event);
    // set position of object to the mouse position
    Body.setPosition(event.body,mousePosition);
    for(var i=0; i<compositeArray.length;i++){
      // find body within composite
      if(Composite.get(compositeArray[i], event.body.id, "body")==event.body && set == false){
        clicked = true;
        clickedComposite = compositeArray[i];
        // set constraint position of object to clicked mouse position
        clickedComposite.constraints[0].pointA.x = mousePosition.x;
        clickedComposite.constraints[0].pointA.y = mousePosition.y;
      }
    }
  }
  // if constraint mode is active
  else if (constraintMode == true){
    // stiffness set to 0 so that connector line displays 
    mouseConstraint.constraint.stiffness = 0;
    for(var i=0; i<compositeArray.length;i++){
      if(Composite.get(compositeArray[i], event.body.id, "body")==event.body){
        // set constraint start body as body clicked 
        constraintStart = event.body;

      }
    }
  }
})
// triggered when mouse is moved
  Events.on(mouseConstraint, 'mousemove', function(event) {
    // change mouse position
    var mousePosition = event.mouse.position;
    // if dragmode is active
    if (dragMode == true){
      //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
      //console.log(Composite.get(composite1, event.body.id, "body"));
      if (clicked == true && set == false){
        // set snap distance by rounding mouse position
        clickedComposite.constraints[0].pointA.x = (Math.round(mousePosition.x/snapDist))*snapDist;
        clickedComposite.constraints[0].pointA.y = (Math.round(mousePosition.y/snapDist))*snapDist;
        otherGearSnapBounds();
      }
    }
    // if constraint mode is active
    else if(constraintMode == true){
      // create new array for composite bodies
      var compositeBodies = [];
      for(var i=0; i<compositeArray.length;i++){
        // add all composite bodies to compositeBodies[] array
        compositeBodies.push(compositeArray[i].bodies[0]);
      }
      // set constraint destination to whatever body your mouse is over
      constraintDestination = Query.point(compositeBodies, mousePosition)[0];
    }
  })
  Events.on(mouseConstraint, 'enddrag', function(event) {
    // update mouse position
    var mousePosition = event.mouse.position;
    // if dragmode is active
    if(dragMode == true){
      // console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
      // console.log('enddrag', event);
      // set position of selected object to current position
      Body.setPosition(event.body,mousePosition);
      clicked = false;
    }
    // if constraint mode active
    else if(constraintMode == true){
      // remove constraint
      if(removeConstraint){
        deleteConstraint();
      }
      else{
        if(constraintStart){
          if(constraintDestination){
            if(constraintDestination == constraintStart){
            }
            else{
              // display modal asking for length if both a constraint start and constraint destination exists
              overlay2();
            }
          }
        }
      }
    }
    // clicked composite is nothing
    clickedComposite = null;
    set = false;
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


// Events.on(engine, 'collisionActive', function(event) {
//   var pairs = event.pairs;
//   //console.log(pairs);
// })

// called every frame before physics is applied
Events.on(engine, 'beforeUpdate', function(event) {
    //console.log(set)
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
    engine.render.options.height = window.innerHeight
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
          //Body.setPosition(compositeArray[i].bodies[0],{x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].constraints[0].pointA.y})
        }
      }
    }
    if(compositeArray[i].isMotor == true){
      Body.setAngularVelocity(compositeArray[i].bodies[0], compositeArray[i].motorSpeed*compositeArray[i].motorDir);
    }
  }
})

////////////////////// RUN /////////////////////////////

// run the engine
Engine.run(engine);





// for(var k = 0; k<compositeArray.length;k++){
//             if(compositeArray[k].shape == "gear"){
//               for (var m = 0; m < compositeArray[k].numOfTeeth; m++) {
//                 pointCheck2 = centerX + compositeArray[k].radius+(toothHeight*1.5) * Math.cos(2 * Math.PI * j / steps)
//               if(pointCheck){
//               }
//               }
//             }
//           }