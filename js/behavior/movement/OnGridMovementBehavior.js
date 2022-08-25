'use strict';

import { Interpolation, MathEx } from "black-engine";
import { MovementBehavior } from "./MovementBehavior";

export class OnGridMovementBehavior extends MovementBehavior {
    
    constructor(row, col, rowGap, colGap, offset = {x:0, y:0}) {
        super();
        this.mRow = row;
        this.mCol = col;
        this.mRowGap = rowGap;
        this.mColGap = colGap;
        this.mOffset = offset;
    }
   
    update(gameObject) {
        const x = this.mOffset.x + (this.mRow * gameObject.width + this.mRowGap);
        const y = this.mOffset.y + (this.mCol * gameObject.height + this.mColGap);

        // Todo: Maybe use state machine ?
        const onHisPlace = Math.floor(Math.abs(gameObject.x - x)) == 0 && Math.floor(Math.abs(gameObject.y - y)) == 0;

        if (onHisPlace) {
            // Start to move left and right
        } else {
            gameObject.x = Interpolation.linear([gameObject.x, x], 0.05, MathEx.lerp);
            gameObject.y = Interpolation.linear([gameObject.y, y], 0.05, MathEx.lerp);
        }
    }
}