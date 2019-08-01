"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mapStream = require('map-stream');
let replaceExt = require('replace-ext');
const PluginError = require("plugin-error");
const pkginfo = require('pkginfo')(module);
const PLUGIN_NAME = module.exports.name;
const convert = require("xml-js");
function xmltojson(configObj) {
    configObj = configObj ? configObj : {};
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
            file.contents = Buffer.from(JSONResult);
            file.path = replaceExt(file.path, '.json');
        }
        cb(returnErr, file);
    }
    return mapStream(modifyContents);
}
exports.xmltojson = xmltojson;
;
//# sourceMappingURL=plugin.js.map