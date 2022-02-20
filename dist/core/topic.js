"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const summary_1 = require("./summary");
const note_1 = require("./note");
const common_1 = require("../utils/common");
const base_1 = require("./base");
/**
 * @description Topic common methods
 */
class Topic extends base_1.default {
    constructor(options = {}) {
        super({ debug: 'xmind-sdk:topic' });
        this.resources = {};
        if (options && !options.sheet) {
            throw new Error('options.sheet is required');
        }
        this.sheet = options.sheet;
        this.root = this.sheet.getRootTopic();
        this.componentId = this.lastId = this.root.getId();
        this.resources[this.componentId] = 'Central Topic';
    }
    /**
     * Change the internal topic point at
     * @param componentId - The target componentId
     * @returns Topic
     */
    on(componentId) {
        if (!componentId) {
            this.componentId = this.root.getId();
            return this;
        }
        if (!this.isValidTopicId(String(componentId))) {
            throw new Error(`Invalid componentId ${String(componentId)}`);
        }
        this.componentId = componentId;
        return this;
    }
    /**
     * Sets structureClass to topic
     * @param structureClass - New structure class
     * @returns Topic - The instance of class Topic
     */
    setStructureClass(structureClass) {
        this.current().changeStructureClass(structureClass);
        return this;
    }
    /**
     * Add label to topic
     * @param text - A label string
     * @returns Topic - The instance of class Topic
     */
    addLabel(text) {
        const cur = this.current();
        const labels = cur.getLabels();
        const options = { index: 0 };
        if (!labels || labels.length === 0) {
            options.index = 0;
        }
        else {
            options.index = labels.length;
        }
        cur.addLabel(text, options);
        return this;
    }
    /**
     * Remove labels from the component which is specified by parameter "componentId"
     * @param componentId - The componentId
     * @returns Topic - The instance of class Topic
     */
    removeLabel(componentId) {
        const cur = componentId ? this.find(componentId) : this.current();
        if (!cur) {
            throw new Error(`does not found component: ${componentId}`);
        }
        cur.removeLabels();
        return this;
    }
    add(topic = {}, options) {
        if (!topic.title || typeof topic.title !== 'string') {
            throw new Error('topic.title should be a valid string');
        }
        topic.id = topic.id || this.id;
        this.resources[topic.id] = topic.title;
        const cur = this.current();
        cur.addChildTopic(topic, options);
        this.lastId = topic.id;
        return this;
    }
    image(options) {
        /* istanbul ignore if */
        if (!common_1.isRuntime()) {
            throw new Error('Cannot run .image() in browser environment');
        }
        const cur = this.current();
        const dir = `resources/${this.id}`;
        const params = Object.assign({}, { src: `xap:${dir}` }, options || {});
        cur.addImage(params);
        return dir;
    }
    note(text, del) {
        const cur = this.current();
        if (del === true) {
            cur.removeNotes();
            return this;
        }
        if (!text)
            return this;
        const n = new note_1.Note();
        n.text = text;
        cur.addNotes(n.toJSON());
        return this;
    }
    destroy(componentId) {
        if (!this.isValidTopicId(componentId)) {
            this.debug('E - target: "%s" does not exists', componentId);
            return this;
        }
        try {
            const topic = this.find(componentId);
            topic.parent().removeChildTopic(topic);
            delete this.resources[componentId];
        }
        catch (e) {
            /* istanbul ignore next */
            this.debug('D - %s', e.message);
        }
        return this;
    }
    summary(options = {}) {
        if (this.current().isRootTopic()) {
            this.debug('I - Not allowed add summary on root topic.');
            return this;
        }
        let edge = null;
        if (options.edge) {
            if (this.resources[options.edge]) {
                edge = options.edge;
            }
            else {
                this.debug('W - Topic "%s" does not exists', options.edge);
            }
        }
        const summary = new summary_1.Summary();
        const type = this.current().getType();
        const parent = this.current().parent();
        const children = parent.getChildrenByType(type);
        const condition = [this.componentId, !edge ? this.componentId : edge];
        summary.range({ children, condition });
        const summaryOptions = { title: options.title || 'Summary', id: this.id };
        summary.topicId = summaryOptions.id;
        parent.addSummary(summary.toJSON(), summaryOptions);
        this.resources[summaryOptions.id] = summaryOptions.title;
        this.lastId = summaryOptions.id;
        return this;
    }
    marker(options = {}) {
        if (!common_1.isObject(options) || common_1.isEmpty(options) ||
            !options['groupId'] || !options['markerId']) {
            this.debug('E - Invalid marker options: %j', options);
            return this;
        }
        if (options.del === true) {
            delete options.del;
            this.current().removeMarker(options);
            return this;
        }
        this.current().addMarker(options);
        return this;
    }
    cid(title) {
        if (title && typeof title === 'string') {
            for (const topicId in this.resources) {
                if (this.resources[topicId] === title) {
                    return topicId;
                }
            }
            return null;
        }
        return this.lastId;
    }
    lastCid(title) {
        if (title && typeof title === 'string') {
            for (const topicId of Object.keys(this.resources).reverse()) {
                if (this.resources[topicId] === title) {
                    return topicId;
                }
            }
            return null;
        }
        return this.lastId;
    }
    cids() {
        return this.resources;
    }
    find(componentId = null) {
        const rootId = this.root.getId();
        if (!componentId || componentId === rootId) {
            return this.root;
        }
        return this.sheet.findComponentById(componentId);
    }
    /**
     * @description Get root topic
     * @return {Topic}
     */
    get rootTopic() {
        /* istanbul ignore next */
        return this.root;
    }
    /**
     * @description Get root topicId
     */
    get rootTopicId() {
        return this.root.getId();
    }
    /**
     * @description Get current topic instance
     * @return {Core.Topic}
     * @private
     */
    current() {
        return (this.componentId === this.root.getId()) ? this.root : this.find(this.componentId);
    }
    /**
     * @description Check topic id
     * @param {String} componentId
     * @return {Boolean}
     * @private
     */
    isValidTopicId(componentId) {
        if (!componentId) {
            return false;
        }
        return this.resources.hasOwnProperty(componentId);
    }
}
exports.Topic = Topic;
//# sourceMappingURL=topic.js.map