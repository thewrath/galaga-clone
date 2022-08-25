'use strict';

import { Sprite } from "black-engine";

export class Bullet extends Sprite {
    constructor(image, velocityY=-20) {
        super(image);
        this.mAlive = true;
        this.mVelocityY = velocityY;
        this.scaleX = 1.5
        this.scaleY= 1.5

        this.alignPivot();
    }

    onAdded() {
        super.onAdded();
    }

    onUpdate() {
        if (this.y <= 0) this.mAlive = false;
    }

    progress() {
        this.y += this.mVelocityY;
    }

    get alive() {
        return this.mAlive;
    }

    set alive(alive) {
        this.mAlive = alive;
    }
}