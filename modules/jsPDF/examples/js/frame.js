
// numOfLargeGears = 0
// numOfMediumGears = 0
// numOfSmallGears = 0
// numOfLinGears = 0


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
    centerY = 100*scale*size
    centerX = centerX + (200*scale*size)
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
function roundedRect(){
  doc.roundedRect(125, (15*frameScale), 22.5, 192.1, 11, 11)
  doc.roundedRect(125+11.25-3.36, (15*frameScale)+22.14, 6.72, 80, 3.36, 3.36)
  doc.circle(125+11.25,(15*frameScale)+11.28,3 )
  doc.circle(125+11.25,(15*frameScale)+181,3 )
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
function showFrame(){
  // console.log(numOfMediumCranks)
  doc.text(260.3,208.2,pageLabelArray[3])
  if(numOfLinGears){
    doc.rect(15*frameScale,(15)*frameScale,510.2*frameScale,283.4646*frameScale)
    doc.text(15*frameScale+5,(15)*frameScale+10,frameLabelArray[0])
    doc.rect((15*frameScale)+95.21,(15*frameScale)+26.35,113.4*frameScale,56.69292*frameScale)
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
  if(numOfMediumCranks || numOfSmallCranks || numOfLargeCranks){
    doc.rect(15*frameScale,(15)*frameScale,180,120)
    doc.rect((15*frameScale)+110.31,(15*frameScale)+50,40,20)
    doc.circle((15*frameScale) + 16.63, (15*frameScale)+60, 1.5);
    square(0)
    square(232.8)
  }
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
showFrame()
