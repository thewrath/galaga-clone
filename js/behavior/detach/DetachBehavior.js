'use strict';

import { MessageDispatcher } from "black-engine";

export class DetachBehavior extends MessageDispatcher {
    onDetach(gameObject, msg, followed) {
        throw new Exception('Need to be implemented');
    }
}