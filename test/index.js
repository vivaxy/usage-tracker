/**
 * @since 15-08-25 10:43
 * @author vivaxy
 */
'use strict';
var path = require('path');
var usageTracker = require('../index.js');

usageTracker.initialize({
    owner: 'vivaxy',
    repo: 'usage-tracker',
    number: 1,
    token: require(path.join(__dirname, '../package.json')).reporter.split('').reverse().join(''),
    report: {
        // time
        timestamp: new Date().getTime(),
        // process
        arch: process.arch,
        platform: process.platform,
        version: process.version,
        versions: process.versions,
        argv: process.argv,
        cwd: process.cwd()
    }
});

usageTracker.send({
    // event
    event: 'test',
    data: '中文'
});
