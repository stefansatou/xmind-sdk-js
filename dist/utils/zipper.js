"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zipper = void 0;
const path = require("path");
const util_1 = require("util");
const common_1 = require("./common");
const fs = require("fs");
const base_1 = require("../core/base");
const constants_1 = require("../common/constants");
const JSZip = require("jszip");
/* istanbul ignore next */
const join = (process.platform === 'win32' ? path.win32.join : path.join);
const SUFFIX = '.xmind';
const DEFAULT_FILENAME = `default${SUFFIX}`;
/**
 * @description Zipper for .xmind file
 */
class Zipper extends base_1.default {
    constructor(options) {
        super({ debug: 'xmind-sdk:zipper' });
        if (!options.path || !fs.existsSync(options.path)) {
            this.debug('received %s', options.path);
            throw new Error('the `path` is required or must exists');
        }
        this.filename = options.filename || DEFAULT_FILENAME;
        this.filename = this.filename.endsWith(SUFFIX) ? this.filename : `${this.filename}${SUFFIX}`;
        this.path = options.path;
        this.zip = new JSZip();
        this.workbook = options.workbook || null;
        this.manifest = {
            'file-entries': { 'content.json': {}, 'metadata.json': {} }
        };
    }
    /**
     * @description Saving zip file
     * @return {Promise}
     * @public
     * @async
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.workbook) {
                this.addJSONContent(this.workbook.toString());
                this.addMetadataContents();
                this.addXMLContent();
                this.addManifestContents();
            }
            const options = {
                type: 'nodebuffer',
                compression: 'STORE',
                //compressionOptions: {level: 9},
                platform: 'UNIX'
            };
            const metadata = yield this.zip.generateAsync(options);
            const target = join(this.path, this.filename);
            return util_1.promisify(fs.writeFile)(target, metadata)
                .then(() => true)
                .catch(/* istanbul ignore next */ () => false);
        });
    }
    /**
     * @description Update manifest metadata
     * @param {String} key - a string key
     * @param {Buffer} content - file contents
     * @return {Zipper}
     */
    updateManifestMetadata(key, content) {
        if (!key)
            return this;
        if (!content || !Buffer.isBuffer(content)) {
            return this;
        }
        const arr = key.split('/');
        this.manifest['file-entries'][key] = {};
        this.zip.folder(arr[0]).file(arr[1], content, { binary: true });
        return this;
    }
    /**
     * @description Remove metadata from manifest
     * @param {String} key - the file key that was already stored in metadata of manifest
     * @return {Zipper}
     */
    removeManifestMetadata(key) {
        if (!key)
            return this;
        this.zip.remove(key);
        delete this.manifest['file-entries'][key];
        return this;
    }
    /**
     * @description add contents to metadata.json file
     *
     */
    addMetadataContents() {
        this.zip.file(constants_1.PACKAGE_MAP.METADATA.NAME, '{}');
        return this;
    }
    /**
     * @description add contents to manifest.json
     */
    addManifestContents() {
        this.zip.file(constants_1.PACKAGE_MAP.MANIFEST.NAME, JSON.stringify(this.manifest));
        return this;
    }
    /**
     * @description add contents to content.json
     */
    addJSONContent(contents) {
        if (common_1.isObject(contents)) {
            contents = JSON.stringify(contents);
        }
        this.zip.file(constants_1.PACKAGE_MAP.CONTENT_JSON.NAME, contents);
        return this;
    }
    /**
     * @description add contents to content.xml
     */
    addXMLContent() {
        const p = join(__dirname, '../common/templates/content.xml');
        this.zip.file(constants_1.PACKAGE_MAP.CONTENT_XML.NAME, fs.readFileSync(p));
        return this;
    }
}
exports.Zipper = Zipper;
//# sourceMappingURL=zipper.js.map