'use strict';

import { Black, Vector, Component, InputComponent } from 'black-engine';

export class DragComponent extends Component {
    constructor() {
      super();
  
      this.dragging = false;
      this.clickPos = new Vector();
    }
  
    onAdded(gameObject) {
      // Add InputComponent is required in order to Sprite listen for input
      gameObject.addComponent(new InputComponent());
  
      gameObject.on('pointerDown', this.onPointerDown, this);
  
      Black.input.on('pointerMove', this.onPointerMove, this);
      Black.input.on('pointerUp', this.onPointerUp, this);
    }
  
    onPointerDown(msg) {
      this.clickPos = this.gameObject.globalToLocal(Black.input.pointerPosition);
      this.dragging = true;
    }
  
    onPointerMove(msg) {
      if (this.dragging === false)
        return;
  
      // Find the offset relative to its parent
      let parentPos = this.gameObject.parent.globalToLocal(Black.input.pointerPosition);
  
      // Set a new position
      this.gameObject.x = parentPos.x - this.clickPos.x + this.gameObject.pivotX;
      this.gameObject.y = parentPos.y - this.clickPos.y + this.gameObject.pivotY;
    }
  
    onPointerUp(msg) {
      this.dragging = false;
    }
  }