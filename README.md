# express-request-tag
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![NPM Downloads][downloads-image]][downloads-url]

Express middleware used to uniquely tag requests for traceability.

# Getting Started
This middleware works by attaching a tag (identifier) to the current request when executed allowing you to use it in other areas of your application throughout the request lifecycle to uniquely identify a client request. It also returns the generated tag value in a custom header (X-Request-Tag) to the client so you can make use of it on the front-end.

It comes with a default tag provider which uses the [uuid package](https://www.npmjs.com/package/uuid) from NPM to generate unique tags for each request.

You can also create your own custom tag provider if desired, too. This can be useful if you want to know what server in a cluster handled a particular request, for example, as you could prefix the tag with the server name using your own logic in a provider. An example has been provided that demonstrates this functionality in the API documentation.

# Install
You can install this package directly from NPM:
```
$ npm install express-request-tag
```

# API
API Documentation

## express-request-tag([options])
Executes the middleware that will tag the request.

* `options` - (Object) Optional
    * `header` - (String) Optional allows you to change the default header (X-Request-Tag) returned in the response
    * `provider` - (Object) Optional allows you to use your own provider to generate tags
        * `generate` - (Function) Required must return a string value to be used for the tag

# Examples
Examples on how to use this package are provided below.

## Default Usage
Uses the uuid package to generate a tag for each incoming client request.
```js
var express = require('express');
var requestTag = require('express-request-tag');

var app = express();
app.use(requestTag());

app.get('/', (req, res) => {
    return res.status(200).json({ tag:req.tag });
});

app.listen(8080, () => {
    console.log('Ready');
});
```

## Custom Provider Usage
Uses a custom provider that returns a unique tag prefixed by the server hostname.
```js
var express = require('express');
var os = require('os');
var uuid = require('uuid');
var requestTag = require('express-request-tag');

var app = express();
app.use(requestTag({
    provider:{
        generate:() => {
            return `${os.hostname()}-${uuid.v4()}`;
        }
    }
}));

app.get('/', (req, res) => {
    return res.status(200).json({ tag:req.tag });
});

app.listen(8080, () => {
    console.log('Ready');
});
```

Please be aware that it may not be wise to leak information about your server in a production environment as it may be useful to an attacker to identify resources and potential weaknesses within your environment.

# Testing
It is a good idea to run a test to ensure this package has remained functional:
```
$ npm test
```

# License
[MIT](http://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/express-request-tag.svg
[npm-url]: https://npmjs.org/package/express-request-tag
[travis-url]: https://travis-ci.org/dlowder/express-request-tag
[travis-image]: https://travis-ci.org/dlowder/express-request-tag.svg?branch=master
[downloads-image]: https://img.shields.io/npm/dm/express-request-tag.svg
[downloads-url]: https://npmjs.org/package/express-request-tag
