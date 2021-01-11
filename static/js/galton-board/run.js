// referenced from: https://codepen.io/lmeetr/pen/NWPxomj

var demo = demo || {};

demo.run = function() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create({
      enableSleeping: true
    }),
    world = engine.world;

  const WIDTH = 264;
  const HEIGHT = 400;
  const BALL_SIZE = 2.1;
  const PEG_SIZE = 2.8;

  // create render
  var render = Render.create({
    element: document.getElementById('galton-board'),
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false,
      background: '#222'
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  let total = 800;

  const pegs = [];
  const spacingY = 20;
  const spacingX = 20;
  var i, j, lastI;
  for (i = 0; i < 13; i++) {
    for (j = 1; j < i; j++) {
      pegs.push(
        Bodies.circle(
          WIDTH / 2 + (j * spacingX - i * (spacingX / 2)),
          i * spacingY,
          PEG_SIZE,
          {
            isStatic: true,
            render: {
              fillStyle: "#ffffff",
              visible: true
            }
          }
        )
      );
    }
    lastI = i;
  }

  World.add(
    world,
    Bodies.rectangle(250, lastI * 1.33 * spacingY + 100, 1000, 50, {
      isStatic: true,
      render: {
        fillStyle: "#ffffff",
        visible: true
      }
    })
  );

  for (i = 0; i < 15; i++) {
    World.add(
      world,
      Bodies.rectangle(
        62 - spacingX + (j * spacingX - i * spacingX),
        lastI * spacingY + 215,
        PEG_SIZE / 2,
        lastI + 350,
        {
          isStatic: true,
          render: {
            fillStyle: "#ffffff",
            visible: true
          },
          chamfer: {
            radius: [BALL_SIZE * 0.4, BALL_SIZE * 0.4, 0, 0]
          }
        }
      )
    );
  }

  World.add(world, pegs);

  document.addEventListener("runGalton", function(){
    setInterval(() => {
      if (total-- > 0) {
        const circle = Bodies.circle(WIDTH / 2 + (-0.5 + Math.random()) * 0.8, -1, BALL_SIZE, {
          friction: 0.001,
          restitution: 0.006,
          density: 0.4,
          frictionAir: 0.086,
          sleepThreshold: 25,
          render: {
            fillStyle: "yellow",
            visible: true
          }
        });

        Matter.Events.on(circle, "sleepStart", () => {
          Matter.Body.setStatic(circle, true);
        });
        World.add(world, circle);
      }
    }, 30);
  });

  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

demo.run();

function runGalton() {
  const event = new Event("runGalton");
  document.dispatchEvent(event);
}
