"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = require('map-stream');
var rext = require('replace-ext');
const PluginError = require("plugin-error");
const PLUGIN_NAME = module.exports.name;
var convert = require('xml-js');
function jsontoxml(configObj) {
    var configObj = configObj ? configObj : {};
    function modifyContents(file, cb) {
        if (file.isNull())
            return cb(null, file);
        if (file.isStream())
            return cb(new PluginError(PLUGIN_NAME, "Streaming not supported")); // pass error if streaming is not supported
        let returnErr = null;
        //Will parse the JSON into XML if the file is in
        if (file.isBuffer()) {
            let fileBuf = file.contents;
            let xmlResult;
            let JSONData;
            try {
                JSONData = fileBuf.toString('utf8');
                xmlResult = convert.json2xml(JSONData, configObj);
            }
            catch (err) {
                returnErr = new PluginError(PLUGIN_NAME, err);
            }
            file.contents = new Buffer(xmlResult);
            file.path = rext(file.path, '.xml');
        }
        cb(returnErr, file);
    }
    return map(modifyContents);
}
exports.jsontoxml = jsontoxml;
;
//# sourceMappingURL=plugin.js.map