import { default as Matter } from 'https://cdn.skypack.dev/matter-js@0.17.1?min';


var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;

var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.querySelector('.skillblock'),
    engine: engine,
    options: {
        wireframes: false,
        // wireframes: true,
        background: "transparent",
        width: 380,
        height: 500
    }
});
Render.run(render);



var runner = Runner.create();
Runner.run(runner, engine);

World.add(world, [Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true, render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 5
    }
},

)]);
World.add(world, [Bodies.rectangle(400, 500, 800, 40, {
    isStatic: true, render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 5
    }
})]);
World.add(world, [Bodies.rectangle(370, 250, 20, 500, {
    isStatic: true, render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 5
    }
})]);
World.add(world, [Bodies.rectangle(0, 250, 40, 500, {
    isStatic: true, render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 5
    }
})]);
window.addEventListener('scroll', (e) => {
    if (document.documentElement.getBoundingClientRect().top < -600) {
        engine.gravity.y = -1;
        engine.gravity.scale = 0.0005;
    }
})


let bodies = [];
let bodies2 = [];
let bodies3 = [];


const head2 = document.querySelector(".text-to-canvas h2");
let letters2 = head2.querySelectorAll("span");
var stack1 = Composites.stack(100, 0, 1, 1, 0, 0,
    function (x, y) {
        for (let i = 0; i < letters2.length; i++) {
            bodies2.push(
                Bodies.rectangle(
                    102,
                    102 + (50 * i),
                    letters2[i].offsetWidth + 40,
                    40, {
                    render: {
                        fillStyle: 'white',
                        strokeStyle: '#ffef95',
                        lineWidth: 5
                    }
                }
                )
            );
        }
    }
);


const head = document.querySelector(".text-to-canvas h1");
let letters = head.querySelectorAll("span");
var stack2 = Composites.stack(100, 0, 1, 1, 0, 0,
    function (x, y) {

        for (let i = 0; i < letters.length; i++) {
            bodies.push(
                Bodies.rectangle(
                    270,
                    100 + (50 * i),
                    letters[i].offsetWidth + 40,
                    40, {
                    render: {
                        fillStyle: 'white',
                        strokeStyle: '#ffef95',
                        lineWidth: 5
                    }
                }
                )

            );
        }
    });

const head3 = document.querySelector(".text-to-canvas h3");
let letters3 = head3.querySelectorAll("span");
var stack3 = Composites.stack(100, 0, 1, 1, 0, 0,
    function (x, y) {

        for (let i = 0; i < letters3.length; i++) {
            bodies3.push(
                Bodies.rectangle(
                    270,
                    300 + (50 * i),
                    letters3[i].offsetWidth + 40,
                    40, {
                    render: {
                        fillStyle: 'white',
                        strokeStyle: '#ffef95',
                        lineWidth: 5
                    }
                }
                )

            );
        }
    });
World.add(world, bodies);
World.add(world, bodies2);
World.add(world, bodies3);


function updatePosition() {
    requestAnimationFrame(updatePosition);

    for (var i = 0; i < letters.length; i++) {
        letters[i].style.left =
            bodies[i].position.x - letters[i].offsetWidth * 0.5 + "px";
        letters[i].style.top =
            bodies[i].position.y - letters[i].offsetHeight * 0.5 + "px";


        letters[i].style.transform = "rotate(" + bodies[i].angle + "rad)";
    }

    for (var j = 0; j < letters2.length; j++) {
        letters2[j].style.left =
            bodies2[j].position.x - letters2[j].offsetWidth * 0.5 + "px";
        letters2[j].style.top =
            bodies2[j].position.y - letters2[j].offsetHeight * 0.5 + "px";
        letters2[j].style.transform = "rotate(" + bodies2[j].angle + "rad)";
    }
    for (var k = 0; k < letters3.length; k++) {
        letters3[k].style.left =
            bodies3[k].position.x - letters3[k].offsetWidth * 0.5 + "px";
        letters3[k].style.top =
            bodies3[k].position.y - letters3[k].offsetHeight * 0.5 + "px";
        letters3[k].style.transform = "rotate(" + bodies3[k].angle + "rad)";
    }
}
updatePosition();
