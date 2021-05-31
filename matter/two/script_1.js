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
    var window_width = window.innerWidth
    var window_height = window.innerHeight
    
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

    var bodies = []
    
    // create a ground
    var ground = Bodies.rectangle(window_width / 2, window_height + 10, window_width + 10, 60, { isStatic: true });
    bodies.push(ground)
    
    // and way too many boxes
    let box_size = 80, x = box_size / 2, y = box_size / 2
    while (x + box_size / 2 <= window_width) {
        y = 0
        while (y + box_size / 2 <= window_height) {
            var box = Bodies.rectangle(x, y, box_size, box_size, {
                render: {
                    fillStyle: "#aabbcc", // x / box_size + y / box_size
                }
            });
            bodies.push(box)
            y += box_size
        }
        x += box_size
    }

    // add all of the bodies to the world
    Composite.add(engine.world, bodies);

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

window.addEventListener("resize", function() {
    start()
})
