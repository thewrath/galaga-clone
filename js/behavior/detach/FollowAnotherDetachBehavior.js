'use strict';

import { DetachBehavior } from "./DetachBehavior";

export class FollowAnotherDetachBehavior extends DetachBehavior {
    onDetach(gameObject, msg, followed) {
        // We decide whether to follow another or become the leader
        // if (foc) {
        //     enemy.removeComponent(followOtherComponent);
        //     enemy.add(new FollowOtherComponent(foc.other));
        //     console.log('follow other');
        // } else {
        //     enemy.texture = Black.assets.getTexture('alienLeader');
        //     enemy.removeComponent(followOtherComponent);
        //     enemy.add(new AutoBehaviorComponent(
        //     (new Chain())
        //         .push((new Loop(null))
        //         .push(new SinMovement(10, true))
        //         .push(new ReverseSinMovement(10, true))
        //     )
        //     ));
        // }
    }
}