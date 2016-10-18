
// numOfLargeGears = 0
// numOfMediumGears = 0
// numOfSmallGears = 0
// numOfLinGears = 0
centerX = 100*scale *size;
centerY = 100*scale*size


function drawGear(){
  // draw circle
  verts2 = []
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
  }
  // add teeth
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<steps){
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+toothWidth))})
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-toothWidth))})
    }
  }
}
function drawContinuousGear(){
  // draw circle
  verts2 = []
  for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
  }
  // add teeth
  for (var i = 0; i < (steps); i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<(steps*(1/3))){
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * i / steps)+toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * i / steps)+toothWidth))})
      verts2.push({x:(centerX + (radius+toothHeight) * Math.cos((2 * Math.PI * (i+1) / steps)-toothWidth)), y: (centerY + (radius+toothHeight) * Math.sin((2 * Math.PI * (i+1) / steps)-toothWidth))})
    }
  }
}
function drawLinGear(){
  // new vertex array
  linGearVerts = [];
  // create rectangle shape
  linGearVerts.push({x: centerX, y: centerY})
  linGearVerts.push({x: centerX, y: centerY + height})
  linGearVerts.push({x: centerX + width, y: centerY + height})
  // add teeth
  for (var i = 0; i < linSteps; i++) {
    linGearVerts.push({ x: centerX + width, y: (centerY + height) - ((height/linSteps)*i)});
    if(i > 0 && i%2 == 0){
       linGearVerts.push({ x: (centerX +width) + linToothHeight, y: (centerY + height)- ((height/linSteps)*i)-offset1});
       linGearVerts.push({ x: (centerX +width) + linToothHeight, y: (centerY + height) - ((height/linSteps)*i) - offset2});
    }
  }
  // add last corner
  linGearVerts.push({ x: (centerX +width), y: (centerY + height) - height});
}

function arrange(){
  if(centerY > 310){
    // centerY = 100*scale*size
    // centerX = centerX + (200*scale*size)
  }
}
function square(yOffset){
  doc.line((15+510.2+5)*frameScale,(yOffset + 15)*frameScale,(15+510.2+5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((15+510.2+5)*frameScale,(yOffset + 15+227.8)*frameScale,(15+510.2+5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((15+510.2+5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale,(15+510.2+5+137.5)*frameScale,(yOffset + 15+227.8-85)*frameScale)
  doc.line((15+510.2+5+137.5)*frameScale,(yOffset + 15+227.8-85)*frameScale,(15+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8-85)*frameScale)
  doc.line((15+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8-85)*frameScale,(15+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((15+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8)*frameScale,(15+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((15+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale,(15+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15)*frameScale)
  doc.line((15+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15)*frameScale,(15+510.2+5)*frameScale,(yOffset + 15)*frameScale)
}
function roundedRect(length){
  length = length+22.56
  doc.roundedRect(125, (15*frameScale), 22.5, length, 11, 11)
  console.log(length)
  if(length<123.47){
    doc.roundedRect(125+11.25-3.36, (15*frameScale)+22.14, 6.72, length-22.14-22.14, 3.36, 3.36)
  }
  else{
    doc.roundedRect(125+11.25-3.36, (15*frameScale)+22.14, 6.72, 80, 3.36, 3.36)
  }
  doc.circle(125+11.25,(15*frameScale)+11.28,3 )
  doc.circle(125+11.25,(15*frameScale)+(length-11.28),3 )
}
function crankParts(){
  for(var x = 0; x<8;x++){
    if(x>3){
      doc.circle(25 + (20*(x-4)), 150, 7.5)
      doc.circle(25 + (20*(x-4)), 150, 1.5)
    }
    else{
      doc.circle(25 + (20*x), 130, 7.5)
      doc.circle(25 + (20*x), 130, 1.5)
    }
  }
}
function buttonDisplay(){
  $("#setSmallWidth").show()
  $("#setMediumWidth").show()
  $("#setLargeWidth").show()
}
var doc = new jsPDF("landscape");
function showGears(){
  // console.log(numOfMediumCranks)
  if(numOfLargeGears || numOfMediumGears || numOfSmallGears){
    doc.text(275.3,208.2,pageLabelArray[0])
  }
  else{
    doc.text(275.3,208.2,pageLabelArray[1])
  }
  for(var x = 0; x<numOfLargeGears; x++){
    arrange()
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale*size
    if(continuous==1){
      drawContinuousGear()
    }
    else{
      drawGear();
      console.log(centerY)
    }
    doc.circle(centerX, centerY, (2));
    centerY = centerY + (196*scale*size);
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
  }
  //centerX = centerX + (200*scale*size);
  //centerY = 100*scale*size
  for(var x = 0; x<numOfMediumGears; x++){
    arrange()
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *scale*size
    if(continuous==1){
      drawContinuousGear()
    }
    else{
      drawGear();
    }
    doc.circle(centerX, centerY, (2));
    centerY = centerY + (168*scale*size);
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
  }
  for(var x = 0; x<numOfSmallGears; x++){
    arrange()
    radius = 48
    steps = (0.25 * radius)*2;
    toothWidthDegree = 3;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 48 *scale*size
    if(continuous==1){
      drawContinuousGear()
    }
    else{
      drawGear();
    }
    doc.circle(centerX, centerY, (2));
    centerY = centerY + (136*scale*size);
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
  }
  if(numOfLinGears){
    centerX = 200*scale*size;
    centerY = 10*scale*size;
    for(var x = 0; x<numOfLinGears; x++){
      if(x>0){
        centerX = centerX + (60*scale*size);
      }
      drawLinGear();
      for (var i = 0; i<linGearVerts.length; i++){
        if(i+1 == linGearVerts.length){
          doc.line(linGearVerts[i].y, linGearVerts[i].x, linGearVerts[0].y, linGearVerts[0].x); // horizontal line
        }
        else{
          doc.line(linGearVerts[i].y, linGearVerts[i].x, linGearVerts[i+1].y, linGearVerts[i+1].x);
        }
      }
    }
  }
  if(numOfLargeCranks){
    for(var x = 0; x<numOfLargeCranks; x++){
      doc.circle(centerXCircle,centerYCircle,120/2.834646)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((120/2.834646)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength)
  }
  if(numOfMediumCranks){
    for(var x = 0; x<numOfMediumCranks; x++){
      doc.circle(centerXCircle,centerYCircle,104/2.834646)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((104/2.834646)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength)
  }
  if(numOfSmallCranks){
    for(var x = 0; x<numOfSmallCranks; x++){
      doc.circle(centerXCircle,centerYCircle,88/2.834646)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((88/2.834646)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength)
  }  
}
showGears()
