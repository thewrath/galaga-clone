'use strict';

import { Sprite } from 'black-engine';
import { Bounds } from '../components/Bounds';
import { KeyboardControlComponent } from '../components/KeyboardControlComponent';
import { LifeComponent } from '../components/LifeComponent';
import { KeyShootTrigger, ShootComponent } from '../components/ShootComponent';
import { StayInStageComponent } from '../components/StayInStageComponent';
import { Bullet } from '../displayObject/Bullet';

export class Player extends Sprite {
    constructor(image) {
      super(image);
      
      this.alignPivot();

      const shootComponent = new ShootComponent({
        createOne: () => {
            return new Bullet('bullet');
        },
      }, new KeyShootTrigger());

      shootComponent.on('shoot', this.onShoot, this);
      shootComponent.on('removeBullets', this.onRemoveBullets, this);

      this.addComponent(new KeyboardControlComponent());
      this.addComponent(new StayInStageComponent());
      this.addComponent(new LifeComponent(3));
      this.addComponent(shootComponent);
      this.addComponent(new Bounds());

      this.mScore = 0;

      // Increase score when bullet collide
      this.on('bulletCollide', () => {
        this.mScore += 100;
      }, this);

      this.on('die', () => {
        if (this.parent) {
          this.removeFromParent();
        }
      }, this);
    }

    get score() {
      return this.mScore;
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

    accept(visitor) {
      visitor.visitPlayer(this);
    }
  }
  