
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
  console.log(length)
  // if(length<123.47){
  //   doc.roundedRect(125+8-3.36, (15*frameScale)+16, 6.72, length-16-16, 3.36, 3.36)
  // }
  // else{
  //   doc.roundedRect(125+8-3.36, (15*frameScale)+16, 6.72, 80, 3.36, 3.36)
  // }
  // doc.roundedRect(125, (15*frameScale), 20, length+16, 10, 10)
  // doc.roundedRect(125+10-3.36, (15*frameScale)+20, 6.72, 132*scale2*size*2, 3.36, 3.36)
  // doc.circle(125+10,(15*frameScale)+8,2.5)
  // doc.circle(125+10,(15*frameScale)+(length+8),2.5)
  doc.roundedRect((15*frameScale), 175, length+16, 20, 10, 10)
  doc.roundedRect((15*frameScale)+20, 175+10-3.36, crankSize*scale2*size*2, 6.72, 3.36, 3.36)
  doc.circle((15*frameScale)+8,175+10,2.5)
  doc.circle((15*frameScale)+(length+8),175+10,2.5)
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
function RPCase(crankSize){
  if(numOfLinGears){
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
function crankParts(){
  for(var x = 0; x<8;x++){
    if(x>3){
      doc.circle(25 + (20*(x-4)), 150, 6)
      doc.circle(25 + (20*(x-4)), 150, 1.5)
    }
    else{
      doc.circle(25 + (20*x), 130, 6)
      doc.circle(25 + (20*x), 130, 1.5)
    }
  }
}
function buttonDisplay(){
  $("#setSmallWidth").show()
  $("#setMediumWidth").show()
  $("#setLargeWidth").show()
}
function showGear(){
  if(continuous==1){
    drawContinuousGear()
  }
  else{
    drawGear();
    console.log(centerY)
  }
  doc.circle(centerX, centerY, (2));
  centerX = centerX + (196*scale*size);
  for (var i = 0; i<verts2.length; i++){
    if(i+1 == verts2.length){
      doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
    }
    else{
      doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
    }
  }
  if(continuous==1){
    drawContinuousGear()
  }
  else{
    drawGear();
    console.log(centerY)
  }
  doc.circle(centerX, centerY, (2));
  for (var i = 0; i<verts2.length; i++){
    if(i+1 == verts2.length){
      doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
    }
    else{
      doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
    }
  }
}
var doc = new jsPDF("landscape");
function showAll(){
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
    showGear()
  }
  for(var x = 0; x<numOfMediumGears; x++){
    arrange()
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *scale*size
    showGear()
  }
  for(var x = 0; x<numOfSmallGears; x++){
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
      doc.circle(centerXCircle,centerYCircle,132*scale2*size)
    }
    doc.circle(centerXCircle,centerYCircle,5*scale)
    doc.circle(centerXCircle+((132*scale2*size)*0.8),centerYCircle,3*scale)
    crankParts()
    roundedRect(crankLength,132)
  }
  if(numOfMediumCranks){
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
  if(constraintLength){
    buttonDisplay()
    doc.addPage();
    doc.text(265.3,208.2,pageLabelArray[2])
    // console.log(constraintLength)
    for(var i = 0; i<2;i++){
    // doc.rect((35+(40*i))*scale2*size,30*scale2*size,30*scale2*size,constraintLength*scale2*size)
    doc.rect(xMargin*scale2*size,(yMargin+(linkageHeightPlus*i))*scale2*size,constraintLength*scale2*size,linkageHeight*scale2*size)
    var increment = 0
      for(var j = 0; j<3;j++){
        increment += varArray[j]
        // console.log(increment)
        // doc.line((yMargin+(40*i))*scale2*size,(xMargin+increment)*scale2*size,(65+(40*i))*scale2*size,(xMargin+increment)*scale2*size)
        if(i == 0){
          doc.line((xMargin+increment)*scale2*size,(yMargin+(linkageHeightPlus*i))*scale2*size,(xMargin+increment)*scale2*size,((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size)
          doc.text((xMargin+increment - (varArray[j]/2))*scale2*size, (yMargin+(linkageHeightPlus*i))*scale2*size, labelArray[j]);
          // doc.text(20, 20, 'Hello world!');
          // doc.text(20, 20, 'Hello world!');
          if(j == 0){
            doc.circle((xMargin+(horizontalSpace*(1/3)))*scale2*size, ((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (5*scale*size));
            doc.circle((xMargin+(horizontalSpace*(2/3)))*scale2*size, ((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (3*scale*size));
          }
        }
        else{
          doc.line(((xMargin+constraintLength) - increment)*scale2*size,(yMargin+(linkageHeightPlus*i))*scale2*size,((xMargin+constraintLength) - increment)*scale2*size,((yMargin+linkageHeight)+(linkageHeightPlus*i))*scale2*size)
          doc.text(((xMargin+constraintLength) - increment + (varArray[j]/2))*scale2*size, (yMargin+(linkageHeightPlus*i))*scale2*size, labelArray[j]);
          if(j == 0){
            doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(1/3)))*scale2*size, ((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (5*scale*size));
            doc.circle(((xMargin+constraintLength) - increment+(horizontalSpace*(2/3)))*scale2*size, ((yMargin+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (3*scale*size));
          }
        }
        
      }
    }
  }
  doc.addPage();
  doc.text(260.3,208.2,pageLabelArray[3])
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
    var caseWidth = 100
    doc.rect(15*frameScale,(15)*frameScale,caseLength,caseWidth)
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    doc.rect((15*frameScale)+caseLength-(caseLength*0.2467),(caseWidth*0.2635),-40,20)
    doc.rect(15*frameScale,(15+5)*frameScale+100,180,6.42)
    doc.text(15*frameScale+5,(15)*frameScale+100+7,frameLabelArray[1])
    doc.rect(15*frameScale,15*frameScale+110,510.2*frameScale,113.4*frameScale)
    doc.text(15*frameScale+5,(15)*frameScale+110+10,frameLabelArray[2])
    doc.rect(15*frameScale,(15+113.4+5)*frameScale+110,510.2*frameScale,113.4*frameScale)
    doc.text(15*frameScale+5,(15+113.4+5)*frameScale+110+10,frameLabelArray[3])
    square(0)
    doc.text((15+510.2+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[4])
    square(232.8)
    doc.text((15+510.2+5)*frameScale+5,(15+232.8)*frameScale+10,frameLabelArray[5])
    // doc.circle((15+250)*frameScale, (15+112)*frameScale, (5*frameScale));
  }
  
  crankCase(crankSize)
  if(numOfLinGears){
    doc.addPage();
    doc.text(260.3,208.2,pageLabelArray[4])
    doc.rect(15*frameScale,(15)*frameScale,269.3*frameScale,113.4*frameScale)
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[6])
    doc.rect((15+269.3+5)*frameScale,(15)*frameScale,85*frameScale,113.4*frameScale)
    doc.text((15+269.3+5)*frameScale+5,(15)*frameScale+10,frameLabelArray[8])
    doc.rect(15*frameScale,(15+113.4+5)*frameScale,269.3*frameScale,39.7*frameScale)
    doc.text(15*frameScale+5,(15+113.4+5)*frameScale+10,frameLabelArray[7])
    doc.rect((15+269.3+5)*frameScale,(15+113.4+5)*frameScale,85*frameScale,39.7*frameScale)
    doc.text((15+269.3+5)*frameScale+5,(15+113.4+5)*frameScale+10,frameLabelArray[9])
    // doc.rect((15+510.2+5)*frameScale,15*frameScale,283.5*frameScale,227.8*frameScale)
    // doc.rect((15+510.2+5)*frameScale,(15+5+227.8+5)*frameScale,283.5*frameScale,227.8*frameScale)
  }
  
}
showAll()
console.log(crankLength)
console.log(132*scale2*size)