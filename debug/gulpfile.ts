let gulp = require('gulp')
import { xmltojson } from '../src/plugin'
import { jsontoxml } from 'gulp-jsontoxml'
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the xmltojson plugin will be called here
export function callxmltojson(callback: any) {
  gulp.src('../testdata/*.xml')
    .pipe(xmltojson({ compact: true }))
    .on('data', function (file: any) {
      console.log('Done creating ' + file.basename)
    })
    .pipe(gulp.dest('../testdata/processed'))
  callback();

};

// call companion plugin gulp-jsontoxml
export function calljsontoxml(callback: any) {
  gulp.src('../testdata/processed/*.json')
    .pipe(jsontoxml({ compact: true, spaces: 4 }))
    .on('data', function (file: any) {
      console.log('Done creating ' + file.basename)
    })
    .pipe(gulp.dest('../testdata/processed/round trip'))
    .on('end', function () {
      log.info('gulp task complete')
      callback()
    })
};

exports.roundtrip = gulp.series(callxmltojson, calljsontoxml)
exports.default = gulp.series(callxmltojson)
