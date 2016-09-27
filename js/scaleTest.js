// module aliases
var World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Events = Matter.Events,
    Bounds = Matter.Bounds,
    Vector = Matter.Vector,
    Engine = Matter.Engine,
    MouseConstraint = Matter.MouseConstraint,
    Render = Matter.Render,
	Mouse = Matter.Mouse;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var mouseConstraint = MouseConstraint.create(engine);


var world = engine.world
console.log(mouseConstraint)
engine.world.gravity.y = 0;

var stack = Composites.stack(20, 20, 15, 4, 0, 0, function(x, y) {
    switch (Math.round(Common.random(0, 1))) {

    case 0:
        if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50));
        } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
        }
        break;
    case 1:
        var sides = Math.round(Common.random(1, 8));
        sides = (sides === 3) ? 4 : sides;
        return Bodies.polygon(x, y, sides, Common.random(20, 50));
    }
});

World.add(world, stack);

// get the centre of the viewport

// make the world bounds a little bigger than the render bounds
world.bounds.min.x = -300;
world.bounds.min.y = -300;
world.bounds.max.x = 1100;
world.bounds.max.y = 900;

// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
    boundsScale = {
        x: 1,
        y: 1
};

console.log(world.bounds.min.x)

engine.events.push(
    Events.on(engine, 'beforeUpdate', function() {
    	console.log("working")
        var world = engine.world,
            mouse = mouseConstraint.mouse,
            translate;

        // mouse wheel controls zoom
        var scaleFactor = 0;
        if (scaleFactor !== 0) {
            if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
                boundsScaleTarget += scaleFactor;
            }
        }

        // if scale has changed
        if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
            // smoothly tween scale factor
            scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
            boundsScale.x += scaleFactor;
            boundsScale.y += scaleFactor;

            // scale the render bounds
            render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
            render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

            // translate so zoom is from centre of view
            translate = {
                x: render.options.width * scaleFactor * -0.5,
                y: render.options.height * scaleFactor * -0.5
            };

            Bounds.translate(render.bounds, translate);

            // update mouse
            Mouse.setScale(mouse, boundsScale);
            Mouse.setOffset(mouse, render.bounds.min);
        }

        

        // translate the view if mouse has moved over 50px from the centre of viewport
        
    })
);

var renderOptions = render.options;
renderOptions.hasBounds = true;
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);