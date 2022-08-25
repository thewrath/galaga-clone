'use strict';

import { Black, Debug, Key, Component } from 'black-engine';

/**
 * This component let your GameObject to move inside of the current stage.
 */
export class KeyboardControlComponent extends Component {
    constructor(maxVelocity=10, ) {
        super();
        this.velocity = {x: 0, y: 0};
        this.keysDown = [];
        this.mMaxVelocity = maxVelocity;
    }

    onAdded() {
        Black.input.on('keyPress', (msg, keyInfo) => this._handleKeyPress(keyInfo.keyCode));
        Black.input.on('keyUp', (msg, keyInfo) => this._handleKeyUp(keyInfo.keyCode));
    }

    onUpdate() {
        this._move();
        this._processKeys();
        this._applyFriction();
    }

    _handleKeyPress(keyCode) {
        if (this.keysDown.includes(keyCode)) return;
        this.keysDown.push(keyCode);
    }
    
    _handleKeyUp(keyCode) {
        this.keysDown = this.keysDown.filter(k => k !== keyCode);
    }

    _move() {
        Debug.assert(this.gameObject.stage !== null);

        const stage = this.gameObject.stage;

        this.gameObject.x += this.velocity.x;
        this.gameObject.y += this.velocity.y;
    }

    _processKeys() {
        const isDown = (key) => this.keysDown.includes(key); 

        if (isDown(Key.LEFT_ARROW)) {
            this.velocity.x = Math.max(-this.mMaxVelocity, this.velocity.x - 2);
        } else if (isDown(Key.RIGHT_ARROW)) {
            this.velocity.x = Math.min(this.mMaxVelocity, this.velocity.x + 2);
        }
    }

    _applyFriction() {
        const reduceVelocity = (v) => {
            if (v < 0) {
                return Math.min(0, v + 0.5);
            } else if (v > 0) {
                return Math.max(0, v - 0.5);
            }
            return 0;
        }

        this.velocity.x = reduceVelocity(this.velocity.x);
        this.velocity.y = reduceVelocity(this.velocity.y);
    }
}