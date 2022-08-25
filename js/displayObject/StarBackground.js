'use strict';

import '../utils/number';

import { Black, DisplayObject, VectorScatter, Sprite, ColorHelper, RGB } from "black-engine";

export class StarBackground extends DisplayObject {
    constructor(starNumber=200) {
        super();
        this.mStarNumber = starNumber;
        this.mLayers = [];
    }

    onAdded() {
        super.onAdded();

        const layerA = this._addLayer();
        const layerB =this._addLayer();
        const layerC =this._addLayer();

        layerB.y = layerA.y - this.stage.height; 
        layerC.y = layerB.y - this.stage.height; 
    }

    onUpdate() {
        const getPreviousLayer = (current) => {
            const l = this.mLayers.length;
            if (l <= 0) {
                return null;
            }
    
            return this.mLayers[(current - 1).mod(l)];
        }

        for(const [index, layer] of this.mLayers.entries()) {
            layer.y += 5;
            if (layer.y > this.stage.height) {
                const nextLayer = getPreviousLayer(index);
                if (nextLayer) {
                    layer.y = nextLayer.y - this.stage.height;
                }
            }
        }
    }

    _generateStars(displayObject, number) {
        const scatter = new VectorScatter(0, 0, 2000, 2000);

        for(let i=0; i < number; i++) {
            const star = new Sprite('star');
            scatter.getValue();

            star.x = scatter.value.x;
            star.y = scatter.value.y;
            star.alignPivot();
        
            displayObject.add(star);
        }
    }

    _addLayer() {
        const layer = new DisplayObject();
        layer.x = 0;
        layer.y = 0;

        this._generateStars(layer, this.mStarNumber);

        layer.cacheAsBitmap = true;
        layer.cacheAsBitmapDynamic = false;

        const colors = [
            new RGB(255, 255, 0),
            new RGB(255, 0, 0),
            new RGB(255, 255, 255)
        ];
        layer.color = ColorHelper.rgb2hex(colors.peekRandom());

        this.add(layer)

        this.mLayers.push(layer);

        return layer;
    }
}
