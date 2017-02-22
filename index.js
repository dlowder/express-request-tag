'use strict';

const uuid = require('uuid');

module.exports = function(options) {
    return function(req, res, next) {
        options = options || {};
        options.header = options.header || 'X-Request-Tag';
        if (!options.provider || !(typeof options.provider.generate === 'function')) {
            options.provider = {
                generate:function() {
                    return uuid.v4();
                }
            };
        }
        req.tag = options.provider.generate();
        res.setHeader(options.header, req.tag);
        return next();
    };
};
