'use strict';

import { Component } from "black-engine";

export class LifeComponent extends Component {
    constructor(n) {
        super();
        this.mLives = n;
    }

    onUpdate() {
        if (this.mLives <= 0) {
            this.post('~die');
        } 
    }

    hit() {
        if (this.mLives > 0) {
            this.mLives -= 1;
        }
    }

    get lives() {
        return this.mLives;
    }
}