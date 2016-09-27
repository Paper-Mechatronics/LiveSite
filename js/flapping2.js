flapModule = true;
////////////////////// RUN /////////////////////////////
var width = 350;
addGearComposite((window.innerWidth)*(0.75*0.5)-(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addGearComposite((window.innerWidth)*(0.75*0.5)+(radius+(toothHeight*0.6)), (window.innerHeight)*(0.65));
addPolyComposite((window.innerWidth)*(0.75*0.5)+((width/2)+50), compositeArray[0].constraints[0].pointA.y-300, -width, 10)
addPolyComposite((window.innerWidth)*(0.75*0.5)-((width/2)+50), compositeArray[0].constraints[0].pointA.y-300, width, 10)
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0])
compositeArray[1].isMotor = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
Engine.run(engine);
Render.run(render);