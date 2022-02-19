declare type Extension = ExtensionTextNode | ExtensionChildNode;
declare type ItemInformation = Array<{
    type: string;
    mode: string;
}>;
declare type TabColor = Array<{
    rgb: string;
}>;
declare type Markers = {
    '<ID>': {
        name: string;
        resource: string;
    };
};
declare type Angle = {
    angle: number;
    amount: number;
};
declare type None = 'none';
declare type Plain = {
    content: string;
};
declare type NoteSpan = TextSpan | ImageSpan | HyperlinkSpan;
declare type Model = Sheet | SheetSetting | Relationship | Legend | Theme | Style | Topic | Image | Numbering | Notes | Extension;
export declare type Whatever = Model;
export declare enum VISIBILITY {
    HIDDEN = "hidden",
    VISIBLE = "visible"
}
export interface TextSpan {
    'style': Style;
    'text': string;
    'class': string;
}
export interface ImageSpan {
    'style': Style;
    'class': string;
    'image': string;
}
export interface HyperlinkSpan {
    'style': Style;
    'class': string;
    'href': string;
    'spans': Array<NoteSpan>;
}
export interface HTML {
    content: {
        paragraphs: Array<{
            style: Style;
            spans: Array<NoteSpan>;
        }>;
    };
}
export interface ControlPoints {
    '0': Axis;
    '1': Angle;
}
export interface Axis {
    x: number;
    y: number;
}
export interface Sheet {
    'id': string;
    'title': string;
    'rootTopic': Topic;
    'style': Style;
    'topicPositioning': string;
    'topicOverlapping': string;
    'theme': Theme;
    'relationships': Array<Relationship>;
    'legend': Legend;
    'settings': SheetSetting;
}
export interface SheetSetting {
    'infoItems/infoItem': ItemInformation;
    'tab-color': TabColor;
}
export interface Theme {
    'id': string;
    'title': string;
    'map'?: Style;
    'centralTopic'?: Style;
    'mainTopic'?: Style;
    'subTopic'?: Style;
    'floatingTopic'?: Style;
    'centralFloatingTopic'?: Style;
    'boundary'?: Style;
    'relationship'?: Style;
    'summaryTopic'?: Style;
    'summary'?: Style;
}
/**
 * Legend model
 */
export interface Legend {
    'visibility': VISIBILITY.HIDDEN | VISIBILITY.VISIBLE;
    'position': Axis;
    'markers': Markers;
    'groups': Markers;
}
export interface Topic {
    id?: string;
    title: string;
    style?: Style;
    class?: string;
    position?: Axis;
    structureClass?: string;
    branch?: string;
    width?: number;
    labels?: string;
    numbering?: Numbering;
    href?: string;
    notes?: Notes;
    image?: Image;
    children?: {
        [index: string]: Array<Topic>;
    };
    markers?: Array<Marker>;
    boundaries?: Array<Boundary>;
    summaries?: Array<Summary>;
    extensions?: Array<Extension>;
}
/**
 * Marker model
 */
export interface Marker {
    markerId: string;
    groupId: string;
}
/**
 * Boundary model
 */
export interface Boundary {
    id: string;
    title: string;
    style: Style;
    class: string;
    range: string;
}
/**
 * Summary model
 */
export interface Summary {
    id: string;
    style: Style;
    class: string;
    range: string;
    topicId: string;
}
/**
 * Relationship model
 */
export interface Relationship {
    'id': string;
    'title': string;
    'style': Style;
    'class': string;
    'end1Id': string;
    'end2Id': string;
    'controlPoints': ControlPoints;
}
export interface ExtensionTextNode {
    provider: string;
    content: string;
}
export interface ExtensionChildNode {
    provider: string;
    content: Array<object>;
    resourceRefs: Array<string>;
}
/**
 * Style model
 */
export interface Style {
    'id': string;
    'type': string;
    'properties': Object;
}
/**
 * Image model
 */
export interface Image {
    src: string;
    width: number;
    height: number;
    align: string;
}
/**
 * Numbering model
 */
export interface Numbering {
    numberFormat: string;
    prefix: string;
    suffix: string;
    prependingNumbers: None | undefined;
}
/**
 * Notes model
 */
export interface Notes {
    plain: Plain;
    html: HTML;
}
export {};
