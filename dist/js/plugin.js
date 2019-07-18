"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = require('map-stream');
var rext = require('replace-ext');
const PluginError = require("plugin-error");
const pkginfo = require('pkginfo')(module);
const PLUGIN_NAME = module.exports.name;
const convert = require("xml-js");
function xmltojson(configObj) {
    configObj = configObj ? configObj : {};
    if (configObj == undefined) {
        configObj = {};
    }
    function modifyContents(file, cb) {
        if (file.isNull())
            return cb(null, file);
        if (file.isStream())
            return cb(new PluginError(PLUGIN_NAME, "Streaming not supported")); // pass error if streaming is not supported
        let returnErr = null;
        //Will parse the JSON into XML if the file is in
        if (file.isBuffer()) {
            let fileBuf = file.contents;
            let xmlData;
            let JSONResult;
            try {
                xmlData = fileBuf.toString('utf8');
                JSONResult = convert.xml2json(xmlData, configObj);
            }
            catch (err) {
                returnErr = new PluginError(PLUGIN_NAME, err);
            }
            file.contents = new Buffer(JSONResult);
            file.path = rext(file.path, '.json');
        }
        cb(returnErr, file);
    }
    return map(modifyContents);
}
exports.xmltojson = xmltojson;
;
//# sourceMappingURL=plugin.js.map