'use strict';

import './utils/math';

import { Black, AssetManager, BlendMode, GameObject, InputComponent, DisplayObject } from 'black-engine';
import { Player } from './displayObject/Player';
import { EnemyState } from './displayObject/Enemy';
import { StarBackground } from './displayObject/StarBackground';

import alien from '/assets/textures/alien1.png';
import alienLeader from '/assets/textures/alien9.png';
import player from '/assets/textures/alien2.png';
import bullet from '/assets/textures/bullet.png';
import star from '/assets/textures/star.png';
import { ShootComponent } from './components/ShootComponent';
import { HUD } from './displayObject/HUD';
import { LifeComponent } from './components/LifeComponent';
import { spawnLevel } from './level/levels';

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
  }

  onAssetsLoaded(m) {
    this.addComponent(new InputComponent());

    this.add(new StarBackground());

    this.player = this.addChild(new Player('player'));
    
    // Player bullet collision with enemies
    this.player.on('bulletCollide', (msg, collider) => {
      collider.state = EnemyState.DIE;
      this.player.getComponent(ShootComponent).removeBulletCollider(collider);
    }, this);

    this.player.scaleX = 4;
    this.player.scaleY = 4;

    ///////// Level
    const level = spawnLevel(0);

    this.enemies = new GameObject();
    [...level.leaders, ...level.enemies].forEach((e) => {
      this.player.getComponent(ShootComponent).addBulletCollider(e);
      
      const shootComponent = e.getComponent(ShootComponent);
      if (shootComponent) {
        shootComponent.addBulletCollider(this.player);
      }

      this.enemies.addChild(e);
    });

    this.addChild(this.enemies);

    this.enemies.on('bulletCollide', (msg, collider) => {
      this.player.getComponent(LifeComponent).decrease();
      this.player.getComponent(ShootComponent).removeBulletCollider(collider);
    }, this);

    //////// Level


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
      typeof c.accept === 'function' && this.hud && c.accept(this.hud);
    }
  }

}