'use strict';

/**
 * Clamp value between two other.
 * 
 * @param {Number} value 
 * @param {Number} min 
 * @param {Number} max 
 */
Math.clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Return number between 0 and max.
 * @param {Number} max 
 * @returns 
 */
Math.randomInt = (max) => Math.floor(Math.random() * max);