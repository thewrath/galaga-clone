'use strict';

import { Sprite } from 'black-engine';
import { Movement } from '../movement/Movement';

export class Enemy extends Sprite {
  
  /**
   * @param {string} image 
   * @param {Movement} movement 
   */
  constructor(image) {
    super(image);
    this.alignPivot();

    this._state = EnemyState.MOVE;
    this.on('stateChange', (msg) => {
      if (this.state === EnemyState.DIE) {
        this.post('die');
        this.removeFromParent();
      }
    }, this);
  }

  onUpdate() {
    if (this._isOutOfStage()) {
      this._state = EnemyState.DIE;
    }
  }

  _isOutOfStage() {
    return this.x > this.stage.width || this.x < 0 || this.y > this.stage.height || this.y < 0; 
  }

  onShoot(event, bullet) {
    this.parent.addChild(bullet);
    bullet.x = this.x;
    bullet.y = this.y;

    this.on('die', () => bullet.removeFromParent(), this);
  }

  onRemoveBullets(event, bullets) {
    bullets.forEach(b => this.parent.removeChild(b));
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this.post('stateChange', newState);
  }
}

export const EnemyState = {
  MOVE: 0,
  ATTACK: 1,
  DIE: 2,
}