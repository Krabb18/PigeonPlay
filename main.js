import { CollisionDetector, CollisionResolver, PhysicsEntity } from "./pigeonPlayPhysics.js";
import { InputHandler, Window } from "./pigeonsPlay.js";
import { Rectangle } from "./pigeonsPlay.js";
import { Sprite } from "./pigeonsPlay.js";
import { Sound } from "./pigeonsPlay.js";
import { drawText } from "./pigeonsPlay.js";
//import { PhysicsEntity, CollisionDetector, CollisionResolver } from "./pigeonPlayPhysics.js";


let window = new Window(1200, 800);
window.start();

//let sprite = new Sprite(window.context, "https://art.pixilart.com/4c73a17d2f8ae88.png");
let rect = new Rectangle(window.context);
let rect2 = new Rectangle(window.context);
rect2.position.y = 700.0;


let box1 = new PhysicsEntity("box1", "none");
box1.width = 100.0;
box1.height = 100.0;
let box2 = new PhysicsEntity("box2", "none");
box2.width = 100.0;
box2.height = 700.0;

let collisionDetector = new CollisionDetector();
let collisionResolver = new CollisionResolver();

let sound = new Sound("donkey-kong.mp3", false);

let inputHandler = new InputHandler();

window.onStarted = function()
{
    console.log("HII start");
    //sound.play();
}

window.onUpdate = function()
{
    drawText("Hellos", "30px serif", window.context, 10, 50);
    if(inputHandler.isKeyDown('d'))
    {
        rect.position.x += 5.0;
    }
    else if(inputHandler.isKeyDown('a'))
    {
        rect.position.x -= 5.0;
    }
    else if(inputHandler.isKeyDown('w'))
    {
        rect.position.y -= 5.0;
    }
    else if(inputHandler.isKeyDown('s'))
    {
        rect.position.y += 5.0;
    }

    box1.x = rect.position.x;
    box1.y = rect.position.y;
    box2.x = rect2.position.x;
    box2.y = rect2.position.y;

    const didCollide = collisionDetector.collideRect(box1, box2);
    console.log(didCollide);

    collisionResolver.resolveElastic(box1, box2);
    if(didCollide)
    {
        rect.position.x = box1.x;
        rect.position.y = box1.y;
    }

    rect.draw();
    rect2.draw();
    console.log("HII Upate");
}

window.start();
