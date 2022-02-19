import { Workbook } from '..';
export interface DumperOptions {
    workbook: Workbook;
}
export declare class Dumper {
    protected options: DumperOptions;
    private workbook;
    constructor(options?: DumperOptions);
    /**
     * @description dumping an object that contains the pair of $filename: $value
     * @return {Array} Array<{filename: string, value: any}>
     */
    dumping(): any[];
    private wrap;
    /**
     * @description metadata.json
     *
     */
    get metadata(): {
        filename: string;
        value: any;
    };
    /**
     * @description manifest.json
     */
    get manifest(): {
        filename: string;
        value: any;
    };
    /**
     * @description content.json
     */
    get json(): {
        filename: string;
        value: any;
    };
    /**
     * @description content.xml
     */
    get xml(): {
        filename: string;
        value: any;
    };
}
