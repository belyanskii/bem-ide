modules.define('data-provider', ['jquery', 'api'], function(provide, $, api) {
    provide({

        /**
         * Получение технологии блока
         * @param {Object} bmnttn
         * @param {String} tech
         * @param {Function} callback
         * @param {Object} ctx Контекст
         */
        getTech: function(bmnttn, tech, callback, ctx) {
            api
                .exec('get-tech', { entity: bmnttn, tech: tech, levels: this.getLevelsList() })
                .then(callback, ctx);
        },

        saveTech: function(data, callback, ctx) {
            api
                .exec('save-tech', { raw: data })
                .then(callback, ctx);
        },

        /**
         * Получение интроспекции уровней
         * @param {Function} callback
         * @param {Object} ctx Контекст
         */
        getLevelsIntrospection: function(callback, ctx) {
            api
                .exec('introspection', { levels: this.getLevelsList() })
                .then(callback, ctx);
        },

        /**
         * Получаем уровни для работы
         * @returns {Array}
         */
        getLevelsList: function() {
            return [
                'libs/bem-core/common.blocks',
                'libs/bem-core/desktop.blocks',
                'libs/bem-components/common.blocks',
                'libs/bem-components/desktop.blocks',
                'desktop.bundles/'
            ];
        }

    });
});
