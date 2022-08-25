'use strict';

import { Line, Vector } from 'black-engine';

export class Bezier {
    constructor(controlPoints) {
        this.controlPoints = controlPoints;
        this.path = this._compute(0.1);
    }
    
    _compute (step) {
        const computeLines = (points, t, intersectPoints = []) => {
            const lines = points.map2((f, s) => new Line(f, s));
            const newIntersectPoints = lines.map(l => this._pointOnLine(l, t));
        
            if (newIntersectPoints.length >= 2) {
                return computeLines(newIntersectPoints, t, newIntersectPoints);
            }
        
            return newIntersectPoints;
        }
    
        let result = [];
        for (let t = 0; t < 1; t +=step) {
            result = result.concat(computeLines(this.controlPoints, t, []));
        }
    
        return result;
    }
  
    _pointOnLine(line, percent) {
        const {start, end} = line;
        const a = new Vector();
        const b = new Vector();
        start.copyTo(a);
        end.copyTo(b);
    
        b.subtract(start).normalize();
    
        return a.add(b.multiplyScalar(percent*line.length()));
    }
}