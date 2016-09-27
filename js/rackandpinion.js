rackPinionModule = true;
var c = 369
var rectBase = 600
var originalWidth1
var originalWidth2
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
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
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
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
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
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
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
    reset()
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
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
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
  }
  else if(string == "openClose"){
    reset()
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
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
    addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
    originalWidth1 = compositeArray[2].width
    originalWidth2 = compositeArray[3].width
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    // console.log(compositeArray[2].constraints[0].pointA.x)
    // console.log(compositeArray[3].constraints[0].pointA.x)

    // addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.8) + rackPinBase)
    // compositeArray[0].constraints[0].stiffness = 0.0000001;
    // addGearComposite((window.innerWidth)*(0.75*0.45)+((radius)+((toothHeight)*2)) ,(window.innerHeight)*(0.68) + rackPinBase)
    // addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
    // addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
    // var originalWidth1 = compositeArray[2].width
    // var originalWidth2 = compositeArray[3].width
    // createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    // createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    // compositeArray[1].isMotor = true;
    // compositeArray[1].alternate = true;
    // compositeArray[1].motorSpeed = 0.021
    // pivotHeight(0)


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
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      compositeArray[compositeArray.length-1].realMotor = false;
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
      // if(compositeArray[2] && compositeArray[3]){
      //   compositeArray[2].constraints[0].pointA.x = compositeArray[2].constraints[0].pointA.x-(radius + toothHeight/2)
      //   compositeArray[3].constraints[0].pointA.x = compositeArray[3].constraints[0].pointA.x-(radius + toothHeight/2)
      // }
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      compositeArray[compositeArray.length-1].realMotor = false;
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,compositeArray[0].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.x})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+600)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+600)
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-1].bodies[0])
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-2].bodies[0])
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
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+600)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+600)
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-1].bodies[0])
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-2].bodies[0])
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
    deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
    deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[1].constraints[0].pointA.y-600)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[1].constraints[0].pointA.y-600)
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  }
  else{
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
  }
}
function continuous(){
    changeBodyContinuous(1)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)+130
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y})
    compositeArray[1].alternate = false;
    compositeArray[1].motorDir = 1;
    compositeArray[0].constraints[0].stiffness = 0.001
    // if(compositeArray[2]){
    //   compositeArray[2].constraints[0].stiffness = 0.001
    // }
    document.getElementById("mirror").disabled = true;
    // engine.world.gravity.y = 0.3;
}
function alternatingGear(){
  document.getElementById("mirror").disabled = false;
    changeBody(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
    compositeArray[1].alternate = true;
    compositeArray[0].constraints[0].stiffness = 0.00001
    compositeArray[1].motorDir = 1;
  // engine.world.gravity.y = 0.3;
}
//////////////////////// ADD TO WORLD //////////////////////


var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
var beamSpace = 50
function beamSpacing(value){
  if (openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changeSpaceWidth = value - prevSpaceValue
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
      if(flipY){
        jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x - changeSpaceWidth
        jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x + changeSpaceWidth
        jointComposites[jointComposites.length-3].constraints[0].pointA.x = jointComposites[jointComposites.length-3].constraints[0].pointA.x + changeSpaceWidth
        jointComposites[jointComposites.length-4].constraints[0].pointA.x = jointComposites[jointComposites.length-4].constraints[0].pointA.x - changeSpaceWidth
        if(paired){
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x - value
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x - (value*-1)
        }
        else if(shared){
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x - value
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x - (value*-1)
        }
        
      }
      else{
        jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
        jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth
      }
      prevSpaceValue = value
      beamSpace = parseInt(value);
    }
    console.log("BeamSpace Value = " + value)
  }
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  if(openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changePivotHeight = value - prevPivotValue
      // if(openCloseModule){
      //   if(crankMod){
      //     deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //     compositeArray[0].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y - changePivotHeight
      //     createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //   }
      // }
      if(flipY){
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y + changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y + changePivotHeight
        jointComposites[jointComposites.length-3].constraints[0].pointA.y = jointComposites[jointComposites.length-3].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-4].constraints[0].pointA.y = jointComposites[jointComposites.length-4].constraints[0].pointA.y - changePivotHeight
      }
      else{
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y - changePivotHeight
      }
      prevPivotValue = value
      pivotValue = value
      // rotationPoint = value/150
      console.log("Pivot Value = " + value)

    }
  }
}

function constraintLength(value){
  if(openCloseMod){
    c = parseInt(value)
    console.log("c Value = " + value)
  }
}
function constraintPosition(value){
  if (openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    compositeArray[2].width = originalWidth1 - value
    compositeArray[3].width = originalWidth2 - (-value)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,originalWidth1)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, originalWidth2)
    if(flipY){
      compositeArray[compositeArray.length-1].width = originalWidth1 - value
      compositeArray[compositeArray.length-2].width = originalWidth2 - (-value)
      if(paired){
        deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[5].bodies[0])
        deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[5].bodies[0])
        createConstraintFake2(compositeArray[5].bodies[0], compositeArray[compositeArray.length-2].bodies[0],-value,originalWidth1)
        createConstraintFake2(compositeArray[5].bodies[0], compositeArray[compositeArray.length-1].bodies[0],value, originalWidth2)
      }
      else if(shared){
        deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[4].bodies[0])
        deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[4].bodies[0])
        createConstraintFake2(compositeArray[4].bodies[0], compositeArray[compositeArray.length-2].bodies[0],-value,originalWidth1)
        createConstraintFake2(compositeArray[4].bodies[0], compositeArray[compositeArray.length-1].bodies[0],value, originalWidth2)
      }
    }
    console.log("constraintPosition Value = " + value)
  }
}
// add mouse constraint to world


///////////////// Animation /////////////////////////////////////

Events.on(engine, 'beforeUpdate', function(event) {

    if(openCloseMod == true){
      // compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x -25
      // compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x +25
      if(flipY == true ){
        if(paired ==true){
          // compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x -25
          // compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x +25
        }
        if(shared ==true){
          // compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x -25
          // compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x +25
        }
      }
    }
})
// called every frame after physics is applied
// same as above

Events.on(engine, 'afterUpdate', function(event) {
  if(openCloseMod == true){
    var bottom = compositeArray[0].constraints[0].pointA.y - 600
    var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
    var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
    var rectWidth = compositeArray[2].width
    var b = top  - bottom
    var a = compositeArray[2].width
    // var c = Math.sqrt((rectWidth*rectWidth)+(pivotSpace*pivotSpace))
    var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
    var degrees = angleC * (180/Math.PI)
    //console.log(((a*a)+(b*b)-(c*c))/(2*a*b))
    if(angleC){
      Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
      Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
      if(flipY){
        if(paired){
          Body.setAngle(compositeArray[compositeArray.length -2].bodies[0], angleC - 0.93 );
          Body.setAngle(compositeArray[compositeArray.length -1].bodies[0], -(angleC - 0.93));
        }
        else if(shared){
          Body.setAngle(compositeArray[compositeArray.length -1].bodies[0], angleC - 1.5708 );
          Body.setAngle(compositeArray[compositeArray.length -2].bodies[0], -(angleC - 1.5708));
        }
        // console.log(angleC)
      }
    }
    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    // Body.setAngle(compositeArray[2].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
    // Body.setAngle(compositeArray[3].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
    compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - beamSpace
    compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (beamSpace*-1)
    if(paired || shared){
      compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[compositeArray.length - 3].constraints[0].pointA.x - beamSpace
      compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[compositeArray.length - 3].constraints[0].pointA.x - (beamSpace*-1)
    }
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
      // Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
      // Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
      
    }
  }
  if(paired == true){
    if(flipY == true){
      // Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], -compositeArray[4].bodies[0].angle*-angleFactor);
      // Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], -compositeArray[4].bodies[0].angle*angleFactor);
    }
  }
  if(compositeArray[1].alternate == false){
    // console.log(compositeArray[1].bodies[0].angle)
    if(compositeArray[1].bodies[0].angle >= (2*Math.PI) ){
      Body.setAngle(compositeArray[1].bodies[0], 0)
    }
    if(compositeArray[1].bodies[0].angle > Math.PI+0.5 || compositeArray[1].bodies[0].angle < 0.5){
      if(compositeArray[0].bodies[0].position.y >= compositeArray[0].constraints[0].pointA.y){
        Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].constraints[0].pointA.y})
        Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:0})
      }
      else{
        //Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].bodies[0].position.y+4})
        Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:3})
      } 
    }
  }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.5))
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)) ,(window.innerHeight)*(0.5))
Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
Engine.run(engine);
Render.run(render);