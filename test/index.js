/**
 * @since 15-08-25 10:43
 * @author vivaxy
 */
'use strict';
var UsageTracker = require('../index.js');

var usageTracker = new UsageTracker({
    owner: 'vivaxy',
    repo: 'usage-tracker',
    number: 1,
    token: ''.split('').reverse().join(''),
    report: {
        // time
        timestamp: new Date().getTime(),
        time: new Date().toString(),
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
    data: 'this is a test comment'
});
