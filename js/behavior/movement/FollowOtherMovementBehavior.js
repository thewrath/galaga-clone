'use strict';

import { MovementBehavior } from "./MovementBehavior";

import { Interpolation, MathEx } from 'black-engine';

export class FollowOtherMovementBehavior extends MovementBehavior {
    constructor(other) {
        super();
        this.mOther = other;
        this.mOther.on('die', () => {
            this.post('~detach', this.mOther)
        }, this);
    }

    update(gameObject) {
        gameObject.x = Interpolation.linear([gameObject.x, this.mOther.x], 0.05, MathEx.lerp);
        gameObject.y = Interpolation.linear([gameObject.y, this.mOther.y], 0.05, MathEx.lerp);
    }

    get other() {
        return this.mOther;
    }
}