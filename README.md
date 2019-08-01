# gulp-xmltojson #

This plugin is a wrapper for npm package ['xml-js'](https://www.npmjs.com/package/xml-js)

The goal of this plugin is to take a XML file and convert it to JSON. The XML files are passed through gulp.src in the gulpfile.

A sample XML may look something like
```
<root>
    <section>
        <title>First</title>
        <content>Data: buffer</content>
    </section>
    <section>
        <title>Second</title>
        <content>Data: string</content>
    </section>
</root>
```

and if passed in to this plugin will return the following JSON
```
{
    "root": {
        "section": [
            {
                "title": {
                    "_text": "First"
                },
                "content": {
                    "_text": "Data: buffer"
                }
            },
            {
                "title": {
                    "_text": "Second"
                },
                "content": {
                    "_text": "Data: string"
                }
            }
        ]
    }
}
```

The package [gulp-jsontoxml](https://www.npmjs.com/package/gulp-jsontoxml) can be used to convert JSON files back to XML 
# Compact vs Non Compact #
The user can decide whether to create a [compact](https://github.com/nashwaan/xml-js#compact-vs-non-compact) or a [non-compact](https://github.com/nashwaan/xml-js#compact-vs-non-compact) JSON file by setting 'compact:true' or 'compact:false' in the options parameter. 

A sample compact and non compact JSON comparison can be found [here](https://github.com/nashwaan/xml-js#synopsis)



### Usage
**gulp-xmltojson** plugin accepts a configObj as its parameter. The configObj will contain any info the plugin needs.


The configObj in this situation is used for users to enter in options that the user can enter inorder to customize the resultant xml file. The table containing the options can be found [here](https://github.com/nashwaan/xml-js#convert-xml--js-object--json)


##### Sample gulpfile.js
```
let gulp = require('gulp')
import {xmltojson} from 'gulp-xmltojson'
var sampleConfigObj = {compact: true, ignoreAttributes:true}; // sample configObj

exports.default = function() {
    return src('data/*.xml')
    // pipe the files through our xmltojson plugin
    .pipe(xmltojson(sampleConfigObj))
    .pipe(gulp.dest('../testdata/processed'));
    };
```

### Quick Start
* Dependencies: 
    * [git](https://git-scm.com/downloads)
    * [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
    * npm (installs with Node)
    * typescript - installed as a development dependency
* Clone this repo and run `npm install` to install npm packages
* Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)
* Test: `npm test` or `npm t`
* Compile to javascript: `npm run build`

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites



Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work..
