import { AbstractTopic, TopicOptions, MarkerOptions, ImageOptions } from '../abstracts/topic.abstract';
import { SummaryOptions } from '../abstracts/summary.abstract';
import * as Model from '../common/model';
import * as Core from 'xmind-model';
import Base from './base';
declare type TypedResource = {
    [componentId: string]: string;
};
/**
 * @description Topic common methods
 */
export declare class Topic extends Base implements AbstractTopic {
    private readonly sheet;
    private readonly root;
    private readonly resources;
    private componentId;
    private lastId;
    constructor(options?: TopicOptions);
    /**
     * Change the internal topic point at
     * @param componentId - The target componentId
     * @returns Topic
     */
    on(componentId?: string): Topic;
    /**
     * Add label to topic
     * @param text - A label string
     * @returns Topic - The instance of class Topic
     */
    addLabel(text: string): Topic;
    /**
     * Remove labels from the component which is specified by parameter "componentId"
     * @param componentId - The componentId
     * @returns Topic - The instance of class Topic
     */
    removeLabel(componentId?: string): Topic;
    add(topic?: Model.Topic, options?: {
        index: number;
    }): Topic;
    image(options?: ImageOptions): string;
    note(text: string, del?: boolean): Topic;
    destroy(componentId: string): Topic;
    summary(options?: SummaryOptions): Topic;
    marker(options?: MarkerOptions): Topic;
    cid(title?: string): string | null;
    lastCid(title?: string): string | null;
    cids(): TypedResource;
    find(componentId?: string): any;
    /**
     * @description Get root topic
     * @return {Topic}
     */
    get rootTopic(): Core.Topic;
    /**
     * @description Get root topicId
     */
    get rootTopicId(): any;
    /**
     * @description Get current topic instance
     * @return {Core.Topic}
     * @private
     */
    private current;
    /**
     * @description Check topic id
     * @param {String} componentId
     * @return {Boolean}
     * @private
     */
    private isValidTopicId;
}
export {};
