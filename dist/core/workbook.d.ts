import { AbstractWorkbook } from '../abstracts/workbook.abstract';
import Base from './base';
import * as Core from 'xmind-model';
import { ErrorObject } from 'ajv';
/**
 * @description The implementation of Workbook
 * @extends {Base}
 */
export declare class Workbook extends Base implements AbstractWorkbook {
    sheet: Core.Sheet;
    private workbook;
    private readonly resources;
    constructor();
    theme(sheetTitle: string, themeName: string): boolean;
    toString(): string;
    toJSON(): import("xmind-model/types/models/sheet").SheetData[];
    validate(): {
        status: boolean;
        errors: ErrorObject[];
    };
    createSheet(sheetTitle: string, centralTopicTitle?: string): Core.Sheet;
}
