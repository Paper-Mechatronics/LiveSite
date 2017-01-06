// Define location variables
centerX = 100*scale *size;
centerY = 100*scale*size
// The adjust variable is to change part positions based off different sized gears
var adjust = 0
if(numOfLargeCranks){
  adjust = (132 * scale2 *size) + 10
}
else if(numOfMediumCranks){
  adjust = (116 * scale2 *size) + 10
}
else if(numOfSmallCranks){
  adjust = (100 * scale2 *size) + 10
}
if(spurFlap || spurRotate){
  spurModule = 1
}
///////////// Draw Functions //////////////////////////////
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
  linGearVerts.push({x: centerX, y: (centerY + 30)})
  linGearVerts.push({x: centerX, y: (centerY + 30) + height + 25.4})
  linGearVerts.push({x: centerX + width + toothHeight, y: (centerY + 30) + height + 25.4})
  linGearVerts.push({x: centerX + width + toothHeight, y: (centerY + 26) + height})
  // add teeth
  for (var i = 0; i < linSteps; i++) {
    if(i==0){
      linGearVerts.push({ x: centerX + width, y: ((centerY + 26) + height) - ((height/linSteps)*i)});
    }else{
      linGearVerts.push({ x: centerX + width, y: ((centerY + 30) + height) - ((height/linSteps)*i)});
    }
    if(i > 0 && i%2 == 0 && i < linSteps-1){
       linGearVerts.push({ x: (centerX +width) + linToothHeight, y: ((centerY + 30) + height)- ((height/linSteps)*i)-offset1});
       linGearVerts.push({ x: (centerX +width) + linToothHeight, y: ((centerY + 30) + height) - ((height/linSteps)*i) - offset2});
    }
  }
  // add last corner
  linGearVerts.push({ x: (centerX +width), y: ((centerY + 34) + height) - height});
  linGearVerts.push({ x: (centerX +width+toothHeight), y: ((centerY + 34) + height) - height});
  linGearVerts.push({ x: (centerX +width+toothHeight), y: ((centerY + 30) + height -24.4) - height});
  linGearVerts.push({ x: (centerX), y: ((centerY + 30) + height -24.4) - height});
}
function drawCam(){
  // ovalRad defines height of cam
  // change ovarRad and radius based off gear size chosen
  var ovalRad = 0
  if(numOfLargeCam){
    ovalRad = 125*scale2*size*1.05
    radius = 80 *scale2*size*1.05
  }
  if(numOfMediumCam){
    ovalRad = 100*scale2*size*1.05
    radius = 64*scale2*size*1.05
  }
  if(numOfSmallCam){
    ovalRad = 75*scale2*size*1.05
    radius = 48*scale2*size*1.05
  }
  // reset verts2 array
  verts2 = []
  // draw bottom half of cam
  for (var i = 0; i < (steps/2)+1; i++) {
    xValues[i] = (centerX + (radius*1.3*1.2) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((centerY+radius+5) + (radius*1.3) * Math.sin(2 * Math.PI * i / steps));
  }
  // draw top half of cam
  for (var i = (steps/2)+1; i < steps; i++) {
    xValues[i] = (centerX + (radius*1.3*1.2) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((centerY+radius+5) + (radius+ovalRad) * Math.sin(2 * Math.PI * i / steps));
  }
  // push values to array to be drawn
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}
function drawShell(){
  // factor variable to rescale shell based off size chosen
  if(numOfLargeCam){
    factor = 1
  }
  if(numOfMediumCam){
    factor = 0.83
  }
  if(numOfSmallCam){
    factor = 0.68
  }
  // reset verts2 array
  verts2 = []
  for (var i = 0; i < (steps)+1; i++) {
    xValues[i] = (centerX + ((14*factor)+(i*(1.2*factor))) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + ((14*factor)+(i*(1.2*factor))) * Math.sin(2 * Math.PI * i / steps));
  }
  // push vertices to verts2 array
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}
function drawCrankParts(){
  // different arrays for new crank parts
  crankJoint = []
  crankAnchor = []
  // Draw the joint part
  for (var i = 0; i < steps/2; i++) {
    xValues[i] = ((centerX-10) + (11.25) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((centerYCircle + 70 + adjust) + (11.25) * Math.sin(2 * Math.PI * i / steps));
  }
  xValues[20] = xValues[19] + 10
  yValues[20] = yValues[19] - 34
  xValues[21] = xValues[20]
  yValues[21] = yValues[20] + 24.5
  xValues[22] = xValues[21] + 2.5
  yValues[22] = yValues[21]
  xValues[23] = xValues[22] 
  yValues[23] = yValues[22] - 24.5
  xValues[24] = xValues[0]
  yValues[24] = yValues[0]
  // push vertices to crankJoint array
  for (var i = 0; i < steps; i++) {
    crankJoint.push({ x: xValues[i], y: yValues[i]});
  }
  // draw circle for joint part
  doc.circle(centerX - 10, centerYCircle + 70 + adjust, 3)
  // draw parts for open close anchor
  for (var i = 35; i < steps; i++) {
    xValues[i-35] = ((centerX+30) + (7.5) * Math.cos(2 * Math.PI * i / steps));
    yValues[i-35] = ((centerYCircle + 60 + adjust) + (7.5) * Math.sin(2 * Math.PI * i / steps));
  } 
  for (var i = 0; i < 26; i++) {
    xValues[i+5] = ((centerX+30) + (7.5) * Math.cos(2 * Math.PI * i / steps));
    yValues[i+5] = ((centerYCircle + 60 + adjust) + (7.5) * Math.sin(2 * Math.PI * i / steps));
  } 
  xValues[31] = xValues[30]
  yValues[31] = yValues[30] - 10
  xValues[32] = xValues[31] - 6.66
  yValues[32] = yValues[31]
  xValues[33] = xValues[32]
  yValues[33] = yValues[32] +20
  for (var i = 0; i < steps/2; i++) {
    xValues[i+34] = ((xValues[33] + 15) + (15) * Math.cos(2 * Math.PI * (20 - i) / steps));
    yValues[i+34] = ((yValues[33]) + (15) * Math.sin(2 * Math.PI * (20 - i) / steps));
  } 
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1]-22
  xValues[xValues.length] = xValues[xValues.length -1] - 4.34
  yValues[yValues.length] = yValues[yValues.length -1]
  xValues[xValues.length] = xValues[xValues.length -1]
  yValues[yValues.length] = yValues[yValues.length -1] + 23.57
  xValues[xValues.length] = xValues[xValues.length -1] - 2.42
  yValues[yValues.length] = yValues[yValues.length -1]
  xValues[xValues.length] = xValues[xValues.length -1]
  yValues[yValues.length] = yValues[yValues.length -1] -23.57
  xValues[xValues.length] = xValues[0]
  yValues[yValues.length] = yValues[yValues.length -1]
  xValues[xValues.length] = xValues[0]
  yValues[yValues.length] = yValues[0]
  // push to crankAnchor to array
  for (var i = 0; i < 70; i++) {
    crankAnchor.push({ x: xValues[i], y: yValues[i]});
  }

}
///////////////////////////////////////////////////////////////////////////////

function arrange(){
  if(centerY > 310){
    // centerY = 100*scale*size
    // centerX = centerX + (200*scale*size)
  }
}
// create square legs
function square(yOffset){
  doc.line((25+510.2+5)*frameScale,(yOffset + 15)*frameScale,(25+510.2+5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((25+510.2+5)*frameScale,(yOffset + 15+227.8)*frameScale,(25+510.2+5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((25+510.2+5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale,(25+510.2+5+137.5)*frameScale,(yOffset + 15+227.8-85)*frameScale)
  doc.line((25+510.2+5+137.5)*frameScale,(yOffset + 15+227.8-85)*frameScale,(25+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8-85)*frameScale)
  doc.line((25+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8-85)*frameScale,(25+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((25+510.2+5+137.5+8.5)*frameScale,(yOffset + 15+227.8)*frameScale,(25+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale)
  doc.line((25+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15+227.8)*frameScale,(25+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15)*frameScale)
  doc.line((25+510.2+5+137.5+8.5+137.5)*frameScale,(yOffset + 15)*frameScale,(25+510.2+5)*frameScale,(yOffset + 15)*frameScale)
}
// create rounded rect for crank linkage
function roundedRect(length,crankSize){
  doc.roundedRect((15*frameScale), 15*frameScale, length+16, 20, 10, 10)
  doc.roundedRect((15*frameScale)+20, (15*frameScale)+10-3.36, crankSize*scale2*size*2, 6.72, 3.36, 3.36)
  doc.circle((15*frameScale)+8,(15*frameScale)+10,2.5)
  doc.circle((15*frameScale)+(length+8),(15*frameScale)+10,2.5)
}
// create rounded rect for flap linkage
function roundedFlapRect(length,length2){
  for(var i=0;i<2;i++){
    if(i == 0){
      doc.roundedRect((15*frameScale), centerY + (80*scale*size) + 40+(20*i), length+16, 16, 8, 8)
      // doc.roundedRect((15*frameScale)+16, centerY + (80*scale*size) + 40+(20*i)+4, radius*2, 8, 4, 4)
      doc.circle((15*frameScale)+8,centerY + (80*scale*size) + 40+8+(20*i),2.5)
      doc.circle((15*frameScale)+(length+8),centerY + (80*scale*size) + 40+8+(20*i),2.5)
    }
    else{
      doc.roundedRect((15*frameScale), centerY + (80*scale*size) + 40+(20*i), length2+16, 16, 8, 8)
      // doc.roundedRect((15*frameScale)+16, centerY + (80*scale*size) + 40+(20*i)+4, radius*2, 8, 4, 4)
      doc.circle((15*frameScale)+8,centerY + (80*scale*size) + 40+8+(20*i),2.5)
      doc.circle((15*frameScale)+(length2+8),centerY + (80*scale*size) + 40+8+(20*i),2.5)
    }
  }
}
function roundedSpurRect(length){
  for(var i=0;i<1;i++){
    doc.roundedRect((15*frameScale), centerY + (80*scale*size)+ 10, length+16, 16, 8, 8)
    doc.circle((15*frameScale)+8,centerY + (80*scale*size)+8 + 10,2.5)
    doc.circle((15*frameScale)+8+(rotateGear*0.8),centerY + (80*scale*size) +8 + 10,1.5)
    doc.circle((15*frameScale)+(length+8),centerY + (80*scale*size)+8 + 10,2.5)
  }
  centerY = centerY + (80*scale*size)+ 10 + 16 + 10
  for(var x = 0; x<16;x++){
    if(x>3){
      doc.circle(12 + (12*(x-4)), centerY, 5)
      doc.circle(12 + (12*(x-4)), centerY, 1.5)
    }
    else{
      doc.circle(20 + (28*x), centerY + 20, 12.5)
      doc.circle(20 + (28*x), centerY + 20, 1.5)
    }
  }
}
function roundedPlanetaryRect(length, yCoord){
  if(planetaryModule){
    doc.roundedRect(10,yCoord,length+20, 15, 7.5, 7.5)
    doc.circle(10 + 10,yCoord + 7.5, 2)
    doc.circle(10 + 10 + length,yCoord + 7.5, 2)
  }
}
// create case for crank
function crankCase(crankSize){
  if(numOfMediumCranks || numOfSmallCranks || numOfLargeCranks){
    frameLength = 10+crankLength-(crankSize*scale2*size*0.8)-12-3+40
    doc.rect(15*frameScale,(15)*frameScale,frameLength,3*(crankSize*scale2*size))
    doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(3*(crankSize*scale2*size)/2)-10,-40,20)
    doc.circle((15*frameScale)+10, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*scale2*size*0.8)-12-3, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    square(0)
    square(232.8)
  }
}
// create case for cam
function camCase(){
  console.log(radius)
  if(numOfCams){
    var frameWidth
    var frameLength
    if(radius == (80*scale*size)){
      frameWidth = 170
      frameLength = 180
    }
    else if(radius == (64*scale*size)){
      frameWidth = 150
      frameLength = 170
    }
    else if(radius == (48*scale*size)){
      frameWidth = 130
      frameLength = 160
    }
    doc.rect(15*frameScale,(15)*frameScale,frameLength,frameWidth)
    doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(frameWidth/2)-10,-40,20)
    doc.rect((15*frameScale)+10,(15*frameScale)+(frameWidth/2)-10,30,20)
    square(0)
    square(232.8)
  }
}
// rack and pinion case
function RPCase(crankSize){
  if(numOfLinGears){
    frameLength = 10+crankLength-(crankSize*scale2*size*0.8)-12-3+40
    doc.rect(15*frameScale,(15)*frameScale,frameLength,3*(crankSize*scale2*size))
    if(mirror==0){
      doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(3*(crankSize*scale2*size)/2)-10,-40,20)
    }
    else{
      doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(frameLength/2)-10,-40,20)
    }
    doc.circle((15*frameScale)+10, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    // doc.circle((15*frameScale)+10, (15*frameScale)+60, 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*scale2*size*0.8)-12-3, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    square(0)
    square(232.8)
  }
}
// flap case
function flapCase(gear1Space,gear2Space,beamSpace,verticalSpace,motor){
    var caseLength = 180
    doc.circle((15*frameScale) + (caseLength/2) - (beamSpace/2),20, 2)
    // doc.circle((15*frameScale) + (caseLength) - (beamSpace/2),20, 2)
    doc.circle((15*frameScale) + (caseLength/2) + (beamSpace/2),20, 2)
    // doc.circle((15*frameScale) + (beamSpace/2),20, 2)
    var caseWidth = 20+verticalSpace+(80*scale*size)+10
    // console.log(linToothHeight)
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    // doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    if(motor ==0){
      // doc.rect((15*frameScale) + (caseLength/2) - (gear1Space)-30,20+verticalSpace-10,40,20)
      doc.circle((15*frameScale) + (caseLength/2) - (gear1Space),20+verticalSpace, 5)
      doc.circle((15*frameScale) + (caseLength/2) + (gear2Space),20+verticalSpace, 2)
      // doc.circle((15*frameScale) + (caseLength/2) - (gear1Space)-30,20+verticalSpace-10,5)
    }
    else{
      // doc.rect((15*frameScale) + (caseLength/2) + (gear2Space)-10,20+verticalSpace-10,40,20)
      doc.circle((15*frameScale) + (caseLength/2) - (gear1Space),20+verticalSpace, 2)
      doc.circle((15*frameScale) + (caseLength/2) + (gear2Space),20+verticalSpace, 5)
      // doc.circle((15*frameScale) + (caseLength/2) + (gear2Space)-10,20+verticalSpace-10,5)
    }
    square(0)
    // doc.text((15+510.2+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[4])
    square(232.8)
    // doc.text((15+510.2+5)*frameScale+5,(15+232.8)*frameScale+10,frameLabelArray[5])
}
function planetaryCase(caseLength,caseWidth){
  if(planetaryModule){
    doc.rect(15*frameScale,(15)*frameScale,caseLength, caseWidth)
    doc.circle((15*frameScale)+(caseLength/2),(15*frameScale)+(caseWidth/2), 2)
    doc.rect((15*frameScale) + (caseLength/2) - 10,(15*frameScale) + (caseWidth/2) - 10,20,40)
    square(0)
    square(232.8)
  }
}
function spurCase(caseHeight, caseWidth){
  if(spurModule){
    doc.rect(15*frameScale,(15)*frameScale,caseWidth, caseHeight)
    doc.circle((15*frameScale)+(40),(15*frameScale)+(caseHeight/2), 6)
    doc.circle((15*frameScale)+(40)+(spur1Radius + spur2Radius)+(toothHeight*1.2),(15*frameScale)+(caseHeight/2), 2)
    doc.circle((15*frameScale)+(40)+(spur1Radius + (spur2Radius*2) + spur3Radius)+(toothHeight*2.4),(15*frameScale)+(caseHeight/2), 2)
    // console.log(spurBeamLength)
    // doc.rect((15*frameScale) + (40) - 30,(15*frameScale) + (caseHeight/2) - 10,40,20)
    motorCaseParts((15*frameScale),(15)*frameScale+caseHeight )
    // doc.rect(15*frameScale,(15)*frameScale+caseHeight + 10,28, 60)
    // doc.rect((15*frameScale)+4,(15)*frameScale+caseHeight + 20,20, 40)
    // doc.rect((15*frameScale)+30,(15)*frameScale+caseHeight + 10,8, 60)
    // doc.rect((15*frameScale)+40,(15)*frameScale+caseHeight + 10,8, 60)
    // doc.rect((15*frameScale)+50,(15)*frameScale+caseHeight + 10,8, 22)
    // doc.rect((15*frameScale)+60,(15)*frameScale+caseHeight + 10,8, 22)
    doc.addPage();
    doc.text(260.3,208.2,pageLabelArray[4])
    square(0)
    square(232.8)

  }
}

function motorCaseParts(xPos, yPos){
  doc.rect(xPos,yPos + 10,28, 60)
  doc.rect(xPos+4,yPos + 20,20, 40)
  doc.rect(xPos+30,yPos + 10,8, 60)
  doc.rect(xPos+40,yPos + 10,8, 60)
  for(var i = 0; i<2;i++){
    doc.line(xPos+50 + (20*i),yPos + 10,xPos+50 + (20*i), yPos + 10 + 37)
    doc.line(xPos+50 + (20*i),yPos + 10 + 37,xPos+50+17 + (20*i), yPos + 10 + 37)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37,xPos+50+17 + (20*i), yPos + 10 + 37 - 5)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37 - 5,xPos+50+17-7 + (20*i), yPos + 10 + 37 - 5)
    doc.line(xPos+50+17-7 + (20*i),yPos + 10 + 37 - 5,xPos+50+17-7 + (20*i), yPos + 10 + 37 - 5-3)
    doc.line(xPos+50+17-7 + (20*i),yPos + 10 + 37 - 5 - 3,xPos+50+17 + (20*i), yPos + 10 + 37 - 5-3)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37 - 5 - 3,xPos+50+17 + (20*i), yPos + 10 + 37 - 5-3-21)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37 - 5 - 3 - 21,xPos+50+17-7 + (20*i), yPos + 10 + 37 - 5-3-21)
    doc.line(xPos+50+17 - 7 + (20*i),yPos + 10 + 37 - 5 - 3 - 21,xPos+50+17-7 + (20*i), yPos + 10 + 37 - 5-3-21 - 3)
    doc.line(xPos+50+17 - 7 + (20*i),yPos + 10 + 37 - 5 - 3 - 21 - 3,xPos+50+17 + (20*i), yPos + 10 + 37 - 5-3-21 - 3)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37 - 5 - 3 - 21 - 3,xPos+50+17 + (20*i), yPos + 10 + 37 - 5-3-21 - 3 - 5)
    doc.line(xPos+50+17 + (20*i),yPos + 10 + 37 - 5 - 3 - 21 - 3 - 5,xPos+50 + (20*i), yPos + 10 + 37 - 5-3-21 - 3 - 5)
  }
}
// misc. parts for crank module
function crankParts(){
  for(var x = 0; x<8;x++){
    if(x>3){
      doc.circle(15 + (20*(x-4)), centerYCircle + adjust, 7.5)
      doc.circle(15 + (20*(x-4)), centerYCircle + adjust, 1.5)
    }
    else{
      doc.circle(15 + (20*x), centerYCircle + 20 + adjust, 7.5)
      doc.circle(15 + (20*x), centerYCircle + 20 + adjust, 1.5)
    }
  }
  drawCrankParts()
  for (var i = 0; i<crankJoint.length; i++){
    if(i+1 == crankJoint.length){
      doc.line(crankJoint[i].x, crankJoint[i].y, crankJoint[0].x, crankJoint[0].y); // horizontal line
    }
    else{
      doc.line(crankJoint[i].x, crankJoint[i].y, crankJoint[i+1].x, crankJoint[i+1].y);
    }
  }
  for (var i = 0; i<crankAnchor.length; i++){
    if(i+1 == crankAnchor.length){
      doc.line(crankAnchor[i].x, crankAnchor[i].y, crankAnchor[0].x, crankAnchor[0].y);
    }
    else{
      doc.line(crankAnchor[i].x, crankAnchor[i].y, crankAnchor[i+1].x, crankAnchor[i+1].y);
    }
  }

}
// misc. parts for flapping module
function flapParts(){
  for(var x = 0; x<8;x++){
    doc.circle(20*(x+1), centerY + (80*scale*size) + 15, 7.5)
    doc.circle(20*(x+1), centerY + (80*scale*size) + 15, 1.5)
  }
  for(var x = 0; x<4;x++){
    doc.circle(20*(x+1), centerY + (80*scale*size) + 30, 5)
    doc.circle(20*(x+1), centerY + (80*scale*size) + 30, 1.5)
  }
  for(var x = 0; x<4;x++){
    doc.circle(40*(x+1) - 20, centerY + 120, (nonMotorRadius*0.71))
    doc.circle(40*(x+1) - 20, centerY + 120, 1.5)
  }
}
// misc. parts for cam module
function camParts(centerX, centerY){
  xValues = []
  yValues = []
  xValues[0] = centerX
  yValues[0] = centerY
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] + 40
  xValues[xValues.length] = xValues[xValues.length - 1] + 10
  yValues[yValues.length] = yValues[yValues.length - 1]
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 10
  xValues[xValues.length] = xValues[xValues.length - 1] + 35
  yValues[yValues.length] = yValues[yValues.length - 1]
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 20
  xValues[xValues.length] = xValues[xValues.length - 1] - 35
  yValues[yValues.length] = yValues[yValues.length - 1]
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 10
  xValues[xValues.length] = xValues[xValues.length - 1] - 10
  yValues[yValues.length] = yValues[yValues.length - 1]
  verts2 = []
  for (var i = 0; i < yValues.length; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
  for(var x = 0; x<2; x++){
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x + (50*x), verts2[i].y, verts2[0].x + (50*x), verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x + (50*x), verts2[i].y, verts2[i+1].x + (50*x), verts2[i+1].y);
      }
    }
    doc.circle(verts2[0].x + (50*x) + 30, verts2[0].y + 20, 2.5)
  }
  xValues = []
  yValues = []
  xValues[0] = centerX + 100
  yValues[0] = centerY
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] + 40
  xValues[xValues.length] = xValues[xValues.length - 1] + 17.25
  yValues[yValues.length] = yValues[yValues.length - 1]
  xValues[xValues.length] = xValues[xValues.length - 1] 
  yValues[yValues.length] = yValues[yValues.length - 1] - 5
  xValues[xValues.length] = xValues[xValues.length - 1] -7.49
  yValues[yValues.length] = yValues[yValues.length - 1] 
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 3
  xValues[xValues.length] = xValues[xValues.length - 1] + 7.49
  yValues[yValues.length] = yValues[yValues.length - 1]
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 24
  xValues[xValues.length] = xValues[xValues.length - 1] -7.49
  yValues[yValues.length] = yValues[yValues.length - 1] 
  xValues[xValues.length] = xValues[xValues.length - 1]
  yValues[yValues.length] = yValues[yValues.length - 1] - 3
  xValues[xValues.length] = xValues[xValues.length - 1] + 7.49
  yValues[yValues.length] = yValues[yValues.length - 1] 
  xValues[xValues.length] = xValues[xValues.length - 1] 
  yValues[yValues.length] = yValues[yValues.length - 1] - 5
  xValues[xValues.length] = xValues[xValues.length - 1] - 17.25
  yValues[yValues.length] = yValues[yValues.length - 1]
  verts2 = []
  for (var i = 0; i < yValues.length; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
  for (var i = 0; i<verts2.length; i++){
    if(i+1 == verts2.length){
      doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
    }
    else{
      doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
    }
  }
  doc.circle(centerX+135, centerY+14, 14)
  doc.circle(centerX+135, centerY+14, 1.5)
}
// show/hide the buttons for beam width as seen in turtle flower part generation
function buttonDisplay(){
  $("#setSmallWidth").show()
  $("#setMediumWidth").show()
  $("#setLargeWidth").show()
}
// take vertices arrays created from draw functions and create the gears from lines
function showGear(num){
  
  // determine number of which sized gears to create
  for(var k=0; k<num*2;k++){
    if(centerY > 30 && radius < 15){
      if(numOfSmallGears > 1 && numOfLargeGears>0){
        centerY = 80
      }
    }
    if(continuous==1 && flappingModule == 0){
      drawContinuousGear()
    }
    else{
      drawGear();
      // console.log(centerY)
    }
    doc.circle(centerX, centerY, (2));
    if(flappingModule == 1){
      doc.circle(centerX+((radius*0.8)*Math.cos(4.5*0.0174533)), centerY+((radius*0.8)*Math.sin(4.5*0.0174533)), (1.5));
      if(centerX<35 && motor == 1){
        nonMotorRadius = radius
      }
      else if(centerX>109 && motor == 0){
        nonMotorRadius = radius
      }
    }
    if(spurRotate){
      if(radius == rotateGear && k <2){
        doc.circle(centerX+((radius*0.8)*Math.cos(4.5*0.0174533)), centerY+((radius*0.8)*Math.sin(4.5*0.0174533)), (1.5));
      }
    }
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
    // console.log("radius = " + radius)
    centerX = centerX + ((radius*2)+(36*scale*size));
    if((centerX+radius + toothHeight)>300){
      centerX = 30;
      if(spurRotate){
        var largestRadius = Math.max(spur1Radius,spur2Radius,spur3Radius)
        var smallestRadius = Math.min(spur1Radius,spur2Radius,spur3Radius)
        centerY = centerY + ((largestRadius+smallestRadius)+(36*scale*size));
      }
      else{
        centerY = centerY + ((radius*2)+(36*scale*size));
      }
    }
  }
  if(!spurRotate){
    centerY = 30
  }
  //414.5
}
var doc = new jsPDF("landscape");
function showAll(){
  console.log("largeGears = " + numOfLargeGears)
  console.log("mediumGears = " + numOfMediumGears)
  console.log("smallGears = " + numOfSmallGears)
  if(numOfLargeGears || numOfMediumGears || numOfSmallGears){
    doc.text(275.3,208.2,pageLabelArray[0])
  }
  else{
    doc.text(275.3,208.2,pageLabelArray[1])
  }

  if(numOfLargeGears){
    // arrange()
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1.6;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale*size
    // doc.setLineWidth(0.01);
    showGear(numOfLargeGears)
    if(flappingModule == 1){
      console.log("hi")
      roundedFlapRect(flapConnectorLengthL,flapConnectorLengthR)
    }
  }
  if(numOfMediumGears){
    // arrange()
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *scale*size
    showGear(numOfMediumGears)
    if(flappingModule == 1){
      roundedFlapRect(flapConnectorLengthL, flapConnectorLengthR)
    }
  }
  if(numOfSmallGears){
    // arrange()
    radius = 48
    steps = ((0.25 * radius)*2) +2;
    toothWidthDegree = 2.8;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 48 *scale*size
    showGear(numOfSmallGears)
    if(flappingModule == 1){
      roundedFlapRect(flapConnectorLengthL, flapConnectorLengthR)
    }
  }
  if(spurRotate){
    roundedSpurRect(spurBeamLength);
  }
  if(planetaryModule){
    roundedPlanetaryRect(planetaryBraceLength, centerY + radius+toothHeight + 10)
  }
  if(numOfLinGears){
    centerX = 200*scale*size;
    centerY = 10*scale*size;
    for(var x = 0; x<(numOfLinGears*2); x++){
      if(x>0){
        centerX = centerX + (75*scale*size);
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
  if(numOfCams){
    centerX = centerX + 15
    centerY = centerY + 5
    if(camType == 0){
      drawCam()
      for (var i = 0; i<verts2.length; i++){
        if(i+1 == verts2.length){
          doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
        }
        else{
          doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
        }
      }
      doc.circle(centerX,(centerY+radius+11),5*scale)
    }
    else if (camType == 1){
      centerY = centerY + 20
      drawShell()
      for (var i = 0; i<verts2.length; i++){
        if(i+1 == verts2.length){
          doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
        }
        else{
          doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
        }
      }
      doc.circle(centerX - (9*Math.cos(0.20944)*factor),centerY + (9*Math.sin(0.20944)*factor),5*scale)
      // doc.rect(centerX,centerY,constraintLength*scale2*size,5)
    }
    camParts(15*frameScale, 100)
    doc.addPage();
    doc.text(265.3,208.2,pageLabelArray[5])
    if(camType == 0){
      doc.rect(15*frameScale, 15*frameScale, 283,15)
    }
    else{
      doc.rect(15*frameScale, 15*frameScale, 262,15)
    }
  }
  if(numOfLargeCranks){
    centerYCircle = centerYCircle + 23
    centerXCircle = centerXCircle + 10
    for(var x = 0; x<numOfLargeCranks; x++){
      doc.circle(centerXCircle,centerYCircle,132*scale2*size)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((132*scale2*size)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,132)
  }
  if(numOfMediumCranks){
    centerYCircle = centerYCircle + 7.5
    for(var x = 0; x<numOfMediumCranks; x++){
      doc.circle(centerXCircle,centerYCircle,104*scale2*size)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((104*scale2*size)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,114.4)
  }
  if(numOfSmallCranks){
    for(var x = 0; x<numOfSmallCranks; x++){
      doc.circle(centerXCircle,centerYCircle,88*scale2*size)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((88*scale2*size)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,96.8)
  }
  if(flappingModule == 1){
    flapParts()
  }
  if(constraintLength && !flappingModule && !spurModule){
    buttonDisplay()
    doc.addPage();
    doc.text(265.3,208.2,pageLabelArray[2])
    doc.addImage(imgData, 'PNG', 15, 160, 143.4375, 45);

    // console.log(constraintLength)
    for(var k = 0; k<1+mirror;k++){
      for(var i = 0; i<2;i++){
      doc.rect(xMargin*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k),constraintLength*scale2*size,linkageHeight*scale2*size)
      var increment = 0
        for(var j = 0; j<3;j++){
          console.log("working")
          increment += varArray[j]
          var segments = 8
          if(i == 0){
            if(j<2){
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line((xMargin+increment)*scale2*size,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size)+(75*k),(xMargin+increment)*scale2*size,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size)+(75*k))
              }
            }
            else{
              segments = 15
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line((xMargin+increment)*scale2*size,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size)+(75*k),(xMargin+increment)*scale2*size,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size)+(75*k))
              }
            }
            // doc.text((xMargin+increment - (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
            if(j == 0){
              doc.circle((xMargin+(horizontalSpace*(1/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (5*scale*size));
              doc.circle((xMargin+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
            }
          }
          else{
            if(j<2){
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line(((xMargin+constraintLength) - increment)*scale2*size,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size)+(75*k),((xMargin+constraintLength) - increment)*scale2*size,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size)+(75*k))
              }
            }
            else{
              segments = 15
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line(((xMargin+constraintLength) - increment)*scale2*size,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size)+(75*k),((xMargin+constraintLength) - increment)*scale2*size,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size)+(75*k))
              }
            }
            // doc.text(((xMargin+constraintLength) - increment + (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
            if(j == 0){
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(1/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (5*scale*size));
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
              doc.circle((xMargin+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
            }
          }
          
        }
      }
    }
  }

  if(flappingModule || spurFlap){
    doc.addPage();
    doc.addImage(imgData2, 'PNG', 15, 160, 70.3125, 45);
    doc.addImage(flapImageData, 'PNG', 100, 160, 137.755, 50);
    doc.text(265.3,208.2,pageLabelArray[2])
    var wingLengthL = flapBeamWidthL + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightL*flapBeamHeightL)))+flapHorizontalSpace + 10 +10 + 10 + 20
    var wingBendLengthL = (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightL*flapBeamHeightL)))
    var wingLengthR = flapBeamWidthR + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightR*flapBeamHeightR)))+flapHorizontalSpace + 10 +10 + 10 + 20
    var wingBendLengthR = (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightR*flapBeamHeightR)))
    // console.log(wingLength)
    for(var i = 0; i<1;i++){
      doc.rect(xMargin*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size),wingLengthL,linkageHeight*scale2*size)
      var segments = 8

      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
      }
    }
    for(var i = 1; i<2;i++){
      doc.rect(xMargin*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size),wingLengthR,linkageHeight*scale2*size)
      var segments = 8

      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
      }
    }
  }
  doc.addPage();
  doc.text(260.3,208.2,pageLabelArray[3])
  if(flappingModule || spurFlap){
    flapCase(gear1Spacing, gear2Spacing, beamSpace, verticalSpacing,motor)
  }
  var crankSize
  if(numOfLargeCranks){
    crankSize = 132
  }
  else if(numOfMediumCranks){
    crankSize = 114.4
  }
  else if(numOfSmallCranks){
    crankSize = 96.8
  }
  if(numOfLinGears){
    var caseLength = 180
    var caseWidth = (radius*3)+ width + toothHeight
    // console.log(linToothHeight)
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    // doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    if(mirror==0){
      // doc.rect((15*frameScale)+caseLength-46.666666667,((15)*frameScale)+((1.5*radius)-10),-40,20)
      doc.circle((15*frameScale)+caseLength-46.666666667 - 10,((15)*frameScale)+((1.5*radius)-10) + 10,5)
    }
    else{
      doc.rect((15*frameScale)+caseLength-((2*radius)-(40/3)),((15)*frameScale)+((caseWidth/2)-10),-40,20)
      doc.rect(15*frameScale,(15)*frameScale+caseWidth+5+6.42+5,147,6.42)
    }
    
    doc.rect(15*frameScale,(15)*frameScale+caseWidth+5,147,6.42)
    // doc.text(15*frameScale+5,(15)*frameScale+caseWidth+5+5,frameLabelArray[1])
    square(0)
    // doc.text((15+510.2+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[4])
    square(232.8)
    if(mirror){
      motorCaseParts(5, caseWidth + 25)
    }
    else{
      motorCaseParts(5, caseWidth + 10)
    }
    
    // doc.text((15+510.2+5)*frameScale+5,(15+232.8)*frameScale+10,frameLabelArray[5])
    // doc.circle((15+250)*frameScale, (15+112)*frameScale, (5*frameScale));
  }
  
  crankCase(crankSize)
  camCase()
  planetaryCase(180,180)
  if(spurRotate){
    spurCase(125, spurBeamLength + 165)
  }
  if(numOfLinGears){
    doc.addPage();
    doc.rect(15*frameScale,15*frameScale+35+15,177-30,35)
    // doc.text(2.5*frameScale+5,(15)*frameScale+45+10+15,frameLabelArray[2])
    
    // doc.text(2.5*frameScale+5,(15+113.4+5)*frameScale+48+10+15,frameLabelArray[3])
    doc.text(260.3,208.2,pageLabelArray[4])
    doc.rect(15*frameScale,(15)*frameScale,55,33)
    // doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[6])
    doc.rect((15+5)*frameScale + 55,(15)*frameScale,85*frameScale,33)
    // doc.text((15+5)*frameScale + 55+5,(15)*frameScale+10,frameLabelArray[8])
    doc.rect(15*frameScale,(15+5)*frameScale+33,55,7)
    // doc.text(15*frameScale+5,(15+113.4+5)*frameScale+10,frameLabelArray[7])
    doc.rect((15+5)*frameScale + 55,(15+5)*frameScale+33,85*frameScale,7)
    console.log(39.7*frameScale)
    console.log(113.4*frameScale)
    // doc.text((15+5)*frameScale + 55+5,(15+113.4+5)*frameScale+10,frameLabelArray[9])
    if(mirror == 1){
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15)*frameScale,55,33)
      // doc.text((15*frameScale)+55 + 5 +(85*frameScale)+5,(15)*frameScale+10,frameLabelArray[6])
      doc.rect((15+5)*frameScale + 55+55+ 5 +(85*frameScale),(15)*frameScale,25,33)
      // doc.text((15+5)*frameScale + 55+55+ 5 +(85*frameScale)+5,(15)*frameScale+10,frameLabelArray[8])
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15+5)*frameScale+33,55,7)
      // doc.text((15*frameScale)+55 + 5 +(85*frameScale)+5,(15+113.4+5)*frameScale+10,frameLabelArray[7])
      doc.rect((15+5)*frameScale + 55+55 + 5 +(85*frameScale),(15+5)*frameScale+33,25,7)
      // doc.text((15+5)*frameScale + 55+55 + 5 +(85*frameScale)+5,(15+113.4+5)*frameScale+10,frameLabelArray[9])
      doc.rect(15*frameScale,(15+113.4+5)*frameScale+30+15,177-30,35)
      // doc.text(2.5*frameScale+5+147+1,(15+113.4+5)*frameScale+45+10+15,frameLabelArray[3])
      doc.text(260.3,208.2,pageLabelArray[4])
      
    }
    // doc.rect((15+510.2+5)*frameScale,15*frameScale,283.5*frameScale,227.8*frameScale)
    // doc.rect((15+510.2+5)*frameScale,(15+5+227.8+5)*frameScale,283.5*frameScale,227.8*frameScale)
  }
  
}
showAll()
console.log(crankLength)
console.log(132*scale2*size)