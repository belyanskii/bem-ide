var bit = require('../bem-ide-toolkit'),
    path = require('path'),
    fs = require('fs');

module.exports = {

    getLevel: function(req, res) {
        var level = req.body.level;

        bit.scanLevel(level).then(function(info) {
            res.send(info);
        });
    },

    getLevels: function(req, res) {
        var levels = req.body.levels;

        bit.scanLevels(levels).then(function(info) {
            res.send(info);
        });
    },

    getBlock: function(req, res) {
        var block = req.body.block,
            levels = req.body.levels;

        bit.scanBlock(levels, block).then(function(info) {
            res.send(info);
        });
    },

    getEntityTech: function(req, res) {
        var levels = req.body.levels,
            entity = req.body.entity,
            tech = req.body.tech;

        bit.getTech(levels, entity, tech).then(function(info) {
            res.send(info);
        });
    },

    saveEntityTech: function(req, res) {
        var raw = req.body.raw;

        bit.saveTech(raw).then(function(info) {
            res.send(info);
        });
    },

    index: function(req, res) {
        var index = fs.readFileSync(path.join(process.cwd(), 'desktop.bundles/index/index.html'));

        res.end(index);
    }

};
