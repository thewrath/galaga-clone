'use strict';

import { Component } from 'black-engine';

export class AutoBehaviorComponent extends Component {
    constructor(behaviorOchestrator, timeout) {
        super();

        this.mBehaviorOchestrator = behaviorOchestrator;
        this.mBehaviorOchestrator.start();

        this.movementBehavior.on('detach', (msg, followed) => {
            this.detachBehavior.onDetach(this.mBehaviorOchestrator, this.gameObject, msg, followed)
        }, this);

    }

    onUpdate() {
        this.movementBehavior.update(this.gameObject);
    }

    get movementBehavior() {
        return this.mBehaviorOchestrator.currentMovementBehavior;
    }

    get detachBehavior() {
        return this.mBehaviorOchestrator.currentDetachBehavior;
    }
}