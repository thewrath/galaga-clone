'use strict';

import { Component } from 'black-engine';

export class StayInStageComponent extends Component {
    onUpdate() {
        const stage = this.gameObject.stage;
        // Todo : handle different pivot
        this.gameObject.x = Math.clamp(this.gameObject.x, this.gameObject.width/2, stage.width - this.gameObject.width/2);
        this.gameObject.y = Math.clamp(this.gameObject.y, this.gameObject.height/2, stage.height - this.gameObject.height/2);
    }
}