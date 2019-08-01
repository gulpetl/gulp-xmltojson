let gulp = require('gulp')
import {xmltojson} from '../src/plugin'
import {jsontoxml} from 'gulp-jsontoxml'
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
var options = {compact:true};
var options2 = {compact:true, spaces: 4};
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the xmltojson plugin will be called here
    export function json (callback: any) {
      gulp.src('../testdata/*.xml')
        .pipe(xmltojson(options))
        .on('data', function (file:any) {
          console.log('Done creating ' + file.basename)
      }) 
        .pipe(gulp.dest('../testdata/processed'))
        callback();
        
    };

//the roundtrip back to xml
    export function xml(callback: any) {
      gulp.src('../testdata/processed/*.json')
      .pipe(jsontoxml(options2))
      .on('data', function (file:any) {
        console.log('Done creating ' + file.basename)
    })  
      .pipe(gulp.dest('../testdata/processed/round trip'))
     .on('end', function () {
        log.info('gulp task complete')
        callback()
      })
    };

    exports.default = gulp.series(json,xml)
    