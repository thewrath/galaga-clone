'use strict'

import { LeaderMovementBehavior } from "../behavior/movement/LeaderMovementBehavior";
import { FollowOtherMovementBehavior } from "../behavior/movement/FollowOtherMovementBehavior";
import { AutoBehaviorComponent } from "../components/AutoBehaviorComponent";
import { Chain, CircularMovement, Loop } from "../movement/Movement";
import { Black, BlendMode } from "black-engine";
import { Enemy } from "../displayObject/Enemy";
import { BecomeLeaderDetachBehavior } from "../behavior/detach/BecomeLeaderDetachBehavior";
import { SequentialBehaviorOchestrator } from "../behavior/SequentialBehaviorOchestrator";
import { NothingDetachBehavior } from "../behavior/detach/NothingDetachBehavior";
import { OnGridMovementBehavior } from "../behavior/movement/OnGridMovementBehavior";
import { AutoShootTrigger, ShootComponent } from "../components/ShootComponent";
import { Bullet } from "../displayObject/Bullet";

const ROW_GAP = 25;
const COL_GAP = 25;

export class EnemyFactory {

    static createLeader(x, y, r, c, offset={x: 0, y: 0}) {
        const enemy = new Enemy('alien');
        enemy.x = x;
        enemy.y = y;
        enemy.scaleX = 4;
        enemy.scaleY = 4;
        enemy.texture = Black.assets.getTexture('alienLeader');

        const behaviorOchestrator = new SequentialBehaviorOchestrator();

        behaviorOchestrator.registerBehaviorSet(
            new LeaderMovementBehavior( 
                (new Chain())
                .push(
                    (new Loop(null))
                        .push(new CircularMovement(10, {x: x, y: y}, 200, false, 0))
            )),
            new NothingDetachBehavior(),
            'move'
        );

        behaviorOchestrator.registerBehaviorSet(
            new OnGridMovementBehavior(r, c, ROW_GAP, COL_GAP, offset),
            new NothingDetachBehavior(),
            'attack'
        );

        behaviorOchestrator.addStep('move', 5000);
        behaviorOchestrator.addStep('attack', 10000);

        enemy.addComponent(new AutoBehaviorComponent(behaviorOchestrator));

        const shootComponent = new ShootComponent({
            createOne: () => {
                const bullet = new Bullet('bullet', 10);
                bullet.rotation = Math.PI;
                return bullet;
            },
          }, new AutoShootTrigger(5000));
      
          shootComponent.on('shoot', enemy.onShoot, enemy);
          shootComponent.on('removeBullets', enemy.onRemoveBullets, enemy);
      
          enemy.addComponent(shootComponent);

        return enemy;
    }

    static createEnemyRow(leader, cols, rowIndex=0, offset={x: 0, y: 0}) {
        let previousEnemy = leader;
    
        const enemies = [];

        for (let i = 1; i < cols+1; i++) {
            const enemy = new Enemy('alien');
    
            enemy.x = 0;
            enemy.y = 0;
            enemy.scaleX = 4;
            enemy.scaleY = 4;
            enemy.blendMode = BlendMode.NORMAL;
            
            const behaviorOchestrator = new SequentialBehaviorOchestrator(); 
            behaviorOchestrator.registerBehaviorSet(
                new FollowOtherMovementBehavior(previousEnemy),
                new BecomeLeaderDetachBehavior(),
                'move'
            );

            behaviorOchestrator.registerBehaviorSet(
                new OnGridMovementBehavior(i, rowIndex, ROW_GAP, COL_GAP, offset),
                new NothingDetachBehavior(),
                'attack'
            );
    
            behaviorOchestrator.addStep('move', 5000);
            behaviorOchestrator.addStep('attack', 10000);
    
            enemy.addComponent(new AutoBehaviorComponent(behaviorOchestrator));
    
            enemies.push(enemy);
        
            previousEnemy = enemy;
        }
            
        return enemies;
    }
}