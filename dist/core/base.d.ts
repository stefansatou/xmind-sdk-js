export interface BaseOptions {
    debug?: string;
    instance?: any;
}
export default class Base {
    protected options: BaseOptions;
    private readonly _debug;
    constructor(options?: BaseOptions);
    /**
     * @description Print debug information
     * @param {Array} args - the rest arguments
     */
    debug(...args: any[]): void;
    /**
     * @description uuid/v4
     */
    get id(): string;
}
