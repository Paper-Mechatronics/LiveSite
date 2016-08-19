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
engine.world.gravity.y = 0;

var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);
//var worldComposites = [var composite1, var composite2, var composite3, var composite4, var composite5, var composite6, var composite7, var composite8, var composite9, var composite10]
var clicked = false;
var clickedComposite;
var counter = 0;
var rotationSpeed = 0.04;

var teethAngle=(Math.PI*2)/12;
var teethWidth=Math.sin(teethAngle/2)*48;
var gear_Rx0;
var gear_Ry0;
var gear_Rx1;
var gear_Ry1;
var gear_Rx2;
var gear_Ry2;
var gear_Rx3;
var gear_Ry3;
var gear_Rx4;
var gear_Ry4;
var gear_Rx5;
var gear_Ry5;
var scale = -2;
var verts = [];
var toothGroup = [];
var toothGroup2 = [];
var toothGroup3 = [];
var toothGroup4 = [];
var numOfTeeth = 8,
    radius1 = 73,
    radius2 = 50,
    radius3 = 73,
    angle = 0,
    step = (2*Math.PI) / numOfTeeth;

for(var i=0, N=1; i<N; i++){
    gear_Rx0 =(teethWidth/2+teethWidth*2*i-teethWidth)*scale;
    gear_Ry0 =-54*scale;
    gear_Rx1 =((-3*teethWidth/4)+teethWidth*2*i-teethWidth)*scale;
    gear_Ry1 =-54*scale;
    gear_Rx2 =(-teethWidth/2+teethWidth*2*i-teethWidth)*scale;
    gear_Ry2 =-66*scale;
    gear_Rx3 =((teethWidth/4)+teethWidth*2*i-teethWidth)*scale;
    gear_Ry3 =-66*scale;
    gear_Rx4 =(teethWidth/2+teethWidth*2*i-teethWidth)*scale;
    gear_Ry4 =-58*scale;
    gear_Rx5 =((teethWidth/2+teethWidth*2*i-teethWidth)+10)*scale;
    gear_Ry5 =-52*scale;
    verts.push({ x: gear_Rx0-1.3, y: gear_Ry0-2.1 });
    verts.push({ x: gear_Rx1-1.3, y: gear_Ry1-2.1 });
    verts.push({ x: gear_Rx2-1.3, y: gear_Ry2-2.1 });
    verts.push({ x: gear_Rx3-1.3, y: gear_Ry3-2.1 });
    verts.push({ x: gear_Rx4-1.3, y: gear_Ry4-2.1 });
    verts.push({ x: gear_Rx5-1.3, y: gear_Ry5-2.1 });

} 

for(var i = 0; i < 1; i++){
  var x1 = 100 + radius1 * Math.cos(angle);
  var y1 = 100 + radius1 * Math.sin(angle);
  var x2 = 100 + radius2 * Math.cos(angle);
  var y2 = 100 + radius2 * Math.sin(angle);
  var x3 = 100 + radius3 * Math.cos(angle);
  var y3 = 100 + radius3 * Math.sin(angle);
  var x4 = 100 + radius3 * Math.cos(angle);
  var y4 = 100 + radius3 * Math.sin(angle);
  toothGroup[i] = Bodies.fromVertices(x1, y1, [verts]);
  toothGroup2[i] = Bodies.fromVertices(x2, y2, [verts]);
  toothGroup3[i] = Bodies.fromVertices(x3, y3, [verts]);
  toothGroup4[i] = Bodies.fromVertices(x4, y4, [verts]);
  angle += step;
}

for(var i = 0; i < 1; i++){
  Body.setAngle(toothGroup[i], ((Math.PI/4)*i)-Math.PI/2);
  Body.setAngle(toothGroup2[i], ((Math.PI/4)*i)-Math.PI/2);
  Body.setAngle(toothGroup3[i], ((Math.PI/4)*i)-Math.PI/2);
  Body.setAngle(toothGroup4[i], ((Math.PI/4)*i)-Math.PI/2);
}

var composite1 = Composite.create({
            bodies:[Bodies.circle(400, 300, radius1-12)],
            constraints:[]
          })
var constraint1 = Constraint.create({pointA: { x: 400, y: 300 },bodyB: composite1.bodies[0]})
Composite.add(composite1, constraint1);

var composite2 = Composite.create({
            bodies:[Bodies.circle(250, 150, radius2-12)],
            constraints:[]
          })
var constraint2 = Constraint.create({pointA: { x: 250, y: 150 },bodyB: composite2.bodies[0]})
Composite.add(composite2, constraint2);

var composite3 = Composite.create({
            bodies:[Bodies.circle(550, 150, radius3-12)],
            constraints:[]
          })
var constraint3 = Constraint.create({pointA: { x: 550, y: 150 },bodyB: composite3.bodies[0]})
Composite.add(composite3, constraint3);

var compositeArray = [composite1,composite2,composite3];


var gear1 = Body.create({
            parts: toothGroup,
            mass: 100,
            density: 100
});
var gear2 = Body.create({
            parts: toothGroup2,
            mass: 50,
            density: 1
            
});
var gear3 = Body.create({
            parts: toothGroup3,
            mass: 50,
            density: 1
});
var gear4 = Body.create({
            parts: toothGroup4,
            mass: 50,
            density: 1
});

Body.setPosition(gear1, composite1.bodies[0].position);
Body.setPosition(gear2, composite2.bodies[0].position);
Body.setPosition(gear3, composite3.bodies[0].position);


Composite.add(composite1,gear1);
Composite.add(composite1,Constraint.create({pointA: composite1.constraints[0].pointA ,bodyB: gear1}));

Composite.add(composite2,gear2);
Composite.add(composite2,Constraint.create({pointA: composite2.constraints[0].pointA ,bodyB: gear2 }));

Composite.add(composite3,gear3);
Composite.add(composite3,Constraint.create({pointA: composite3.constraints[0].pointA ,bodyB: gear3}));

var xValues = [];
var yValues = [];
var steps = 16;
var centerX = 300;
var centerY = 300;
var radius = 75;
var verts2 = [];
var gearGroup;
var toothHeight = 25;
var toothWidthDegree = 4;
var changeToothWidth = (toothWidthDegree/(360/(2*Math.PI)));
for (var i = 0; i < steps; i++) {
  xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
  yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
}
for (var i = 0; i < steps; i++) {
  verts2.push({ x: xValues[i], y: yValues[i] });
  if(i%2 == 0 && i<16){
    verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+changeToothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+changeToothWidth))})
    console.log("x = " + (2 * Math.PI * i / steps)*57.2957795131)
    console.log("y = " + (2 * Math.PI * i / steps)*57.2957795131)
    verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-changeToothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-changeToothWidth))})
  }
}
gearGroup = Bodies.fromVertices(centerX, centerY, [verts2]);


//World.add(engine.world,[composite1,composite2, composite3,gear4] );
//polygon = Matter.Bodies.polygon(300, 300, 16, 75);
World.add(engine.world,[gear4, gearGroup]);

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
    Body.setAngularVelocity(composite1.bodies[1], rotationSpeed);
    // every 1.5 sec
    if (counter >= 60 * 1.5) {

        // reset counter
        counter = 0;
        scaleFactor = 1;
    }
})

// run the engine
constraint1.render.visible = false;
constraint2.render.visible = false;
constraint3.render.visible = false;
Engine.run(engine);