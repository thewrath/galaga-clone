'use strict';

/**
 * @param {number} n 
 * @returns 
 */
Number.prototype.mod = function(n) {
	const m = (( this % n) + n) % n;
    return m < 0 ? m + Math.abs(n) : m;
};