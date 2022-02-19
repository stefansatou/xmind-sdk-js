"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workbook = void 0;
const theme_1 = require("./theme");
const base_1 = require("./base");
const Core = require("xmind-model");
/**
 * @description The implementation of Workbook
 * @extends {Base}
 */
class Workbook extends base_1.default {
    constructor() {
        super();
        this.resources = {};
    }
    theme(sheetTitle, themeName) {
        /* istanbul ignore next */
        if (!sheetTitle || !this.resources[sheetTitle]) {
            return false;
        }
        /* istanbul ignore next */
        if (!themeName || typeof themeName !== 'string') {
            return false;
        }
        const instance = new theme_1.Theme({ themeName });
        this.sheet.changeTheme(instance.data);
        return true;
    }
    toString() {
        return this.workbook.toString();
    }
    toJSON() {
        return this.workbook.toJSON();
    }
    validate() {
        return Core.validator(this.workbook.toJSON());
    }
    createSheet(sheetTitle, centralTopicTitle = 'Central Topic') {
        if (!sheetTitle) {
            throw new Error('The title of sheet is required');
        }
        if (this.resources.hasOwnProperty(sheetTitle)) {
            throw new Error('The title of sheet is duplication');
        }
        const sheetId = this.id;
        this.resources[sheetTitle] = sheetId;
        const options = [{ id: sheetId, title: sheetTitle, rootTopic: { id: this.id, title: centralTopicTitle } }];
        this.workbook = new Core.Workbook(options);
        this.sheet = this.workbook.getSheetById(sheetId);
        return this.sheet;
    }
}
exports.Workbook = Workbook;
//# sourceMappingURL=workbook.js.map