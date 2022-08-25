'use strict';

/**
 * Partition a list based on some test. The first list contains all values that satisfy the test, and the second list contains all the value that do not
 * 
 * @param {Array} array 
 * @param {function} condition 
 * @returns 
 */
Array.partition = (array, condition) => {
    const match = [];
    const rest = [];

    array.forEach(e => {
        if (condition(e)) {
            match.push(e);
        } else {
            rest.push(e);
        }
    });

    return [match, rest];
}

/**
 * @param {Array} array 
 * @returns 
 */
Array.empty = (array) => array.length <= 0;

/**
 * @param {function} cb 
 * @returns 
 */
Array.prototype.map2 = function(cb) {
    const result = [];
    for (let i = 0; i < this.length - 1; i++) {
        result.push(cb(this[i], this[i+1], i));
    }
    return result;
}

Array.prototype.tail = function() {
    return this.slice(1);
}

Array.prototype.head = function() {
    if (this.length > 0) {
        return this[0];
    }
    return null;
}

Array.prototype.last = function() {
    return this.length > 0 ? this[this.length - 1] : null;
}

Array.prototype.peekRandom = function() {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
}