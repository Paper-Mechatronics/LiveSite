function showParts(){
  numLargeGear = 0
  numMediumGear = 0
  numSmallGear = 0
  numLinearGear = 0
  numLargeCam = 0
  numMediumCam = 0
  numSmallCam = 0
  for(var i = 0; i<compositeArray.length; i++){
    if(compositeArray[i].shape == "gear"){
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
    if(compositeArray[i].shape == "cam"){
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
    if(compositeArray[i].shape == "linGear"){
      numLinearGear++
    }
  }
  // console.log(numLargeGear)
  var largeGears = numLargeGear.toString(); 
  var mediumGears = numMediumGear.toString(); 
  var smallGears = numSmallGear.toString(); 
  var linGears = numLinearGear.toString();
  var constraintLength = parseInt(module.connectorLength) + parseInt(newWidth1) + parseInt(2*module.horizontalSpace)
  var connectorLength = module.connectorLength
  var beamLength = newWidth1
  var horizontalSpace = module.horizontalSpace*2
  localStorage.setItem("largeGears", largeGears);
  localStorage.setItem("mediumGears", mediumGears);
  localStorage.setItem("smallGears", smallGears);
  localStorage.setItem("linGears", linGears);
  localStorage.setItem("constraintLength", constraintLength);
  localStorage.setItem("connectorLength", connectorLength);
  localStorage.setItem("beamLength", beamLength);
  localStorage.setItem("horizontalSpace", horizontalSpace);
  window.location.replace("./jsPDF/parts.html")
}