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

        this.restitution = 0.3;

        //mass
        this.mass = 1.0;
        this.inertia = 0.0;
    }

    updateBounds()
    {
        this.inertia = (1.0/12) * this.mass * (this.width**2 + this.height**2);
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
export{PhysicsEntity}

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
export{CollisionDetector}


function computeCollisionNormal(entity1, entity2) {
    const dx = entity2.getMidX() - entity1.getMidX();
    const dy = entity2.getMidY() - entity1.getMidY();

    const overlapX = (entity1.halfWidth + entity2.halfWidth) - Math.abs(dx);
    const overlapY = (entity1.halfHeight + entity2.halfHeight) - Math.abs(dy);

    if (overlapX < overlapY) {
        return { x: dx < 0 ? -1 : 1, y: 0 };
    } else {
        return { x: 0, y: dy < 0 ? -1 : 1 };
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

        var dx = (aMidX - pMidX) / entity2.halfWidth;
        var dy = (aMidY - pMidY) / entity2.halfHeight;

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
        else if(absDX > absDY)
        {
            if(dx < 0)
            {
                entity1.x = entity2.getRight();
            }
            else
            {
                entity1.x = entity2.getLeft() - entity1.width;
            }
        }
        else
        {
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

    resolveCollision(entity1, entity2)
    {
        let rvx = entity2.vx - entity1.vx;
        let rvy = entity2.vy - entity1.vy;

        //const normal
        const normal = computeCollisionNormal(entity1, entity2);

        const velAlongNormal = rvx * normal.x + rvy * normal.y;
        if (velAlongNormal > 0) return;

        const e = Math.min(entity1.restitution, entity2.restitution);

        let j = -(1 + e) * velAlongNormal;
        j /= (1 / entity1.mass) + (1 / entity2.mass);

        const impulseX = j * normal.x;
        const impulseY = j * normal.y;

        if(entity1.type == "DYNAMIC")
        {
            entity1.vx -= 1 / entity1.mass * impulseX;
            entity1.vy -= 1 / entity1.mass * impulseY;
        }

        if(entity2.type == "DYNAMIC")
        {
            entity2.vx += 1 / entity2.mass * impulseX;
            entity2.vy += 1 / entity2.mass * impulseY;
        }

    }
}
export{CollisionResolver}

class PhysicsWorld
{
    constructor()
    {
        this.GRAVITY_X = 0.0;
        this.GRAVITY_Y = 0.001;
    }

    step(elapsed, entities)
    {
        var gx = this.GRAVITY_X * elapsed;
        var gy = this.GRAVITY_Y * elapsed;

        for(var i = 0; i<entities.length; i++)
        {
            let entity = entities[i];
            entity.updateBounds();
            switch(entity.type)
            {
                case "DYNAMIC":
                    entity.vx += entity.ax * elapsed + gx;
                    entity.vy += entity.ay * elapsed + gy;
                    entity.x  += entity.vx * elapsed;
                    entity.y  += entity.vy * elapsed;
                    break;

                case "KINEMATIC":
                    entity.vx += entity.ax * elapsed;
                    entity.vy += entity.ay * elapsed;
                    entity.x  += entity.vx * elapsed;
                    entity.y  += entity.vy * elapsed;
                    break;

            }
        }
    }
}
export{PhysicsWorld}