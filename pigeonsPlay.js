
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
        this.context.fillStyle = 'blue';

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
    }

    isKeyDown(key)
    {
        return this.keys[key];
    }

}
export{InputHandler}


export function drawText(text, font, context, x, y)
{
    context.font = font;
    context.fillText(text, x, y);
}