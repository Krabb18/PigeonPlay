class PhysicsEntity
{
    constructor(collisionName, type)
    {
        this.type = type;
        this.collisionName = collisionName;

        this.width = 20;
        this.height = 20;

        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;

        // Position
        this.x = 0;
        this.y = 0;

        // Velocity
        this.vx = 0;
        this.vy = 0;

        // Acceleration
        this.ax = 0;
        this.ay = 0;
    }

    updateBounds()
    {
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
    }


    getMidX() {
        return this.halfWidth + this.x;
    }

    getMidY() {
        return this.halfHeight + this.y;
    }

    getTop() {
        return this.y;
    }

    getLeft() {
        return this.x;
    }

    getRight() {
        return this.x + this.width;
    }

    getBottom() {
        return this.y + this.height;
    }
}

class CollisionDetector
{
    constructor()
    {

    }

    collideRect(collider, collidee)
    {
        var l1 = collider.getLeft();
        var t1 = collider.getTop();
        var r1 = collider.getRight();
        var b1 = collider.getBottom();

        var l2 = collidee.getLeft();
        var t2 = collidee.getTop();
        var r2 = collidee.getRight();
        var b2 = collidee.getBottom();

        if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
        return false;
        }
    
        // If the algorithm made it here, it had to collide
        return true;
    }
}

class CollisionResolver
{
    constructor()
    {

    }

    resolveElastic(entity1, entity2)
    {
        var pMidX = entity1.getMidX();
        var pMidY = entity1.getMidY();
        var aMidX = entity2.getMidX();
        var aMidY = entity2.getMidY();

        var dx = (aMidX - pMidX) / entity.halfWidth;
        var dy = (aMidY - pMidY) / entity.halfHeight;

        var absDX = Math.abs(dx);
        var absDY = Math.abs(dy);

        if(Math.abs(absDX - absDY) < .1)
        {
            if(dx < 0)
            {
                entity1.x = entity2.getRight();
            }
            else
            {
                entity1.x = entity2.getLeft() - entity1.width;
            }

            if(dy < 0)
            {
                entity1.y = entity2.getBottom();
            }
            else
            {
                entity1.y = entity2.getTop() - entity1.height;
            }
        }
    }
}