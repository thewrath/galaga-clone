'use strict';

import { Graphics } from 'black-engine';
import { Rectangle as GeomRectangle }  from 'black-engine';

export class Rectangle extends Graphics {
    
    constructor(x, y, width = 0, height = 0) {
      super();
      this.x = x;
      this.y = y;

      /**
       * @private
       */
      this.innerWidth = width;
      
      /**
       * @private
       */
      this.innerHeight = height;

      this.color = 0xffffff;
    }

    onGetLocalBounds(outRect = undefined) {
      outRect = outRect || new GeomRectangle();
      outRect.set(0, 0, this.innerWidth, this.innerHeight);

      return outRect;
    }
  
    onAdded() {
      super.onAdded();
      this.beginPath();
      this.fillStyle(this.color);
      this.rect(0, 0, this.width, this.height);
      this.fill();
      this.closePath();
    }
  }