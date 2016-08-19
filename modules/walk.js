function Walk(){

  var startingX = 270/2 // center X: width/2 + left gray panel width*1/2
  var startingY = 100   // center Y: height/2-100
  var angle = 0  // starting angle
  var tempC_walker = color(tempC)
  this.lengthGap = 10

  this.init = function(){
  // parameterized values
    this.dist_a = 180
    this.dist_b = 150
    this.dist_c = 150
    this.dist_d = 190
    this.dist_e = 250
    this.dist_f = 280
    this.dist_g = 230
  }

  this.init2 = function(){
    // rotating center
    this.w_center_x2 = 75*1/2*sin(radians(angle))+this.w_center_x
    this.w_center_y2 = 75*1/2*cos(radians(angle))+this.w_center_y

    this.rad = atan2(this.w_center_y2-this.AG_y,this.w_center_x2-this.AG_x) // LEFT
    this.degD = this.rad/PI*180 // LEFT
    this.rad2 = atan2(this.w_center_y2-this.AG_y2,this.w_center_x2-this.AG_x2) // RIGHT
    this.degD2 = this.rad2/PI*180 // RIGHT
    this.temp_L_x2 = sqrt(sq(this.w_center_x2-this.AG_x)+sq(this.w_center_y2-this.AG_y)) // Left
    this.temp_R_x2 = sqrt(sq(this.w_center_x2-this.AG_x2)+sq(this.w_center_y2-this.AG_y2)) // RIGHT

    //triangle AE-L up : LEFT
    this.step1_AL = sq(this.dist_a) + sq(this.temp_L_x2) - sq(this.dist_e)
    this.step2_AL = 2*this.dist_a*this.temp_L_x2
    this.angle_cosine_AL = this.step1_AL/this.step2_AL
    this.step3_AL = acos(this.angle_cosine_AL)
    this.angle_AL = degrees(this.step3_AL)

    //triangle CF-L down : LEFT
    this.step1_CL = sq(this.dist_c) + sq(this.temp_L_x2) - sq(this.dist_f)      //numerator
    this.step2_CL = 2*this.dist_c*this.temp_L_x2                     // denominator
    this.angle_cosine_CL = this.step1_CL/this.step2_CL
    this.step3_CL = acos(this.angle_cosine_CL)
    this.angle_CL = degrees(this.step3_CL)

    //triangle AE-R up : RIGHT
    this.step1_AR = sq(this.dist_a) + sq(this.temp_R_x2) - sq(this.dist_e)
    this.step2_AR = 2*this.dist_a*this.temp_R_x2
    this.angle_cosine_AR = this.step1_AR/this.step2_AR
    this.step3_AR = acos(this.angle_cosine_AR)
    this.angle_AR = degrees(this.step3_AR)

    //triangle CF-R down : RIGHT
    this.step1_CR = sq(this.dist_c) + sq(this.temp_R_x2) - sq(this.dist_f)      //numerator
    this.step2_CR = 2*this.dist_c*this.temp_R_x2                     // denominator
    this.angle_cosine_CR = this.step1_CR/this.step2_CR
    this.step3_CR = acos(this.angle_cosine_CR)
    this.angle_CR = degrees(this.step3_CR)

    this.turn_L1 = 180 - ((90-this.degD) + this.angle_AL)
    this.turn_R1 = 180 - ((90+this.degD2) + this.angle_AR)
  }

  this.compWalk = function(pair_leg,add,gear_size,tempC_new){

    if(gear_size ==1){
      this.radius= 50
    }else if(gear_size ==2){
      this.radius= 75
    }else if(gear_size ==3){
      this.radius= 100
    }else if(gear_size ==4){
      this.radius= 125
    }
    tempC_walker = tempC_new

    if(add == 0){
      noStroke()
      fill(150)
      ellipse(this.w_center_x,this.w_center_y,this.radius+25,this.radius+25)  // center Gear
      fill(0)
      ellipse(this.w_center_x,this.w_center_y,10,10)  // center Gear point
    }

    fill(color(tempC_walker))
    ellipse(this.w_center_x2,this.w_center_y2,10,10) // center rotating pivot

    this.drawWalk(pair_leg)

  }

  this.drawWalk = function(pair_leg){
    this.init2()
    this.t5 = new Turtle() // for LEFT
    this.t6 = new Turtle() // for RIGHT

    // start Calcurate for Left
    this.t5.penup()
    this.t5.forward(startingY)
    this.t5.right(90)
    this.t5.forward(startingX) //center
        this.w_center_x = this.t5.x
        this.w_center_y = this.t5.y
    this.t5.back(this.dist_g)
    this.t5.left(90)
        this.AG_x = this.t5.x
        this.AG_y = this.t5.y
    this.t5.right(this.turn_L1)
    this.t5.forward(this.dist_a)
        this.AE_x = this.t5.x
        this.AE_y = this.t5.y
    this.t5.back(this.dist_a)
    this.t5.left(90)
    this.t5.forward(this.dist_b)
        this.B_x = this.t5.x
        this.B_y = this.t5.y
    this.t5.back(this.dist_b)
    this.t5.right(90)
    this.t5.right(this.angle_AL+this.angle_CL)
    this.t5.forward(this.dist_c)
        this.CF_x = this.t5.x
        this.CF_y = this.t5.y
    var angleBC2 = 360-(90+this.angle_AL+this.angle_CL)
    // calcurating the angle to draw the side D
    this.t5.left(180-angleBC2-90)
    this.t5.forward(this.dist_d)
        this.D_x = this.t5.x
        this.D_y = this.t5.y
    this.t5.back(this.dist_d)
    this.t5.right(90)
    this.t5.forward(this.dist_b)
        this.B2_x = this.t5.x
        this.B2_y = this.t5.y

    // back to home
    this.t5.back(this.dist_b)
    this.t5.left(90)
    this.t5.right(180-angleBC2-90)
    this.t5.left(this.angle_AL+this.angle_CL)
    this.t5.back(this.dist_c)
    this.t5.left(this.turn_L1)
    this.t5.right(90)
    this.t5.forward(this.dist_g)
    this.t5.back(startingX)
    this.t5.left(90)
    this.t5.back(startingY)

    stroke(color(tempC_walker))
    line(this.AE_x,this.AE_y,this.w_center_x2,this.w_center_y2)
    fill(0)
    ellipse(this.AG_x,this.AG_y,10,10)  // fixed pivot for RIGHT

    // Draw Legs
    stroke(color(tempC_walker))
    line(this.AE_x,this.AE_y,this.w_center_x2,this.w_center_y2) // SIDE E
    line(this.AG_x,this.AG_y,this.CF_x,this.CF_y) // SIDE C
    line(this.B_x,this.B_y,this.B2_x,this.B2_y) // SIDE C2
    line(this.CF_x,this.CF_y,this.w_center_x2,this.w_center_y2) // SIDE F
    fill(color(tempC_walker))
    triangle(this.AG_x,this.AG_y,this.B_x,this.B_y,this.AE_x,this.AE_y)
    triangle(this.B2_x,this.B2_y,this.D_x,this.D_y,this.CF_x,this.CF_y)
    noStroke()
    fill(0)
    ellipse(this.AG_x,this.AG_y,10,10)  // fixed pivot for LEFT

  if (pair_leg == 1){
//        console.log("PAIRED LEGS")

    // RIGHT LEG
    this.t6.penup()
    this.t6.forward(startingY)
    this.t6.right(90)
    this.t6.forward(startingX) //center
    this.t6.back(this.dist_g*-1)
    this.t6.left(90*-1)
        this.AG_x2 = this.t6.x
        this.AG_y2 = this.t6.y
    this.t6.right(this.turn_R1*-1)
    this.t6.forward(this.dist_a)
        this.AE_x2 = this.t6.x
        this.AE_y2 = this.t6.y
    this.t6.back(this.dist_a)
    this.t6.right(90)
    this.t6.forward(this.dist_b)
        this.B_x2 = this.t6.x
        this.B_y2 = this.t6.y
    this.t6.back(this.dist_b)
    this.t6.left(90)
    this.t6.left(this.angle_AR+this.angle_CR)
    this.t6.forward(this.dist_c)
        this.CF_x2 = this.t6.x
        this.CF_y2 = this.t6.y

    var angleBC2_R = 360-(90+this.angle_AR+this.angle_CR)
    this.t6.right(180-angleBC2_R-90)
    this.t6.forward(this.dist_d)
        this.D_x2 = this.t6.x
        this.D_y2 = this.t6.y
    this.t6.back(this.dist_d)
    this.t6.left(90)
    this.t6.forward(this.dist_b)
        this.B2_x2 = this.t6.x
        this.B2_y2 = this.t6.y
    this.t6.back(this.dist_b)
    this.t6.right(90)
    this.t6.left(180-angleBC2_R-90)
    this.t6.right(this.angle_AR+this.angle_CR)
    this.t6.back(this.dist_c)
    this.t6.back(this.dist_a)
    this.t6.left(this.turn_R1*-1)
    this.t6.right(90*-1)
    this.t6.forward(this.dist_g*-1)
    this.t6.back(startingX)
    this.t6.left(90)
    this.t6.back(startingY)

    stroke(color(tempC_walker))
    line(this.AE_x2,this.AE_y2,this.w_center_x2,this.w_center_y2) // SIDE E RIGHT
    line(this.CF_x2,this.CF_y2,this.w_center_x2,this.w_center_y2) // SIDE F RIGHT
    line(this.AG_x2,this.AG_y2,this.CF_x2,this.CF_y2) // SIDE C RIGHT
    line(this.B_x2,this.B_y2,this.B2_x2,this.B2_y2)
    fill(color(tempC_walker))
    triangle(this.AG_x2,this.AG_y2,this.B_x2,this.B_y2,this.AE_x2,this.AE_y2)
    triangle(this.B2_x2,this.B2_y2,this.D_x2,this.D_y2,this.CF_x2,this.CF_y2)
    noStroke()
    fill(0)
    ellipse(this.AG_x2,this.AG_y2,10,10)  // fixed pivot for RIGHT
}else{

}

    angle = angle+1
    if(angle>360){
      angle = 0
    }
 }

 this.walkUI = function(UI_mode,rec_color){

    if(UI_mode == 1){
      fill(150)
      stroke(150)
      triangle(115,40,115,85,65,85)
      triangle(115,180,115,125,65,125)
      line(115,85,115,125)
      line(65,85,65,125)
      line(115,40,195,85)
      line(115,125,195,85)
      noStroke()
      fill(0)
      ellipse(115,85,6,6)
      ellipse(195,85,6,6)
      text("A", 120,70)
      text("B", 87,100)
      text("C", 120,110)
      text("D", 120,155)
      text("E", 163,62)
      text("F", 163,120)

      rect(210,160,15,20)
      fill(255)
      text("1", 213, 175)
      noFill()
      stroke(0)
      rect(230,160,15,20)
      fill(0)
      text("2", 233, 175)

    }else if(UI_mode == 2){
      fill(200)
      ellipse(195,110,55,55)
      fill(0)
      ellipse(60,110,6,6)
      ellipse(195,110,6,6)

      stroke(0)
      line(60,110,195,110)
      noStroke()
      text("G", 125,130)
      stroke(0)
      noFill()
      rect(210,160,15,20)
      fill(0)
      text("1", 213, 175)
      rect(230,160,15,20)
      fill(255)
      text("2", 233, 175)

    }

    if (rec_color == 0){
      this.rec_color = colorsend_1
    }else if(rec_color == 1){
      this.rec_color = colorsend_2
    }else if(rec_color == 2){
      this.rec_color = colorsend_3
    }
    stroke(0)
    fill(this.rec_color)
    rect(205,347,17,17)

    if(rec_color == 3){
      noStroke()
      fill(bgcolor2)
      rect(20,338,220,32)
    }
 }

 // get functions
 this.getA = function(){return this.dist_a;}
 this.getB = function(){return this.dist_b;}
 this.getC = function(){return this.dist_c;}
 this.getD = function(){return this.dist_d;}
 this.getE = function(){return this.dist_e;}
 this.getF = function(){return this.dist_f;}
 this.getG = function(){return this.dist_g;}

 // set functions
 this.setA = function(newA){
   if (newA > this.dist_aMin && newA < this.dist_aMax){
     console.log("dist_a for walker is updating")
     this.dist_a = newA
     this.updateSim()
     return true
   }
   return false
 }
 this.setB = function(newB){
   if (newB>this.dist_bMin && newB<this.dist_bMax){
     this.dist_b = newB
     this.updateSim()
     return true
   }
     return false
 }
 this.setC = function(newC){
   if (newC>this.dist_cMin && newC<this.dist_cMax){
     this.dist_c = newC
     this.updateSim()
     return true
   }
     return false
 }
 this.setD = function(newD){

   if (newD > this.dist_dMin && newD < this.dist_dMax){
     this.dist_d = newD
     this.updateSim()

     return true
   } //need else anyway - if min and max was well defined, this should not happen
   return false
 }
 this.setE = function(newE){
   if (newE>this.dist_eMin && newE<this.dist_eMax){
     this.dist_e = newE
     this.updateSim()
     return true
   }
     return false
 }
 this.setF = function(newF){
   if (newF>this.dist_fMin && newF<this.dist_fMax){
     this.dist_f = newF
     this.updateSim()
     return true
   }
     return false
 }

 this.setG = function(newX){
   if (newX>this.gMin && newX<this.gMax){
     this.xx = newG
     return true
   }
     return false
 }

 this.updateSim = function(){

   //maybe this should be re-defined
   this.dist_aMin = abs(this.dist_g-this.dist_e)+this.lengthGap
   this.dist_aMax = this.dist_g+this.dist_e-this.lengthGap

   this.dist_bMin = this.lengthGap
   this.dist_bMax = 300

   this.dist_cMin = abs(this.dist_g-this.dist_f)+this.lengthGap
   this.dist_cMax = this.dist_g+this.dist_f-this.lengthGap

   this.dist_dMin = this.lengthGap
   this.dist_dMax = 300

   this.dist_eMin = abs(this.dist_a-this.dist_g)+this.lengthGap
   this.dist_eMax = this.dist_a+this.dist_g-this.lengthGap

   this.dist_fMin = abs(this.dist_g-this.dist_c)+this.lengthGap
   this.dist_fMax = this.dist_g+this.dist_c-this.lengthGap

   this.dist_gMin = abs(this.dist_a-this.dist_e)+this.lengthGap
   this.dist_gMax = this.dist_a+this.dist_e-this.lengthGap

   return true
 }

}
