'use strict';

import { Black, Key, Component, Debug, Message, MessageDispatcher } from 'black-engine';
import '../utils/array';

const MAX_BULLET = 10;

export class ShootComponent extends Component {

    constructor(bulletFactory, shootTrigger) {
        super();
        this.bullets = [];
        this.bulletColliders = [];
        this.bulletFactory = bulletFactory;
        this.mShootTrigger = shootTrigger;
    }

    onAdded() {
        this.mShootTrigger.init();
        this.mShootTrigger.on('triggered', () => this.shoot(), this);
    }

    onUpdate() {
        const [bulletsOutOfScreen, bullets] = Array.partition(this.bullets, (b => !b.alive));
        this.bullets = bullets;
        this.bullets.forEach(b => {
            if (typeof b.progress === 'function') {
                b.progress();
            }

            for (const collider of this.bulletColliders) {
                if (this.__checkCollision(collider, b)) {
                    b.alive = false;
                    if (!collider.alive) {
                        this.bulletColliders = this.bulletColliders.filter(c => c !== collider);
                    }
                    this.post('~bulletCollide', collider);
                    break;
                }
            }
        })

        if (!Array.empty(bulletsOutOfScreen)) {
            this.post('~removeBullets', bulletsOutOfScreen);
        }
    }

    shoot() {
        const bullet = this.bulletFactory.createOne();
        this.bullets.push(bullet);
        this.post('~shoot', bullet);
    }

    registerBulletCollider(collider) {
        this.bulletColliders.push(collider);
    }

    _isBulletOutOfScreen(bullet) {
        Debug.assert(this.gameObject.stage !== null);
        
        const stage = this.gameObject.stage;

        return bullet.x < 0 || bullet.x > stage.width || bullet.y < 0 || bullet.y > stage.height;
    }

    __checkCollision(gameObjectA, gameObjectB) {
        const { x: aX, y: aY, width: aWidth, height: aHeight } = gameObjectA.getBounds(null, true);
        const { x: bX, y: bY, width: bWidth, height: bHeight } = gameObjectB.getBounds(null, true);

        return (
            aX < bX + bWidth &&
            aX + aWidth > bX &&
            aY < bY + bHeight &&
            aHeight + aY > bY
        );
    }
}

class ShootTrigger extends MessageDispatcher {

    init() {
        throw new Exception('Missing implementation.');
    }

}

export class KeyShootTrigger extends ShootTrigger {

    constructor(keyCode=Key.SPACE) {
        super();
        this.mKeyCode = keyCode;
    }

    init() {
        Black.input.on('keyPress', (msg, keyInfo) => {
            if (keyInfo.keyCode === this.mKeyCode) {
                this.post('triggered');
            }
        })
    }
}

export class AutoShootTrigger extends ShootTrigger {
    
    constructor(timeout=5000) {
        super();
        this.mTimeout = timeout;
    }

    init() {
        this._registerTimer();
    }

    _registerTimer() {
        this.mTimer = setTimeout(() => {
            this.post('triggered');
            this.mTimer = this._registerTimer();
        }, this.mTimeout);
    }
}