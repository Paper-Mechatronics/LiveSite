function showParts(){
  numLargeGear = 0
  numMediumGear = 0
  numSmallGear = 0
  numLargeCrank = 0
  numMediumCrank = 0
  numSmallCrank = 0
  numLinearGear = 0
  numLargeCam = 0
  numMediumCam = 0
  numSmallCam = 0
  var continuous = 0
  var crankLength = 0
  var mirror = 0
  var camType
  for(var i = 0; i<compositeArray.length; i++){
    if(compositeArray[i].shape == "gear"){
      if(compositeArray[i].alternate == false){
        continuous = 1;
        if(rotateModule || spurModule || planetaryModule){
          continuous = 0;
        }
      }
      if(compositeArray[i].radius == 80){
        numLargeGear ++
      }
      else if(compositeArray[i].radius == 64){
        numMediumGear++
      }
      else if(compositeArray[i].radius == 48){
        numSmallGear++
      }
    }
    if(compositeArray[i].shape == "cam" || compositeArray[i].shape == "shell"){
      if(compositeArray[i].shape == "shell"){
        camType = 1
      }
      if(compositeArray[i].shape == "cam"){
        camType = 0
      }
      if(compositeArray[i].radius == 80){
        numLargeCam++
      }
      else if(compositeArray[i].radius == 64){
        numMediumCam++
      }
      else if(compositeArray[i].radius == 48){
        numSmallCam++
      }
    }
    console.log(compositeArray[i].radius)
    if(compositeArray[i].shape == "circleCrank"){
      crankLength = 350 + parseInt(module.pivot2Point)
      if(compositeArray[i].radius == 132){ 
        numLargeCrank++
      }
      else if(compositeArray[i].radius ==116){
        numMediumCrank++
      }
      else if(compositeArray[i].radius == 100){
        numSmallCrank++
      }
    }
    if(compositeArray[i].shape == "linGear"){
      if(mirrored == true){
        mirror = 1
      }
      numLinearGear++
    }
  }
  var flappingModule = 0;
  var motor = 0
  if(flapModule){
    flappingModule = 1;
    if(compositeArray[0].isMotor){
      motor = 0
    }
    else{
      motor = 1
    }
  }
  var spurFlap = 0
  var spurRotate = 0
  var rotateGear = 0;
  var spur1Radius = 0
  var spur2Radius = 0
  var spur3Radius = 0
  if(spurModule || rotateModule){
    if(compositeArray[2]){
      if(compositeArray[2].shape == "gear"){
        spurRotate = 1
        rotateGear = compositeArray[2].radius;
        spur1Radius = compositeArray[0].radius
        spur2Radius = compositeArray[1].radius
        spur3Radius = compositeArray[2].radius
      }
      else{
        spurFlap = 1
      }
    }
  }
  var largeGears = numLargeGear.toString(); 
  var mediumGears = numMediumGear.toString(); 
  var smallGears = numSmallGear.toString(); 
  var linGears = numLinearGear.toString();
  var largeCranks = numLargeCrank.toString(); 
  var mediumCranks = numMediumCrank.toString(); 
  var smallCranks = numSmallCrank.toString(); 
  var largeCam = numLargeCam.toString(); 
  var mediumCam = numMediumCam.toString(); 
  var smallCam = numSmallCam.toString(); 
  var linGears = numLinearGear.toString();
  continuous = continuous.toString()
  crankLength = crankLength.toString()
  mirror = mirror.toString()
  var connectorLength = module.connectorLength
  var beamLength = newWidth1
  var horizontalSpace = module.horizontalSpace*2
  var constraintLength = parseInt(module.connectorLength) + parseInt(300+module.beamWidth) + parseInt(4*module.horizontalSpace)
  // console.log(beamLength)
  if(!compositeArray[2] || !compositeArray[3] || rotateModule){
    constraintLength = 0;
  }
  localStorage.setItem("largeGears", largeGears);
  localStorage.setItem("mediumGears", mediumGears);
  localStorage.setItem("smallGears", smallGears);
  localStorage.setItem("largeCranks", largeCranks);
  localStorage.setItem("mediumCranks", mediumCranks);
  localStorage.setItem("smallCranks", smallCranks);
  localStorage.setItem("linGears", linGears);
  localStorage.setItem("largeCam", largeCam);
  localStorage.setItem("mediumCam", mediumCam);
  localStorage.setItem("smallCam", smallCam);
  localStorage.setItem("constraintLength", constraintLength);
  localStorage.setItem("connectorLength", connectorLength);
  localStorage.setItem("beamLength", beamLength);
  localStorage.setItem("horizontalSpace", horizontalSpace);
  localStorage.setItem("continuous", continuous);
  localStorage.setItem("crankLength", crankLength);
  localStorage.setItem("mirror", mirror);
  localStorage.setItem("flappingModule", flappingModule);
  localStorage.setItem("gear1Spacing", gear1Spacing);
  localStorage.setItem("gear2Spacing", gear2Spacing);
  localStorage.setItem("beamSpace", beamSpace);
  localStorage.setItem("verticalSpacing", verticalSpacing);
  localStorage.setItem("flapBeamHeightL", (module.flapBeamHeightL+150))
  localStorage.setItem("flapBeamHeightR", (module.flapBeamHeightR+150))
  localStorage.setItem("flapBeamOffset", (module.flapBeamOffset+50))
  localStorage.setItem("flapBeamWidthL", (module.flapBeamWidthL+300))
  localStorage.setItem("flapBeamWidthR", (module.flapBeamWidthR+300))
  localStorage.setItem("flapVerticalSpace", (module.verticalSpace+300));
  localStorage.setItem("flapHorizontalSpace", (module.horizontalSpace+100));
  localStorage.setItem("flapConnectorLengthR", flapConnectorR);
  localStorage.setItem("flapConnectorLengthL", flapConnectorL);
  localStorage.setItem("motor", motor);
  localStorage.setItem("camType", camType);
  localStorage.setItem("spurFlap", spurFlap);
  localStorage.setItem("spurRotate", spurRotate);
  localStorage.setItem("rotateGear", rotateGear);
  localStorage.setItem("spur1Radius", spur1Radius);
  localStorage.setItem("spur2Radius", spur2Radius);
  localStorage.setItem("spur3Radius", spur3Radius);

  localStorage.setItem("spurBeamLength", module.spurBeamLength + 150);
  if(planetaryModule){
    localStorage.setItem("planetaryModule", 1);
    localStorage.setItem("planetaryBraceLength", planetaryBrace);
  }
  // window.location.href="./jsPDF/parts.html"
  window.open("./jsPDF/parts.html", '_blank');
}