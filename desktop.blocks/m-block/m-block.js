modules.define('m-block', ['model', 'jquery'], function(provide, model, $) {

    /**
     * Фильтруем технологии
     * Временное решение для issue#2
     * @param techs
     * @returns {*}
     */
    function techsPreprocess(techs) {
        return techs.filter(function(item) {
            return !item.match('tmpl-specs|test|example');
        }, this);
    }

    provide(
        model.decl('m-block', {

            name: 'id',

            techs: {
                type: 'array',
                preprocess: function(techs) {
                    return techsPreprocess($.unique((this.get('techs') || []).concat(techs)));
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

        })
        .decl('m-block-elem', {
            id: 'id',

            name: 'string',

            techs: {
                type: 'array',
                preprocess: function(techs) {
                    return techsPreprocess($.unique((this.get('techs') || []).concat(techs)));
                }
            },

            mods: {
                type: 'models-list',
                modelName: 'm-modifier'
            }
        })
        .decl('m-modifier', {
            id: 'id',

            name: 'string',

            vals: {
                type: 'models-list',
                modelName: 'm-modifier-val'
            },

            techs: {
                type: 'array',
                preprocess: function(techs) {
                    return techsPreprocess($.unique((this.get('techs') || []).concat(techs)));
                }
            }
        })
        .decl('m-modifier-val', {

            id: 'id',

            name: 'string',

            techs: {
                type: 'array',
                preprocess: function(techs) {
                    return techsPreprocess($.unique((this.get('techs') || []).concat(techs)));
                }
            }
        })
    );
});
