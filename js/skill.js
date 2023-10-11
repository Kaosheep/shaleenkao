import { default as Matter } from 'https://cdn.skypack.dev/matter-js@0.17.1?min';


var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;

var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.querySelector('.skillblock'),
    engine: engine,
    options: {
        background: "transparent",
        width: 800,
        height: 500
      }
});

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

World.add(world, [Bodies.rectangle(400, 0, 800, 40, { isStatic: true })]);
World.add(world, [Bodies.rectangle(400, 500, 800, 40, { isStatic: true })]);
World.add(world, [Bodies.rectangle(800, 250, 40, 500, { isStatic: true })]);
World.add(world, [Bodies.rectangle(0, 250, 40, 500, { isStatic: true })]);
engine.gravity.y = -1;

let bodies = [];
let bodies2 = [];
let bodies3 = [];

let categories = {
    catMouse: 0x0002,
    catBody: 0x0004
};
// LETTRES ENSEMBLE
const head2 = document.querySelector(".text-to-canvas h2");
let letters2 = head2.querySelectorAll("span");
var stack1 = Composites.stack(100, 606 - 25.25 - 5 * 40, 1, 1, 0, 0,
    function (x, y) {
        for (let i = 0; i < letters2.length; i++) {
            bodies2.push(
                Bodies.rectangle(
                    120,
                    120 + (50 * i),
                    letters2[i].offsetWidth+40,
                    40,
                )
            );
        }
    });


const head = document.querySelector(".text-to-canvas h1");
let letters = head.querySelectorAll("span");
var stack2 = Composites.stack(100, 606 - 25.25 - 5 * 40, 1, 1, 0, 0,
    function (x, y) {

        for (let i = 0; i < letters.length; i++) {
            bodies.push(
                Bodies.rectangle(
                    310,
                    120 + (70 * i),
                    letters[i].offsetWidth + 60,
                    40,
                )

            );
        }
    });

const head3 = document.querySelector(".text-to-canvas h3");
let letters3 = head3.querySelectorAll("span");
var stack3 = Composites.stack(100, 606 - 25.25 - 5 * 40, 1, 1, 0, 0,
    function (x, y) {

        for (let i = 0; i < letters3.length; i++) {
            bodies3.push(
                Bodies.rectangle(
                    520,
                    120 + (80 * i),
                    letters3[i].offsetWidth + 60,
                    40,
                )

            );
        }
    });
World.add(world, bodies);
World.add(world, bodies2);
World.add(world, bodies3);


var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

render.mouse = mouse;

function updatePosition() {
    requestAnimationFrame(updatePosition);

    for (var i = 0; i < letters.length; i++) {
        letters[i].style.left =
            bodies[i].position.x - letters[i].offsetWidth * 0.5 + "px";
        letters[i].style.top =
            bodies[i].position.y - letters[i].offsetWidth * 0.5 + "px";


        letters[i].style.transform = "rotate(" + bodies[i].angle + "rad)";
    }

    for (var j = 0; j < letters2.length; j++) {
        letters2[j].style.left =
            bodies2[j].position.x - letters2[j].offsetWidth * 0.5 + "px";
        letters2[j].style.top =
            bodies2[j].position.y - letters2[j].offsetWidth * 0.5 + "px";
        letters2[j].style.transform = "rotate(" + bodies2[j].angle + "rad)";
    }
    for (var k = 0; k < letters3.length; k++) {
        letters3[k].style.left =
            bodies3[k].position.x - letters3[k].offsetWidth * 0.5 + "px";
        letters3[k].style.top =
            bodies3[k].position.y - letters3[k].offsetWidth * 0.5 + "px";
        letters3[k].style.transform = "rotate(" + bodies3[k].angle + "rad)";
    }
}
updatePosition();