/**
 * @since 15-08-24 20:49
 * @author vivaxy
 */
'use strict';
var path = require('path'),
    https = require('https'),

    UsageTracker = function (options) {

        this.owner = options.owner || 'vivaxy';
        this.repo = options.repo || 'usage-tracker';
        this.number = options.number || 1;
        this.token = options.token;
        this.report = options.report;

        this.log = options.log || {
                verbose: console.log,
                debug: console.log,
                info: console.log,
                warn: console.log,
                error: console.log
            };

        this.host = 'api.github.com';
        this.port = 443;
        this.path = '/repos/' + this.owner + '/' + this.repo + '/issues/' + this.number + '/comments';
    },
    p = {};

UsageTracker.prototype = p;
p.constructor = UsageTracker;
module.exports = UsageTracker;

p.send = function (o) {
    var _this = this,
        packageJson = path.join(__dirname, './package.json'),
        postData = JSON.stringify({
            body: this.prettify(this.report) + this.prettify(o)
        }),
        options = {
            host: this.host,
            port: this.port,
            path: this.path,
            method: 'POST',
            headers: {
                'Authorization': 'token ' + this.token,
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8',
                'User-Agent': packageJson.name + '/' + packageJson.version
            }
        },
        req = https.request(options, function (res) {
            _this.log.debug('status code', res.statusCode);
            if (res.statusCode === 201) {
                _this.log.debug('usage sent');
            }
            res.on('data', function (d) {
                _this.log.verbose('response ', d.toString());
            });
        });
    _this.log.verbose('post data ', postData);
    req.on('error', function (e) {
        _this.log.debug(e.message);
    });
    req.end(postData);
    return this;
};

p.prettify = function (o) {
    var output = '\n';
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            output += i + ': ' + JSON.stringify(o[i]) + '\n';
        }
    }
    return output;
};
