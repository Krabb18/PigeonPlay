
import { PhysicsEntity, CollisionDetector } from "./pigeonPlayPhysics.js";

class Window
{
    #init;
    #last;
    constructor(width, height)
    {
        this.#init = false;
        this.#last = Date.now();
        this.deltaTime = 0.0;

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'meinCanvas';
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = '1px solid black';
        document.body.appendChild(this.canvas);
        
        this.context = this.canvas.getContext('2d');
        this.isRunning = false;

        this._loop();
    }

    _loop()
    {
        var now = Date.now();
        var dt = now - this.#last;
        this.#last = now;
        this.deltaTime = dt;

        if(this.#init && this.isRunning)
        {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.onUpdate();
        }

        requestAnimationFrame(() => this._loop());
    }

    start()
    {
        this.onStarted();
        this.#init = true;
        this.isRunning = true;
    }

    onStarted()
    {
        
    }

    onUpdate()
    {
        
    }
}
export{Window}


class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class GameObject
{
    constructor()
    {

    }

    draw()
    {

    }
}


///RENDERING STUFF

class Rectangle extends GameObject
{
    constructor(context)
    {
        super();
        this.context = context;
        this.color = 'blue';
        this.position = new Vector2(0.0, 0.0);
        this.scale = new Vector2(100.0, 100.0);
        this.angle = 0.0;
    }

    draw()
    {
        this.context.save();
        //this.context.rotate(angle);
        this.context.fillStyle = this.color;

        //rotation test
        var sx = this.position.x + this.scale.x / 2;
        var sy = this.position.y + this.scale.y / 2;
        this.context.translate(sx, sy);
        this.context.rotate(this.angle);
        this.context.translate(-sx, -sy);

        this.context.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.x);
        this.context.restore()
        
    }
}
export{Rectangle}

class Sprite extends GameObject
{
    constructor(context, spritePath)
    {
        super();
        this.context = context;
        this.position = new Vector2(0.0, 0.0);
        this.scale = new Vector2(100.0, 100.0);
        this.spriteImg = new Image();
        this.angleZ = 0.5;

        const img = new Image();
        img.onload = () =>
        {
            this.spriteImg = img;
            this.loaded = true;
        };
        img.src = spritePath;
    }

    draw()
    {
        if(this.loaded)
        {
            this.context.save();
            //this.context.rotate(angle);
            this.context.drawImage(this.spriteImg, this.position.x, this.position.y, this.scale.x, this.scale.y);
            this.context.restore();
        }
    }
}
export{Sprite}


///AUDIO STUFF
class Sound
{
    constructor(path, loop)
    {
        this.audio = new Audio(path);
        this.audio.loop = loop
        this.audio.volume = 0.5;
    }

    play()
    {
        this.audio.play();
    }

    stop()
    {
        this.audio.stop();
    }
}
export{Sound}


class InputHandler
{
    constructor()
    {
        this.currentKeyDown = true;
        this.keys = {};
        document.addEventListener(
            "keypress",
            (event) =>
            {
                this.keys[event.key] = true;
            },
            false,
        );

        document.addEventListener(
            "keyup",
            (event) =>
            {
                this.keys[event.key] = false;
            },
            false,
        );

        document.addEventListener("mousedown", (event) => {
            if(event.button === 0){this.keys["mouseleft"] = true;}
            else if(event.button === 1){this.keys["mousemiddle"] = true;}
            else if(event.button === 2){this.keys["mouseright"] = true;}
        });

        document.addEventListener("mouseup", (event) => {
            if(event.button === 0){this.keys["mouseleft"] = false;}
            else if(event.button === 1){this.keys["mousemiddle"] = false;}
            else if(event.button === 2){this.keys["mouseright"] = false;}
        });
    }

    isKeyDown(key)
    {
        return this.keys[key];
    }

}
export{InputHandler}


export function drawText(text, font, context, x, y, scale, color)
{
    context.fillStyle = color;
    context.font = font;
    context.fillText(text, x, y, scale);
}

let posX = 0;
let posY = 0;
document.addEventListener('mousemove', function(event)
{
    posX = event.clientX;
    posY = event.clientY;
    //console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});

export function getMousePosition()
{
    let pos = new Vector2(posX, posY);
    return pos;
}

class Button
{
    #detector;
    #inputHandler;
    constructor(context)
    {
        this.#detector = new CollisionDetector();
        this.#inputHandler = new InputHandler();

        this.context = context;
        this.position = new Vector2(0.0, 0.0);
        this.scale = new Vector2(200.0, 100.0);
        this.buttonText = "Hello";
        
        //this.buttonColor;
        this.textColor = '#eeaa00';
    }

    mouseOver()
    {
        let mousePos = getMousePosition();
        let mouseBox = new PhysicsEntity();
        mouseBox.x = mousePos.x;
        mouseBox.y = mousePos.y;
        mouseBox.width = 2;
        mouseBox.height = 2;

        let buttonBox = new PhysicsEntity();
        buttonBox.x = this.position.x;
        buttonBox.y = this.position.y;
        buttonBox.width = this.scale.x;
        buttonBox.height = this.scale.y;

        const didCollide = this.#detector.collideRect(mouseBox, buttonBox);
        return didCollide;
    }

    onButtonClick()
    {

    }

    drawButton()
    {

        //check if button was pressed
        if(this.mouseOver() && this.#inputHandler.isKeyDown("mouseleft"))
        {
            this.onButtonClick();
            this.#inputHandler.keys["mouseleft"] = false;
        }

        const out = this.mouseOver();
        console.log(out);
        this.context.save();
        this.context.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);

        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        drawText(this.buttonText, '25px Comic Sans MS', this.context ,this.position.x + this.scale.x / 2, this.position.y + this.scale.y / 2, this.scale.x, this.textColor);
        this.context.restore();
    }
}
export{Button}
