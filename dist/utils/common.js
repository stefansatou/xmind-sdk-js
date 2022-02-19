"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRuntime = exports.isObject = exports.isEmpty = void 0;
/**
 * @description Checking for value
 * @param {*} v - any values
 * @return {Boolean}
 */
const isEmpty = function (v) {
    if (v === 0 || v === false) {
        return false;
    }
    // undefined, null, '' are empty
    if (v === undefined || v === null || v === '') {
        return true;
    }
    // {} and [] are empty
    if (typeof v === 'object') {
        // Object.keys({}).length === 0
        // Object.keys([]).length === 0
        // Object.keys([1, 2]).length !== 0
        // Object.keys([null, undefined]).length !== 0
        return Object.keys(v).length === 0;
    }
    return false;
};
exports.isEmpty = isEmpty;
const isObject = function (v) {
    const type = typeof v;
    return v != null && (type === 'object' || type === 'function');
};
exports.isObject = isObject;
const isRuntime = function () {
    return typeof global === 'object' && typeof window === 'undefined';
};
exports.isRuntime = isRuntime;
//# sourceMappingURL=common.js.map