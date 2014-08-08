modules.define('data-provider', ['jquery'], function(provide, $) {
    provide({

        /**
         * Получение технологии блока
         * @param {Object} bmnttn
         * @param {String} tech
         * @param {Function} callback
         * @param {Object} ctx Контекст
         */
        getTech: function(bmnttn, tech, callback, ctx) {
            $.ajax({
                url: '/api/getEntityTech',
                type: 'post',
                context: ctx,
                dataType: 'json',
                data: {
                    entity: bmnttn,
                    tech: tech,
                    levels: this.getLevelsList()
                }
            }).done(function(data) {
                callback(data);
            });
        },

        saveTech: function(data, callback, ctx) {
            $.ajax({
                url: '/api/saveEntityTech',
                type: 'post',
                context: ctx,
                dataType: 'json',
                data: {
                    raw: data
                }
            }).done(function(data) {
                callback(data);
            });
        },

        /**
         * Получение интроспекции уровней
         * @param {Function} callback
         * @param {Object} ctx Контекст
         */
        getLevelsIntrospection: function(callback, ctx) {
            $.ajax({
                url: '/api/getLevels',
                type: 'post',
                context: ctx,
                dataType: 'json',
                data: {
                    levels: this.getLevelsList()
                }
            }).done(function(data) {
                callback(data);
            });
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
                'libs/bem-components/desktop.blocks'
            ];
        }

    });
});
