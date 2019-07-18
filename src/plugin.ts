var map = require('map-stream');
var rext = require('replace-ext');
import Vinyl = require('vinyl')
import PluginError = require('plugin-error');
const pkginfo = require('pkginfo')(module);
const PLUGIN_NAME = module.exports.name;
import convert = require('xml-js'); 

export function xmltojson(configObj?:convert.Options.XML2JSON) {
  configObj = configObj ? configObj : {};
  if(configObj==undefined)
  {
    configObj={}
  }
  function modifyContents(file: Vinyl, cb:Function) {
    if (file.isNull()) return cb(null, file); 
    if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, "Streaming not supported")); // pass error if streaming is not supported
    let returnErr: any = null

    //Will parse the JSON into XML if the file is in
    if (file.isBuffer()){
      let fileBuf : Buffer = (file.contents as Buffer)
      let xmlData:any
      let JSONResult:any
       try {
          xmlData = fileBuf.toString('utf8')
          JSONResult = convert.xml2json(xmlData,configObj)
          
          
    }catch(err){
      returnErr = new PluginError(PLUGIN_NAME, err);
    }
    file.contents = new Buffer(JSONResult);
    file.path = rext(file.path, '.json');

  }
    cb(returnErr, file);
  }
  return map(modifyContents);
};
