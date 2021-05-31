// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

var engine

function start() {
    // create the engine
    engine = Engine.create();
    engine.gravity.x = 0
    engine.gravity.y = 0
    
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

    
    // create a ground
    var ground = Bodies.rectangle(window_width / 2, window_height + 10, window_width + 10, 60, { isStatic: true })
    var wall1 = Bodies.rectangle(-10, window_height / 2, 60, window_height + 10, { isStatic: true })
    var wall2 = Bodies.rectangle(window_width + 10, window_height / 2, 60, window_height + 10, { isStatic: true })
    var ceiling = Bodies.rectangle(window_width / 2, -10, window_width + 10, 60, { isStatic: true })
    
    var bodies = [ground, wall1, wall2, ceiling]
    
    // and way too many boxes
    let circle_size = 80,
        circle_gap = 120,
        x = circle_size / 2 + 30,
        y = circle_size / 2 + 30,
        color_max_circles = Math.floor((window_width + window_height - 60) / circle_gap),
        color_scale = chroma.scale(["green", "purple"]).mode('lab')
    while (x + circle_gap / 2 <= window_width) {
        y = circle_size / 2 + 30
        while (y + circle_gap / 2 <= window_height) {
            var color_number = (x / circle_gap + y / circle_gap) / color_max_circles
            var circle = Bodies.circle(x, y, circle_size / 2, { // options
                render: {
                    fillStyle: color_scale(color_number).hex()
                }
            });
            bodies.push(circle)
            y += circle_gap
        }
        x += circle_gap
    }
    
    /*
    var THE_BALL = Bodies.circle(window_width / 2, window_height * -5, box_size * 2.5, {
        render: {
            fillStyle: "#4287f5"
        }
    });
    bodies.push(THE_BALL)
    */

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

var keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    update: function() {
        let x = 0,
            y = 0
        if (keys.up) y--
        if (keys.down) y++
        if (keys.left) x--
        if (keys.right) x++
        engine.gravity.x = x
        engine.gravity.y = y
    }
}

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event is already handled
    }
    switch (event.code) {
        case "KeyS":
        case "ArrowDown":
            // down
            keys.down = true
            break
        case "KeyW":
        case "ArrowUp":
            // up
            keys.up = true
            break
        case "KeyA":
        case "ArrowLeft":
            // left
            keys.left = true
            break
        case "KeyD":
        case "ArrowRight":
            // right
            keys.right = true
            break
    }
    
    // Consume (eat!) the event so it doesn't get handled twice
    event.preventDefault();
})


window.addEventListener("keyup", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event is already handled
    }
    switch (event.code) {
        case "KeyS":
        case "ArrowDown":
            // down
            keys.down = false
            break
        case "KeyW":
        case "ArrowUp":
            // up
            keys.up = false
            break
        case "KeyA":
        case "ArrowLeft":
            // left
            keys.left = false
            break
        case "KeyD":
        case "ArrowRight":
            // right
            keys.right = false
            break
    }
    
    // Consume (eat!) the event so it doesn't get handled twice
    event.preventDefault();
})

setInterval(function() {
    keys.update()
}, 1000 / 60)
