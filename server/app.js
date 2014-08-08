var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    routes = require('./routes'),
    path = require('path'),
    st = require('serve-static'),
    app = express();

// Deps
app
    .use(st(process.cwd()))
    .use(morgan('default'))
    .use(bodyParser())
    .use(methodOverride());

// Routes
var router = express.Router();

router.post('/api/getLevel', routes.getLevel);
router.post('/api/getLevels', routes.getLevels);
router.post('/api/getBlock', routes.getBlock);
router.post('/api/getEntityTech', routes.getEntityTech);
router.post('/api/saveEntityTech', routes.saveEntityTech);

router.get('/', routes.index);

app.use('/', router);

// Start
app.listen(7777, function() { console.log('Start on port 7777'); });
