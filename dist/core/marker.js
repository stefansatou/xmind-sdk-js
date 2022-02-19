"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
const marker_abstract_1 = require("../abstracts/marker.abstract");
const icons = require("../common/constants/marker");
const debug_1 = require("debug");
const debug = debug_1.default('xmind-sdk:marker');
class Marker extends marker_abstract_1.AbstractMarker {
    constructor() {
        super();
        this.init();
    }
    init() {
        for (const property in icons) {
            this[property] = function (name) {
                if (!name) {
                    return null;
                }
                const normalized = (typeof name === 'string') ? name : String(name);
                if (name && !icons[property].hasOwnProperty(normalized)) {
                    debug('W - Invalid name string %s', name);
                    return null;
                }
                return icons[property][normalized];
            };
        }
    }
    /**
     * @description Get names by group name
     * @param {String} groupName
     * @return {Array<string>}
     * @static
     */
    static names(groupName) {
        return icons['iterable'][String(groupName)];
    }
    /**
     * @description Get group names
     * @return {Array<string>}
     * @static
     */
    static groups() {
        return Object.keys(icons['iterable']);
    }
}
exports.Marker = Marker;
//# sourceMappingURL=marker.js.map