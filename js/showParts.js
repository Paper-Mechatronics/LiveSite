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
  for(var i = 0; i<compositeArray.length; i++){
    if(compositeArray[i].shape == "gear"){
      if(compositeArray[i].alternate == false){
        continuous = 1;
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
    console.log(compositeArray[i].radius)
    if(compositeArray[i].shape == "circleCrank"){
      crankLength = 350 + parseInt(module.pivot2Point)
      if(compositeArray[i].radius == 132){ 
        numLargeCrank++
      }
      else if(compositeArray[i].radius ==1116){
        numMediumCrank++
      }
      else if(compositeArray[i].radius == 100){
        numSmallCrank++
      }
    }
    if(compositeArray[i].shape == "linGear"){
      numLinearGear++
    }
  }
  var largeGears = numLargeGear.toString(); 
  var mediumGears = numMediumGear.toString(); 
  var smallGears = numSmallGear.toString(); 
  var linGears = numLinearGear.toString();
  var largeCranks = numLargeCrank.toString(); 
  var mediumCranks = numMediumCrank.toString(); 
  var smallCranks = numSmallCrank.toString(); 
  var linGears = numLinearGear.toString();
  continuous = continuous.toString()
  crankLength = crankLength.toString()
  var constraintLength = parseInt(module.connectorLength) + parseInt(newWidth1) + parseInt(2*module.horizontalSpace)
  var connectorLength = module.connectorLength
  var beamLength = newWidth1
  var horizontalSpace = module.horizontalSpace*2
  localStorage.setItem("largeGears", largeGears);
  localStorage.setItem("mediumGears", mediumGears);
  localStorage.setItem("smallGears", smallGears);
  localStorage.setItem("largeCranks", largeCranks);
  localStorage.setItem("mediumCranks", mediumCranks);
  localStorage.setItem("smallCranks", smallCranks);
  localStorage.setItem("linGears", linGears);
  localStorage.setItem("constraintLength", constraintLength);
  localStorage.setItem("connectorLength", connectorLength);
  localStorage.setItem("beamLength", beamLength);
  localStorage.setItem("horizontalSpace", horizontalSpace);
  localStorage.setItem("continuous", continuous);
  localStorage.setItem("crankLength", crankLength);
  // window.location.href="./jsPDF/parts.html"
  window.open("./jsPDF/parts.html", '_blank');
}