var path = require('path'),
    fs = require('fs');

module.exports = {

    index: function(req, res) {
        var index = fs.readFileSync(path.join(process.cwd(), 'desktop.bundles/index/index.html'));

        res.end(index);
    }

};
