# PigeonPlay
A simple 2d Javascript Game libary to easily create 2d games :)

(NOT FINISHED YET)

Here is an code example which renders a canvas and a sprite
```js
import { Window } from "./pigeonsPlay.js";
import { Rectangle } from "./pigeonsPlay.js";
import { Sprite } from "./pigeonsPlay.js";
import { Sound } from "./pigeonsPlay.js";

let window = new Window(1200, 800);
window.start();

let sprite = new Sprite(window.context, "https://art.pixilart.com/4c73a17d2f8ae88.png");


let sound = new Sound("donkey-kong.mp3", false);

window.onStarted = function()
{
console.log("HII start");
//sound.play();
}

window.onUpdate = function()
{
    sprite.draw();
    console.log("HII Upate");
}

window.start();
