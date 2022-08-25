'use strict';

import { Black } from "black-engine";
import { Chain, ConstantDirectionMovement, Direction, Loop, ReverseSinMovement, CircularMovement } from "../../movement/Movement";
import { LeaderMovementBehavior } from "../movement/LeaderMovementBehavior";
import { DetachBehavior } from "./DetachBehavior";
import { NothingDetachBehavior } from "./NothingDetachBehavior";

export class BecomeLeaderDetachBehavior extends DetachBehavior {
    onDetach(behaviorOchestrator, gameObject, msg, followed) {
        behaviorOchestrator.currentMovementBehavior = new LeaderMovementBehavior(
            (new Chain())
                .push((new Loop(null))
                .push(new ConstantDirectionMovement(Direction.RIGHT, 2))
                .push(new ConstantDirectionMovement(Direction.UP, 2))
                .push(new ConstantDirectionMovement(Direction.LEFT, 2))
                .push(new ConstantDirectionMovement(Direction.DOWN, 2))
            )
        );
          
        behaviorOchestrator.currentDetachBehavior = new NothingDetachBehavior();

        // We decide whether to follow another or become the leader
        gameObject.texture = Black.assets.getTexture('alienLeader');
    }
}