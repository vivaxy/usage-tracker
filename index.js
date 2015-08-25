/**
 * @since 15-08-24 20:49
 * @author vivaxy
 */
'use strict';
var path = require('path'),
    https = require('https'),

    log = require('log-util'),

    UsageTracker = function (options) {

        this.host = 'api.github.com';
        this.port = 443;

        this.initialize(options);
    },
    p = {};

UsageTracker.prototype = p;
p.constructor = UsageTracker;

p.send = function (o) {
    var _this = this,
        packageJson = require(path.join(__dirname, './package.json')),
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
                // http://stackoverflow.com/questions/17922748/what-is-the-correct-method-for-calculating-the-content-length-header-in-node-js
                // Buffer.byteLength instead of String.prototype.length
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': packageJson.name + '/' + packageJson.version
            }
        },
        req = https.request(options, function (res) {
            _this.log.debug('status code', res.statusCode);
            if (res.statusCode === 201) {
                _this.log.debug('usage sent');
            }
            res.on('data', function (d) {
                _this.log.verbose('response', d.toString());
            });
        });
    _this.log.verbose('Authorization', options.headers['Authorization']);
    _this.log.verbose('Content-Length', options.headers['Content-Length']);
    _this.log.verbose('User-Agent', options.headers['User-Agent']);
    _this.log.verbose('post data', postData);
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

p.initialize = function (options) {
    this.log = options.log || log;
    this.owner = options.owner || 'vivaxy';
    this.repo = options.repo || 'usage-tracker';
    this.number = options.number || 1;
    this.token = options.token || '';
    this.report = options.report || {};
    this.path = '/repos/' + this.owner + '/' + this.repo + '/issues/' + this.number + '/comments';
    return this;
};

var usageTracker = new UsageTracker({});
usageTracker.UsageTracker = UsageTracker;
module.exports = usageTracker;
