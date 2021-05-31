// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

function start() {
    // create an engine
    var engine = Engine.create();
    
    var canvas = document.getElementById("canvas")
    var window_width = window.outerWidth
    var window_height = window.outerHeight
    
    canvas.width = window_width
    canvas.height = window_height

    // create a renderer
    var render = Render.create({
//         element: document.querySelector("body"),
        canvas: canvas,
        engine: engine,
        mouse: Mouse.create(canvas),
        options: {
            width: window_width,
            height: window_height,
            pixelRatio: 1,
            background: '#FAFAFA',
            wireframes: false,
            showMousePosition: true,
        }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(window_width / 2, 200, 80, 80);
    var boxB = Bodies.rectangle(window_width / 2 + 50, 50, 80, 80);
    var ground = Bodies.rectangle(window_width / 2, window_height + 10, window_width + 10, 60, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

window.addEventListener("load", function() {
    start()
})
