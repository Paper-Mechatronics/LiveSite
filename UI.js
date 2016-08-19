function UI(){

  this.lengthGap = 10
  this.bgcolor2 = color(200)
  this.temp_windowHeight = 660
  this.UI_mode = 1 //default

  var _this = this
  var stdSliderValue = [{}] //sketch object to restore slider from/to different module
      ,uiSliderValue = [{}]
      ,currentModule = 0 // 1 OpenClose
                        // 3 Wings
                        // 5 Walker
                        // 7 Planetary
                        // 9 MySketch

  this.mySavedSketch = [{}]

  this.currentGearSize     = 2 //default
  this.currentServoAngle   = 180 // 180 or 360
  this.currentDrivingGear  = 0 // 0:left, 1:right
  this.currentPairing      = 0

  this.master = 0 //linked module as parent
  this.slave  = 0 //linked module as child
  this.scale = 0

  this.Mech_show  = createButton ('Show Mechanism')
  this.Mech_hide  = createButton ('Hide Mechanism')
  this.Btn_reset  = createButton ('Reset all').mousePressed(resetAll)
  this.Btn_pdf    = createButton ('Download PNG')
  this.Btn_back   = createButton ('Back to Simulation')
  this.Btn_plt    = createButton ('Save in My Palette').mousePressed(saveDesign)
  this.Btn_net    = createButton ('View the Parts').mousePressed(button_folding_net)
  this.Btn_my     = createButton ('Go to My Sketch').mousePressed(button_My)
  this.Btn_home   = createButton ('Go to Home')//.mousePressed(_this.Front)
  this.mirr_apply = createButton('Apply').mousePressed(setMirroring)
  this.mirr_cancel= createButton('Cancel').mousePressed(setMirroring)
  this.new_apply  = createButton('Apply')

  this.mtr_L = createButton('L').mousePressed(setDrivingGear)
  this.mtr_R = createButton('R').mousePressed(setDrivingGear)

  this.size_1 = createButton('1').mousePressed(setGearSize) //bind to same function
  this.size_2 = createButton('2').mousePressed(setGearSize)
  this.size_3 = createButton('3').mousePressed(setGearSize)
  this.size_4 = createButton('4').mousePressed(setGearSize)

  this.thick_1 = createButton('1')
  this.thick_2 = createButton('2')
  this.thick_3 = createButton('3')
  this.thick_4 = createButton('4')
  this.motor_apply = createButton('Apply')
  this.motor_cancel = createButton('Cancel')

  this.ratio_1 = createButton('1:1')
  this.ratio_2 = createButton('3:2')
  this.ratio_3 = createButton('5:3')

  this.mtr180 = createButton('180°').mousePressed(setServoAngle)
  this.mtr360 = createButton('Continuous').mousePressed(setServoAngle)


  var xSliderA = 150;
  var ySliderA = 20;
  var xSliderB = 150;
  var ySliderB = 70;
  var xSliderC = 150;
  var ySliderC = 120;
  var xSliderD = 150;
  var ySliderD = 170;
  var xSliderE = 150;
  var ySliderE = 220;
  var xSliderF = 150;
  var ySliderF = 270;


//maybe we can integrate all slider events into one function as well..
  this.A_slider = createSlider(0, 400, 150).size(100).position(xSliderA, ySliderA).changed(sliderAUpdate)
  this.B_slider = createSlider(0, 400, 250).size(100).position(xSliderB, ySliderB).changed(sliderBUpdate)
  this.C_slider = createSlider(0, 400, 200).size(100).position(xSliderC, ySliderC).changed(sliderCUpdate)
  this.D_slider = createSlider(0, 400, 150).size(100).position(xSliderD, ySliderD).changed(sliderDUpdate)
  this.E_slider = createSlider(0, 400, 300).size(100).position(xSliderE, ySliderE).changed(sliderEUpdate)
  this.F_slider = createSlider(0, 130, 70).size(100).position(xSliderF, ySliderF).changed(sliderFUpdate)
  this.G_slider = createSlider(0, 400, 150).size(100).position(140,270).changed(sliderGUpdate)
  this.X_slider = createSlider(0, 200, 20).size(100).position(20, 200).changed(sliderXUpdate)
  this.Y_slider = createSlider(0, 200, 40).size(100).position(140,200).changed(sliderYUpdate)

  this.selectParent = [] //array
  // position for individual module
  this.btnMoveLeft     = []
  this.btnMoveRight    = []
  this.btnMoveUp       = []
  this.btnMoveDown     = []

  this.btnPlus      = []
  this.btnMinus     = []
  this.btnRotateCW  = []
  this.btnRotateCCW = []
  this.btnFlip      = []
  this.btnDelete    = []

  // for individual module
  for(var i=0; i<5; i++){ //up to # of saved models or saving limit (now 4)
    var sel = createSelect().hide()
    sel.attribute('id', i)
       .option('None') //default

    var btnDel        = createButton('Delete').hide()
                                              .attribute('id', 'del'+i)
                                              .mousePressed(deleteModule)
      //this is for position
      ,btnPosXMinus        = createButton('◄').hide()
                                          .attribute('id', 'del'+i)
                                        //.mousePressed(deleteModule)
      ,btnPosXPlus       = createButton('►').hide()
      ,btnPosYMinus      = createButton('▲').hide()
      ,btnPosYPlus       = createButton('▼').hide()
      //this is for scale
       ,btnP          = createButton('+').hide()
                                         .attribute('id', 'plus'+i)
                                         .mousePressed(scaleUpdate)
       ,btnM          = createButton('-').hide()
                                         .attribute('id', 'minus'+i)
                                         .mousePressed(scaleUpdate)
       ,btnRotCW      = createButton('CW').hide()
                                          .attribute('id', 'rotate'+i)
                                          .mousePressed(rotationUpdated)
       ,btnRotCCW    = createButton('CCW').hide()
                                           .attribute('id', 'rotate'+i+5)
                                           .mousePressed(rotationUpdated)
       ,btnFl        = createButton('Flip')
                        .hide()
                        .attribute('id', 'flip'+i)
                        .mousePressed(function() {
                          var sender = this.elt.id.slice(-1)

                          _this.mySavedSketch[sender].flip = true
                        });
    this.selectParent.push(sel)
    this.btnMoveLeft.push(btnPosXMinus)
    this.btnMoveRight.push(btnPosXPlus)
    this.btnMoveUp.push(btnPosYMinus)
    this.btnMoveDown.push(btnPosYPlus)

    this.btnPlus.push(btnP)
    this.btnMinus.push(btnM)
    this.btnRotateCW.push(btnRotCW)
    this.btnRotateCCW.push(btnRotCCW)
    this.btnFlip.push(btnFl)
    this.btnDelete.push(btnDel)
  }

  // for linked module
  this.linked         = false

  //for linked module position adjustment
  this.posX = 0
  this.posY = 0
  this.btnXplus = createButton('◄')
                  .hide()
                  .mousePressed(function(){
                    _this.posX -= 50
                  });
  this.btnXminus = createButton('►')
                  .hide()
                  .mousePressed(function(){
                    _this.posX += 50
                  });
  this.btnYplus = createButton('▲')
                  .hide()
                  .mousePressed(function(){
                    _this.posY -= 50
                  });
  this.btnYminus = createButton('▼')
                  .hide()
                  .mousePressed(function(){
                    _this.posY += 50
                  });
  this.btnEnlarge     = createButton('+')
                        .hide()
                        .mousePressed(scaleUpdate)
                        .attribute('id','+')
  this.btnEnsmall     = createButton('-')
                        .hide()
                        .mousePressed(scaleUpdate)
                        .attribute('id','-')
  this.selectDriver   = createSelect().hide()
  this.selectDirection= createSelect().hide()
                                      .changed(mySelectedLinkDirection)
  this.cancelLink = createButton('Cancel This Link')
                    .hide()
                    .mousePressed(function(){
                      _this.linked = false
                      //revoke drawing positions of individual modules
                      _this.mySavedSketch.forEach(function(m){
                        delete m.x //this is checked by if (module.x != undefined) from sketch.js
                        delete m.y
                        delete m.rotation
                      });
                    }) //this maybe array for further linking

  this.selectDirection.attribute('id',0).option('Right')
  this.selectDirection.attribute('id',1).option('Left')
  this.selectDirection.attribute('id',2).option('Up')
  this.selectDirection.attribute('id',3).option('Down')
  this.selectDirection.attribute('id',4).option('Merge')

  function resetAll(){
    // init left panel UI into default setting
    _this.currentGearSize     = 2 //default
    _this.currentServoAngle   = 180 // 180 or 360
    _this.currentPairing      = 0

    highlightMirroring(0)
    highlightGearSize(2) // default gear size  = 2
    highlightServoAngle(180) //dafault

    if(pageMode == 1) {//OpenClose
      _this.A_slider.value(100)
      _this.B_slider.value(300)
      _this.C_slider.value(100)
      _this.D_slider.value(200)
      _this.E_slider.value(250)
      _this.F_slider.value(70)

      //I think this shoule be in flower3.init()
      pair_petal = 0
      gearSize_petal = 2
      motorType_petal = 180

      Flower3.init()
    } else if(pageMode == 3){ //wing

      _this.currentDrivingGear  = 0 // 0:left, 1:right
      highlightDrivingGear(0) //default: left(0)

      _this.A_slider.value(200)
      _this.B_slider.value(150)
      _this.C_slider.value(300)
      _this.D_slider.value(100)
      _this.E_slider.value(350)
      _this.F_slider.value(380)

      _this.X_slider.value(20)
      _this.Y_slider.value(40)

      pair_wing = 0
      gearType_wing = 1
      gearSize_wing = 2
      motorType_wing = 360

      Bird1.init()
    } else if(pareMode == 5) {//walker

      _this.A_slider.value(180)
      _this.B_slider.value(150)
      _this.C_slider.value(150)
      _this.D_slider.value(190)
      _this.E_slider.value(250)
      _this.F_slider.value(280)
      _this.G_slider.value(230)

      //these should be an array sometime
      Walk1.init()
      Walk2.init()
      Walk3.init()
      Walk4.init()

    }else if(pageMode == 7) {//planet
    _this.A_slider.value(250)
    _this.B_slider.value(150)
    _this.C_slider.value(180)
    _this.D_slider.value(280)
    _this.E_slider.value(350)
    _this.E_slider.value(0)

    Planet1.init()
  }  //EOF
}

  this.initCurrentSelection = function(){
    //invoke slider selection
    //I feel somehow this is little redundant
    if(pageMode == 1) {
      //take a look at stdSliderValue.openclose
      //this is for ui revocation
      if(uiSliderValue.openclose != undefined){ //once opened
        var tempOC = uiSliderValue.openclose
        _this.A_slider.value(tempOC.A)
        _this.B_slider.value(tempOC.B)
        _this.C_slider.value(tempOC.C)
        _this.D_slider.value(tempOC.D)
        _this.E_slider.value(tempOC.E)
        _this.F_slider.value(tempOC.F)

        highlightMirroring(stdSliderValue.openclose.pair)
        highlightGearSize(stdSliderValue.openclose.gearSize)
        highlightServoAngle(stdSliderValue.openclose.servoAngle)

        delete uiSliderValue.openclose
      } else { //never opened
        resetAll()
      }

      // if(stdSliderValue.openclose == undefined){ //initial values
      //   // _this.currentGearSize     = 2 //default
      //   // _this.currentServoAngle   = 180 // 180 or 360
      //   // _this.currentPairing      = 0
      //   //
      //   // highlightMirroring(0)
      //   // highlightGearSize(2) // default gear size  = 2
      //   // highlightServoAngle(180) //default angle = 180
      //   resetAll()
      // } else {
      //   //invoke saved json obj
      //   _this.A_slider.value(stdSliderValue.openclose.A)
      //   _this.B_slider.value(stdSliderValue.openclose.B)
      //   _this.C_slider.value(stdSliderValue.openclose.C)
      //   _this.D_slider.value(stdSliderValue.openclose.D)
      //   _this.E_slider.value(stdSliderValue.openclose.E)
      //
      //   highlightMirroring(stdSliderValue.openclose.pair)
      //   highlightGearSize(stdSliderValue.openclose.gearSize)
      //   highlightServoAngle(stdSliderValue.openclose.servoAngle)
      // }
    } else if(pageMode == 3){

      if(uiSliderValue.flapping != undefined){ //once opened
        var tempFL = uiSliderValue.flapping
        _this.A_slider.value(tempFL.A)
        _this.B_slider.value(tempFL.B)
        _this.C_slider.value(tempFL.C)
        _this.D_slider.value(tempFL.D)
        _this.E_slider.value(tempFL.E)
        _this.F_slider.value(tempFL.F)

        highlightMirroring(stdSliderValue.wings.pair)
        highlightGearSize(stdSliderValue.wings.gearSize)
        highlightServoAngle(stdSliderValue.wings.servoAngle)
        highlightDrivingGear(stdSliderValue.wings.drivingGear)

        delete uiSliderValue.openclose
      } else { //never opened
        resetAll()
      }

      // //take a look at stdSliderValue.wings
      // if(stdSliderValue.wings == undefined){
      //
      //   // _this.currentGearSize     = 2 //default
      //   // _this.currentServoAngle   = 180 // 180 or 360
      //   // _this.currentPairing      = 0
      //   // _this.currentDrivingGear  = 0 // 0:left, 1:right
      //   //
      //   // highlightMirroring(0)
      //   // highlightGearSize(2) // default gear size  = 2
      //   // highlightServoAngle(180) //dafault
      //   // highlightDrivingGear(0) //default: left(0)
      //
      //   resetAll()
      // } else {
      //   //invoke saved json obj
      //   _this.A_slider.value(stdSliderValue.wings.A)
      //   _this.B_slider.value(stdSliderValue.wings.B)
      //   _this.C_slider.value(stdSliderValue.wings.C)
      //   _this.D_slider.value(stdSliderValue.wings.D)
      //   _this.E_slider.value(stdSliderValue.wings.E)
      //   _this.F_slider.value(stdSliderValue.wings.F)
      //
      //   _this.X_slider.value(stdSliderValue.wings.X)
      //   _this.Y_slider.value(stdSliderValue.wings.Y)
      //
      //   highlightMirroring(stdSliderValue.wings.pair)
      //   highlightGearSize(stdSliderValue.wings.gearSize)
      //   highlightServoAngle(stdSliderValue.wings.servoAngle)
      //   highlightDrivingGear(stdSliderValue.wings.drivingGear)
      // }
    } else if(pageMode == 5){
      if(stdSliderValue.walker == undefined){ //initial values

        _this.currentGearSize     = 2 //default
        _this.currentPairing      = 0 //fale

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
      } else {
        //invoke saved json obj
        _this.A_slider.value(stdSliderValue.walker.A)
        _this.B_slider.value(stdSliderValue.walker.B)
        _this.C_slider.value(stdSliderValue.walker.C)
        _this.D_slider.value(stdSliderValue.walker.D)
        _this.E_slider.value(stdSliderValue.walker.E)
        _this.F_slider.value(stdSliderValue.walker.F)
        _this.G_slider.value(stdSliderValue.walker.G)

        highlightMirroring(stdSliderValue.walker.pair)
        highlightGearSize(stdSliderValue.walker.gearSize)
      }
    } else if(pageMode == 7) {
      //take a look at stdSliderValue.planet
      if(stdSliderValue.planet == undefined){ //initial values
        _this.currentGearSize     = 2 //default
        _this.currentServoAngle   = 180 // 180 or 360
        _this.currentPairing      = 0

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
        highlightServoAngle(180) //default angle = 180
      } else {

        _this.A_slider.value(stdSliderValue.planet.A)
        _this.B_slider.value(stdSliderValue.planet.B)
        _this.C_slider.value(stdSliderValue.planet.C)
        _this.D_slider.value(stdSliderValue.planet.D)
        _this.E_slider.value(stdSliderValue.planet.E)
        _this.F_slider.value(stdSliderValue.planet.F)

        highlightMirroring(stdSliderValue.planet.pair)
        highlightGearSize(stdSliderValue.planet.gearSize)
        highlightServoAngle(stdSliderValue.planet.servoAngle)
      }
    }
  }

  function setGearSize(){
    var gearSize = parseInt(this.elt.innerHTML)
    highlightGearSize(gearSize)
    _this.currentGearSize = parseInt(this.elt.innerHTML)

    console.log(gearSize)
  }

  function highlightMirroring(pair){
    if(pair == 1){
      _this.mirr_apply.style("background-color",blue)
      _this.mirr_cancel.style("background-color",white)
    }else if(pair == 0){
      _this.mirr_apply.style("background-color",white)
      _this.mirr_cancel.style("background-color",blue)
    }

  }
  function highlightGearSize(gearSize){
    if(gearSize == 1){
       _this.size_1.style("background-color",blue)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 2){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",blue)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 3){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",blue)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 4){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",blue)
     }
  }

  function highlightThickness(thickSize){
    if(thickSize == 1){
       _this.thick_1.style("background-color",blue)
       _this.thick_2.style("background-color",white)
       _this.thick_3.style("background-color",white)
       _this.thick_4.style("background-color",white)
     }else if(thickSize == 2){
       _this.thick_1.style("background-color",white)
       _this.thick_2.style("background-color",blue)
       _this.thick_3.style("background-color",white)
       _this.thick_4.style("background-color",white)
     }else if(thickSize == 3){
       _this.thick_1.style("background-color",white)
       _this.thick_2.style("background-color",white)
       _this.thick_3.style("background-color",blue)
       _this.thick_4.style("background-color",white)
     }else if(thickSize == 4){
       _this.thick_1.style("background-color",white)
       _this.thick_2.style("background-color",white)
       _this.thick_3.style("background-color",white)
       _this.thick_4.style("background-color",blue)
     }
  }

  function setServoAngle(){
    if(this.elt.innerHTML == "Continuous")
      _this.currentServoAngle = 360
    else
      _this.currentServoAngle = 180

    highlightServoAngle(_this.currentServoAngle)
  }

  function highlightServoAngle(servo){
    if(servo == 180){
        _this.mtr180.style('background',blue)
        _this.mtr360.style('background-color',white)
    } else { //360
        _this.mtr180.style('background-color',white)
        _this.mtr360.style('background-color',blue)
    }
  }

  function setMirroring(pair){
    if(this.elt.innerHTML == "Apply"){
      highlightMirroring(pair)
      _this.currentPairing = 1
    }else{ //Cancel
      _this.currentPairing = 0
      highlightMirroring(pair)
    }
    console.log(_this.currentPairing)
  }

  function setDrivingGear(){
    if(this.elt.innerHTML == 'L'){
      highlightDrivingGear(0)
      _this.currentDrivingGear = "LEFT"
    }else { // R
      highlightDrivingGear(1)
      _this.currentDrivingGear = "RIGHT"
    }
  }

  function highlightDrivingGear(drivingGear){ // 0: left, 1:right
    if(drivingGear == 0){
        _this.mtr_L.style('background-color', blue)
        _this.mtr_R.style('background-color', white)
    } else { // 1
        _this.mtr_L.style('background-color', white)
        _this.mtr_R.style('background-color', blue)
    }
  }

  this.findDrawingFunc = function(){
    return _this.mySavedSketch
  }

  //this is for saving module data which will be available in my sketch
  function saveDesign(){

    var temp = {  //this is common for all modules
      A: _this.A_slider.value()
      ,B: _this.B_slider.value()
      ,C: _this.C_slider.value()
      ,D: _this.D_slider.value()
      ,E: _this.E_slider.value()
      ,gearSize:   _this.currentGearSize //number 1~4
      ,servoAngle: _this.currentServoAngle //1:180, 2:cont
      ,mirroring:  _this.currentPairing// True/False
      ,linekedTo: 'none'
    }

    switch (_this.currentModule) { //module specific informaion
      case 1: //OpenClose
        temp.module     = 1
        break;
      case 3: //Flapping
        temp.module = 3 // <-- this is for user to see from mysketch
        temp.F = _this.F_slider.value()
        temp.X = _this.X_slider.value()
        temp.Y = _this.Y_slider.value()

        temp.driveGear  = _this.currentDrivingGear
        break;
      case 5: //Walking
        temp.module = 5
        temp.F = _this.F_slider.value()
        temp.G = _this.G_slider.value()
        break;
      case 7: //planet
        temp.module     = 7
        break;
      default:
      } // end of switch - case

      _this.mySavedSketch.push(temp)

      if(temp.module != 0){
        _this.selectParent.forEach(function(sel){
           if(temp.module == 5) //walking cannot be linked to any
             return
          var ii = _this.mySavedSketch.length-1
          sel.option('Module '+ ii)
        });
      }
  }

  this.initUI = function(){ //initializer

    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(_this.bgcolor2)
    rect(0,0,270,_this.temp_windowHeight)
    fill(0)
    rect(0,575,270,125) //bottom home/my sketchbook
    rect(0,0,270,35)
    //checkbox
    fill(255)
    rect(20,35,230,150)

  } // end of function initUI()

  this.initUI_net = function(){ //initializer
    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(_this.bgcolor2)
    rect(0,515,1200,_this.temp_windowHeight-515)
    fill(0)
    rect(0,515,1200,35)

  } // end of function initUI()

  this.button_front = function(){

    this.mtr180.hide()
    this.mtr360.hide()
    this.Btn_reset.hide()
    this.Btn_pdf.hide()
    this.Btn_plt.hide()
    this.Btn_net.hide()
    this.Btn_back.hide()
    this.Btn_my.hide()
    this.Btn_pdf.hide()
    this.Btn_home.hide()
    this.mtr_L.hide()
    this.mtr_R.hide()
    this.size_1.hide()
    this.size_2.hide()
    this.size_3.hide()
    this.size_4.hide()
    this.ratio_1.hide()
    this.ratio_2.hide()
    this.ratio_3.hide()
    this.thick_1.hide()
    this.thick_2.hide()
    this.thick_3.hide()
    this.thick_4.hide()
    this.Mech_show.hide()
    this.Mech_hide.hide()
    this.mirr_apply.hide()
    this.mirr_cancel.hide()
    this.new_apply.hide()
    this.motor_apply.hide()
    this.motor_cancel.hide()

    this.A_slider.hide()
    this.B_slider.hide()
    this.C_slider.hide()
    this.D_slider.hide()
    this.E_slider.hide()
    this.F_slider.hide()
    this.G_slider.hide()

    this.X_slider.hide()
    this.Y_slider.hide()

    this.btnXplus.hide()
    this.btnXminus.hide()
    this.btnYplus.hide()
    this.btnYminus.hide()

    this.btnEnlarge.hide()
    this.btnEnsmall.hide()

    this.selectParent.forEach(function(s){ s.hide() });
    // this.sliderRotation.forEach(function(s){ s.hide() });
    this.btnPlus.forEach(function(b){ b.hide() });
    this.btnMinus.forEach(function(b) { b.hide()});
    this.btnRotateCW.forEach(function(b){ b.hide() });
    this.btnRotateCCW.forEach(function(b){ b.hide() });
    this.btnDelete.forEach(function(b){ b.hide() });
    this.btnFlip.forEach(function(b){ b.hide() });

    this.btnMoveLeft.forEach(function(b){ b.hide() });
    this.btnMoveRight.forEach(function(b){ b.hide() });
    this.btnMoveUp.forEach(function(b){ b.hide() });
    this.btnMoveDown.forEach(function(b){ b.hide() });

    this.currentModule = 0

  }// end of function btn_front

  this.button_OpenClose = function(){

    if(_this.currentPairing == 0){ // cancel pairing
      _this.mirr_apply.show().position(138,315).style("background-color",white)
      _this.mirr_cancel.show().position(190,315).style("background-color",blue)

    }else if(_this.currentPairing == 1){  // paired!
      _this.mirr_apply.show().position(138,315).style("background-color",blue)
      _this.mirr_cancel.show().position(190,315).style("background-color",white)
    }

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.mtr180.show().position(50, 430)
    _this.mtr360.show().position(140, 430)

    _this.Btn_reset.show().size(150,20).position(60,495)
//    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_plt.hide() // for may 2016 workshop
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.mtr_L.hide()
    _this.mtr_R.hide()
    _this.Btn_pdf.hide()
    _this.Btn_back.hide()
    _this.new_apply.hide()

    _this.F_slider.hide()
    _this.G_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    this.thick_1.hide()
    this.thick_2.hide()
    this.thick_3.hide()
    this.thick_4.hide()
    this.ratio_1.hide()
    this.ratio_2.hide()
    this.ratio_3.hide()
    this.motor_apply.hide()
    this.motor_cancel.hide()

    // if(opencloseRecurred){
    //   var tempOC = stdSliderValue.openclose
    //   _this.A_slider.value(tempOC.A)
    //   _this.B_slider.value(tempOC.B)
    //   _this.C_slider.value(tempOC.C)
    //   _this.D_slider.value(tempOC.D)
    //   _this.E_slider.value(tempOC.E)
    //   _this.F_slider.value(tempOC.F)
    //
    //   // opencloseRecurred = false
    // }
    // opencloseRecurred = true

    OpenClose()
    _this.currentModule = 1
}// end of function btn_openClose()

  this.button_Wings = function(){

    if(_this.currentPairing == 0){ // cancel pairing
      _this.mirr_apply.show().position(138,315).style("background-color",white)
      _this.mirr_cancel.show().position(190,315).style("background-color",blue)

      _this.mtr_L.hide()
      _this.mtr_R.hide()

    }else if(_this.currentPairing == 1){  // paired!
      _this.mirr_apply.show().position(138,315).style("background-color",blue)
      _this.mirr_cancel.show().position(190,315).style("background-color",white)

      text("Driver Gear :", 20, 360)

      _this.mtr_L.show().position(150, 345)
      _this.mtr_R.show().position(200, 345)
    }

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.mtr180.show().position(50, 430)//.style("background-color",blue)
    _this.mtr360.show().position(140, 430)//.style("background-color",white)

    _this.Btn_reset.show().size(150,20).position(60,495)
//    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_plt.hide() // for May 2016 workshop
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.Btn_pdf.hide()
    _this.Btn_back.hide()
    _this.new_apply.hide()
    this.thick_1.hide()
    this.thick_2.hide()
    this.thick_3.hide()
    this.thick_4.hide()
    this.ratio_1.hide()
    this.ratio_2.hide()
    this.ratio_3.hide()
    this.motor_apply.hide()
    this.motor_cancel.hide()

    Wings()
    _this.currentModule = 3
    console.log(pageMode)
}

this.button_Planet = function(){

  if(_this.currentPairing == 0){ // cancel pairing
    _this.mirr_apply.show().position(138,315).style("background-color",white)
    _this.mirr_cancel.show().position(190,315).style("background-color",blue)

  }else if(_this.currentPairing == 1){  // paired!
    _this.mirr_apply.show().position(138,315).style("background-color",blue)
    _this.mirr_cancel.show().position(190,315).style("background-color",white)

  }
  _this.ratio_1.show().position(50,375)
  _this.ratio_2.show().position(120,375)
  _this.ratio_3.show().position(190,375)
  // _this.size_1.show().position(115,375)
  // _this.size_2.show().position(150,375)
  // _this.size_3.show().position(185,375)
  // _this.size_4.show().position(220,375)

  _this.mtr180.show().position(50, 430)//.style("background-color",blue)
  _this.mtr360.show().position(140, 430)//.style("background-color",white)

  _this.Btn_reset.show().size(150,20).position(60,495)
//  _this.Btn_plt.show().size(150,20).position(60,520)
  _this.Btn_plt.hide()// for May workshop
  _this.Btn_net.show().size(150,20).position(60,545)
  _this.Btn_my.show().size(150,20).position(60,590)
  _this.Btn_home.show().size(150,20).position(60,615)

  _this.Btn_pdf.hide()
  _this.Btn_back.hide()
  _this.new_apply.hide()
  _this.mtr_L.hide()
  _this.mtr_R.hide()
  _this.thick_1.hide()
  _this.thick_2.hide()
  _this.thick_3.hide()
  _this.thick_4.hide()
  _this.size_1.hide()
  _this.size_2.hide()
  _this.size_3.hide()
  _this.size_4.hide()
  _this.motor_apply.hide()
  _this.motor_cancel.hide()

  Planet()
  _this.currentModule = 7
}

  this.button_walk = function(num_leg){
    _this.mirr_apply.show().position(138,315)
    _this.mirr_cancel.show().position(190,315)

    if(num_leg<3){
      _this.new_apply.show().position(138,345).style("background-color",white)

    }else{
      _this.new_apply.hide()
    }
    fill(0)
    text("Add New :", 20, 360)

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.Btn_reset.show().size(150,20).position(60,495)
    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.Btn_pdf.hide()
    _this.Btn_back.hide()
    _this.thick_1.hide()
    _this.thick_2.hide()
    _this.thick_3.hide()
    _this.thick_4.hide()

    Walker()
    _this.currentModule = 5
  }

  function button_folding_net(page){

    _this.size_1.hide() //bind to same function
    _this.size_2.hide()
    _this.size_3.hide()
    _this.size_4.hide()
    _this.mtr180.hide()
    _this.mtr360.hide()
    _this.mtr_L.hide()
    _this.mtr_R.hide()
    _this.Btn_reset.hide()
    _this.Btn_plt.hide()
    _this.Btn_net.hide()
    _this.A_slider.hide()
    _this.B_slider.hide()
    _this.C_slider.hide()
    _this.D_slider.hide()
    _this.E_slider.hide()
    _this.F_slider.hide()
    _this.G_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    _this.mirr_apply.hide()
    _this.mirr_cancel.hide()
    _this.new_apply.hide()
    _this.ratio_1.hide()
    _this.ratio_2.hide()
    _this.ratio_3.hide()
    _this.thick_1.hide()
    _this.thick_2.hide()
    _this.thick_3.hide()
    _this.thick_4.hide()
    _this.motor_apply.hide()
    _this.motor_cancel.hide()


    _this.Btn_pdf.show().size(150,20).position(60,565)
    _this.Btn_back.show().size(150,20).position(60,590)
  }

  this.callButton_MY = function(){
    button_My()
  }

  function button_My(){ //anonymous function for mouse event call + external call

    _this.Btn_net.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    //button creation - show is called every moment - might be overflowing
    var index = 0

    _this.mirr_apply.hide()
    _this.mirr_cancel.hide()
    _this.new_apply.hide()
    _this.mtr180.hide()
    _this.mtr360.hide()
    _this.mtr_L.hide()
    _this.mtr_R.hide()
    _this.Btn_reset.hide()
    _this.Btn_pdf.hide()
    _this.Btn_plt.hide()
    _this.Btn_back.hide()
    _this.Btn_my.hide()
    _this.size_1.hide()
    _this.size_2.hide()
    _this.size_3.hide()
    _this.size_4.hide()
    _this.ratio_1.hide()
    _this.ratio_2.hide()
    _this.ratio_3.hide()
    _this.A_slider.hide()
    _this.B_slider.hide()
    _this.C_slider.hide()
    _this.D_slider.hide()
    _this.E_slider.hide()
    _this.F_slider.hide()
    _this.G_slider.hide()
    _this.motor_apply.hide()
    _this.motor_cancel.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    _this.currentModule = 9
  }

  //*********** UI Panel texts
  this.putText_OpenClose = function(){

    noStroke()
    fill(255)
    text("OPENING & CLOSING", 60, 25)
    fill(0)
    text("A", 25, 230)
    text("B", 145, 230)
    text("C", 25, 265)
    text("D", 145, 265)
    text("E", 25, 300)
    text("F", 145, 300)
    text("Model Mirroring :", 20, 330)
    text("Gear Size :", 20, 390)
    text("Motor Rotation Angle :", 20, 420)

  }

  this.putText_OpenClose_net = function(OP_map_page){

    fill(255)
    text("FOLDING NET  :  OPEN & CLOSE", 22, 540)

    if(OP_map_page == 1){
      stroke(0)
      fill(0)
      rect(1060,560,25,35)
      fill(255)
      rect(1100,560,25,35)
      rect(1140,560,25,35)
      textSize(22)
      text("1",1067,587)
      fill(0)
      text("2",1107,587)
      text("3",1147,587)
      textSize(15)
    }else if(OP_map_page == 2){
      stroke(0)
      fill(255)
      rect(1060,560,25,35)
      rect(1140,560,25,35)
      fill(0)
      rect(1100,560,25,35)
      textSize(22)
      noStroke()
      text("1",1067,587)
      text("3",1147,587)
      fill(255)
      text("2",1107,587)
      textSize(15)
      fill(0)
      text("Motor Implementation : ",300,580)

      this.thick_1.hide()
      this.thick_2.hide()
      this.thick_3.hide()
      this.thick_4.hide()
      this.motor_apply.show().position(475,567)
      this.motor_cancel.show().position(540,567)

    }else if(OP_map_page == 3){
      stroke(0)
      fill(255)
      rect(1060,560,25,35)
      rect(1100,560,25,35)
      fill(0)
      rect(1140,560,25,35)
      textSize(22)
      noStroke()
      text("1",1067,587)
      text("2",1107,587)
      fill(255)
      text("3",1147,587)
      textSize(15)
      fill(0)
      text("Linkage Thickness : ",300,580)

      _this.thick_1.show().position(455,567)
      _this.thick_2.show().position(490,567)
      _this.thick_3.show().position(525,567)
      _this.thick_4.show().position(560,567)
      _this.motor_apply.hide()
      _this.motor_cancel.hide()
    }
  }

  this.putText_Wings = function(UI_wing){
    _this.UI_mode = UI_wing

    noStroke()
    fill(255)
    text("FLAPPING", 100, 25)
    fill(0)
    text("Model Mirroring :", 20, 330)
    text("Gear Size :", 20, 390)
    text("Motor Rotation Angle :", 20, 420)

    if(_this.UI_mode == 1){
      text("A", 25, 230)
      text("B", 145, 230)
      text("C", 25, 265)
      text("D", 145, 265)
      text("E", 25, 300)
      text("F", 145, 300)
    } else if(_this.UI_mode == 2) {
      text("X", 25, 230)
      text("Y", 145, 230)
    }
} //EOF

this.putText_Planet = function(){
//  _this.UI_mode = UI_planet

  noStroke()
  fill(255)
  text("CIRCLING", 100, 25)
  fill(0)
  text("A", 25, 230)
  text("B", 145, 230)
  text("C", 25, 265)
  text("D", 145, 265)
  text("E", 25, 300)
  text("F", 145, 300)
  text("Model Mirroring :", 20, 330)
  text("Gearset Ratio (Sun/Planet) :", 20, 360)
//  text("Gear Size :", 20, 390)
  text("Motor Rotation Angle :", 20, 420)
}

  this.putText_Flapping_net = function(Flapping_map_page){

    fill(255)
    text("FOLDING NET  :  FLAPPING", 37, 540)

    if(Flapping_map_page == 1){
      stroke(0)
      fill(0)
      rect(1060,560,25,35)
      fill(255)
      rect(1100,560,25,35)
      rect(1140,560,25,35)
      textSize(22)
      text("1",1067,587)
      fill(0)
      text("2",1107,587)
      text("3",1147,587)
      textSize(15)
    }else if(Flapping_map_page == 2){
      stroke(0)
      fill(255)
      rect(1060,560,25,35)
      rect(1140,560,25,35)
      fill(0)
      rect(1100,560,25,35)
      textSize(22)
      noStroke()
      text("1",1067,587)
      text("3",1147,587)
      fill(255)
      text("2",1107,587)
      textSize(15)
      fill(0)
      text("Motor Implementation : ",300,580)

      this.thick_1.hide()
      this.thick_2.hide()
      this.thick_3.hide()
      this.thick_4.hide()
      this.motor_apply.show().position(475,567)
      this.motor_cancel.show().position(540,567)
    }else if(Flapping_map_page == 3){
      stroke(0)
      fill(255)
      rect(1060,560,25,35)
      rect(1100,560,25,35)
      fill(0)
      rect(1140,560,25,35)
      textSize(22)
      noStroke()
      text("1",1067,587)
      text("2",1107,587)
      fill(255)
      text("3",1147,587)
      textSize(15)
      fill(0)
      text("Linkage Thickness : ",300,580)

      _this.thick_1.show().position(455,567)
      _this.thick_2.show().position(490,567)
      _this.thick_3.show().position(525,567)
      _this.thick_4.show().position(560,567)
      _this.motor_apply.hide()
      _this.motor_cancel.hide()
    }
 } //EOF

  this.putText_walk = function(){
    _this.UI_mode_walk = UI_walk

    noStroke()
    fill(255)
    text("WALKING", 103, 25)
    fill(0)
    text("Model Pairing :", 20, 330)
    text("Gear Size :", 20, 390)

    if(_this.UI_mode_walk == 1){
      text("A", 25, 230)
      text("B", 145, 230)
      text("C", 25, 265)
      text("D", 145, 265)
      text("E", 25, 300)
      text("F", 145, 300)
    }else if(_this.UI_mode_walk == 2){
      text("G", 25, 230)
    }
  } //EOF

  this.putText_My = function(){
    //this: caller button, _this: UI
    fill(_this.bgcolor2)
    noStroke()
    rect(0,35,270, _this.temp_windowHeight)
    fill(0)
    rect(0,575,270,125)
    rect(0,0,270,35)
    fill(255)
    text("MY SKETCHBOOK", 70, 25)
  } //EOF

  this.Front = function(){
    background(bgcolor2)
    noStroke()
    fill(0)
    textSize(28)
    text("FoldMecha",550,70)
    textSize(15)
    text("design your own mechanical movement and download the folding net to build",360,100)
    //button_front()
  } //EOF

/*   from here:   slider section */
  this.UI_OpenClose_init = function(){
      // set default values
    }
  this.UI_Wings_init = function(){
      // set default values
    }
  this.UI_Walking_init = function(){
      // set default values
    }

  function OpenClose(){

    _this.A_slider.show()
    _this.B_slider.show()
    _this.C_slider.show()
    _this.D_slider.show()
    _this.E_slider.show()
    _this.F_slider.show()

    //this is for saving to mysketch
    var moduleObj = [{}] //empty json

    moduleObj.A = _this.A_slider.value()
    moduleObj.B = _this.B_slider.value()
    moduleObj.C = _this.C_slider.value()
    moduleObj.D = _this.D_slider.value()
    moduleObj.E = _this.E_slider.value()
    moduleObj.F = _this.F_slider.value()

    moduleObj.mirroring = _this.currentPairing
    moduleObj.gearSize  = _this.currentGearSize
    moduleObj.servoAngle= _this.currentServoAngle

    stdSliderValue.openclose = moduleObj

  } //EOF

  function Wings(){
    var moduleObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.G_slider.hide()
      _this.X_slider.hide()
      _this.Y_slider.hide()

    } else if(_this.UI_mode == 2){

      _this.A_slider.hide()
      _this.B_slider.hide()
      _this.C_slider.hide()
      _this.D_slider.hide()
      _this.E_slider.hide()
      _this.F_slider.hide()
      _this.G_slider.hide()

      _this.X_slider.show()
      _this.Y_slider.show()
    }
  }

    function Planet(){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()
      var moduleObj = [{}] //empty json

      moduleObj.A = _this.A_slider.value()
      moduleObj.B = _this.B_slider.value()
      moduleObj.C = _this.C_slider.value()
      moduleObj.D = _this.D_slider.value()
      moduleObj.E = _this.E_slider.value()
      moduleObj.F = _this.E_slider.value()

      moduleObj.mirroring = _this.currentPairing
      moduleObj.gearSize  = _this.currentGearSize
      moduleObj.servoAngle= _this.currentServoAngle

      stdSliderValue.planet = moduleObj

    }

  function Walker(){
    var moduleObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.G_slider.hide()
      _this.X_slider.hide()
      _this.Y_slider.hide()

    } else if(_this.UI_mode == 2){

      _this.G_slider.show()

      _this.A_slider.hide()
      _this.B_slider.hide()
      _this.C_slider.hide()
      _this.D_slider.hide()
      _this.E_slider.hide()
      _this.F_slider.hide()

      _this.X_slider.hide()
      _this.Y_slider.hide()
    }

    //save current slider information into empty json
    //for the first time, have to create json obj
    moduleObj.A = _this.A_slider.value()
    moduleObj.B = _this.B_slider.value()
    moduleObj.C = _this.C_slider.value()
    moduleObj.D = _this.D_slider.value()
    moduleObj.E = _this.E_slider.value()
    moduleObj.F = _this.F_slider.value()
    moduleObj.G = _this.G_slider.value()

    moduleObj.mirring = _this.currentPairing
    moduleObj.gearSize = _this.currentGearSize
    moduleObj.servoAngle = _this.currentServoAngle
    moduleObj.drivingGear = _this.currentDrivingGear

    stdSliderValue.walker = moduleObj
  } //EOF


  /* from here: flower sliders */
  this.calcSliderPos2 = function(min, max, value) { // Open & Close
    return map(value,0,250,min,max) //
  }
  this.calcSliderPos6 = function(min, max, value) { // Open & Close
    return map(value,0,130,min,max) //
  }
  /* this is for planet sliders */
  this.calcSliderPos5 = function(min, max, value) { // Open & Close
    return map(value,200,450,min,max) //
  }

//how do Flower3 && Bird1 communicate with variables from sketch.js?
  function sliderAUpdate() {

      switch (_this.currentModule) {

        case 1: // OpenClose Flower
          Flower3.setA(_this.A_slider.value())
          _this.A_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_aMin, Flower3.dist_aMax, Flower3.getA()))
          stdSliderValue.openclose.A = _this.A_slider.value()
          document.getElementById("sliderA").innerHTML = "Slider A Value: " + _this.A_slider.value();
          break
        case 3: // Flagppig Bird
          Bird1.setA(_this.A_slider.value())
          // this will update b & c
          // then it has to update min/max b&c as well
          _this.A_slider.attribute('min', Bird1.dist_aMin)
                        .attribute('max', Bird1.dist_aMax)
                        .attribute('value', _this.calcSliderPos3(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))

          stdSliderValue.wings.A = _this.A_slider.value()
          break
        case 5: // Walking Centipede
          //what is the slider value relationship?
          _this.A_slider.attribute('min', Walk1.dist_aMin)
                        .attribute('max', Walk1.dist_aMax)
          _this.A_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_aMin, Walk1.dist_aMax, Walk1.getA()))
          stdSliderValue.walker.A = _this.A_slider.value()
          break
        case 7: // OpenClose Flower
          Planet1.setA(_this.A_slider.value())
          //we assume this is only possible when there is already json obj created
          _this.A_slider.attribute('value', _this.calcSliderPos3(Planet1.dist_aMin, Planet1.dist_aMax, Planet1.getA()))
          stdSliderValue.planet.A = _this.A_slider.value()
          break
        default:
      }
      //where saved slider value saved to my saved design?
  }

  function sliderBUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setB(_this.B_slider.value())
        _this.B_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_bMin, Flower3.dist_bMax, Flower3.getB()))
        stdSliderValue.openclose.B = _this.B_slider.value()
        document.getElementById("sliderB").innerHTML = "Slider B Value: " + _this.B_slider.value();
        break
      case 3: // Flagppig Bird
        Bird1.setB(_this.B_slider.value())
        _this.B_slider.attribute('min', Bird1.dist_bMin)
                      .attribute('max', Bird1.dist_bMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))

        stdSliderValue.wings.B = _this.B_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setB(_this.B_slider.value())
        _this.A_slider.attribute('min', Walk1.dist_bMin)
                      .attribute('max', Walk1.dist_bMax)
        _this.B_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_bMin, Walk1.dist_bMax, Walk1.getB()))
        stdSliderValue.walker.B = _this.B_slider.value()
        break
      case 7: // OpenClose Flower
        Planet1.setA(_this.B_slider.value())
          //we assume this is only possible when there is already json obj created
        _this.B_slider.attribute('value', _this.calcSliderPos3(Planet1.dist_bMin, Planet1.dist_bMax, Planet1.getB()))
        stdSliderValue.planet.B = _this.B_slider.value()
        break
      default:
    }
  }

  function sliderCUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setC(_this.C_slider.value())
        _this.C_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_cMin, Flower3.dist_cMax, Flower3.getC()))
        stdSliderValue.openclose.C = _this.C_slider.value()
        document.getElementById("sliderC").innerHTML = "Slider C Value: " + _this.C_slider.value();
        break
      case 3: // Flagppig Bird
        Bird1.setC(_this.C_slider.value())
        _this.C_slider.attribute('min', Bird1.dist_cMin)
                      .attribute('max', Bird1.dist_cMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))

        stdSliderValue.wings.C = _this.C_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setC(_this.C_slider.value())
        _this.C_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
        stdSliderValue.walker.C = _this.C_slider.value()
        break
      case 7: // Planet
        Planet1.setC(_this.C_slider.value())
        _this.C_slider.attribute('value', _this.calcSliderPos3(Planet1.dist_cMin, Planet1.dist_cMax, Planet1.getC()))
        stdSliderValue.planet.C = _this.C_slider.value()
        break
      default:
    }
  }

  function sliderDUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setD(_this.D_slider.value())
        _this.D_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_dMin, Flower3.dist_dMax, Flower3.getD()))
        stdSliderValue.openclose.D = _this.D_slider.value()
        document.getElementById("sliderD").innerHTML = "Slider D Value: " + _this.D_slider.value();
        break
      case 3: // Flagppig Bird
        Bird1.setD(_this.D_slider.value())
        _this.D_slider.attribute('min', Bird1.dist_dMin)
                      .attribute('max', Bird1.dist_dMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))

        stdSliderValue.wings.D = _this.D_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setD(_this.D_slider.value())
        _this.D_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        stdSliderValue.walker.D = _this.D_slider.value()
        break
      case 7: // Planet
        Planet1.setD(_this.C_slider.value())
        _this.D_slider.attribute('value', _this.calcSliderPos3(Planet1.dist_dMin, Planet1.dist_dMax, Planet1.getD()))
        stdSliderValue.planet.D = _this.D_slider.value()
        break
      default:
    }
  }

  function sliderEUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setE(_this.E_slider.value())
        _this.E_slider.attribute('value', _this.calcSliderPos3(Flower3.dist_eMin, Flower3.dist_eMax, Flower3.getE()))
        stdSliderValue.openclose.E = _this.E_slider.value()
        document.getElementById("sliderE").innerHTML = "Slider E Value: " + _this.E_slider.value();
        break
      case 3: // Flagppig Bird
        Bird1.setE(_this.E_slider.value())
        _this.E_slider.attribute('min', Bird1.dist_eMin)
                      .attribute('max', Bird1.dist_eMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.wings.E = _this.E_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setE(_this.E_slider.value())
        _this.E_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.walker.E = _this.E_slider.value()
        break
      case 7: // Planet
        Planet1.setE(_this.E_slider.value())
        _this.E_slider.attribute('value', _this.calcSliderPos5(Planet1.dist_eMin, Planet1.dist_eMax, Planet1.getE()))
        stdSliderValue.planet.E = _this.E_slider.value()
        break
      default:
    }
  }

  function sliderFUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setF(_this.F_slider.value())
        _this.F_slider.attribute('value', _this.calcSliderPos6(Flower3.dist_fMin, Flower3.dist_fMax, Flower3.getF()))
        stdSliderValue.openclose.F = _this.F_slider.value()
        document.getElementById("sliderF").innerHTML = "Slider F Value: " + _this.F_slider.value();
        break
      case 3: // Flagppig Bird
        Bird1.setF(_this.F_slider.value())
        _this.F_slider.attribute('min', Bird1.dist_fMin)
                      .attribute('max', Bird1.dist_fMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_fMin, Bird1.dist_fMax, Bird1.getF()))
        stdSliderValue.wings.F = _this.F_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setF(_this.F_slider.value())
        _this.F_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_fMin, Bird1.dist_fMax, Bird1.getF()))
        stdSliderValue.walker.F = _this.F_slider.value()
        break
      case 7: // Planet
        Planet1.setF(_this.F_slider.value())
        _this.F_slider.attribute('value', _this.calcSliderPos5(Planet1.dist_fMin, Planet1.dist_fMax, Planet1.getF()))
        stdSliderValue.planet.F = _this.F_slider.value()
        break
      default:
    }
  }

  function sliderGUpdate() {
    // no switch case cuz other module doesn't have slider G
    Walk1.setG(_this.G_slider.value())
    stdSliderValue.walker.G = _this.G_slider.value()

  }

  function sliderXUpdate () {
    Bird1.setX(_this.X_slider.value())
    stdSliderValue.wings.X = _this.X_slider.value()
  }

  function sliderYUpdate () {
    Bird1.setY(_this.Y_slider.value())
    stdSliderValue.wings.Y = _this.Y_slider.value()
  }

  /* from here: wing sliders */
  this.calcSliderPos3 = function(min, max, value) { // Wings
    return map(value,0,400,min,max)
  }


  this.mySketch_ModuleText = function(entity, index){

    if(_this.linked){
      //hide all unnecessary UI widgets
      _this.selectParent.forEach(function(s){ s.hide() });
      _this.btnDelete.forEach(function(b,i){ b.hide() });
      _this.btnPlus.forEach(function(b,i){ b.hide() });
      _this.btnMinus.forEach(function(b,i){ b.hide() });
      _this.btnRotateCW.forEach(function(b,i){ b.hide() });
      _this.btnRotateCCW.forEach(function(b,i){ b.hide() });
      _this.btnFlip.forEach(function(b,i){ b.hide() });
      _this.btnMoveLeft.forEach(function(b,i){ b.hide() });
      _this.btnMoveRight.forEach(function(b,i){ b.hide() });
      _this.btnMoveUp.forEach(function(b,i){ b.hide() });
      _this.btnMoveDown.forEach(function(b,i){ b.hide() });

      //and then redraw for linked module
      var title = ''
          ,y    = 85 + (index-1)*160

      if(entity.linkedTo == undefined) { //either parent or not linked
        fill(50)
        rect(0,y-50, 270,30) //(x,y,width,height) for module layer

        if (entity.linkedFrom != undefined){ //linked as parent
          //module specific interface
          if(entity.module == 1){
            title = "Flapping "
          } else if(entity.module == 3){
            title = "Flying "
          } // no entity.modue == 5, since walker can't be linked

          if(entity.linkedFrom == 1){
            title += " && Flapping"
          } else if(entity.linkedFrom == 3){
            title += " && Flying"
          }

          fill(0)
          text("Position: ", 25, y)
          text(_this.posX+50,          125, y) //position
          _this.btnXplus.position(  100, y-15).show()
          _this.btnXminus.position( 150, y-15).show()
          text(_this.posY+50,          210, y)
          _this.btnYplus.position(  180, y-15).show()
          _this.btnYminus.position( 240, y-15).show()

          text("Scale: ",    25, y+30)
          text(100+_this.scale*10,         130, y+30) //scale
          _this.btnEnlarge.position(100, y+15).show() //let's save manually
          _this.btnEnsmall.position(160, y+15).show()

          text("Rotation: ", 25, y+60)
          text("360",        100, y+60) //rotate

          text("Linking: ",    25, y+90) //rotate
          _this.selectDriver.position(20, y+100).show()

          _this.selectDirection.position(150, y+100).show()
          _this.cancelLink.position(150, y+150).show()

        } else if(entity.linkedTo == undefined) { //entity.linkedFrom != undefined && linkedTo != undefined, this is individual module
          //module specific interface
          if(entity.module == 1){
            title = "Flapping"
          }
          if(entity.module == 3){
            title = "Flying"
          }
          if(entity.module == 5){
            title = "Walking"
          }

          fill(255)
          text("Module "+ index + ": "+ title, 25, y-30) //index should be done in different way
          _this.btnDelete[index].position(170, y-20).show()

          fill(0)
          text("Position: ",  25, y)
          var drawingX = (entity.x == undefined) ? 0 : entity.x
          var drawingY = (entity.y == undefined) ? 0 : entity.y
          text(drawingX,           125, y) //position
          _this.btnMoveLeft[index].position( 100, y-15).show()
          _this.btnMoveRight[index].position(145, y-15).show()
          text(drawingY,           220, y)
          _this.btnMoveUp[index].position( 190, y-15).show()
          _this.btnMoveDown[index].position(235, y-15).show()

          text("Scale: ",     25, y+30)
          text(100+_this.scale*10,         130, y+30) //scale
          _this.btnPlus[index].position(100, y+15).show()
          _this.btnMinus[index].position(160, y+15).show()


          text("Rotation: ",  25, y+60)
          _this.btnRotateCW[index].position(100, y+45).show()
          _this.btnRotateCCW[index].position(150, y+45).show()
          _this.btnFlip[index].position(210, y+45).show()

          fill(tempC)
          rect(180,y-43,15,15)
          _this.btnDelete[index].position(    210, y-45).show()

        }

        fill(255)
        text("Module "+ index + ": "+ title, 25, y-30) //index should be done in different way

      } else {  //linked as child, should have been drawn above by parent
        //if((entity.linkedFrom == undefined) && (entity.linkedTo != undefined)) --> entity.linkedFrom == undefined
          return
      }  //end of if (this.linked == true)

    } else if (!_this.linked) { // if all modules are individual (this.linked == false)
      //clear all unrelated UI widgets
      this.btnXplus.hide()
      this.btnXminus.hide()
      this.btnYplus.hide()
      this.btnYminus.hide()
      this.selectDriver.hide()
      this.selectDirection.hide()
      this.cancelLink.hide()
      //
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height) for module layer
      fill(0)

      var y = (index < 2) ? 85 : 85 + (index-1)*175//override empty default obejct (index == 0)

      var title = ''
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height) layer title

      //module specific interface
      if(entity.module == 1){
        //remove myself before to show selector
        var selectedParent = _this.selectParent[index];
        selectedParent.changed(mySelectedEvent)
                      .position(100, y+75)
                      .show();
        text("Link: ",     25, y+90) //walker does not need this

        title = "Flapping"
      } else if(entity.module == 3){
        // _this.selectParent[index].remove(_this.selectParent[index].index)
        var selectedParent = _this.selectParent[index];
        selectedParent.changed(mySelectedEvent)
                      .position(100, y+75)
                      .show();
        text("Link: ",      25, y+90) //walker does not need this

        title = "Flying"
      } else if(entity.module == 5){
        title = "Walking"
      } else {
        console.log("This should not happens")
      }
      fill(255)
      text("Module "+ index + ": "+ title, 25, y-30)

      fill(0)
      text("Position: ",  25, y)
      var drawingX = (entity.x == undefined) ? 0 : entity.x
      var drawingY = (entity.y == undefined) ? 0 : entity.y
      text(drawingX,           125, y) //position
      _this.btnMoveLeft[index].position( 100, y-15).show()
      _this.btnMoveRight[index].position(145, y-15).show()
      text(drawingY,           220, y)
      _this.btnMoveUp[index].position( 190, y-15).show()
      _this.btnMoveDown[index].position(235, y-15).show()

      text("Scale: ",     25, y+30)
      text(100+_this.scale*10,         130, y+30) //scale
      _this.btnPlus[index].position(100, y+15).show()
      _this.btnMinus[index].position(160, y+15).show()


      text("Rotation: ",  25, y+60)
      _this.btnRotateCW[index].position(100, y+45).show()
      _this.btnRotateCCW[index].position(150, y+45).show()
      _this.btnFlip[index].position(210, y+45).show()

      fill(tempC)
      rect(180,y-43,15,15)
      _this.btnDelete[index].position(    210, y-45).show()

    }
  }

function deleteModule(){
  var id = this.elt.id.slice(-1) //event sending module element in arr
  delete _this.mySavedSketch[id] //remove from saved btn
}

//**************** event handlers for linking actio
  function mySelectedEvent(){ //anonymous function to deal with selection event

    // this.elt.id: caller selector(link from)
    // this.elt.value: selected option value from that selector (linked to)
    var caller = this.elt.id
    var callee = this.elt.value.slice(-1) //"module3" etc. get the last character - linked module

    //console.log("linked from: ", caller, " linked to: ", callee)
    _this.mySavedSketch[caller].linkedTo = callee //etc. caller(later) is linked to option
    _this.mySavedSketch[callee].linkedFrom = caller //caller, linked each other

    //match gear size and motorType
    _this.mySavedSketch[caller].servoAngle = _this.mySavedSketch[callee].servoAngle
    _this.mySavedSketch[caller].gearSize = _this.mySavedSketch[callee].gearSize

    //this is for same modules are attached
    if(_this.mySavedSketch[caller].module == _this.mySavedSketch[callee].module){
      _this.mySavedSketch[caller].x = 67 //this should be parents' gear size
      _this.mySavedSketch[caller].y = -47 //default is attach right, so only  need 'x' mvmt info

    //this is for wing -> flower
    } else if ((_this.mySavedSketch[caller].module == 3) && (_this.mySavedSketch[callee].module == 1)){
      _this.mySavedSketch[caller].x = 200
      _this.mySavedSketch[caller].y = 62

    } else if ((_this.mySavedSketch[caller].module == 1) && (_this.mySavedSketch[callee].module == 3)){
      _this.mySavedSketch[caller].x = 67
      _this.mySavedSketch[caller].y = -170
    }
    //this is for wing -> flower

    if(!_this.linked){
      _this.selectDriver.attribute('id', 0).option('Module '+caller +' to '+callee) //add each other
      _this.selectDriver.attribute('id', 1).option('Module '+callee+' to '+caller)
    }

    _this.master  = caller
    _this.slave   = callee
    _this.linked  = true //-->> if delete is called, this should be revoked again
  }

  function mySelectedLinkParent(){ //when two modules are linked
    //toggle linking parents and child
  }

  function mySelectedLinkDirection(){
    var direction = this.elt.value
        ,idM = _this.master //linking caller's index in save module array
        ,idS = _this.slave

        ,callerType = _this.mySavedSketch[idM].module
        ,angle      = _this.mySavedSketch[idS].rotation
    console.log('callerType: ', callerType)

    //this is when same gears of size2 attached
    if((_this.mySavedSketch[idM].module == 1)&& (_this.mySavedSketch[idS].module ==1)){
      if((angle == 180) || (angle == 360)){ //this is stupid now, but..
        if(direction == 'Right'){
          _this.mySavedSketch[idM].x = -36 //why not 0?
          _this.mySavedSketch[idM].y = 67

        } else if(direction == 'Left'){
          _this.mySavedSketch[idM].x = -167
          _this.mySavedSketch[idM].y = -50

        } else if(direction == 'Up'){
          _this.mySavedSketch[idM].x = -53 //why not 0??
          _this.mySavedSketch[idM].y = -167

        } else if(direction == 'Down'){
          _this.mySavedSketch[idM].x = 67
          _this.mySavedSketch[idM].y = -50 //why not 0??

        } else if(direction == 'Merge'){
          _this.mySavedSketch[idM].x = -350 //should be '0' to overlap gears
          _this.mySavedSketch[idM].y = -50
          // _this.mySavedSketch[idS].linked = true

        } else {
          console.log("mySelectedLinkDirection(): this should not happen")
        }
      } else if ((angle == 90) || (angle == 270)) {
        if(direction == 'Right'){
            _this.mySavedSketch[idM].x = -53 //why not 0??
            _this.mySavedSketch[idM].y = -167
        } else if(direction == 'Left'){
            _this.mySavedSketch[idM].x = -36 //why not 0?
            _this.mySavedSketch[idM].y = 67
        } else if(direction == 'Up'){
            _this.mySavedSketch[idM].x = -167
            _this.mySavedSketch[idM].y = -50
        } else if(direction == 'Down'){
          _this.mySavedSketch[idM].x = 67
          _this.mySavedSketch[idM].y = -50 //why not 0??
        } else if(direction == 'Merge'){
          _this.mySavedSketch[idM].x = -34 //should be '0' to overlap gears
          _this.mySavedSketch[idM].y = -44

        } else {
          console.log("mySelectedLinkDirection(): this should not happen")
        }
      }
    } else if((_this.mySavedSketch[idS].module == 1) && (_this.mySavedSketch[idM].module == 3)){ //when wing is linked to flower
      if(direction == 'Right'){
        _this.mySavedSketch[idM].x = 200
        _this.mySavedSketch[idM].y = 62 //why not 0??

      } else if(direction == 'Left'){
        _this.mySavedSketch[idM].x = -167
        _this.mySavedSketch[idM].y = 62

      } else if(direction == 'Up'){
        _this.mySavedSketch[idM].x = -50 //why not 0??
        _this.mySavedSketch[idM].y = -50

      } else if(direction == 'Down'){
        _this.mySavedSketch[idM].x = -50 //why not 0?
        _this.mySavedSketch[idM].y = 190

      } else if(direction == 'Merge'){
        _this.mySavedSketch[idM].x = -340 //should be '0' to overlap gears
        _this.mySavedSketch[idM].y = 70
      }
    } else if((_this.mySavedSketch[idS].module == 3) && (_this.mySavedSketch[idM].module) == 1){ //when flower is linked to wing
      if(direction == 'Right'){
        _this.mySavedSketch[idM].x = 67
        _this.mySavedSketch[idM].y = -170 //why not 0??

      } else if(direction == 'Left'){
        _this.mySavedSketch[idM].x = -300
        _this.mySavedSketch[idM].y = -170

      } else if(direction == 'Up'){
        _this.mySavedSketch[idM].x = -50 //why not 0??
        _this.mySavedSketch[idM].y = -300

      } else if(direction == 'Down'){
        _this.mySavedSketch[idM].x = -50 //why not 0?
        _this.mySavedSketch[idM].y = -50

      } else if(direction == 'Merge'){
        _this.mySavedSketch[idM].x = -50 //should be '0' to overlap gears
        _this.mySavedSketch[idM].y = -150
      }
    }
    // this is too manual, need refactoring..
    else if((_this.mySavedSketch[idM].module == 3)&& (_this.mySavedSketch[idS].module ==3)){
      if((angle == 180) || (angle == 360)){
        if(direction == 'Right'){
          _this.mySavedSketch[idM].x = -36 //why not 0?
          _this.mySavedSketch[idM].y = -47

        } else if(direction == 'Left'){
          _this.mySavedSketch[idM].x = -167
          _this.mySavedSketch[idM].y = -50

        } else if(direction == 'Up'){
          _this.mySavedSketch[idM].x = -53 //why not 0??
          _this.mySavedSketch[idM].y = -167

        } else if(direction == 'Down'){
          _this.mySavedSketch[idM].x = 75
          _this.mySavedSketch[idM].y = 40 //why not 0??

        } else if(direction == 'Merge'){
          _this.mySavedSketch[idM].x = -50 //should be '0' to overlap gears
          _this.mySavedSketch[idM].y = -50

        } else {
          console.log("mySelectedLinkDirection(): this should not happen")
        }
      }
    } //EOIF
  } //EOF

  function rotationUpdated(){ //rotation degree is updated by slider(or button)
    var sender = this.elt.id.slice(-1)
        ,value = _this.mySavedSketch[sender].rotation
    //     ,value = _this.sliderRotation[sender].value()

    if(value != undefined)
      _this.mySavedSketch[sender].rotation += 90
    else
      _this.mySavedSketch[sender].rotation = 90

    if (_this.mySavedSketch[sender].rotation > 360)
        _this.mySavedSketch[sender].rotation -= 360

    console.log("rotation value: ", _this.mySavedSketch[sender].rotation)
  }

  function scaleUpdate(){
    var firstChar = this.elt.id//.charAt(0)
    console.log(firstChar)

    if(firstChar == '+')
      _this.scale += 1
    else if(firstChar == '-')
      _this.scale -= 1
  }

  this.getScaling = function(){
    return _this.scale
  }
  this.getPosX = function(){
    return _this.posX
  }
  this.getPosY = function(){
    return _this.posY
  }
}
function test(){
  console.log("Outside Function");
}