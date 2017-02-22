'use strict';

const requestTag = require('..'),
    request = require('supertest'),
    chai = require('chai'),
    assert = require('assert'),
    expect = chai.expect,
    header = 'x-request-tag';

describe('When using the default UUID provider', function() {
    it('Response header should return a UUID from the default provider', function(done) {
        var app = require('express')();
        app.use(requestTag());
        app.get('/', function (req, res) {
            return res.status(200).send();
        });
        request(app).get('/').end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            assert(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(res.headers[header]));
            done();
        });
    });
});

describe('When using a custom provider', function() {
    it('Response header value should equal custom provider generate value', function(done) {
        var app = require('express')(),
            value = 'test';
        app.use(requestTag({
            provider:{
                generate:function() {
                    return value;
                }
            }
        }));
        app.get('/', function (req, res) {
            return res.status(200).send();
        });
        request(app).get('/').end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            assert(res.headers[header] === value);
            done();
        });
    });
    it('Response header should be renamed to custom header name provided by options', function(done) {
        var app = require('express')(),
            customHeader = 'x-custom-header';
        app.use(requestTag({
            header:customHeader
        }));
        app.get('/', function (req, res) {
            return res.status(200).send();
        });
        request(app).get('/').end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            assert(customHeader in res.headers);
            done();
        });
    });
});
