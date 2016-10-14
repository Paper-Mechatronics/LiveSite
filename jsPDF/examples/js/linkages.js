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
for(var i = 0; i<2;i++){
// doc.rect((35+(40*i))*scale2*size,30*scale2*size,30*scale2*size,constraintLength*scale2*size)
doc.rect(30*scale2*size,(35+(linkageHeightPlus*i))*scale2*size,constraintLength*scale2*size,linkageHeight*scale2*size)
var increment = 0
  for(var j = 0; j<3;j++){
    increment += varArray[j]
    console.log(increment)
    // doc.line((35+(40*i))*scale2*size,(30+increment)*scale2*size,(65+(40*i))*scale2*size,(30+increment)*scale2*size)
    if(i == 0){
        doc.line((30+increment)*scale2*size,(35+(linkageHeightPlus*i))*scale2*size,(30+increment)*scale2*size,((35+linkageHeight)+(linkageHeightPlus*i))*scale2*size)
        if(j == 0){
          doc.circle((30+(horizontalSpace*(1/3)))*scale2*size, ((35+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (5*scale*size));
          doc.circle((30+(horizontalSpace*(2/3)))*scale2*size, ((35+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (3*scale*size));
        }
      }
      else{
        doc.line(((30+constraintLength) - increment)*scale2*size,(35+(linkageHeightPlus*i))*scale2*size,((30+constraintLength) - increment)*scale2*size,((35+linkageHeight)+(linkageHeightPlus*i))*scale2*size)
        if(j == 0){
          doc.circle(((30+constraintLength) - increment+(horizontalSpace*(1/3)))*scale2*size, ((35+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (5*scale*size));
          doc.circle(((30+constraintLength) - increment+(horizontalSpace*(2/3)))*scale2*size, ((35+linkageHeight/2)+(linkageHeightPlus*i))*scale2*size, (3*scale*size));
        }
      }
    
  }
}

// function smallWidth(){

//   linkageHeight = 40
//   // document.getElementById("setSmallWidth")
// }
// function mediumWidth(){
//   linkageHeight = 60
// }
// function largeWidth(){
//   linkageHeight = 80
// }

