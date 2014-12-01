var ApiMethod = require('bla').ApiMethod,
    bit = require('../bem-ide-toolkit');

module.exports = new ApiMethod({
    name: 'get-tech',
    description: 'Returns entity tech',
    params: {
        levels: {
            description: 'Levels for introspection',
            required: true
        },
        entity: {
            description: 'BEM entity in bmnttn',
            required: true
        },
        tech: {
            description: 'Entity tech',
            required: true
        }
    },
    action: function (params) {
        return bit.getTech(params.levels, params.entity, params.tech).then(function(tech) {
            return tech;
        });
    }
});

