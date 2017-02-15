'use strict';
var myArgs = process.argv.slice(2);
var env = 'dist';
if (myArgs.length > 0) {
    if (myArgs[0] === 'dev' || myArgs[0] === 'build') {
        env = 'build';
    }
}
var mach = require('mach');
var path = require('path');
var app = mach.stack();
var publicDir = path.join(__dirname, env);
app.use(mach.file, publicDir);
console.log("Start server with public dir: " + publicDir);
mach.serve(app, 8080);
