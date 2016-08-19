// window.addEventListener('focus', function() {
//     world.step( 1 / 60);
// },false);

// window.addEventListener('blur', function() {
//     document.title = 'not focused';
// },false);
// var R = 0.7,
// L = R * 3;
// // Create demo application
// var app = new p2.WebGLRenderer(function(){
// var world = new p2.World({
//     gravity : [0,-10]
// });
// this.setWorld(world);
// world.solver.iterations = 30;
// world.solver.tolerance = 0.01;





// // Create static dummy body that we can constrain other bodies to
// var dummyBody = new p2.Body({
//     mass: 0,
// });
// world.addBody(dummyBody);

// // Create static dummy body that we can constrain other bodies to
// var dummyBody1 = new p2.Body({
//     mass: 0,
// });
// world.addBody(dummyBody1);

// // Create circle
// var shape = new p2.Circle({ radius: R }),
//     circleBody = new p2.Body({
//         mass: 1,
//         position: [0,0],
//     });
// circleBody.addShape(shape);
// world.addBody(circleBody);

// // Create circle
// var circle1 = new p2.Circle({ radius: R }),
//     circleBody1 = new p2.Body({
//         mass: 1,
//         position: [5,0],
//     });
// circleBody1.addShape(circle1);
// world.addBody(circleBody1);

// // Constrain it to the world
// var c = new p2.RevoluteConstraint(circleBody, dummyBody, {
//     worldPivot: [0, 0],
//     collideConnected: false
// });
// c.enableMotor();
// c.setMotorSpeed(5);
// world.addConstraint(c);

// // Constrain it to the world
// var g = new p2.RevoluteConstraint(circleBody1, dummyBody1, {
//     worldPivot: [5, 0],
//     collideConnected: false
// });
// g.enableMotor();
// g.setMotorSpeed(5);
// world.addConstraint(g);

// // Create arm
// var armShape =  new p2.Box({ width: L, height: 0.1*L });
// var armBody = new p2.Body({
//     mass:1,
// });
// armBody.addShape(armShape);
// world.addBody(armBody);

// // Constrain arm to circle
// var c2 = new p2.RevoluteConstraint(circleBody, armBody, {
//     localPivotA: [R*0.7, 0],
//     localPivotB: [L/2,0],
//     collideConnected: false
// });
// world.addConstraint(c2);

// // Piston
// var pistonShape = new p2.Box({ width: 1, height: 1 });
// var pistonBody = new p2.Body({
//     mass: 1,
// });
// pistonBody.addShape(pistonShape);
// world.addBody(pistonBody);

// // Connect piston to arm
// var c3 = new p2.RevoluteConstraint(pistonBody, armBody, {
//     localPivotA: [0,0],
//     localPivotB: [-L/2,0],
//     collideConnected: false
// });
// world.addConstraint(c3);

// // Prismatic constraint to keep the piston along a line
// // var c4 = new p2.PrismaticConstraint(dummyBody, pistonBody, {
// //     localAnchorA : [ 0, 0],
// //     localAnchorB : [ 0, 0],
// //     //localAxisA :   [ 1, 0],
// //     collideConnected : false
// // });
// // world.addConstraint(c4);
// });

// addEventListener('mousemove', function(event){
//   console.log("moving");
// });
// addEventListener('mousedown', function(event){
//   console.log("down");
// });
// addEventListener('mouseup', function(event){
//   console.log("up");
// });

// // Create first circle
// bodyA = new p2.Body({
//     mass: 1,
//     position: [-2,4],
//     angle: Math.PI/2,
//     angularVelocity : -5,
// });
// bodyA.addShape(new p2.Circle({ radius: 1 }));
// world.addBody(bodyA);
// // Create second circle
// bodyB = new p2.Body({
//     mass: 1,
//     position: [2,4],
// });
// bodyB.addShape(new p2.Circle({ radius: 1 }));
// world.addBody(bodyB);
// // Create a dummy body that we can hinge them to
// var dummy3Body = new p2.Body();
// world.addBody(dummy3Body);
// // Hinge em
// revoluteA = new p2.RevoluteConstraint(dummy3Body, bodyA, {
//     worldPivot: bodyA.position
// });
// revoluteB = new p2.RevoluteConstraint(dummy3Body, bodyB, {
//     worldPivot: bodyB.position
// });
// world.addConstraint(revoluteA);
// world.addConstraint(revoluteB);
// // Add gear
// gearConstraint = new p2.GearConstraint(bodyA,bodyB,{ ratio: 2 });
// world.addConstraint(gearConstraint);

// Renderer.prototype.handleMouseDown = function(physicsPosition){
//     console.log("click");
// }
        


// function click(pointer) {

//     var bodies = game.physics.p2.hitTest(pointer.position, [ tetris1.body, tetris2.body, tetris3.body ]);
    
//     // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
//     var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
//     if (bodies.length)
//     {
//         var clickedBody = bodies[0];
        
//         var localPointInBody = [0, 0];
//         // this function takes physicsPos and coverts it to the body's local coordinate system
//         clickedBody.toLocalFrame(localPointInBody, physicsPos);
        
//         // use a revoluteContraint to attach mouseBody to the clicked body
//         mouseConstraint = this.game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ]);
//     }   

// }

// function release() {

//     // remove constraint from object's body
//     game.physics.p2.removeConstraint(mouseConstraint);

// }

// function move(pointer) {

//     // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
//     mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
//     mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// var canvas, ctx, w, h, world, boxBody, planeBody, mouseConstraint, mouseBody;
// var scaleX = 50, scaleY = -50;
// var clickedShape = false;
// requestAnimationFrame(animate);
// // Init canvas
// canvas = document.getElementById("myCanvas");
// w = canvas.width;
// h = canvas.height;
// ctx = canvas.getContext("2d");
// ctx.lineWidth = 0.05;
// // Init p2.js
// world = new p2.World();
// // Add a box
// boxShape = new p2.Box({ width: 2, height: 1 });
// boxBody = new p2.Body({
//   mass:10,
//   position:[0,3],
//   angularVelocity:5
// });


// boxBody.addShape(boxShape);
// world.addBody(boxBody);

// box2Shape = new p2.Box({ width: 6, height: 0.2 });
// box2Body = new p2.Body({
//   mass:1,
//   position:[0,4],
//   angularVelocity:5
// });


// box2Body.addShape(box2Shape);
// world.addBody(box2Body);

// // Add a plane
// planeShape = new p2.Plane();
// planeBody = new p2.Body();
// planeBody.addShape(planeShape);
// world.addBody(planeBody);

// // Create a body for the cursor
// mouseBody = new p2.Body();
// world.addBody(mouseBody);
// emptyBody = new p2.Body({
//     position:[0,3]
// });
// world.addBody(emptyBody);
// worldConstraint = new p2.RevoluteConstraint(emptyBody, boxBody, {
//       localPivotA: [0,0],
//       localPivotB: [0,0],
//       collideConnected:false
//     });
//   world.addConstraint(worldConstraint);

// world2Constraint = new p2.RevoluteConstraint(boxBody, box2Body, {
//       localPivotA: [0,0],
//       localPivotB: [3,0],
//       collideConnected:false
//     });
//   world.addConstraint(world2Constraint);
//   //worldConstraint = null;

// canvas.addEventListener('mousedown', function(event){
//   // Convert the canvas coordinate to physics coordinates
//   var position = getPhysicsCoord(event);
//   // Check if the cursor is inside the box
//   var hitBodies = world.hitTest(position, [boxBody]);
//   if(hitBodies.length){
//     clickedShape = true;
//     world.removeConstraint(worldConstraint);
//     worldConstraint = null;
//     // Move the mouse body to the cursor position
//     mouseBody.position[0] = position[0];
//     mouseBody.position[1] = position[1];
//     // Create a RevoluteConstraint.
//     // This constraint lets the bodies rotate around a common point
//     mouseConstraint = new p2.RevoluteConstraint(mouseBody, boxBody, {
//       localPivotA: [0,0],
//       localPivotB: [0,0],
//       collideConnected:false
//     });
//     world.addConstraint(mouseConstraint);
//   }
//   else{
//     clickedShape = false;
//   }
// });
// // Sync the mouse body to be at the cursor position
// canvas.addEventListener('mousemove', function(event){
//   var position = getPhysicsCoord(event);
//   mouseBody.position[0] = position[0];
//   mouseBody.position[1] = position[1];
// });
// // Remove the mouse constraint on mouse up
// canvas.addEventListener('mouseup', function(event){
//   if (clickedShape == true){
//     var position = getPhysicsCoord(event);
//     emptyBody.position[0] = position[0];
//     emptyBody.position[1] = position[1];
//     worldConstraint = new p2.RevoluteConstraint(emptyBody, boxBody, {
//         localPivotA: [0,0],
//         localPivotB: [0,0],
//         collideConnected:false
//       });
//     world.addConstraint(worldConstraint);
//   }
//   world.removeConstraint(mouseConstraint);
//   mouseConstraint = null;
// });
// // Convert a canvas coordiante to physics coordinate
// function getPhysicsCoord(mouseEvent){
//   var rect = canvas.getBoundingClientRect();
//   var x = mouseEvent.clientX - rect.left;
//   var y = mouseEvent.clientY - rect.top;
//   x = (x - w / 2) / scaleX;
//   y = (y - h / 2) / scaleY;
//   return [x, y];
// }
// function drawbox(){
//   ctx.beginPath();
//   var x = boxBody.interpolatedPosition[0],
//       y = boxBody.interpolatedPosition[1];
//   ctx.save();
//   ctx.translate(x, y);        // Translate to the center of the box
//   ctx.rotate(boxBody.interpolatedAngle);  // Rotate to the box body frame
//   ctx.rect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);
//   ctx.stroke();
//   ctx.fillStyle = "blue";
//   ctx.fill();
//   ctx.restore();
// }

// // var box1 = drawbox(0,0,0)
// //     ,box2 = drawbox(10,0,1)
// // function rectrect(){
// //     ctx.beginPath();
// //     ctx.save();
// //     ctx.translate(x, y);        // Translate to the center of the box
// //     ctx.stroke();
// //     ctx.restore();
// // }



// function drawPlane(){
//     var y = planeBody.interpolatedPosition[1];
//     ctx.moveTo(-w, y);
//     ctx.lineTo( w, y);
//     ctx.stroke();
// }
// function render(){
//     // Clear the canvas
//     ctx.clearRect(0,0,w,h);
//     // Transform the canvas
//     ctx.save();
//     ctx.translate(w/2, h/2); // Translate to the center
//     ctx.scale(scaleX, scaleY);
//     // Draw all bodies
//     drawbox();
//     drawPlane();
//     // Restore transform
//     ctx.restore();
// }
// var lastTime, timeStep = 1 / 60, maxSubSteps = 5;
// // Animation loop
// function animate(time){
//     requestAnimationFrame(animate);
//     var dt = lastTime ? (time - lastTime) / 1000 : 0;
//     dt = Math.min(1 / 10, dt);
//     lastTime = time;
//     // Move physics bodies forward in time
//     world.step(timeStep, dt, maxSubSteps);
//     boxBody.angularVelocity = 5;
//     // Render scene
//     render();
// }