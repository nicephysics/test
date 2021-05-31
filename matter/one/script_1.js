// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

function start() {
    // create an engine
    var engine = Engine.create();
    
    var canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    console.log(canvas)

    // create a renderer
    var render = Render.create({
//         element: document.querySelector("body"),
        canvas: canvas,
        engine: engine,
        options: {
            pixelRatio: 1,
            background: '#FAFAFA',
            wireframes: false,
            showMousePosition: true,
        }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

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
