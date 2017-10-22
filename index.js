'use strict';

const uuid = require('uuid');

module.exports = (options) => {
    return (req, res, next) => {
        options = options || {};
        options.header = options.header || 'X-Request-Tag';
        if (!options.provider || !(typeof options.provider.generate === 'function')) {
            options.provider = {
                generate:() => {
                    return uuid.v4();
                }
            };
        }
        req.tag = options.provider.generate();
        res.setHeader(options.header, req.tag);
        return next();
    };
};
