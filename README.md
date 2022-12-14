# express-session-fixation-middleware
Reset express-session session IDs to prevent against fixation attacks

## Install
`$ npm install --save express-session-fixation-middleware`

## Usage
```javascript
var fixation = require('express-session-fixation-middleware');

// Register with express
app.use(fixation(options));

app.use('/api/login', function(req, res, next) {
    req.login();
    req.resetSessionID().then(function() {
        next();
    });
});

```

## API

### Options
express-session-fixation-middleware accepts an optional options object that may include the following options

### everyRequest
Set this to true if you want the session ID to reset every time the user visits. Defaults to `false`. It's good for security, but may result in longer response times. For this reason, it only resets the ID if the request is a non-AJAX request.
