function updateUI(){
  if(radius == 80){
    $('#setLargeGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear').css("background-image", "none") 
    $('#setSmallGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#fff")
    $('#setMedGear').css("color", "#000") 
    $('#setSmallGear').css("color", "#000") 
  }
  else if(radius == 64){
    $('#setMedGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGear').css("background-image", "none") 
    $('#setSmallGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#000")
    $('#setMedGear').css("color", "#fff") 
    $('#setSmallGear').css("color", "#000") 
  }
  else if(radius == 48){
    $('#setSmallGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear').css("background-image", "none") 
    $('#setLargeGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#000")
    $('#setMedGear').css("color", "#000") 
    $('#setSmallGear').css("color", "#fff") 
  }
}
function updateFlapUI(){
  if(compositeArray[0].radius == 80){
    $('#setLargeGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearL').css("background-image", "none") 
    $('#setSmallGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#fff")
    $('#setMedGearL').css("color", "#000") 
    $('#setSmallGearL').css("color", "#000") 
  }
  else if(compositeArray[0].radius == 64){
    $('#setMedGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGearL').css("background-image", "none") 
    $('#setSmallGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#000")
    $('#setMedGearL').css("color", "#fff") 
    $('#setSmallGearL').css("color", "#000") 
  }
  else if(compositeArray[0].radius == 48){
    $('#setSmallGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearL').css("background-image", "none") 
    $('#setLargeGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#000")
    $('#setMedGearL').css("color", "#000") 
    $('#setSmallGearL').css("color", "#fff") 
  }
  if(compositeArray[1].radius == 80){
    $('#setLargeGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearR').css("background-image", "none") 
    $('#setSmallGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#fff")
    $('#setMedGearR').css("color", "#000") 
    $('#setSmallGearR').css("color", "#000") 
  }
  else if(compositeArray[1].radius == 64){
    $('#setMedGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGearR').css("background-image", "none") 
    $('#setSmallGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#000")
    $('#setMedGearR').css("color", "#fff") 
    $('#setSmallGearR').css("color", "#000") 
  }
  else if(compositeArray[1].radius == 48){
    $('#setSmallGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearR').css("background-image", "none") 
    $('#setLargeGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#000")
    $('#setMedGearR').css("color", "#000") 
    $('#setSmallGearR').css("color", "#fff") 
  }

  if(compositeArray[0].isMotor){
    $('#setDriveGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setDriveGearR').css("background-image", "none") 
    $('#setDriveGearR').css("color", "#000")
    $('#setDriveGearL').css("color", "#fff")
  }
  else if(compositeArray[1].isMotor){
    $('#setDriveGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setDriveGearL').css("background-image", "none") 
    $('#setDriveGearL').css("color", "#000")
    $('#setDriveGearR').css("color", "#fff")
  }
}

function rotationUI(){
  if(compositeArray[1].alternate){
    $('#alternate').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#continuous').css("background-image", "none") 
    $('#continuous').css("color", "#000")
    $('#alternate').css("color", "#fff")
  }
  else if(!compositeArray[1].alternate){
    $('#continuous').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#alternate').css("background-image", "none") 
    $('#alternate').css("color", "#000")
    $('#continuous').css("color", "#fff")
  }
}
function sliderDisplay(){
  if(!openCloseMod){
    $('.hideThis').hide()
    $('.hideThis2').show()
  }
  else{
    $('.hideThis').show()
    $('.hideThis2').hide()
  }
}