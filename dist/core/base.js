"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v4 = require("uuid/v4");
const Debug = require("debug");
const DEFAULT_DEBUG_SCOPE = 'xmind-sdk';
class Base {
    /* istanbul ignore next */
    constructor(options = {}) {
        this.options = options;
        this.options = options;
        this._debug = Debug(this.options.debug || DEFAULT_DEBUG_SCOPE);
    }
    /**
     * @description Print debug information
     * @param {Array} args - the rest arguments
     */
    debug(...args) {
        this._debug(...args);
    }
    /**
     * @description uuid/v4
     */
    get id() {
        return v4();
    }
}
exports.default = Base;
//# sourceMappingURL=base.js.map