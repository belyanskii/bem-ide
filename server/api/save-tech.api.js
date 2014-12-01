var ApiMethod = require('bla').ApiMethod,
    bit = require('../bem-ide-toolkit');

module.exports = new ApiMethod({
    name: 'save-tech',
    description: 'Save entity tech',
    params: {
        raw: {
            description: 'Raw string with data',
            required: true
        }
    },
    action: function (params) {
        return bit.saveTech(params.raw).then(function(status) {
            res.send(status);
        });
    }
});


