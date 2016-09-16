var xValues = [];
var yValues = [];
var scale = 0.5
var scale2 = 0.3
var steps = 40;
var linSteps = 30;
var centerX = 100*scale;
var centerY = 100*scale;
var radius = 80*scale;
var verts2 = [];
var linGearVerts = [];
var conversionFactor = (360/(2*Math.PI));
var gearGroup;
var toothHeight = .25*64*scale;
var toothWidthDegree = 2*scale;
var toothWidth = (toothWidthDegree/conversionFactor);
var numOfLargeGears = parseInt(localStorage.getItem("largeGears"));
var numOfMediumGears = parseInt(localStorage.getItem("mediumGears"));
var numOfSmallGears = parseInt(localStorage.getItem("smallGears"))
var numOfLinGears = parseInt(localStorage.getItem("linGears"))
var width = 40 *scale
var height = 400*scale
var offset1 = 2 *scale
var offset2 = 11.33332 * scale
var linToothHeight = .25*64*scale;

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
    centerY = 100*scale
    centerX = centerX + (200*scale)
  }
}


  var doc = new jsPDF();

  for(var x = 0; x<numOfLargeGears; x++){
    arrange()
    radius = 80
    steps = (0.25 * radius)*2;
    toothWidthDegree = 1;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 80 *scale
    drawGear();
    doc.circle(centerX, centerY, (10*scale));
    centerY = centerY + (196*scale);
    for (var i = 0; i<verts2.length; i++){
      if(i+1 == verts2.length){
        doc.line(verts2[i].x, verts2[i].y, verts2[0].x, verts2[0].y); // horizontal line
      }
      else{
        doc.line(verts2[i].x, verts2[i].y, verts2[i+1].x, verts2[i+1].y);
      }
    }
  }
  //centerX = centerX + (200*scale);
  //centerY = 100*scale
  for(var x = 0; x<numOfMediumGears; x++){
    arrange()
    radius = 64
    steps = (0.25 * radius)*2;
    toothWidthDegree = 2;
    toothWidth = (toothWidthDegree/conversionFactor);
    radius = 64 *scale
    drawGear();
    doc.circle(centerX, centerY, (10*scale));
    centerY = centerY + (168*scale);
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
    radius = 48 *scale
    drawGear();
    doc.circle(centerX, centerY, (10*scale));
    centerY = centerY + (136*scale);
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
    centerX = 10*scale;
    centerY = 10*scale;
    for(var x = 0; x<numOfLinGears; x++){
      if(x>0){
        centerX = centerX + (60*scale);
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
  doc.rect(35*scale2,30*scale2,70*scale2,800*scale2)
  doc.rect(123*scale2,30*scale2,70*scale2,520*scale2)
  doc.rect(211*scale2,30*scale2,70*scale2,800*scale2)
  doc.rect(299*scale2,30*scale2,70*scale2,520*scale2)