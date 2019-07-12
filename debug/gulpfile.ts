let gulp = require('gulp')
import {xmltojson} from '../src/plugin'
import * as loglevel from 'loglevel'
//import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
var options = {compact:true};
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the plugin will be called here
    export function xml () {
      gulp.src('../testdata/planes.xml')
        .pipe(xmltojson(options))
        .pipe(gulp.dest('../testdata/processed'));
    };
    

exports.default = xml