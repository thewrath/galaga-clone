'use strict';

import { Debug, MessageDispatcher } from "black-engine";

export class SequentialBehaviorOchestrator extends MessageDispatcher {
    
    constructor() {
        super();
        this.mBehaviorSet = {};
        this.mSequence = [];
        this.mStart = false;
        this.mCurrentTimer = null;
        this.mCurrentMovementBehavior = null;
        this.mCurrentDetachBehavior = null;
    }   

    registerBehaviorSet(movementBehavior, detachBehavior, name) {
        this.mBehaviorSet[name] = {
            movementBehavior: movementBehavior,
            detachBehavior: detachBehavior,
        }
    }

    addStep(name, timeout=5000) {
        this.mSequence.push({name: name, timeout: timeout});
    }

    start() {
        Debug.assert(!this.mStart, 'Already started.');
        Debug.assert(this.mSequence.length > 0, 'Cannot start, sequence is empty.');
        
        this.mStart = true;
        this.mSequence = this.mSequence.reverse();

        const first = this.mSequence.pop();

        const changeBehavior = (behaviorSet) => {
            this.mCurrentMovementBehavior = behaviorSet.movementBehavior;
            this.mCurrentDetachBehavior = behaviorSet.detachBehavior;
        
            // Register the next one
            const next = this.mSequence.pop();
            if (next) {
                this.mCurrentTimer = setTimeout(() => {
                    changeBehavior(this.mBehaviorSet[next.name]);
                }, next.timeout);
            }
        }

        changeBehavior(this.mBehaviorSet[first.name]);
    }

    get currentMovementBehavior() {
        return this.mCurrentMovementBehavior;
    }

    get currentDetachBehavior() {
        return this.mCurrentDetachBehavior;
    }

    set currentMovementBehavior(movementBehavior) {
        this.mCurrentMovementBehavior = movementBehavior;
    }

    set currentDetachBehavior(detachBehavior) {
        this.mCurrentDetachBehavior = detachBehavior;
    }
}