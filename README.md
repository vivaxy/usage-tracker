# usage-tracker

node usage tracker


## usage

```
var usageTracker = require('usage-tracker');

usageTracker.initialize({
    owner: 'vivaxy',
    repo: 'usage-tracker',
    number: 1,
    token: 'github authorization token', // token should be encrypted
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

## api

### class `UsageTracker`

access by `usageTracker.UsageTracker`
