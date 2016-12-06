planetaryModule = true;
function changeBodyPlanetary(index){
  for(var i=0; i<1;i++){
    if(compositeArray[index].bodies[1]){
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    var tmpConstraintXPoint
    if(index == 0){
      tmpConstraintXPoint = (window.innerWidth)*(0.75*0.45)-(radius+(toothHeight*0.6))
    }
    else if(index == 1){
      tmpConstraintXPoint = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*0.6))
      compositeArray[2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+((compositeArray[1].radius+(toothHeight*0.6))*2)+((compositeArray[2].radius+(toothHeight*0.6)))
    }
    else {
      tmpConstraintXPoint = (window.innerWidth)*(0.75*0.45)+((compositeArray[1].radius+(toothHeight*0.6))*2)+((compositeArray[2].radius+(toothHeight*0.6)))
    }
    var tmpConstraintYPoint = (window.innerHeight)*(0.65)
    Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
    verts2 = [];
    drawGear();
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
    for(var j=0; j<compositeArray[index].bodies[0].parts.length;j++){
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  }
}
function addPlanetaryGearComposite(centerX, centerY, constraintX, constraintY){
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
      // Add collision filter mask
      collisionFilter: {
        mask: otherCategory
      },
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
    Constraint.create({pointA: { x: constraintX, y: constraintY },
      // body to constrain
      bodyB: compositeArray[totalComposites-1].bodies[0], 
      stiffness: 1
    })
  )
  // add constraint to composite (composite to add to, constraint to add)
  Composite.add(compositeArray[totalComposites-1], constraintArray[totalConstraints-1]);
  Composite.add(compositeArray[totalComposites-1], Bodies.circle(centerX, centerY, 1))
  // add composite to the world
  World.add(engine.world,[compositeArray[totalComposites-1]] );
}
function smallGear1(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(0);  
}
function mediumGear1(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(0);
}
function largeGear1(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[0].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(0);
}
function smallGear2(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(1);
  removeComposite(compositeArray[3].bodies[0])
  addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
}
function mediumGear2(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(1);
  removeComposite(compositeArray[3].bodies[0])
  addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
}
function largeGear2(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(1);
  removeComposite(compositeArray[3].bodies[0])
  addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
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

Events.on(engine, 'beforeUpdate', function(event) {
  Body.setPosition(compositeArray[0].bodies[1],compositeArray[0].bodies[0].position)
})
////////////////////// RUN /////////////////////////////
addPlanetaryGearComposite((window.innerWidth)*(0.75*0.45)-(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65),(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*0.6)),(window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
compositeArray[0].isMotor = true;
compositeArray[1].lock = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)