var xValues = [];
var yValues = [];
var scale = 0.5
var scale2 = 0.4
var size = 0.75
var steps = 40;
var linSteps = 29;
var centerX = 100*scale *size;
var centerY = 100*scale*size;
var radius = 80*scale*size;
var verts2 = [];
var linGearVerts = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = .25*64*scale*size;
var toothWidthDegree = 2*scale*size;
var toothWidth = (toothWidthDegree/conversionFactor);
var numOfLargeGears = parseInt(localStorage.getItem("largeGears"));
var numOfMediumGears = parseInt(localStorage.getItem("mediumGears"));
var numOfSmallGears = parseInt(localStorage.getItem("smallGears"))
var numOfLinGears = parseInt(localStorage.getItem("linGears"))
var constraintLength = parseInt(localStorage.getItem("constraintLength"))
var connectorLength = parseInt(localStorage.getItem("connectorLength"))
var beamLength = parseInt(localStorage.getItem("beamLength"))
var horizontalSpace = parseInt(localStorage.getItem("horizontalSpace"))
var width = 40 *scale
var height = 400*scale*size
var offset1 = 2 *scale*size
var offset2 = 11.33332 * scale*size
var linToothHeight = .25*64*scale*size;
var varArray = []
varArray.push(horizontalSpace)
varArray.push(connectorLength)
varArray.push(beamLength)
varArray.push(horizontalSpace)
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

var doc = new jsPDF("landscape");
function showAll(){
  for(var x = 0; x<numOfLargeGears; x++){
    arrange()
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale*size
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    doc.addPage();
    centerX = 10*scale*size;
    centerY = 10*scale*size;
    for(var x = 0; x<numOfLinGears; x++){
      if(x>0){
        centerX = centerX + (60*scale*size);
      }
      drawLinGear();
      for (var i = 0; i<linGearVerts.length; i++){
        if(i+1 == linGearVerts.length){
          doc.line(linGearVerts[i].x, linGearVerts[i].y, linGearVerts[0].x, linGearVerts[0].y); // horizontal line
        }
        else{
          doc.line(linGearVerts[i].x, linGearVerts[i].y, linGearVerts[i+1].x, linGearVerts[i+1].y);
        }
      }
    }
  }
  doc.addPage();
  for(var i = 0; i<2;i++){
    // doc.rect((35+(40*i))*scale2*size,30*scale2*size,30*scale2*size,constraintLength*scale2*size)
    doc.rect(30*scale2*size,(35+(40*i))*scale2*size,constraintLength*scale2*size,30*scale2*size)
    var increment = 0
    for(var j = 0; j<4;j++){
      increment += varArray[j]
      console.log(increment)
      // doc.line((35+(40*i))*scale2*size,(30+increment)*scale2*size,(65+(40*i))*scale2*size,(30+increment)*scale2*size)
      doc.line((30+increment)*scale2*size,(35+(40*i))*scale2*size,(30+increment)*scale2*size,(65+(40*i))*scale2*size)
    }
  }
  doc.addPage();
  doc.rect(30*scale*size,30*scale*size,448*scale*size,112*scale*size)
  doc.rect(30*scale*size,(30+112+5)*scale*size,448*scale*size,15*scale*size)
  doc.rect(30*scale*size,(30+112+5+15+5)*scale*size,448*scale*size,15*scale*size)
  doc.rect(30*scale*size,(30+112+5+15+5+15+5)*scale*size,168*scale*size,112*scale*size)
  doc.rect((30+168+5)*scale*size,(30+112+5+15+5+15+5)*scale*size,168*scale*size,15*scale*size)
  doc.rect((30+168+5)*scale*size,(30+112+5+15+5+15+5+15+5)*scale*size,168*scale*size,15*scale*size)
  doc.addPage();
  doc.rect(30*scale*size,(30)*scale*size,448*scale*size,300*scale*size)
  doc.rect((30+217)*scale*size,(30+84)*scale*size,115*scale*size,55*scale*size)
  doc.circle((30+250)*scale*size, (30+112)*scale*size, (5*scale*size));
}
function showGears(){
  for(var x = 0; x<numOfLargeGears; x++){
    arrange()
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale*size
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    drawGear();
    doc.circle(centerX, centerY, (10*scale*size*0.4));
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
    doc.addPage();
    centerX = 10*scale*size;
    centerY = 10*scale*size;
    for(var x = 0; x<numOfLinGears; x++){
      if(x>0){
        centerX = centerX + (60*scale*size);
      }
      drawLinGear();
      for (var i = 0; i<linGearVerts.length; i++){
        if(i+1 == linGearVerts.length){
          doc.line(linGearVerts[i].x, linGearVerts[i].y, linGearVerts[0].x, linGearVerts[0].y); // horizontal line
        }
        else{
          doc.line(linGearVerts[i].x, linGearVerts[i].y, linGearVerts[i+1].x, linGearVerts[i+1].y);
        }
      }
    }
  }
}
function showLinkages(){
  for(var i = 0; i<2;i++){
    // doc.rect((35+(40*i))*scale2*size,30*scale2*size,30*scale2*size,constraintLength*scale2*size)
    doc.rect(30*scale2*size,(35+(40*i))*scale2*size,constraintLength*scale2*size,30*scale2*size)
    var increment = 0
    for(var j = 0; j<4;j++){
      increment += varArray[j]
      console.log(increment)
      // doc.line((35+(40*i))*scale2*size,(30+increment)*scale2*size,(65+(40*i))*scale2*size,(30+increment)*scale2*size)
      doc.line((30+increment)*scale2*size,(35+(40*i))*scale2*size,(30+increment)*scale2*size,(65+(40*i))*scale2*size)
    }
  }
} 

showAll()