rackPinionModule = true;
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
  changeBody(1);
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
  changeBody(1);
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
  changeBody(1);
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
    removeComposite(compositeArray[3].bodies[0])
    removeComposite(compositeArray[2].bodies[0])
  }
  else if(string == "openClose"){
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
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[1].constraints[0].pointA.y-450)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[1].constraints[0].pointA.y-450)
    scale = scale - 0.2
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
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,compositeArray[0].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.x})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+450)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+450)
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
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+450)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+450)
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
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[1].constraints[0].pointA.y-450)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[1].constraints[0].pointA.y-450)
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
//////////////////////// ADD TO WORLD //////////////////////

// add mouse constraint to world


///////////////// Animation /////////////////////////////////////

Events.on(engine, 'beforeUpdate', function(event) {
    if(openCloseMod == true){
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x -25
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x +25
      if(flipY == true ){
        if(paired ==true){
          compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x -25
          compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x +25
        }
        if(shared ==true){
          compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x -25
          compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x +25
        }
      }
    }
})
// called every frame after physics is applied
// same as above

Events.on(engine, 'afterUpdate', function(event) {
  if(openCloseMod == true){
    Body.setAngle(compositeArray[2].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
    Body.setAngle(compositeArray[3].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
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
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
      
    }
  }
  if(paired == true){
    if(flipY == true){
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], -compositeArray[4].bodies[0].angle*-angleFactor);
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], -compositeArray[4].bodies[0].angle*angleFactor);
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