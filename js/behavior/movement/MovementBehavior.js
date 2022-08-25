'use strict';

import { MessageDispatcher } from "black-engine";

export class MovementBehavior extends MessageDispatcher {
    update(gameObject) {
        throw new Exception('need to be implemented');
    }
}