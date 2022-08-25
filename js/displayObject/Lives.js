'use strict';

import { DisplayObject, Graphics } from "black-engine";

export class Lives extends DisplayObject {
    constructor(n, color) {
        super();
        this.mLives = n;
        this.mColor = color;
    }

    onAdded() {
        this._draw();
    }

    _draw() {
        const g = new Graphics();
        
        for (let i = 0; i < this.mLives; i++) {
            this._drawRectangle(g, 30*i, 0);
            this.add(g);
        }
    }

    _drawRectangle(g, x, y) {
        g.beginPath();
        g.fillStyle(this.mColor);
        g.rect(x, y, 15, 15);
        g.fill();
        g.closePath();
    }

    get lives() {
        return this.mLives;
    }

    set lives(n) {
        if (n !== this.lives) {
            this.mLives = n;
            this.removeAllChildren();
            this._draw();
        }
    }
}