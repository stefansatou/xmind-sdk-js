/// <reference types="node" />
import { Workbook } from '..';
import Base from '../core/base';
import JSZip = require('jszip');
interface ZipperOptions {
    path: string;
    workbook: Workbook;
    filename?: string;
}
/**
 * @description Zipper for .xmind file
 */
export declare class Zipper extends Base {
    zip: JSZip;
    manifest: any;
    filename: string;
    path: string;
    workbook: Workbook;
    constructor(options: ZipperOptions);
    /**
     * @description Saving zip file
     * @return {Promise}
     * @public
     * @async
     */
    save(): Promise<boolean>;
    /**
     * @description Update manifest metadata
     * @param {String} key - a string key
     * @param {Buffer} content - file contents
     * @return {Zipper}
     */
    updateManifestMetadata(key: string, content: Buffer): this;
    /**
     * @description Remove metadata from manifest
     * @param {String} key - the file key that was already stored in metadata of manifest
     * @return {Zipper}
     */
    removeManifestMetadata(key: string): this;
    /**
     * @description add contents to metadata.json file
     *
     */
    private addMetadataContents;
    /**
     * @description add contents to manifest.json
     */
    private addManifestContents;
    /**
     * @description add contents to content.json
     */
    private addJSONContent;
    /**
     * @description add contents to content.xml
     */
    private addXMLContent;
}
export {};
