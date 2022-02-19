"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const Debug = require("debug");
const v4 = require("uuid/v4");
const Robust = require("../common/themes/robust.json");
const Snowbrush = require("../common/themes/snowbrush.json");
const Business = require("../common/themes/snowbrush.json");
const debug = Debug('xmind-sdk:theme');
const ALLOWED_THEMES = ['robust', 'snowbrush', 'business'];
const THEMES = {
    robust: Robust,
    snowbrush: Snowbrush,
    business: Business,
};
/**
 * @description Invisible external
 */
class Theme {
    constructor(options = {}) {
        const name = options.themeName;
        if (!name || typeof name !== 'string' ||
            !ALLOWED_THEMES.includes(name.toLocaleLowerCase())) {
            debug('W - Only ', ALLOWED_THEMES.join(', '), 'are allowed for now.');
            throw new Error(`the theme name ${name} is not allowed`);
        }
        this.value = this.loader(name);
    }
    get data() {
        return this.value;
    }
    loader(name) {
        const theme = THEMES[name];
        theme.id = v4();
        theme.title = name;
        return theme;
    }
}
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map