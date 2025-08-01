import { CollisionDetector, CollisionResolver, PhysicsEntity, PhysicsWorld } from "./pigeonPlayPhysics.js";
import { InputHandler, Window, Rectangle, Sprite, Sound, drawText, Button } from "./pigeonsPlay.js";


let window = new Window(1200, 800);
window.start();

//let sprite = new Sprite(window.context, "https://art.pixilart.com/4c73a17d2f8ae88.png");
let rect = new Rectangle(window.context);
let rect2 = new Rectangle(window.context);
rect2.color = 'red'
rect2.position.y = 700.0;

let entitys = [];

let box1 = new PhysicsEntity("box1", "DYNAMIC");
box1.width = 100.0;
box1.height = 100.0;
entitys.push(box1);

let box2 = new PhysicsEntity("box2", "KINEMATIC");
box2.mass = 1000.0
box2.width = 100.0;
box2.height = 700.0;
entitys.push(box2);

let world = new PhysicsWorld();
let collisionDetector = new CollisionDetector();
let collisionResolver = new CollisionResolver();

let sound = new Sound("donkey-kong.mp3", false);

let inputHandler = new InputHandler();

let button = new Button(window.context);

window.onStarted = function()
{
    //sound.play();
    box1.x = rect.position.x;
    box1.y = rect.position.y;
    box2.x = rect2.position.x;
    box2.y = rect2.position.y;
}
let p = false;
window.onUpdate = function()
{
    drawText("Hello PigeonPlay", "30px Comic Sans MS", window.context, 10, 50, 200.0, '#001122');
    
    if(inputHandler.isKeyDown('d'))
    {
        box1.x += 1.0 * window.deltaTime;
    }
    else if(inputHandler.isKeyDown('a'))
    {
        box1.x -= 1.0 * window.deltaTime;
    }
    else if(inputHandler.isKeyDown('w'))
    {
        box1.y -= 1.0 * window.deltaTime;
    }
    else if(inputHandler.isKeyDown('s'))
    {
       box1.y += 1.0 * window.deltaTime;
    }

    else if(inputHandler.isKeyDown('m') && !p)
    {
        box1.vy = 0.0;
       box1.vy = -0.9;
       //p = true;
    }
    
    if(box1.vy > 1.09)
    {
        box1.vy = 0.0;
    }


    world.step(window.deltaTime, entitys);
    rect.position.x = box1.x;
    rect.position.y = box1.y;

    rect2.position.x = box2.x;
    rect2.position.y = box2.y;


    const didCollide = collisionDetector.collideRect(box1, box2);

    if(didCollide)
    {
        //collisionResolver.resolveElastic(box1, box2);
        collisionResolver.resolveCollision(box1, box2);
        rect.position.x = box1.x;
        rect.position.y = box1.y;
        collisionResolver.resolveElastic(box1, box2);
    }

    button.position.x = 300.0;
    button.position.y = 300.0;
    button.drawButton();

    rect.draw();
    rect2.draw();


}

window.start();
