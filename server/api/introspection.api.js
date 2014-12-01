var ApiMethod = require('bla').ApiMethod,
    bit = require('../bem-ide-toolkit'),
    fs = require('fs');

module.exports = new ApiMethod({
    name: 'introspection',
    description: 'Returns introspection by received levels',
    params: {
        levels: {
            description: 'Levels for introspection',
            required: true
        }
    },
    action: function (params) {
        return bit.scanLevels(params.levels).then(function(levels) {
            // Отдаем декорированный формат интроспекции
            return bit.introspectionDecorator(levels);
        });
    }
});
