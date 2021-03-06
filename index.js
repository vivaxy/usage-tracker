/**
 * @since 15-08-24 20:49
 * @author vivaxy
 */
'use strict';
var util = require('util');
var https = require('https');
var events = require('events');

var EventEmitter = events.EventEmitter;

var log = require('log-util');
var dateFormat = require('dateformat');

var UsageTracker = function (options) {

    EventEmitter.apply(this, arguments);

    this.host = 'api.github.com';
    this.port = 443;
    this.defaultReport = {
        'time': dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l o'),
        'arch': process.arch,
        'platform': process.platform,
        'node-version': process.version,
        'argv': process.argv,
        'cwd': process.cwd(),
        'usage-tracker-version': require('./package.json').version
    };
    this.initialize(options);
};

util.inherits(UsageTracker, EventEmitter);
UsageTracker.prototype.constructor = UsageTracker;

UsageTracker.prototype.send = function (o) {
    var _this = this;
    var _log = this.log;
    var postData = JSON.stringify({
        body: this.getRequestBody(o)
    });
    var options = {
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
            'User-Agent': require('./package.json').name + '/' + require('./package.json').version
        }
    };
    var req = https.request(options, function (res) {
        var responseData = '';
        _log.debug('status code', res.statusCode);
        if (res.statusCode === 201) {
            _log.debug('usage sent');
            _this.emit('success');
        }
        res.on('data', function (data) {
            responseData += data;
        });
        // there is event `close`
        res.on('end', function () {
            _log.verbose('response end', responseData);
            _this.emit('end');
        });
    });
    _log.verbose('Authorization', options.headers['Authorization']);
    _log.verbose('Content-Length', options.headers['Content-Length']);
    _log.verbose('User-Agent', options.headers['User-Agent']);
    _log.verbose('post data', postData);
    req.on('error', function (e) {
        _log.debug(e.stack);
        // cannot use `error` in nodejs
        _this.emit('err', e);
    });
    req.end(postData);
    return this;
};

UsageTracker.prototype.prettify = function (o) {
    var output = '\n';
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            output += '"' + i + '": ' + JSON.stringify(o[i], null, '    ') + ',\n';
        }
    }
    return output;
};

UsageTracker.prototype.getRequestBody = function (o) {
    return '```json' +
        '\n' +
        this.prettify(this.defaultReport) +
        this.prettify(this.report) +
        this.prettify(o).slice(0, -2) +
        '\n' +
        '```'
};

UsageTracker.prototype.initialize = function (options) {
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
