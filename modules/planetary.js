function Planetary(){

  this.angle_increase = .00465// to interlock angles..
  this.initCircling_created = false
  this.initCircling_created2 = false
  this.rotating_angle_increase = .2

  this.t1 = new Turtle() //to calcurate Circling track for Default gear
  this.t2 = new Turtle() //to calcurate Circling track for Additional gear
 //to calcurate Arms

  this.compGears = function(pair,motor){

    this.rad_sun=80
//    this.rad_sun=60
    this.teethHeight1=0.22*this.rad_sun
    this.centerPositionX=width/2+150
    this.centerPositionY=height/2
    this.rotationDirection = 1
    this.rotation_interlock = 0
    this.gear_status =0
    this.planet = 1
    this.drawGear(this.rad_sun,this.centerPositionX,this.centerPositionY,this.teethHeight1,this.gear_status,this.planet)

  this.rad_planet=48
//  this.rad_planet=36
    this.teethHeight2=0.3*this.rad_planet
    this.rotationDirection = -1
    this.rotation_interlock = 0

    if (pair == 1){

      this.circlingCal_0(0)
      this.centerPositionX0=this.rotating_X_0+150
      this.centerPositionY0=this.rotating_Y_0
      this.gear_status = 1
      this.drawGear(this.rad_planet,this.centerPositionX0,this.centerPositionY0,this.teethHeight2,this.gear_status)

      this.drawArm1(this.centerPositionX0,this.centerPositionY0,this.gear_status)

      this.circlingCal_1(1)
      this.centerPositionX1=this.rotating_X_1+150
      this.centerPositionY1=this.rotating_Y_1
      this.gear_status = 2
      this.drawGear(this.rad_planet,this.centerPositionX1,this.centerPositionY1,this.teethHeight2,this.gear_status)

      this.drawArm2(this.centerPositionX1,this.centerPositionY1,this.gear_status)

    }else if(pair == 0){
     this.initCircling_created = false
      this.circlingCal_0(0)
      this.centerPositionX0=this.rotating_X_0+150
      this.centerPositionY0=this.rotating_Y_0
      this.gear_status = 1
      this.drawGear(this.rad_planet,this.centerPositionX0,this.centerPositionY0,this.teethHeight2,this.gear_status)

      this.drawArm1(this.centerPositionX0,this.centerPositionY0,this.gear_status)
   }

    if(motor == 180){
      this.rotateCircling(1) // motor 180
    }else if(motor ==360){
      this.rotateCircling(0) // motor 360
    }
    this.EachrotatePlanet()

  }

  this.rotateCircling = function(M_status){

    this.rotating_angle_0=this.rotating_angle_0+this.rotating_angle_increase
    this.rotating_angle_1=this.rotating_angle_1+this.rotating_angle_increase

    this.rotationAngle = this.rotationAngle + this.angle_increase

    if(M_status == 1){
      if (this.rotating_angle_0>115||this.rotating_angle_0<-60){

        this.rotating_angle_increase=this.rotating_angle_increase*-1
        this.angle_increase = this.angle_increase*-1
      }

    }
 }

 this.initCircling = function(planetID){

    if(this.initCircling_created == false){ // both
      if(planetID == 1){
        this.rotationAngle = 49.99
        this.rotating_angle_0 = 0
        this.rotating_angle_1 = 180.19
        this.initCircling_created = true
      }}
    if(this.initCircling_created2 == false){
      if(planetID == 0){
        this.rotationAngle = 50
        this.rotating_angle_0 = 0
        this.initCircling_created2 = true
      }}
  }

  this.circlingCal_0 = function(){

    this.initCircling(0)

    this.t1.penup()
    this.t1.left(this.rotating_angle_0)
    this.t1.forward(this.rad_sun+this.rad_sun*3/5+this.teethHeight1)

    this.rotating_X_0 = this.t1.x
    this.rotating_Y_0 = this.t1.y

    this.t1.penup()
    this.t1.back(this.rad_sun+this.rad_sun*3/5+this.teethHeight1)
    this.t1.right(this.rotating_angle_0)
  }

  this.circlingCal_1 = function(){

    this.initCircling(1)

    this.t2.penup()
    this.t2.left(this.rotating_angle_1)
    this.t2.forward(this.rad_sun+this.rad_sun*3/5+this.teethHeight1)

    this.rotating_X_1 = this.t2.x
    this.rotating_Y_1 = this.t2.y

    this.t2.penup()
    this.t2.back(this.rad_sun+this.rad_sun*3/5+this.teethHeight1)
    this.t2.right(this.rotating_angle_1)
  }

  this.EachrotatePlanet = function(){

    this.rotationAngle = this.rotationAngle + this.angle_increase
    if (this.rotationAngle == PI ){
     this.rotationAngle = 0
    }
  }

  this.drawGear = function(radius, centerPositionX,centerPositionY,teethHeight,gear_status,planet){

    this.numberOfTeeth=radius/4
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radius
    this.lineY=cos(this.teethAngle/2)*radius+teethHeight

    push()
    translate(centerPositionX, centerPositionY)

    if(gear_status==0){ // sun gear
      rotate(0)
    }else if(gear_status==1 || gear_status ==2){  // planet gears
      rotate(this.rotationAngle*this.rotationDirection+this.rotation_interlock)
    }
    fill(150)
    stroke(255)

    for (var i=0; i<this.numberOfTeeth; i++)
    {
      rotate(this.teethAngle)
      stroke(150)
      strokeWeight(1)
      triangle((-3*this.teethWidth/4)+2,-this.lineY+teethHeight,this.teethWidth/2,-this.lineY+teethHeight, -this.teethWidth/2, -this.lineY)
      triangle((this.teethWidth/4)+2,-this.lineY,-this.teethWidth/2,-this.lineY,this.teethWidth/2,-this.lineY+teethHeight)
      stroke(150)
      strokeWeight(2)
      line(-this.teethWidth/2,-this.lineY,this.teethWidth/2,-this.lineY+teethHeight)
    }
    ellipse(0, 0, 2*(-this.lineY+teethHeight),2*(-this.lineY+teethHeight))

    if (gear_status == 0){ // Sun Gear

      fill(0)
      ellipse(0,0,15,15)

    }else if (gear_status == 1 || gear_status == 2){ // Planet Gear
      stroke(color(tempC))
      strokeWeight(5)
      fill(0)
      ellipse(0,0,15,15)

      noStroke()
      stroke(0)
      strokeWeight(1)
      fill(color(tempC))

      if (gear_status == 1){
        this.pl_X1 = radius-(15*2+radius)
        this.pl_Y1 = radius-50
        ellipse(this.pl_X1,this.pl_Y1,6,6)

      }else if (gear_status ==2){
        this.pl_X2 = radius-15
        this.pl_Y2 = radius-50
        ellipse(this.pl_X2,this.pl_Y2,6,6)

      }
    }
    pop()
}

  this.drawArm1 = function(centerPositionX,centerPositionY,gear_status){
    this.Arm_center = -150
    this.startX = this.Arm_center+this.dist_e
    this.startY = this.dist_f

    this.init()

    var theta = this.rotationAngle*this.rotationDirection+this.rotation_interlock
    var len1 = sqrt(pow(this.pl_X1,2)+pow(this.pl_Y1,2))

    push()
    translate(centerPositionX,centerPositionY)
    // + Math.PI -> due to some mismatch
    stroke(color(tempC))

    this.pl_dot_x1 = len1*cos(theta+Math.PI)
    this.pl_dot_y1 = len1*sin(theta+Math.PI)

    this.dist_z = dist(this.pl_dot_x1,this.pl_dot_y1,this.Axis_X-centerPositionX,this.Axis_Y-centerPositionY)
    this.dist_x = abs(this.pl_dot_x1 - (this.Axis_X-centerPositionX))
    this.dist_y = abs(this.pl_dot_y1 - (this.Axis_Y-centerPositionY))

    pop()

    this.step1_y = sq(this.dist_z) + sq(this.dist_x) - sq(this.dist_y)
    this.step2_y = 2*this.dist_z*this.dist_x
    this.angle_cosine_y = this.step1_y/this.step2_y
    this.step3_y =acos(this.angle_cosine_y)
    this.angle_y =degrees(this.step3_y)

    this.step1_z = sq(this.dist_a) + sq(this.dist_d) - sq(this.dist_z)
    this.step2_z = 2*this.dist_a*this.dist_d
    this.angle_cosine_z = this.step1_z/this.step2_z
    this.step3_z =acos(this.angle_cosine_z)
    this.angle_z =degrees(this.step3_z)

/* Start Calcurating a wing */
    this.t3.penup()
    this.t3.forward(this.startY)
    this.t3.left(90)
    this.t3.forward(this.startX)

    this.Axis_X = this.t3.x
    this.Axis_Y = this.t3.y

    var rightTurn = 180-(this.angle_y+this.angle_d2)

    if(this.Axis_Y < this.pl_dot_y1+centerPositionY){
      rightTurn = 180-(this.angle_y*-1+this.angle_d2)
    }

    this.t3.right(rightTurn)
    this.t3.forward(this.dist_a)

    this.c_x = this.t3.x
    this.c_y = this.t3.y

    var rightTurn2 = 180-(this.angle_z+this.angle_c)

    this.t3.right(rightTurn2)
    this.t3.forward(this.dist_b)

    this.d_x = this.t3.x
    this.d_y = this.t3.y

  // CACULATION IS DONE _ COME BACK TO HOME

    this.t3.back(this.dist_b)
    this.t3.left(rightTurn2)
    this.t3.back(this.dist_a)
    this.t3.left(rightTurn)

    this.t3.back(this.startX)
    this.t3.right(90)
    this.t3.back(this.startY)

    stroke(color(tempC))
    line(this.Axis_X,this.Axis_Y,this.c_x,this.c_y)
    noStroke()
    fill(0)
    ellipse(this.Axis_X,this.Axis_Y,10,10) // Axis
    //fill(0)
    fill(color(tempC))
    triangle(this.c_x,this.c_y,this.d_x,this.d_y,this.pl_dot_x1+centerPositionX,this.pl_dot_y1+centerPositionY)
  }

  this.drawArm2 = function(centerPositionX,centerPositionY,gear_status){
    this.startX = this.Arm_center-this.dist_e

    this.init()

    var theta2 = this.rotationAngle*this.rotationDirection+3
    var len2 = sqrt(pow(this.pl_X2,2)+pow(this.pl_Y2,2))

    push()
    translate(centerPositionX,centerPositionY)
    // + Math.PI -> due to some mismatch
    stroke(color(tempC))

      this.pl_dot_x2 = len2*cos(theta2+Math.PI)
      this.pl_dot_y2 = len2*sin(theta2+Math.PI)

      this.dist_z2 = dist(this.pl_dot_x2,this.pl_dot_y2,this.Axis_X2-centerPositionX,this.Axis_Y2-centerPositionY)
      this.dist_x2 = abs(this.pl_dot_x2 - (this.Axis_X2-centerPositionX))
      this.dist_y2 = abs(this.pl_dot_y2 - (this.Axis_Y2-centerPositionY))

    pop()

    this.step1_y2 = sq(this.dist_z2) + sq(this.dist_x2) - sq(this.dist_y2)
    this.step2_y2 = 2*this.dist_z2*this.dist_x2
    this.angle_cosine_y2 = this.step1_y2/this.step2_y2
    this.step3_y2 =acos(this.angle_cosine_y2)
    this.angle_y2 =degrees(this.step3_y2)

    this.step1_z2 = sq(this.dist_a) + sq(this.dist_d) - sq(this.dist_z2)
    this.step2_z2 = 2*this.dist_a*this.dist_d
    this.angle_cosine_z2 = this.step1_z2/this.step2_z2
    this.step3_z2 =acos(this.angle_cosine_z2)
    this.angle_z2 =degrees(this.step3_z2)

/* Start Calcurating a wing */
    this.t4.penup()
    this.t4.forward(this.startY)
    this.t4.left(90)
    this.t4.forward(this.startX)

    this.Axis_X2 = this.t4.x
    this.Axis_Y2 = this.t4.y

    var leftTurn = this.angle_y2+this.angle_d2

    if(this.Axis_Y2 > this.pl_dot_y2+centerPositionY){
      leftTurn = this.angle_y2*-1+this.angle_d2
    }

    this.t4.left(leftTurn)
    this.t4.forward(this.dist_a)

    this.c_x2 = this.t4.x
    this.c_y2 = this.t4.y

    var rightTurn2 = 180-(this.angle_z2+this.angle_c)

    this.t4.right(rightTurn2)
    this.t4.forward(this.dist_b)

    this.d_x2 = this.t4.x
    this.d_y2 = this.t4.y

  // CACULATION IS DONE _ COME BACK TO HOME

    this.t4.back(this.dist_b)
    this.t4.left(rightTurn2)
    this.t4.back(this.dist_a)
    this.t4.right(leftTurn)

    this.t4.back(this.startX)
    this.t4.right(90)
    this.t4.back(this.startY)

    stroke(color(tempC))
    line(this.Axis_X2,this.Axis_Y2,this.c_x2,this.c_y2)
    noStroke()
    fill(0)
    ellipse(this.Axis_X2,this.Axis_Y2,10,10) // Axis

    fill(color(tempC))
    triangle(this.c_x2,this.c_y2,this.d_x2,this.d_y2,this.pl_dot_x2+centerPositionX,this.pl_dot_y2+centerPositionY)
  }

  this.init = function(){
    this.t3 = new Turtle() // for left
    this.t4 = new Turtle() // for right

    this.dist_a = 250
    this.dist_b = 150
    this.dist_c = 180
    this.dist_d = 280
    this.dist_e = 350
    this.dist_f = 0

    this.step1_c = sq(this.dist_b) + sq(this.dist_d) - sq(this.dist_c)
    this.step2_c = 2*this.dist_b*this.dist_d
    this.angle_cosine_c = this.step1_c/this.step2_c
    this.step3_c =acos(this.angle_cosine_c)
    this.angle_c =degrees(this.step3_c)

    this.step1_d2 = sq(this.dist_a) + sq(this.dist_z) - sq(this.dist_d)
    this.step2_d2 = 2*this.dist_a*this.dist_z
    this.angle_cosine_d2 = this.step1_d2/this.step2_d2
    this.step3_d2 =acos(this.angle_cosine_d2)
    this.angle_d2 =degrees(this.step3_d2)
  }

  // get functions
  this.getA = function(){return this.dist_a;}
  this.getB = function(){return this.dist_b;}
  this.getC = function(){return this.dist_c;}
  this.getD = function(){return this.dist_d;}
  this.getE = function(){return this.dist_e;}
  this.getF = function(){return this.dist_f;}

  this.setA = function(newA){
    this.dist_a = newA
    if (newA > this.dist_aMin && newA < this.dist_aMax){
      this.updateSim()
      return true
    }
    return false
  }
  this.setB = function(newB){
    this.dist_b = newB
    if (newB>this.dist_bMin && newB<this.dist_bMax){
      this.updateSim()
      return true
    }
      return false
  }
  this.setC = function(newC){
    this.dist_c = newC
    if (newC>this.dist_cMin && newC<this.dist_cMax){
      this.updateSim()
      return true
    }
      return false
  }
  this.setD = function(newD){
    this.dist_d = newD
    if (newD > this.dist_dMin && newD < this.dist_dMax){
      this.updateSim()
      return true
    } //need else anyway - if min and max was well defined, this should not happen
      return false
  }
  this.setE = function(newE){
    this.dist_e = newE
  }
  this.setF = function(newF){
    this.dist_f = newF
  }

  this.updateSim = function(){
    this.dist_aMin = abs(this.dist_b-(this.dist_c+this.dist_d))+this.lengthGap
    this.dist_aMax = this.dist_b+this.dist_c+this.dist_d-this.lengthGap

    this.dist_bMin = abs(this.dist_a-(this.dist_c+this.dist_d))+this.lengthGap
    this.dist_bMax = this.dist_a+this.dist_c+this.dist_d-this.lengthGap

    this.dist_cMin = -5
    this.dist_cMax = 400

    //d must be calculated by E and 'part of' C
    this.dist_dMin = abs(this.dist_b-this.dist_a)-this.dist_c+this.lengthGap
    this.dist_dMax = (this.dist_a+this.dist_b)-this.dist_c-this.lengthGap

    this.dist_eMin = 200
    this.dist_eMax = 450

    this.dist_fMin = -150
    this.dist_fMax = 150

    return true
  }

}
