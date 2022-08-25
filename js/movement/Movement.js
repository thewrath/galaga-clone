'use strict';

import { Black, Interpolation, MathEx, MessageDispatcher } from 'black-engine';

export class Movement extends MessageDispatcher {
    isDone(lastStartAt, now) {
        throw new Exception('Need implementation');
    }

    move(gameObject) {
        throw new Exception('Need implementation');
    }
}

class TimeBasedMovement extends Movement {
    constructor(duration) {
        super();
        this.duration = duration;
    }

    isDone(lastStartAt, now) {
        return lastStartAt + this.duration < now;
    }
}

export class Chain extends Movement {
    constructor() {
        super();
        this.movements = [];
        this.lastStartAt = null;
        this.current = null;
    }

    push(movement) {
        this.movements.push({
            movement: movement,
        });

        return this;
    }

    isDone(lastStartAt, now) {
        return this.movements.length <= 0;
    } 

    move(gameObject) {
        const now = Black.time.now;
        
        if (null === this.current) {
            this.current = this.movements.shift();
            this.lastStartAt = now;
        }

        if (this.current) {
            this.current.movement.move(gameObject);
            if (this.current.movement.isDone(this.lastStartAt, now)) {
                this.post('nextMovement', this.current.movement);
                this.current = null;
            }
        }
    }
}

export class Loop extends Chain {
    constructor(loops) {
        super();
        this.mLoops = loops;
        this.firstMovement = null;
        this.on('nextMovement', (msg, lastMovement) => {
            this.push(lastMovement);
               
            if (null === this.firstMovement) {
                this.firstMovement = lastMovement;
            }

            if (this.firstMovement == lastMovement) {
                if (null !== this.mLoops) {
                    this.mLoops -= 1;
                }
            }
        }, this);
    }

    isDone(lastStartAt, now) {
        return null !== this.mLoops && this.mLoops <= 0;
    }
}

export class CircularMovement extends TimeBasedMovement {
    constructor(duration, center, radius=100, smooth=false, offset=0) {
        super(duration);

        this.mCenter = center;
        this.mRadius = radius;
        this.mSmooth = smooth;
        this.mOffset = offset;
    }

    move(gameObject) {
        const t = this.mOffset + Black.time.now;

        const x = this.mCenter.x + (Math.cos(t*2) * this.mRadius);
        const y = this.mCenter.y + (Math.sin(t*2) * this.mRadius);
    
        if (this.mSmooth) {
            gameObject.x = Interpolation.linear([gameObject.x, x], 0.01, MathEx.lerp);
            gameObject.y = Interpolation.linear([gameObject.y, y], 0.01, MathEx.lerp);
        } else {
            gameObject.x = x;
            gameObject.y = y;
        }
    }
}

export class ReverseSinMovement extends TimeBasedMovement {
    constructor(duration, smooth=false) {
        super(duration);

        this.mSmooth = smooth;
    }

    move(gameObject) {
        const t = Black.time.now;
        const x = gameObject.stage.centerX + Math.sin(-t) * 1;
        const y = gameObject.stage.centerY + Math.cos(-t) * 1;

        if (this.mSmooth) {
            gameObject.x = Interpolation.linear([gameObject.x, x], 0.05, MathEx.lerp);
            gameObject.y = Interpolation.linear([gameObject.y, y], 0.05, MathEx.lerp);
        } else {
            gameObject.x = x;
            gameObject.y = y;
        }
    }
}

export class InterpolateToMovement extends TimeBasedMovement {
    constructor(to, duration) {
        super(duration);
        this.to = to;
    }

    move(gameObject) {
        const speed=0.5;

        if (this.x != gameObject.x) {
            gameObject.x = Interpolation.linear([gameObject.x, this.to.x], speed, MathEx.lerp);
        }

        if (this.y != gameObject.y) {
            gameObject.y = Interpolation.linear([gameObject.y, this.to.y], speed, MathEx.lerp);
        }
    }
}

export class ConstantDirectionMovement extends TimeBasedMovement {
    constructor(direction, duration) {
        super(duration);
        this.direction = direction;
    }

    move(gameObject) {
        switch (this.direction) {
            case Direction.UP:
                gameObject.y -= 2;
                break;
            case Direction.RIGHT:
                gameObject.x += 2;
                break;
            case Direction.DOWN:
                gameObject.y += 2;
                break;
            case Direction.LEFT:
                gameObject.x -= 2;
                break;
        }
    }
}

export const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
}