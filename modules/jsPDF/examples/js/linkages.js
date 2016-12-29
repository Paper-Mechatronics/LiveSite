
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
function showLinkages(){
  // console.log(numOfMediumCranks)
  if(constraintLength){
    buttonDisplay()
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
}
showLinkages()