modules.define('m-block', ['model', 'jquery', 'm-modifier', 'm-block-elem'], function(provide, model, $) {
    provide(model.decl('m-block', {

        name: 'id',

        techs: {
            type: 'array',
            preprocess: function(techs) {
                return $.unique((this.get('techs') || []).concat(techs));
            }
        },

        mods: {
            type: 'models-list',
            modelName: 'm-modifier'
        },

        elems: {
            type: 'models-list',
            modelName: 'm-block-elem'
        }

    }));
});

modules.define('m-block-elem', ['model', 'jquery', 'm-modifier'], function(provide, model, $) {
    provide(model.decl('m-block-elem', {
        id: 'id',

        name: 'string',

        techs: {
            type: 'array',
            preprocess: function(techs) {
                return $.unique((this.get('techs') || []).concat(techs));
            }
        },

        mods: {
            type: 'models-list',
            modelName: 'm-modifier'
        }
    }));
});

modules.define('m-modifier', ['model', 'jquery', 'm-modifier-val'], function(provide, model, $) {
    provide(model.decl('m-modifier', {
        id: 'id',

        name: 'string',

        vals: {
            type: 'models-list',
            modelName: 'm-modifier-val'
        },

        techs: {
            type: 'array',
            preprocess: function(techs) {
                return $.unique((this.get('techs') || []).concat(techs));
            }
        }
    }))
});

modules.define('m-modifier-val', ['model', 'jquery'], function(provide, model, $) {
    provide(model.decl('m-modifier-val', {

        id: 'id',

        name: 'string',

        techs: {
            type: 'array',
            preprocess: function(techs) {
                return $.unique((this.get('techs') || []).concat(techs));
            }
        }
    }));
});
