# express-request-tag
Express middleware used to uniquely tag requests for traceability.

# Getting Started
This middleware works by attaching a tag field to the current request when executed allowing you to use it in other areas of your application throughout the request lifecycle. It also returns the generated tag value in a custom header (X-Request-Tag) to the client so you can make use of it on the front-end.

It comes with a default tag provider which uses the [uuid package](https://www.npmjs.com/package/uuid) from NPM to generate unique tags for each request.

You can also create your own custom tag provider if desired, too.

# Install
You can install this package directly from NPM:
```
npm install express-request-tag
```

# API
## express-request-tag([options])
Executes the middleware that will tag the request.

* `options` - (Object) Optional
    * `header` - (String) Optional allows you to change the default header (X-Request-Tag) returned in the response
    * `provider` - (Object) Optional allows you to use your own provider to generate tags
        * `generate` - (Function) Required must return a string value to be used for the tag

Example: Default usage using the uuid package to generate tags for each request
```js
var express = require('express');
var requestTag = require('express-request-tag');

var app = express();
app.use(requestTag());

app.get('/', function(req, res) {
    return res.status(200).json({ tag:req.tag });
});

app.listen(8080, function() {
    console.log('Ready');
});
```

# Testing
It is a good idea to run a test to ensure this package has remained functional:
```
npm test
```

# License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Douglas Lowder