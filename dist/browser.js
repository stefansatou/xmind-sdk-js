"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workbook_1 = require("./core/workbook");
const topic_1 = require("./core/topic");
const marker_1 = require("./core/marker");
const dumper_1 = require("./utils/dumper");
// In browser, window === global
Object.assign(global, { Workbook: workbook_1.Workbook, Topic: topic_1.Topic, Marker: marker_1.Marker, Dumper: dumper_1.Dumper });
//# sourceMappingURL=browser.js.map