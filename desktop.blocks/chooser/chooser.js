modules.define(
    'chooser',
    ['i-bem__dom', 'jquery', 'events__channels'],
    function(provide, BEMDOM, $, channels) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    this._blockName = this.params.name;

                    this._initEvents();
                }
            },

            /**
             * Имя блока
             */
            _blockName: null,

            /**
             * Подписываемся на события
             * @private
             */
            _initEvents: function() {
                // каждый инстанс слушая канал решает, выбран он или нет.
                // спорная реализация, возможно необходим рефакторинг.
                channels('space').on('entity:select', function(e, data) {
                    this.setMod('selected', this._blockName === data.blockName);
                }, this);

                // обработчик выбора сущности в рамках блока
                this.findBlocksInside('link').forEach(function(link) {
                    link.on('click', this._chooseEntity, this);
                }, this);
            },

            /**
             * Событие на клик по сущности (блок, элемент, модификатор)
             * @param {Event} e
             * @param {Object} e.target.params bmnttn + type
             * @param {String} e.target.params.type тип выбранной сущности
             * @private
             */
            _chooseEntity: function(e) {
                // т.к. в параметрах название блока не передается, а запоминается в инстансе
                // дополняем их и вызываем событие entity:select
                channels('space').emit('entity:select', $.extend({
                    blockName: this._blockName
                }, e.target.params));
            }

        }));
    }
);
