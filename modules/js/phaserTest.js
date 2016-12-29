var game = new Phaser.Game(window.innerWidth*0.75, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('gear1', 'assets/sprites/gear1.png');
    game.load.image('gear2', 'assets/sprites/gear2.png');
    game.load.image('gear3', 'assets/sprites/gear3.png');
    game.load.image('gear4', 'assets/sprites/gear4.png');
    game.load.image('halfGear1', 'assets/sprites/halfGear1.png');
    game.load.image('straightGear1', 'assets/sprites/straightGear1.png');

    //game.load.image('gear1', 'assets/sprites/gear.png');
    game.load.image('sprite1', 'assets/sprites/gearCenter.png');
    game.load.image('arrow', 'assets/sprites/gearCenter.png');
    game.load.image('arrow2', 'assets/sprites/gearCenter.png');
    game.load.image('arrow3', 'assets/sprites/gearCenter.png');
    game.load.image('arrow4', 'assets/sprites/gearCenter.png');

     game.load.image('beam1', 'assets/sprites/vu.png');
    game.load.image('beam2', 'assets/sprites/vu.png');
    game.load.image('joint1', 'assets/sprites/orb-blue.png');
    game.load.image('joint2', 'assets/sprites/orb-blue.png');
    game.load.image('joint3', 'assets/sprites/orb-blue.png');
    game.load.image('block1', 'assets/sprites/block.png');
    
    //game.load.image('sky', 'assets/skies/cavern2.png');

    game.load.physics('physicsData', 'assets/physics/sprites.json');
    game.load.physics('gearSet1', 'assets/physics/gearSet1.json');

}

var gear1;
var gear2;
var gear3;
var gear4;
var halfGear1;
var mouseBody;
var mouseConstraint;
var sprite1;
var arrow;
var arrow2;
var arrow3;
var arrow4;
var staticVar = true;
var gear1x;
var gear1y;
var gear2x;
var gear2y;
var gear3x;
var gear3y;
var gear4x;
var gear4y;
var halfGear1x;
var halfGear1y;
var joint1;
var beam1;
var block1;
var straightGear1x;
var straightGear1y;
var isDynamicConstraint = false;
var dynamicConstraintBody;
var dynamicConstraint;
var clickedJoint;
var isJoint = false;
//var dynamicObjects = [ gear1, gear2, gear3, gear4, beam1, joint1, block1, halfGear1, straightGear1]


// var poly;
// var graphics;
// var steps = 100;
// var array = [steps];
// var xValue;
// var yValue;
// var centerX = 100;
// var centerY = 100;
// var radius = 50;

function create() {
    game.stage.backgroundColor = "#cccccc";
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1200;

    // var dynamicBodies = [ gear1, gear2];
    // var dynamicBodyNames = [ 'gear1', 'gear2'];
    // //, gear3, gear4, beam1, joint1, block1, halfGear1, straightGear1
    // for(var i=0; i<dynamicBodies.length;i++){
    //     dynamicBodies[i] =  game.add.sprite((i+1)*200, 200, dynamicBodyNames[i]);
    //     game.physics.p2.enable(dynamicBodies[i], false);
    //     dynamicBodies[i].body.clearShapes();
    //     dynamicBodies[i].body.loadPolygon('gearSet1', dynamicBodyNames[i]);
    //     dynamicBodies[i].body.setCollisionGroup(blockCollisionGroup);
    //     dynamicBodies[i].body.collides([blockCollisionGroup]);
    //     //dynamicBodies[i].body.mass = 10;
    // }


    gear1x = 300;
    gear1y = 300;
    gear2x = 600;
    gear2y = 300;
    gear3x = 990;
    gear3y = 490;
    gear4x = 990;
    gear4y = 720;
    halfGear1x = 300;
    halfGear1y = 800;
    beam1x = 700;
    beam1y = 720;
    beam2x = 900;
    beam2y = 120;
    block1x = 700;
    block1y = 800;
    straightGear1x = 100;
    straightGear1y = 800;

    
    gear1 = game.add.sprite(gear1x, gear1y, 'gear1');
    gear2 = game.add.sprite(gear2x, gear2y, 'gear2');
    gear3 = game.add.sprite(gear3x, gear3y, 'gear3');
    gear4 = game.add.sprite(gear4x, gear4y, 'gear4');
    halfGear1 = game.add.sprite(halfGear1x, halfGear1y, 'halfGear1');
    straightGear1 = game.add.sprite(straightGear1x, straightGear1y, 'straightGear1');


    beam1 = game.add.sprite(beam1x , beam1y, 'beam1');
    beam2 = game.add.sprite(beam2x , beam2y, 'beam2');
    block1 = game.add.sprite(beam1x , beam1y, 'block1');
    
    sprite1 = game.add.sprite(gear1x, gear1y, 'sprite1');
    arrow = game.add.sprite(gear2x, gear2y, 'arrow');
    arrow2 = game.add.sprite(gear3x, gear3y, 'arrow2');
    arrow3 = game.add.sprite(gear4x, gear4y, 'arrow3');
    arrow4 = game.add.sprite(halfGear1x, halfGear1y, 'arrow4');
    joint1 = game.add.sprite(beam1x , beam1y, 'joint1');
    joint2 = game.add.sprite(beam1x , beam1y, 'joint2');
    joint3 = game.add.sprite(beam2x , beam2y, 'joint3');
    
    
    //  Create collision group for the blocks
    var blockCollisionGroup = game.physics.p2.createCollisionGroup();
    var blockCollisionGroup2 = game.physics.p2.createCollisionGroup();
    
    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();
    
    //  Enable the physics bodies on all the sprites
    //game.physics.p2.enable([ gear2, gear3, gear4, beam1, joint1, block1, halfGear1, straightGear1], false);
    
    game.physics.p2.enable([sprite1, arrow, arrow2, arrow3,arrow4, joint1, joint2, joint3]);


    //  So they don't collide with each other
    sprite1.body.clearCollision(true, true);
    arrow.body.clearCollision(true, true);
    arrow2.body.clearCollision(true, true);
    arrow3.body.clearCollision(true, true);
    arrow4.body.clearCollision(true, true);
    joint3.body.clearCollision(true, true);
    
    // gear1.body(Phaser.Game,gear1,50,50,10);
    game.physics.p2.enable(gear1, false);
    gear1.body.clearShapes();
    gear1.body.loadPolygon('gearSet1', 'gear1');
    gear1.body.setCollisionGroup(blockCollisionGroup);
    gear1.body.collides([blockCollisionGroup]);
    gear1.body.mass = 10;
    
    game.physics.p2.enable(gear2, false);
    gear2.body.clearShapes();
    gear2.body.loadPolygon('gearSet1', 'gear2');
    gear2.body.setCollisionGroup(blockCollisionGroup);
    gear2.body.collides([blockCollisionGroup]);
    
    game.physics.p2.enable(gear3, false);
    gear3.body.clearShapes();
    gear3.body.loadPolygon('gearSet1', 'gear3');
    gear3.body.setCollisionGroup(blockCollisionGroup);
    gear3.body.collides([blockCollisionGroup]);   

    game.physics.p2.enable(gear4, false);
    gear4.body.clearShapes();
    gear4.body.loadPolygon('gearSet1', 'gear4');
    gear4.body.setCollisionGroup(blockCollisionGroup);
    gear4.body.collides([blockCollisionGroup]);

    game.physics.p2.enable(halfGear1, false);
    halfGear1.body.clearShapes();
    halfGear1.body.loadPolygon('gearSet1', 'halfGear1');
    halfGear1.body.setCollisionGroup(blockCollisionGroup);
    halfGear1.body.collides([blockCollisionGroup]); 
    halfGear1.body.mass = 10;

    game.physics.p2.enable(straightGear1, false);
    straightGear1.body.clearShapes();
    straightGear1.body.loadPolygon('gearSet1', 'straightGear1');
    straightGear1.body.setCollisionGroup(blockCollisionGroup);
    straightGear1.body.collides([blockCollisionGroup]); 
    straightGear1.body.fixedRotation = true;

    game.physics.p2.enable(beam1, false);
    beam1.body.loadPolygon('gearSet1', 'beam1');
    beam1.body.setCollisionGroup(blockCollisionGroup2);
    beam1.body.collides([blockCollisionGroup2]);
    beam1.body.mass = 5;
    beam1.body.clearShapes(); 

    game.physics.p2.enable(beam2, false);
    beam2.body.loadPolygon('gearSet1', 'beam1');
    beam2.body.setCollisionGroup(blockCollisionGroup2);
    beam2.body.collides([blockCollisionGroup2]);
    beam2.body.mass = 5;
    beam2.body.clearShapes(); 

    game.physics.p2.enable(block1, false);
    block1.body.clearShapes(); 
    block1.body.loadPolygon('gearSet1', 'block');
    block1.body.setCollisionGroup(blockCollisionGroup);
    block1.body.collides([blockCollisionGroup]);
    block1.body.mass = 20;
    
    //game.physics.p2.enable(joint1, false);
    //joint1.body.loadPolygon('gearSet1', 'beam1');
    // joint1.body.setCollisionGroup(blockCollisionGroup2);
    // joint1.body.collides([blockCollisionGroup2]);
    // joint1.body.mass = 5;
    // joint1.body.clearShapes();
    joint1.body.fixedRotation = true;

    //game.physics.p2.enable(joint2, false);
    //joint1.body.loadPolygon('gearSet1', 'beam1');
    // joint2.body.setCollisionGroup(blockCollisionGroup2);
    // joint2.body.collides([blockCollisionGroup2]);
    // joint2.body.mass = 5;
    // joint2.body.clearShapes();
    joint2.body.fixedRotation = true;

    //game.physics.p2.enable(joint3, false);
    //joint1.body.loadPolygon('gearSet1', 'beam1');
    //joint3.body.setCollisionGroup(blockCollisionGroup2);
    //joint3.body.collides([blockCollisionGroup2]);
    //joint3.body.clearShapes();  
    //joint3.body.static = true;
    joint2.body.fixedRotation = true;

    
    //gear1.body.clearShapes();
    // gear1.body.loadPolygon('gear', 'gear');
    // gear1.body.setCollisionGroup(blockCollisionGroup);
    // gear1.body.collides([blockCollisionGroup]);   
    // sprite1.body.static = true;
    // arrow.body.static = true;
    // arrow2.body.static = true;
    //arrow2.body.fixedRotation = true;


    //joint1.body.static = true;
    

    var constraint = game.physics.p2.createRevoluteConstraint(sprite1, [ 0, 0 ], gear1, [ 0, 0 ]);
    var constraint2 = game.physics.p2.createRevoluteConstraint(arrow, [ 0, 0 ], gear2, [ 0, 0 ]);
    var constraint3 = game.physics.p2.createRevoluteConstraint(arrow2, [ 0, 0 ], gear3, [ 0, 0 ]);
    var constraint4 = game.physics.p2.createRevoluteConstraint(arrow3, [ 0, 0 ], gear4, [ 0, 6 ]);
    var constraint5 = game.physics.p2.createRevoluteConstraint(joint1, [ 0, 0 ], beam1, [ -150, 0 ]);
    var constraint6 = game.physics.p2.createRevoluteConstraint(gear3, [ 100, 0 ], joint1, [ 0, 0 ]);
    var constraint7 = game.physics.p2.createRevoluteConstraint(gear4, [ 20, 0 ], joint3, [ 0, 0 ]);
    //var constraint7 = game.physics.p2.createRevoluteConstraint(block1, [ 30, 0 ], beam1, [ 150, 0 ]);
    var constraint8 = game.physics.p2.createRevoluteConstraint(arrow4, [ 0,0 ], halfGear1, [ 23, 0 ]);
    var constraint9 = game.physics.p2.createRevoluteConstraint(joint2, [ 0, 0 ], beam1, [ 150, 0 ]);
    var constraint10 = game.physics.p2.createRevoluteConstraint(joint3, [ 0, 0 ], beam2, [ 150, 0 ]);
    var constraint11 = game.physics.p2.createRevoluteConstraint(joint2, [ 0, 0 ], beam2, [ -150, 0 ]);

    //text = game.add.text(20, 20, 'rotate with arrow keys', { fill: '#ffffff' });
    game.world.bringToTop(beam1);
    game.world.bringToTop(beam2);
    game.world.bringToTop(joint1);
    game.world.bringToTop(joint2);
    game.world.bringToTop(joint3);

    
    // create physics body for mouse which we will use for dragging clicked bodies
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);
        
    // attach pointer events
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);
}

function click(pointer) {
    staticVar = false;
    var bodies = game.physics.p2.hitTest(pointer.position, [ sprite1.body, arrow.body, arrow2.body, arrow3.body, arrow4.body, joint3.body]);
    var joints = [ "joint1", "joint2", "joint3"];
    //var dynamicBodies = game.physics.p2.hitTest(pointer.position, [ gear1.body, gear2.body, gear3.body, gear4.body, halfGear1.body, straightGear1.body]);
    var bodyName;
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length)
    {
        for (var i = 0; i < bodies.length; i++)
        {
            //  The bodies that come back are p2.Body objects.
            //  The parent property is a Phaser.Physics.P2.Body which has a property called 'sprite'
            //  This relates to the sprites we created earlier.
            //  The 'key' property is just the texture name, which works well for this demo but you probably need                     something more robust for an actual game.
            bodyName = bodies[i].parent.sprite.key;
        }
        //console.log(bodyName);
        window[bodyName].body.static = false;
        var clickedBody = bodies[0];
        var localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        
        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = this.game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [0,0]);


        for(var i = 0; i < joints.length;i++){
            if(bodyName ==  joints[i]){
                isJoint = true;
                clickedJoint = bodyName;
            }
            else{
                isJoint = false;
            }
        }
    }
}

function release() {

    // remove constraint from object's body
    game.physics.p2.removeConstraint(mouseConstraint);
    // if(isDynamicConstraint == true){
    //     window[clickedJoint].body.static = false;
    //     dynamicConstraint = this.game.physics.p2.createRevoluteConstraint(window[dynamicConstraintBody], [60, 0], window[clickedJoint], [0,0]);
    // }
    // else{
    //     game.physics.p2.removeConstraint(dynamicConstraint);
    //     window[clickedJoint].body.static = true;
    // }
    staticVar = true;

}

function move(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

    var dynamicBodies = game.physics.p2.hitTest(pointer.position, [ gear1.body, gear2.body, gear3.body, gear4.body, halfGear1.body, straightGear1.body]);
    var jointBodies = game.physics.p2.hitTest(pointer.position, [joint1.body,joint2.body,joint3.body]);
    var dynamicName;
    var jointName;
    if (dynamicBodies.length){
        for (var i = 0; i < dynamicBodies.length; i++)
        {
            //  The bodies that come back are p2.Body objects.
            //  The parent property is a Phaser.Physics.P2.Body which has a property called 'sprite'
            //  This relates to the sprites we created earlier.
            //  The 'key' property is just the texture name, which works well for this demo but you probably need                     something more robust for an actual game.
            dynamicName = dynamicBodies[i].parent.sprite.key;
            console.log(dynamicName);
        }
        //var hoverBody = dynamicBodies[0];
        // if(game.input.mousePointer.isDown == true && isJoint == true){
        //     isDynamicConstraint = true;
        //     dynamicConstraintBody = dynamicName;
        //     console.log(dynamicName);
        // }
        // else{
        //     isDynamicConstraint = false;
        // }
    }
    if (jointBodies.length){
        for (var i = 0; i < jointBodies.length; i++)
        {
            jointName = jointBodies[i].parent.sprite.key;
            console.log(jointName);
        }
    }
    

}

function update() {
    var bodies = [ sprite1, arrow, arrow2, arrow3, arrow4];
    gear1.body.rotateRight(30);
    halfGear1.body.rotateRight(15);
    for (i=0;i<bodies.length;i++){
        bodies[i].body.fixedRotation = true;
        if(staticVar == true){
            bodies[i].body.static = true;
            bodies[i].body.velocity.x = 0;
            bodies[i].body.velocity.y = 0;
        }
    }
    
    // for (i=0;i<joints.length;i++){
    //     joints[i].body.fixedRotation = true;
    //     if(staticVar == true){
    //         bodies[i].body.static = true;
    //         bodies[i].body.velocity.x = 0;
    //         bodies[i].body.velocity.y = 0;
    //     }
    // }

    //console.log(isJoint);
}

function render() {

//  game.debug.text(result, 32, 32);

}