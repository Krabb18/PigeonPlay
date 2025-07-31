
class Window
{
    #init;
    constructor(width, height)
    {
        this.#init = false;

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
    }

    draw()
    {
        this.context.fillStyle = 'blue';
        this.context.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.x);
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
            this.context.drawImage(this.spriteImg, this.position.x, this.position.y, this.scale.x, this.scale.y);
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


class Text
{
    constructor()
    {

    }

    drawText()
    {
        
    }
}