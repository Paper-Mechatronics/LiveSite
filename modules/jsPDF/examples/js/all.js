// Define location variables
centerX = 100*scale *size;
centerY = 100*multFactor
centerXCircle = 120*scale *size;
centerYCircle = 150*multFactor;
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
    if(i>17 && i<17+20){
      xValues[i] = (centerX + (radius-5) * Math.cos(2 * Math.PI * i / steps));
      yValues[i] = (centerY + (radius-5) * Math.sin(2 * Math.PI * i / steps));
    }
    else{
      xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
      yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
    }
  }
  // add teeth
  for (var i = 0; i < (steps); i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
    if(i%2 == 0 && i<(steps*(1/3))){
      // if(i%2 == 0 && i>3 && i<(3+(steps/3))){
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
    ovalRad = 125*multFactor*1.05
    radius = 80 *multFactor*1.05
  }
  if(numOfMediumCam){
    ovalRad = 100*multFactor*1.05
    radius = 64*multFactor*1.05
  }
  if(numOfSmallCam){
    ovalRad = 75*multFactor*1.05
    radius = 48*multFactor*1.05
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
  for (var i = 0; i < 25; i++) {
    crankJoint.push({ x: xValues[i], y: yValues[i]});
  }
  // draw circle for joint part
  doc.circle(centerX - 10, centerYCircle + 70 + adjust, 3)
  // draw parts for open close anchor
  xValues = []
  yValues = []
  for (var i = 0; i < steps; i++) {
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
  console.log(xValues)
  // push to crankAnchor to array
  for (var i = 0; i < 61; i++) {
    crankAnchor.push({ x: xValues[i], y: yValues[i]});
  }

}
///////////////////////////////////////////////////////////////////////////////

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
  doc.roundedRect((15*frameScale)+20, (15*frameScale)+10-3.36, crankSize*multFactor*2, 6.72, 3.36, 3.36)
  doc.circle((15*frameScale)+8,(15*frameScale)+10,2.5)
  doc.circle((15*frameScale)+(length+8),(15*frameScale)+10,2.5)
}
// create rounded rect for flap linkage
function roundedFlapRect(length,length2){
  for(var i=0;i<2;i++){
    if(i == 0){
      doc.roundedRect((15*frameScale), centerY + (80*multFactor) + 40+(20*i), length+16, 16, 8, 8)
      doc.circle((15*frameScale)+8,centerY + (80*multFactor) + 40+8+(20*i),2.5)
      doc.circle((15*frameScale)+(length+8),centerY + (80*multFactor) + 40+8+(20*i),2.5)
    }
    else{
      doc.roundedRect((15*frameScale), centerY + (80*multFactor) + 40+(20*i), length2+16, 16, 8, 8)
      doc.circle((15*frameScale)+8,centerY + (80*multFactor) + 40+8+(20*i),2.5)
      doc.circle((15*frameScale)+(length2+8),centerY + (80*multFactor) + 40+8+(20*i),2.5)
    }
  }
}
// create rounded rect for spur module
function roundedSpurRect(length){
  centerY = 0
  for(var i=0;i<1;i++){
    doc.roundedRect((15*frameScale), centerY + 10, length+16, 16, 8, 8)
    doc.circle((15*frameScale)+8,centerY +8 + 10,2.5)
    doc.circle((15*frameScale)+8+(rotateGear*0.8),centerY +8 + 10,1.5)
    doc.circle((15*frameScale)+(length+8),centerY +8 + 10,2.5)
  }
  centerY = centerY + 10 + 16 + 10
  for(var x = 0; x<11;x++){
    if(x>1){
      doc.circle(50 + (17*(x-4)), centerY, 7.5)
      doc.circle(50 + (17*(x-4)), centerY, 1.5)
    }
    else{
      doc.circle(20 + (28*x), centerY + 22, 12.5)
      doc.circle(20 + (28*x), centerY + 22, 1.5)
    }
  }
}
// create rounded rect for planetary module
function roundedPlanetaryRect(length, yCoord){
  if(planetaryModule){
    doc.roundedRect(10,yCoord,length+20, 15, 7.5, 7.5)
    doc.circle(10 + 10,yCoord + 7.5, 2)
    doc.circle(10 + 10 + length,yCoord + 7.5, 2)
    for(var i = 0; i<2; i++){
      doc.circle(10 + 10 + length+20 + (17*i),yCoord + 7.5, 7.5)
      doc.circle(10 + 10 + length+20 + (17*i),yCoord + 7.5, 1.5)
    }

  }
}
// create case for crank
function crankCase(crankSize){
  if(numOfMediumCranks || numOfSmallCranks || numOfLargeCranks){
    frameLength = 10+crankLength-(crankSize*multFactor*0.8)-12-3+40
    doc.rect(15*frameScale,(15)*frameScale,frameLength,3*(crankSize*multFactor))
    doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(3*(crankSize*multFactor)/2)-10,-40,20)
    doc.circle((15*frameScale)+10, (15*frameScale)+(3*(crankSize*multFactor)/2), 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*multFactor*0.8)-12-3, (15*frameScale)+(3*(crankSize*multFactor)/2), 1.5);
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
    if(numOfLargeCam){
      frameWidth = 170
      frameLength = 180
    }
    else if(numOfMediumCam){
      frameWidth = 150
      frameLength = 170
    }
    else{
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
    frameLength = 10+crankLength-(crankSize*multFactor*0.8)-12-3+40
    console.log(paired)
    if(paired == 1){
      console.log("AHHHHH")
      frameLength = 10+crankLength-((crankSize*2)*multFactor*0.8)-12-3+40
    }
    doc.rect(15*frameScale,(15)*frameScale,frameLength,3*(crankSize*multFactor))
    if(mirror==0){
      doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(3*(crankSize*multFactor)/2)-10,-40,20)
    }
    else{
      doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(frameLength/2)-10,-40,20)
    }
    doc.circle((15*frameScale)+10, (15*frameScale)+(3*(crankSize*multFactor)/2), 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*multFactor*0.8)-12-3, (15*frameScale)+(3*(crankSize*multFactor)/2), 1.5);
    square(0)
    square(232.8)
  }
}
// flap case
function flapCase(gear1Space,gear2Space,beamSpace,verticalSpace,motor){
    var caseLength = 180
    doc.circle((15*frameScale) + (caseLength/2) - (beamSpace/2),20, 2)
    doc.circle((15*frameScale) + (caseLength/2) + (beamSpace/2),20, 2)
    var caseWidth = 20+verticalSpace+(80*multFactor)+10
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    if(motor ==0){
      doc.circle((15*frameScale) + (caseLength/2) - (gear1Space),20+verticalSpace, 5)
      doc.circle((15*frameScale) + (caseLength/2) + (gear2Space),20+verticalSpace, 2)
    }
    else{
      doc.circle((15*frameScale) + (caseLength/2) - (gear1Space),20+verticalSpace, 2)
      doc.circle((15*frameScale) + (caseLength/2) + (gear2Space),20+verticalSpace, 5)
    }
    square(0)
    square(232.8)
}
// case for planetary module
function planetaryCase(caseLength,caseWidth){
  if(planetaryModule){
    doc.rect(15*frameScale,(15)*frameScale,caseLength, caseWidth)
    doc.circle((15*frameScale)+(caseLength/2),(15*frameScale)+(caseWidth/2), 6)
    // doc.rect((15*frameScale) + (caseLength/2) - 10,(15*frameScale) + (caseWidth/2) - 10,20,40)
    square(0)
    square(232.8)
  }
}
// case for spur module
function spurCase(caseHeight, caseWidth){
  if(spurModule){
    doc.rect(15*frameScale,(15)*frameScale,caseWidth, caseHeight)
    doc.circle((15*frameScale)+(40),(15*frameScale)+(caseHeight/2), 6)
    doc.circle((15*frameScale)+(40)+(spur1Radius + spur2Radius)+(toothHeight*1.2),(15*frameScale)+(caseHeight/2), 2)
    doc.circle((15*frameScale)+(40)+(spur1Radius + (spur2Radius*2) + spur3Radius)+(toothHeight*2.4),(15*frameScale)+(caseHeight/2), 2)
    motorCaseParts((15*frameScale),(15)*frameScale+caseHeight )
    doc.addPage();
    doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
    square(0)
    square(232.8)

  }
}
// parts for motor frame 
function motorCaseParts(xPos, yPos){
  for(var i = 0; i<2;i++){
    doc.rect(xPos + (30*i),yPos + 10,28, 60)
    doc.rect(xPos+4 + (30*i),yPos + 20,20, 40)
    // doc.rect(xPos+30 + (50*i),yPos + 10,6, 60)
    // doc.rect(xPos+40 + (50*i),yPos + 10,6, 60)
  }
}
// misc. parts for crank module
function crankParts(){
  var spacerNum = 8
  if(constraintLength){
    spacerNum = 10
  }
  for(var x = 0; x<spacerNum;x++){
    if(x>3){
      doc.circle(15 + (20*(x-4)), centerYCircle + adjust, 7.5)
      doc.circle(15 + (20*(x-4)), centerYCircle + adjust, 1.5)
    }
    else{
      doc.circle(15 + (20*x), centerYCircle + 20 + adjust, 7.5)
      doc.circle(15 + (20*x), centerYCircle + 20 + adjust, 1.5)
    }
  }
  if(constraintLength){
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
}
// misc. parts for flapping module
function flapParts(){
  for(var x = 0; x<14;x++){
    doc.circle(20*(x+1), centerY, 7.5)
    doc.circle(20*(x+1), centerY, 1.5)
  }
  for(var x = 0; x<0;x++){
    doc.circle(20*(x+1), centerY + 15, 5)
    doc.circle(20*(x+1), centerY + 15, 1.5)
  }
  for(var x = 0; x<1;x++){
    doc.circle(40*(x+1) - 20, centerY + 40, 12.5)
    doc.circle(40*(x+1) - 20, centerY + 40, 1.5)
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
    }
    if(planetaryModule){
      console.log(planetaryGearRadius)
      console.log(radius)
      if(Math.round(radius) == Math.round(planetaryGearRadius) && k<2){
        doc.circle(centerX, centerY, (5));
      }
      else{
        doc.circle(centerX, centerY, (2));
      }
    }
    else{
      doc.circle(centerX, centerY, (2));
    }
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
    centerX = centerX + ((radius*2)+(36*multFactor));
    if((centerX+radius + toothHeight)>300){
      centerX = 30;
      if(spurRotate){
        var largestRadius = Math.max(spur1Radius,spur2Radius,spur3Radius)
        var smallestRadius = Math.min(spur1Radius,spur2Radius,spur3Radius)
        centerY = centerY + ((largestRadius+smallestRadius)+(36*multFactor));
      }
      else{
        centerY = centerY + ((radius*2)+(36*multFactor));
      }
    }
  }
  if(!spurRotate){
    centerY = 30
  }
}

////////////////////////////CREATE JS PDF DOCUMENT///////////////////////////////////
var doc = new jsPDF("landscape");
function showAll(){
///////////////////////////////////LINKAGES//////////////////////////////////////////
  // if normal linkage and not flapping module create certain cuts and fold locations
  if(constraintLength && !flappingModule && !spurModule && !walkingModule){
    // hide buttons
    buttonDisplay()
    // add instructions image to bottom of page
    doc.addImage(imgData, 'PNG', 15, 160, 143.4375, 45);
    // create linkage 
    for(var k = 0; k<1+mirror;k++){
      for(var i = 0; i<2;i++){
      doc.rect(xMargin*multFactor,((yMargin+(linkageHeightPlus*i))*multFactor)+(75*k),constraintLength*multFactor,linkageHeight*multFactor)
      var increment = 0
        for(var j = 0; j<3;j++){
          // increment through different distances and apply them to the drawing
          increment += varArray[j]
          var segments = 8
          // create valley fold and mountain fold
          if(i == 0){
            if(j<2){
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line((xMargin+increment)*multFactor,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor)+(75*k),(xMargin+increment)*multFactor,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor)+(75*k))
              }
            }
            else{
              segments = 15
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line((xMargin+increment)*multFactor,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor)+(75*k),(xMargin+increment)*multFactor,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor)+(75*k))
              }
            }
            if(j == 0){
              doc.circle((xMargin+(horizontalSpace*(1/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
              doc.circle((xMargin+(horizontalSpace*(1/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 3.5);
              doc.circle((xMargin+(horizontalSpace*(2/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
            }
          }
          else{
            if(j<2){
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line(((xMargin+constraintLength) - increment)*multFactor,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor)+(75*k),((xMargin+constraintLength) - increment)*multFactor,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor)+(75*k))
              }
            }
            else{
              segments = 15
              for(var dashed = 0;dashed<segments;dashed++){
                doc.line(((xMargin+constraintLength) - increment)*multFactor,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor)+(75*k),((xMargin+constraintLength) - increment)*multFactor,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor)+(75*k))
              }
            }
            if(j == 0){
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(1/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(1/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 3.5);
              doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
              doc.circle((xMargin+(horizontalSpace*(2/3)))*multFactor, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*multFactor)+(75*k), 1.5);
            }
          }
          
        }
      }
    }
  }
  // if flapping module then change linkages so they have different fold points
  if(flappingModule || spurFlap && !walkingModule){
    // add instuction images to bottom of page
    doc.addImage(imgData2, 'PNG', 15, 160, 70.3125, 45);
    doc.addImage(flapImageData, 'PNG', 85, 160, 137.755, 50);
    // define length parameters from simulator data
    var wingLengthL = flapBeamWidthL + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightL*flapBeamHeightL)))+flapHorizontalSpace + 10 +10 + 10 + 20
    var wingBendLengthL = (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightL*flapBeamHeightL)))
    var wingLengthR = flapBeamWidthR + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightR*flapBeamHeightR)))+flapHorizontalSpace + 10 +10 + 10 + 20
    var wingBendLengthR = (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeightR*flapBeamHeightR)))
    // draw linkage and draw valley/mountain fold
    for(var i = 0; i<1;i++){
      doc.rect(xMargin*multFactor,((yMargin+(linkageHeightPlus*i))*multFactor),wingLengthL,linkageHeight*multFactor)
      var segments = 8

      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*multFactor)+flapHorizontalSpace,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthL+flapBeamWidthL+10+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
      }
    }
    for(var i = 1; i<2;i++){
      doc.rect(xMargin*multFactor,((yMargin+(linkageHeightPlus*i))*multFactor),wingLengthR,linkageHeight*multFactor)
      var segments = 8

      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*multFactor)+flapHorizontalSpace,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        doc.line((xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),(xMargin*multFactor)+flapHorizontalSpace+wingBendLengthR+flapBeamWidthR+10+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
      }
    }
  }
  if(walkingModule){
    // if()
    doc.addImage(imgData2, 'PNG', 15, 176, 70.3125*0.75, 45*0.75);
    doc.rect(5,5, walkTop,linkageHeight*multFactor)
    doc.rect(5,5 + (linkageHeightPlus*multFactor), walkMiddle,linkageHeight*multFactor)
    doc.rect(5,5 + ((linkageHeightPlus*multFactor)*2), walkBottom,linkageHeight*multFactor)
    doc.rect(5,5 + ((linkageHeightPlus*multFactor)*3), walkLinkage,linkageHeight*multFactor)
    doc.rect(5,5 + ((linkageHeightPlus*multFactor)*4), walkLinkage,linkageHeight*multFactor)
    for(var i = 0; i<5;i++){
      var segments = 8
      for(var dashed = 0;dashed<segments;dashed++){
        if(i==0){
          doc.line(5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triWidth,(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (30*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (30*1.251),(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
        }
        if(i==3){
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251)+ ((10*1.251*1.251)/2),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251)+ ((10*1.251*1.251)/2),(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))

        }
        if(i==4){
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251)+ ((10*1.251*1.251)/2),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251)+ ((10*1.251*1.251)/2),(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight,(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251) + walkLink,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251) + walkLink,(5+((((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*multFactor))

        }
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        if(i == 0){
          doc.line(5+triHeight,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triHeight + triWidth,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (10*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (10*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (20*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5+triHeight +triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) + triHeight + (20*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        }
        if(i == 1){
          doc.line(5+triWidth,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triWidth + triSpace,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth + triSpace,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triWidth + triSpace + triWidth,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth + triSpace + triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triWidth + triSpace + triWidth + triSpace,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth + triSpace + triWidth + triSpace,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        }
        if(i == 2){
          doc.line(5+triWidth,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triWidth + triHeight,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth + triWidth,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+triWidth + triHeight+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) ,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triWidth + triWidth+Math.sqrt((triWidth*triWidth) + (triHeight*triHeight)) ,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))

        }
        if(i == 3){
          doc.line(5+ triHeight,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251) + walkLink,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251) + walkLink,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        }
        if(i == 4){
          doc.line(5+ triHeight + walkLink,(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink,(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
          doc.line(5+ triHeight + walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251),(5+(((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*multFactor),5 + triHeight +  walkLink + (10*1.251*1.251) + (10*1.251*1.251) + (10*1.251*1.251),(5+((((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*multFactor))
        }
      }
    }
  }
  // if cam draw surrounding piece of paper to go around cam 
  if(numOfCams){
    var stripLength
    if(numOfLargeCam){
      stripLength = 285
    }
    else if(numOfMediumCam){
      stripLength = 235
    }
    else if(numOfSmallCam){
      stripLength = 195
    }
    if(spurFlap || flappingModule || constraintLength){
      doc.rect(15*frameScale, 85, stripLength,15)
      doc.text(15*frameScale, 85-2, 'Length = ' + stripLength + "mm");
    }
    else{
      doc.rect(15*frameScale, 15*frameScale, stripLength,15)
      doc.text(15*frameScale, 15*frameScale-1, 'Length = ' + stripLength + "mm");
    }
  }
  // add image for paper material recomendation
  if((spurFlap || flappingModule || constraintLength || numOfCams)&& !spurRotate){
    doc.addImage(paperKey, 'PNG', 225, 167, 70.945, 45.86);
    doc.addPage();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////GEAR GENERATION PAGE/////////////////////////////////////////////////////////////

  if(numOfLargeGears || numOfMediumGears || numOfSmallGears){
    doc.addImage(matBoardKey, 'PNG', 225, 167, 70.945, 45.86);
  }
  else{
    doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
  }
  // if gears exist in the simulator then draw them with the show gear function
  if(numOfLargeGears){
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1.6;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *multFactor
    showGear(numOfLargeGears)
  }
  if(numOfMediumGears){
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *multFactor
    showGear(numOfMediumGears)
  }
  if(numOfSmallGears){
    radius = 48
    steps = ((0.25 * radius)*2) +2;
    toothWidthDegree = 2.8;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 48 *multFactor
    showGear(numOfSmallGears)
  }
  // if linear gears exist in the simulator then draw linear gear 
  if(numOfLinGears){
    centerX = 200*multFactor;
    centerY = 10*multFactor;
    for(var x = 0; x<(numOfLinGears*2); x++){
      if(x>0){
        centerX = centerX + (75*multFactor);
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
  // if cam module then draw cam shell or egg
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
    }
    // add spacers and other parts necessary for cam module
    camParts(15*frameScale, 100)
  }
  // if crank module and cranks exist in module then add crank circles and parts
  if(numOfLargeCranks){
    centerYCircle = centerYCircle + 23
    centerXCircle = centerXCircle + 10
    for(var x = 0; x<numOfLargeCranks; x++){
      doc.circle(centerXCircle,centerYCircle,132*multFactor)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((132*multFactor)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,132)
  }
  if(numOfMediumCranks){
    centerYCircle = centerYCircle + 7.5
    for(var x = 0; x<numOfMediumCranks; x++){
      doc.circle(centerXCircle,centerYCircle,104*multFactor)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((104*multFactor)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,114.4)
  }
  if(numOfSmallCranks){
    for(var x = 0; x<numOfSmallCranks; x++){
      doc.circle(centerXCircle,centerYCircle,88*multFactor)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((88*multFactor)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,96.8)
  }
  if(walkingModule){
    doc.rect(5,5,140,50)
    doc.rect(5,5, 40, 20)
    doc.rect(5,60,140,50)
    doc.rect(5,60,40,20)
    doc.rect(5,115,140,50)
    doc.circle(180, 30, 20)
    doc.circle(180, 80, 20)
  }
  ///////////////////////////////////////////////////////////////////////////////


  ///////////////////////////// DRAW CASES FOR MODULES ///////////////////////////////
  if(!walkingModule){
    doc.addPage();
  }
  
  // draw image for cardboard
  doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
  // if flapping module draw the flap case
  if(flappingModule || spurFlap){
    flapCase(gear1Spacing, gear2Spacing, beamSpace, verticalSpacing,motor)
  }
  // draw other flapping module parts on new page
  if(flappingModule || spurFlap){
    doc.addPage()
    doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
    flapParts()
    roundedFlapRect(flapConnectorLengthL,flapConnectorLengthR)

  }
  // if crank module set size of case
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
  // if rack and pinion module
  if(numOfLinGears){
    // set case dimmensions
    var caseLength = 180
    var caseWidth = (radius*3)+ width + toothHeight
    if(paired == 1){
      caseWidth = (radius*5)+ width + toothHeight
    }
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    // draw a different case if it is mirrored
    if(mirror==0){
      doc.circle((15*frameScale)+caseLength-46.666666667 - 10 - 3,((15)*frameScale)+((1.5*radius)-10) + 10,5)
    }
    else{
      if(paired){
        doc.circle((15*frameScale)+caseLength-46.666666667 - 10 - 3,((15)*frameScale)+((1.5*radius)-10) + 10,5)
      }
      else if(shared){
        doc.rect((15*frameScale)+caseLength-((2*radius)-(40/3)),((15)*frameScale)+((caseWidth/2)-10),-40,20)
      }
      
      doc.rect(15*frameScale,(15)*frameScale+caseWidth+5+6.42+5,147,6.42)
    }
    doc.rect(15*frameScale,(15)*frameScale+caseWidth+5,147,6.42)
    square(0)
    square(232.8)
    if(mirror){
      motorCaseParts(5, caseWidth + 25)
    }
    else{
      motorCaseParts(5, caseWidth + 10)
    }
    if(!mirror){
      if(numOfSmallGears){
      doc.rect(15*frameScale,caseWidth + 81,177-30,35-4)
      }
      else if(numOfMediumGears){
        doc.rect(15*frameScale,caseWidth + 81,177-30,35-2)
      }
      else{
        doc.rect(15*frameScale,caseWidth + 81,177-30,35)
      }
      doc.rect(97,caseWidth+20,55,33)
      doc.rect(97 + 55 + 3,caseWidth+20,85*frameScale,33)
      doc.rect(97,caseWidth+20+33+3,55,7)
      doc.rect(97 + 55 + 3,caseWidth+20+33+3,85*frameScale,7)
    }
    
    
  }
  // draw crank case if crank module
  crankCase(crankSize)
  // draw cam case if cam module
  camCase()
  // draw planetary case if planetary module
  planetaryCase(180,180)
  // add planetary parts if planetary module
  if(planetaryModule){
    roundedPlanetaryRect(planetaryBraceLength, 180 + 10)
    doc.addPage()
    doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
    motorCaseParts(5,0)
  }
  // add spur parts if spur rotate module
  if(spurRotate){
    spurCase(125, spurBeamLength + 165)
    roundedSpurRect(spurBeamLength)
  }
  // if rack and pinion module add parts for the case and module
  if(numOfLinGears){
    if(mirror == 1){
      doc.addPage();
      doc.addImage(cardBoardKey, 'PNG', 225, 167, 70.945, 45.86);
      if(numOfSmallGears){
        doc.rect(15*frameScale,15*frameScale+35+15,177-30,35-4)
        doc.rect(15*frameScale,(15+113.4+5)*frameScale+30+15,177-30,35-4)
      }
      else if(numOfMediumGears){
        doc.rect(15*frameScale,15*frameScale+35+15,177-30,35-2)
        doc.rect(15*frameScale,(15+113.4+5)*frameScale+30+15,177-30,35-2)
      }
      else{
        doc.rect(15*frameScale,15*frameScale+35+15,177-30,35)
        doc.rect(15*frameScale,(15+113.4+5)*frameScale+30+15,177-30,35)
      }
      doc.rect(15*frameScale,(15)*frameScale,55,33)
      doc.rect((15+5)*frameScale + 55,(15)*frameScale,85*frameScale,33)
      doc.rect(15*frameScale,(15+5)*frameScale+33,55,7)
      doc.rect((15+5)*frameScale + 55,(15+5)*frameScale+33,85*frameScale,7)
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15)*frameScale,55,33)
      doc.rect((15+5)*frameScale + 55+55+ 5 +(85*frameScale),(15)*frameScale,25,33)
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15+5)*frameScale+33,55,7)
      doc.rect((15+5)*frameScale + 55+55 + 5 +(85*frameScale),(15+5)*frameScale+33,25,7)
    }
  }
}
showAll()
