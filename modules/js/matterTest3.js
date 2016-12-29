// // module aliases
// var Engine = Matter.Engine,
//     Render = Matter.Render,
//     World = Matter.World,
//     Bodies = Matter.Bodies;
//     Composites = Matter.Composites,
//     Constraint = Matter.Constraint,
//     Common = Matter.Common,
//     Vertices = Matter.Vertices,
//     Svg = Matter.Svg,
//     MouseConstraint = Matter.MouseConstraint;

// // create an engine
// var engine = Engine.create();

// // create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

// var mouseConstraint = MouseConstraint.create(engine);
// World.add(engine.world, mouseConstraint);



// // create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// var wallLeft = Bodies.rectangle(0, 20, 60, window.innerHeight, { isStatic: true });
// var wallRight = Bodies.rectangle(800, 20, 60, window.innerHeight, { isStatic: true });

// //var arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50');
//     // chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
//     // star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'),
//     // horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');

// // var stack = Composites.stack(50, 50, 6, 4, 10, 10, function(x, y) {
// //     var color = Common.choose(['#556270']);
// //     return Bodies.fromVertices(x, y, Common.choose([arrow]), {
// //         render: {
// //             fillStyle: color,
// //             strokeStyle: color
// //         }
// // }, true);
// // });


// // add all of the bodies to the world
// World.add(engine.world, [boxA, boxB, ground,wallLeft,wallRight]);
// World.add(engine.world, Constraint.create({
//             pointA: { x: 400, y: 200 },
//             bodyB: boxA
//         }));
// //World.add(engine.world, stack);


// // run the engine
// Engine.run(engine);

// // run the renderer
// Render.run(render);

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
    Mouse = Matter.Mouse;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    options: {
      height: window.innerHeight,
      width: window.innerWidth,
      wireframes: false,
      showAngleIndicator: true
    }
  }
});

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 3;

var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);
//var worldComposites = [var composite1, var composite2, var composite3, var composite4, var composite5, var composite6, var composite7, var composite8, var composite9, var composite10]
var clicked = false;
var clickedComposite;
var counter = 0;
var rotationSpeed = 0.04;

var xValues = [];
var yValues = [];
var steps = 16;
var centerX = 300;
var centerY = 300;
var radius = 75;
var verts2 = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = 25;
var toothWidthDegree = 5;
var changeToothWidth = (toothWidthDegree/conversionFactor);
for (var i = 0; i < steps; i++) {
  xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
  yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
}
for (var i = 0; i < steps; i++) {
  verts2.push({ x: xValues[i], y: yValues[i] });
  if(i%2 == 0 && i<16){
    verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+changeToothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+changeToothWidth))})
    console.log("x = " + (2 * Math.PI * i / steps)*conversionFactor);
    console.log("y = " + (2 * Math.PI * i / steps)*conversionFactor);
    verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-changeToothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-changeToothWidth))})
  }
}
gearGroup = Bodies.fromVertices(centerX, centerY, [verts2]);

var composite1 = Composite.create({
            bodies:[Bodies.fromVertices(centerX, centerY, [verts2])],
            constraints:[]
          })
var constraint1 = Constraint.create({pointA: { x: 300, y: 300 },bodyB: composite1.bodies[0]})
Composite.add(composite1, constraint1);

var composite2 = Composite.create({
            bodies:[Bodies.fromVertices(250, 150, [verts2])],
            constraints:[]
          })
var constraint2 = Constraint.create({pointA: { x: 250, y: 150 },bodyB: composite2.bodies[0]})
Composite.add(composite2, constraint2);

// var composite3 = Composite.create({
//             bodies:[Bodies.circle(550, 150, radius-12)],
//             constraints:[]
//           })
// var constraint3 = Constraint.create({pointA: { x: 550, y: 150 },bodyB: composite3.bodies[0]})
// Composite.add(composite3, constraint3);

var compositeArray = [composite1,composite2];


// var gear1 = Body.create({
//             parts: toothGroup,
//             mass: 100,
//             density: 100
// });
// var gear2 = Body.create({
//             parts: toothGroup2,
//             mass: 50,
//             density: 1
            
// });
// var gear3 = Body.create({
//             parts: toothGroup3,
//             mass: 50,
//             density: 1
// });

// Body.setPosition(gear1, composite1.bodies[0].position);
// Body.setPosition(gear2, composite2.bodies[0].position);
// Body.setPosition(gear3, composite3.bodies[0].position);


// Composite.add(composite1,gear1);
// Composite.add(composite1,Constraint.create({pointA: composite1.constraints[0].pointA ,bodyB: gear1}));

// Composite.add(composite2,gear2);
// Composite.add(composite2,Constraint.create({pointA: composite2.constraints[0].pointA ,bodyB: gear2 }));

// Composite.add(composite3,gear3);
// Composite.add(composite3,Constraint.create({pointA: composite3.constraints[0].pointA ,bodyB: gear3}));




World.add(engine.world,[composite1,composite2] );


function changeSpeed(value){
  rotationSpeed = value/1000;
}
function changeScale(value){
  Composite.scale(composite1,value/100,value/100,composite1.constraints[0].pointA);
}



Events.on(mouseConstraint, 'enddrag', function(event) {
  var mousePosition = event.mouse.position;
  console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
  console.log('enddrag', event);
  Body.setPosition(event.body,mousePosition);
  clicked = false;
})


Events.on(mouseConstraint, 'startdrag', function(event) {
  var mousePosition = event.mouse.position;
  //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
  //console.log('enddrag', event);
  Body.setPosition(event.body,mousePosition);
  //console.log(Composite.get(composite1, event.body.id, "body"));
  for(var i=0; i<compositeArray.length;i++){
    console.log(compositeArray[i]);
    if(Composite.get(compositeArray[i], event.body.id, "body")==event.body){
      clicked = true;
      clickedComposite = compositeArray[i];
      //console.log(composite1.constraints[0].pointA.x);
      clickedComposite.constraints[0].pointA.x = mousePosition.x;
      clickedComposite.constraints[0].pointA.y = mousePosition.y;
      //console.log("it works");
    }
  }
})


Events.on(mouseConstraint, 'mousemove', function(event) {
  var mousePosition = event.mouse.position;
  //console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
  //console.log(Composite.get(composite1, event.body.id, "body"));
  if (clicked == true){
      clickedComposite.constraints[0].pointA.x = mousePosition.x;
      clickedComposite.constraints[0].pointA.y = mousePosition.y;
  }
})




// add boundaries
var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
]);

Events.on(engine, 'beforeUpdate', function(event) {
    counter += 1;
    Body.setAngularVelocity(composite1.bodies[0], rotationSpeed);
    // every 1.5 sec
    if (counter >= 60 * 1.5) {

        // reset counter
        counter = 0;
        scaleFactor = 1;
    }
})

// run the engine
// constraint1.render.visible = false;
// constraint2.render.visible = false;
// constraint3.render.visible = false;
Engine.run(engine);