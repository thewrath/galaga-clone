'use strict';

import { MovementBehavior } from "./MovementBehavior";

export class LeaderMovementBehavior extends MovementBehavior {
    constructor(movement) {
        super();
        this.mMovement = movement;
    }

    update(gameObject) {
        this.mMovement.move(gameObject);
    }
}