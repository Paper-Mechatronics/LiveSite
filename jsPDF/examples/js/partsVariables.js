var xValues = [];
var yValues = [];
var scale = 0.5
var scale2 = 0.4
var size = 0.75
var steps = 40;
var linSteps = 31;
var centerX = 100*scale *size;
var centerY = 100*scale*size;
var centerXCircle = 120*scale *size;
var centerYCircle = 150*scale*size;
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
var numOfLargeCranks = parseInt(localStorage.getItem("largeCranks"));
var numOfMediumCranks = parseInt(localStorage.getItem("mediumCranks"));
var numOfSmallCranks = parseInt(localStorage.getItem("smallCranks"))
var numOfLinGears = parseInt(localStorage.getItem("linGears"))
var numOfLargeCam = parseInt(localStorage.getItem("largeCam"));
var numOfMediumCam = parseInt(localStorage.getItem("mediumCam"));
var numOfSmallCam = parseInt(localStorage.getItem("smallCam"))
var numOfCams = numOfLargeCam + numOfSmallCam + numOfMediumCam
var constraintLength = parseInt(localStorage.getItem("constraintLength"))
var connectorLength = parseInt(localStorage.getItem("connectorLength"))
var beamLength = parseInt(localStorage.getItem("beamLength"))
var horizontalSpace = parseInt(localStorage.getItem("horizontalSpace"))
var continuous = parseInt(localStorage.getItem("continuous"))
var crankLength = parseInt(localStorage.getItem("crankLength"))*scale2*size
var linkageSpacing = 30
var linkageHeight = 90
var linkageHeightPlus = linkageHeight + linkageSpacing
var xMargin = 30
var yMargin = 35
var offset1 = 2 *scale*size
var offset2 = 11.33332 * scale*size
var linToothHeight = .25*64*scale*size;
var width = 40 *scale
var height = 441.37931*scale*size
var varArray = []
var frameScale = 0.3527777
varArray.push(horizontalSpace)
varArray.push(connectorLength)
varArray.push(beamLength)
varArray.push(horizontalSpace)
$("#setSmallWidth").hide()
$("#setMediumWidth").hide()
$("#setLargeWidth").hide()
var labelArray = ["1", "2", "3"]
var pageLabelArray = ["Gears", "Gears", "Linkages","Case Page 1", "Case Page 2"]
var frameLabelArray = ["1", "2", "3(1)","3(2)","4(1)","4(2)","5","6","7","8"]
var i = 0;

function loopLi() {
    setInterval(function() { // this code is executed every 500 milliseconds:

        if(true) {
            i++;
            console.log($("#toolbarViewer").height())
        }

    }, 500);
}

$(loopLi);

if(numOfLinGears){
	// $("#pageTitle").html("RackPin Parts")
}
if(numOfLargeCranks || numOfMediumCranks || numOfSmallCranks){
	// $("#pageTitle").html("Crank Parts")
}
