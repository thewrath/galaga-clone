'use strict';

import './utils/math';

import { Black, AssetManager, BlendMode, GameObject, InputComponent } from 'black-engine';
import { Player } from './displayObject/Player';
import { EnemyState } from './displayObject/Enemy';
import { StarBackground } from './displayObject/StarBackground';
import { EnemyFactory } from './factory/EnemyFactory';

import alien from '/assets/textures/alien1.png';
import alienLeader from '/assets/textures/alien9.png';
import player from '/assets/textures/alien2.png';
import bullet from '/assets/textures/bullet.png';
import star from '/assets/textures/star.png';
import { ShootComponent } from './components/ShootComponent';
import { HUD } from './displayObject/HUD';

export class Game extends GameObject {
  constructor() {
    super();

    const assets = new AssetManager();
    assets.enqueueImage('alien', alien);
    assets.enqueueImage('alienLeader', alienLeader);
    assets.enqueueImage('player', player);
    assets.enqueueImage('bullet', bullet);
    assets.enqueueImage('star', star);
    
    assets.on('complete', this.onAssetsLoaded, this);

    assets.loadQueue();

    this.mEnemyFactory = new EnemyFactory();
  }

  onAssetsLoaded(m) {
    this.addComponent(new InputComponent());

    this.add(new StarBackground());

    this.player = this.addChild(new Player('player'));
    this.player.on('bulletCollide', (msg, collider) => {
      collider.state = EnemyState.DIE;
    }, this);

    this.player.scaleX = 4;
    this.player.scaleY = 4;

    this.mEnemyFactory.spawnWave(1).forEach((e) => {
      this.player.getComponent(ShootComponent).registerBulletCollider(e);
      this.addChild(e)
    });

    this.hud = this.addChild(new HUD(this.player));
    
    this.stage.on('resize', this.onResize, this);
    this.onResize();

    Black.driver.context.imageSmoothingEnabled = false;
  }

  onResize() {
    this.player.x = this.stage.centerX;
    this.player.y = this.stage.height - this.player.height;
  }

  onUpdate() {
    for (const c of this.mChildren) {
      typeof c.accept === 'function' && c.accept(this.hud);
    }
  }

}