var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    routes = require('./routes'),
    path = require('path'),
    st = require('serve-static'),
    compress = require('compression'),
    app = express(),
    apiMiddleware = require('bla').apiMiddleware;

// Deps
app
    .use(st(process.cwd()))
    .use(compress())
    .use(morgan('default'))
    .use(bodyParser())
    .use('/api/:method?', apiMiddleware(__dirname + '/api/**/*.api.js'))
    .use(methodOverride());

// Routes
var router = express.Router();

router.get('/', routes.index);

app.use('/', router);

// Start
app.listen(7777, function() { console.log('Start on port 7777'); });
