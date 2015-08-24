# usage-tracker
node usage tracker


## usage

```
var Log = require('util-log');
var UsageTracker = require('usage-tracker');

var log = new Log();

var usageTracker = new UsageTracker({
    owner: 'vivaxy',
    repo: 'usage-tracker',
    number: 1,
    token: 'github authorization token',
    log: log,
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

```
