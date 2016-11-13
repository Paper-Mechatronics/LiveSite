centerX = 100*scale *size;
centerY = 100*scale*size
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
  var ovalRad = 0
  if(numOfLargeCam){
    ovalRad = 125*scale2*size
    radius = 80 *scale2*size
  }
  if(numOfMediumCam){
    ovalRad = 100*scale2*size
    radius = 64*scale2*size
  }
  if(numOfSmallCam){
    ovalRad = 75*scale2*size
    radius = 48*scale2*size
  }
  verts2 = []
  for (var i = 0; i < (steps/2)+1; i++) {
    xValues[i] = (centerX + (radius*1.3) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((centerY+radius+5) + (radius*1.3) * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = (steps/2)+1; i < steps; i++) {
    xValues[i] = (centerX + (radius*1.3) * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = ((centerY+radius+5) + (radius+ovalRad) * Math.sin(2 * Math.PI * i / steps));
  }
  for (var i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i]});
  }
}

function arrange(){
  if(centerY > 310){
    // centerY = 100*scale*size
    // centerX = centerX + (200*scale*size)
  }
}
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
function roundedRect(length,crankSize){
  doc.roundedRect((15*frameScale), 15*frameScale, length+16, 20, 10, 10)
  doc.roundedRect((15*frameScale)+20, (15*frameScale)+10-3.36, crankSize*scale2*size*2, 6.72, 3.36, 3.36)
  doc.circle((15*frameScale)+8,(15*frameScale)+10,2.5)
  doc.circle((15*frameScale)+(length+8),(15*frameScale)+10,2.5)
}
function roundedFlapRect(length,length2){
  for(var i=0;i<2;i++){
    doc.roundedRect((15*frameScale), centerY + (80*scale*size) + 40+(20*i), length+16, 16, 8, 8)
    doc.roundedRect((15*frameScale)+16, centerY + (80*scale*size) + 40+(20*i)+4, radius*2, 8, 4, 4)
    doc.circle((15*frameScale)+8,centerY + (80*scale*size) + 40+8+(20*i),2.5)
    doc.circle((15*frameScale)+(length+8),centerY + (80*scale*size) + 40+8+(20*i),2.5)
  }
}
function crankCase(crankSize){
  if(numOfMediumCranks || numOfSmallCranks || numOfLargeCranks){
    frameLength = 10+crankLength-(crankSize*scale2*size*0.8)-12-3+40
    doc.rect(15*frameScale,(15)*frameScale,frameLength,3*(crankSize*scale2*size))
    doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(3*(crankSize*scale2*size)/2)-10,-40,20)
    doc.circle((15*frameScale)+10, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    // doc.circle((15*frameScale)+10, (15*frameScale)+60, 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*scale2*size*0.8)-12-3, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    square(0)
    square(232.8)
  }
}
function camCase(crankSize){
  if(numOfCams){
    frameLength = 150
    doc.rect(15*frameScale,(15)*frameScale,frameLength,5*(crankSize*scale2*size))
    doc.rect((15*frameScale)+frameLength-30,(15*frameScale)+(5*(crankSize*scale2*size)/2)-10,-40,20)
    doc.circle((15*frameScale)+10, (15*frameScale)+(5*(crankSize*scale2*size)/2), 1.5);
    // doc.circle((15*frameScale)+10, (15*frameScale)+60, 1.5);
    doc.circle((15*frameScale)+10+crankLength-(crankSize*scale2*size*0.8)-12-3, (15*frameScale)+(3*(crankSize*scale2*size)/2), 1.5);
    square(0)
    square(232.8)
  }
}
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
function flapCase(gear1Space,gear2Space,beamSpace,verticalSpace,motor){
    var caseLength = 180
    doc.circle((15*frameScale) + (caseLength/2) - (gear1Space),20+verticalSpace, 2)
    doc.circle((15*frameScale) + (caseLength/2) + (gear2Space),20+verticalSpace, 2)
    doc.circle((15*frameScale) + (caseLength/2) - (beamSpace/2),20, 2)
    doc.circle((15*frameScale) + (caseLength) - (beamSpace/2),20, 2)
    doc.circle((15*frameScale) + (caseLength/2) + (beamSpace/2),20, 2)
    doc.circle((15*frameScale) + (beamSpace/2),20, 2)
    var caseWidth = 20+verticalSpace+(80*scale*size)+10
    // console.log(linToothHeight)
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    if(motor ==0){
      doc.rect((15*frameScale) + (caseLength/2) - (gear1Space)-30,20+verticalSpace-10,40,20)
    }
    else{
      doc.rect((15*frameScale) + (caseLength/2) + (gear2Space)-10,20+verticalSpace-10,40,20)
    }
    square(0)
    doc.text((15+510.2+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[4])
    square(232.8)
    doc.text((15+510.2+5)*frameScale+5,(15+232.8)*frameScale+10,frameLabelArray[5])
}
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
}
function flapParts(){
  for(var x = 0; x<12;x++){
    doc.circle(20*(x+1), centerY + (80*scale*size) + 15, 7.5)
    doc.circle(20*(x+1), centerY + (80*scale*size) + 15, 1.5)
  }
  for(var x = 0; x<4;x++){
    doc.circle(20*(x+1), centerY + (80*scale*size) + 30, 5)
    doc.circle(20*(x+1), centerY + (80*scale*size) + 30, 1.5)
  }
}
function buttonDisplay(){
  $("#setSmallWidth").show()
  $("#setMediumWidth").show()
  $("#setLargeWidth").show()
}
function showGear(){
  var numOfGears;
  if(numOfLargeGears){
    numOfGears = numOfLargeGears
  }
  if(numOfMediumGears){
    numOfGears = numOfMediumGears
  }
  if(numOfSmallGears){
    numOfGears = numOfSmallGears
  }
  for(var k=0; k<numOfGears*2;k++){
    if(continuous==1 && flappingModule == 0){
      drawContinuousGear()
    }
    else{
      drawGear();
      // console.log(centerY)
    }
    doc.circle(centerX, centerY, (2));
    if(flappingModule == 1){
      doc.circle(centerX+(radius*0.8), centerY, (1.5));
    }
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
    console.log(centerX + " " + k)
    centerX = centerX + ((radius*2)+(36*scale*size));
    console.log(centerX + " " + k)
  }
  if(flappingModule == 1){
    roundedFlapRect(flapConnectorLength)
  }
  //414.5
}
var doc = new jsPDF("landscape");
function showAll(){
  console.log(numOfMediumCranks)
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
    toothWidthDegree = 1;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale*size
    // doc.setLineWidth(0.01);
    showGear()
  }
  if(numOfMediumGears){
    arrange()
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *scale*size
    showGear()
  }
  if(numOfSmallGears){
    arrange()
    radius = 48
    steps = (0.25 * radius)*2;
    toothWidthDegree = 3;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 48 *scale*size
    showGear()
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
    drawCam()
    // console.log(constraintLength)
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
    doc.circle(centerX,(centerY+radius+5),5*scale)
    // doc.rect(centerX,centerY,constraintLength*scale2*size,5)
  }
  if(numOfLargeCranks){
    centerYCircle = centerYCircle + 15
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
  if(constraintLength && !flappingModule){
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
            doc.text((xMargin+increment - (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
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
            doc.text(((xMargin+constraintLength) - increment + (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
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
  if(flappingModule){
    doc.addPage();
    doc.addImage(imgData2, 'PNG', 15, 160, 70.3125, 45);
    doc.text(265.3,208.2,pageLabelArray[2])
    var wingLength = flapBeamWidth + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeight*flapBeamHeight)))+flapHorizontalSpace + 10 +10 + 10 + 20
    var wingBendLength = (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeight*flapBeamHeight)))
    // console.log(wingLength)
    for(var i = 0; i<2;i++){
      doc.rect(xMargin*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size),wingLength,linkageHeight*scale2*size)
      var segments = 8
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLength,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLength,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-5))+(linkageHeightPlus*i))*scale2*size))
      }
      segments = 15
      for(var dashed = 0;dashed<segments;dashed++){
        doc.line((xMargin*scale2*size)+flapHorizontalSpace,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
        doc.line((xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10+10+10,((yMargin+((linkageHeight/segments)*(dashed))+(linkageHeightPlus*i))*scale2*size),(xMargin*scale2*size)+flapHorizontalSpace+wingBendLength+flapBeamWidth+10+10+10,(((yMargin+((linkageHeight/segments)*(dashed+1)-3))+(linkageHeightPlus*i))*scale2*size))
      }

      // doc.line((xMargin+flapConnectorLength+flapBeamWidth)*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size),(xMargin+flapConnectorLength+flapBeamWidth)*scale2*size,(((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size))
      // doc.line((xMargin+flapConnectorLength+flapBeamWidth + (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeight*flapBeamHeight))))*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size),(xMargin+flapConnectorLength+flapBeamWidth+ (Math.sqrt((flapBeamOffset*flapBeamOffset)+(flapBeamHeight*flapBeamHeight))))*scale2*size,(((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size))

      // for(var j = 0; j<3;j++){
      //   increment += varArray[j]
      //   if(i == 0){
      //     doc.line((xMargin+increment)*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k),(xMargin+increment)*scale2*size,(((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size)+(75*k))
      //     doc.text((xMargin+increment - (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
      //     if(j == 0){
      //       doc.circle((xMargin+(horizontalSpace*(1/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (5*scale*size));
      //       doc.circle((xMargin+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
      //     }
      //   }
      //   else{
      //     doc.line(((xMargin+constraintLength) - increment)*scale2*size,((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k),((xMargin+constraintLength) - increment)*scale2*size,(((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size)+(75*k))
      //     doc.text(((xMargin+constraintLength) - increment + (varArray[j]/2))*scale2*size, ((yMargin+(linkageHeightPlus*i))*scale2*size)+(75*k), labelArray[j]);
      //     if(j == 0){
      //       doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(1/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (5*scale*size));
      //       doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*scale2*size, (((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size)+(75*k), (3*scale*size));
      //     }
      //   } 
      // }
    }
  }
  doc.addPage();
  doc.text(260.3,208.2,pageLabelArray[3])
  if(flappingModule == 1){
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
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    if(mirror==0){
      doc.rect((15*frameScale)+caseLength-46.666666667,((15)*frameScale)+((1.5*radius)-10),-40,20)
    }
    else{
      doc.rect((15*frameScale)+caseLength-((2*radius)-(40/3)),((15)*frameScale)+((caseWidth/2)-10),-40,20)
      doc.rect(15*frameScale,(15)*frameScale+caseWidth+5+6.42+5,147,6.42)
    }
    
    doc.rect(15*frameScale,(15)*frameScale+caseWidth+5,147,6.42)
    doc.text(15*frameScale+5,(15)*frameScale+caseWidth+5+5,frameLabelArray[1])
    square(0)
    doc.text((15+510.2+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[4])
    square(232.8)
    doc.text((15+510.2+5)*frameScale+5,(15+232.8)*frameScale+10,frameLabelArray[5])
    // doc.circle((15+250)*frameScale, (15+112)*frameScale, (5*frameScale));
  }
  
  crankCase(crankSize)
  camCase(radius/(scale2*size))
  if(numOfLinGears){
    doc.addPage();
    doc.rect(2.5*frameScale,15*frameScale+45+15,177-30,43)
    doc.text(2.5*frameScale+5,(15)*frameScale+45+10+15,frameLabelArray[2])
    doc.rect(2.5*frameScale,(15+113.4+5)*frameScale+48+15,177-30,43)
    doc.text(2.5*frameScale+5,(15+113.4+5)*frameScale+48+10+15,frameLabelArray[3])
    doc.text(260.3,208.2,pageLabelArray[4])
    doc.rect(15*frameScale,(15)*frameScale,55,113.4*frameScale)
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[6])
    doc.rect((15+5)*frameScale + 55,(15)*frameScale,85*frameScale,113.4*frameScale)
    doc.text((15+5)*frameScale + 55+5,(15)*frameScale+10,frameLabelArray[8])
    doc.rect(15*frameScale,(15+113.4+5)*frameScale,55,39.7*frameScale)
    doc.text(15*frameScale+5,(15+113.4+5)*frameScale+10,frameLabelArray[7])
    doc.rect((15+5)*frameScale + 55,(15+113.4+5)*frameScale,85*frameScale,39.7*frameScale)
    doc.text((15+5)*frameScale + 55+5,(15+113.4+5)*frameScale+10,frameLabelArray[9])
    if(mirror == 1){
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15)*frameScale,55,113.4*frameScale)
      doc.text((15*frameScale)+55 + 5 +(85*frameScale)+5,(15)*frameScale+10,frameLabelArray[6])
      doc.rect((15+5)*frameScale + 55+55+ 5 +(85*frameScale),(15)*frameScale,25,113.4*frameScale)
      doc.text((15+5)*frameScale + 55+55+ 5 +(85*frameScale)+5,(15)*frameScale+10,frameLabelArray[8])
      doc.rect((15*frameScale)+55 + 5 +(85*frameScale),(15+113.4+5)*frameScale,55,39.7*frameScale)
      doc.text((15*frameScale)+55 + 5 +(85*frameScale)+5,(15+113.4+5)*frameScale+10,frameLabelArray[7])
      doc.rect((15+5)*frameScale + 55+55 + 5 +(85*frameScale),(15+113.4+5)*frameScale,25,39.7*frameScale)
      doc.text((15+5)*frameScale + 55+55 + 5 +(85*frameScale)+5,(15+113.4+5)*frameScale+10,frameLabelArray[9])

      doc.rect(2.5*frameScale+147+1,15*frameScale+45+15,147,43)
      doc.text(2.5*frameScale+5+147+1,(15)*frameScale+45+10+15,frameLabelArray[2])
      doc.rect(2.5*frameScale+147+1,(15+113.4+5)*frameScale+48+15,147,43)
      doc.text(2.5*frameScale+5+147+1,(15+113.4+5)*frameScale+45+10+15,frameLabelArray[3])
      doc.text(260.3,208.2,pageLabelArray[4])
      
    }
    // doc.rect((15+510.2+5)*frameScale,15*frameScale,283.5*frameScale,227.8*frameScale)
    // doc.rect((15+510.2+5)*frameScale,(15+5+227.8+5)*frameScale,283.5*frameScale,227.8*frameScale)
  }
  
}
showAll()
console.log(crankLength)
console.log(132*scale2*size)