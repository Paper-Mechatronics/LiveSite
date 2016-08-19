function Turtle(){

  this.oldx = width/2
  this.oldy = height/2
  this.x = this.oldx
  this.y = this.oldy
  this.angle = 0
  this.tcolor = color(255,0,0)

  this.forward = function(step) {
    this.x = this.oldx - (step * cos(radians(this.angle+90)))
    this.y = this.oldy - (step * sin(radians(this.angle+90)))
    line(this.oldx,this.oldy,this.x,this.y)
    this.oldx = this.x
    this.oldy = this.y
  }
  this.back = function(step) {
    this.x = this.oldx + (step * cos(radians(this.angle+90)))
    this.y = this.oldy + (step * sin(radians(this.angle+90)))
    line(this.oldx,this.oldy,this.x,this.y)
    this.oldx = this.x
    this.oldy = this.y
  }
  this.left = function(dangle){
    this.angle -= dangle
  }
  this.right = function(dangle){
    // console.log("here is in turtle, passed parameter ", dangle)
    this.angle += dangle
    // console.log("here is in turtle, calculated angel: ", this.angle)
  }
  function rightPass(dangle){
    console.log(dangle)
  }
  this.pencolor = function(ncolor){
    this.tcolor = ncolor
    stroke (this.tcolor)
  }
  this.pendown = function(){
    stroke(this.tcolor)
  }
  this.penup = function(){
    noStroke()
  }
  this.penerase = function(){
    stroke (this.bgColor)
  }
}
