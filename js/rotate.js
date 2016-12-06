rotateModule = true;
function changeBodyRotate(index){
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
function addRotateRect(width, height, centerX, centerY){
  // see addGearComposite() comments
  centerX  = centerX - (width/2)
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
  compositeArray[3].bodies[0].collisionFilter.mask = otherCategory
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
function smallGear3(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[2].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(2);
  removeComposite(compositeArray[3].bodies[0])
  addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
}
function mediumGear3(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[2].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(2);
  removeComposite(compositeArray[3].bodies[0])
  addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
}
function largeGear3(){
  Body.setAngle(compositeArray[0].bodies[0], 0)
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[2].radius = radius;
  steps = (0.25 * radius)*2;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  changeBodyRotate(2);
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
  Body.setAngle(compositeArray[3].bodies[0],compositeArray[2].bodies[0].angle)
})
////////////////////// RUN /////////////////////////////
addGearComposite((window.innerWidth)*(0.75*0.45)-(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.45)+((radius+(toothHeight*0.6))*3), (window.innerHeight)*(0.65));
addRotateRect(150,10,compositeArray[2].constraints[0].pointA.x,compositeArray[2].constraints[0].pointA.y)
compositeArray[0].isMotor = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)