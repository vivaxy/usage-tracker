# usage-tracker

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Dependency Status][david-image]][david-url]

[![NPM][nodei-image]][nodei-url]

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
        'usage-tracker-version': require('./package.json').version
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

### method `on`

```
usageTracker.on('eventType', function () {
    // callback goes on here
});
```

## event

### `end`

response end

### `success`

response end and report sent successfully

### `err`

request error

callback accepts one argument: `error` object, containing `error.message`, `error.stack`

## default report

```
time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l o'),
arch: process.arch,
platform: process.platform,
'node-version': process.version,
argv: process.argv,
cwd: process.cwd(),
'usage-tracker-version': require('./package.json').version
```

[npm-version-image]: http://img.shields.io/npm/v/usage-tracker.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/usage-tracker
[npm-downloads-image]: http://img.shields.io/npm/dm/usage-tracker.svg?style=flat-square
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE
[david-image]: http://img.shields.io/david/vivaxy/usage-tracker.svg?style=flat-square
[david-url]: https://david-dm.org/vivaxy/usage-tracker
[nodei-image]: https://nodei.co/npm-dl/usage-tracker.png?height=3
[nodei-url]: https://nodei.co/npm/usage-tracker/
