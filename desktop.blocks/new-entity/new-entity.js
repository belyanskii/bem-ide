modules.define(
    'new-entity',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'events__channels', 'creator'],
    function(provide, BEMDOM, $, BEMHTML, channels, creator) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    // Слушаем переключатель, для показа формы
                    this.findBlockInside('toggle', 'button').on('click', this._toggle, this);

                    // Сабмит формы (создание новой сущности)
                    this.findBlockInside('form', 'button').on('click', this._createEntity, this);

                    // Слушаем клик по покрывалу, чтобы закрыть форму
                    this.bindTo('cover', 'click', this._toggle);
                }
            },

            /**
             * Переключатель отображения формы
             * @private
             */
            _toggle: function() {
                this.toggleMod('show-form', true);
            },

            /**
             * Перестраиваем дерефо сущностей
             * @private
             */
            _rebuildTree: function() {
                this.nextTick(function() {
                    channels('space').emit('data:initialized');
                });
            },

            /**
             * Выбираем добавленную сущность
             * @param {Object} bmnttn
             * @private
             */
            _selectEntity: function(bmnttn) {
                this.nextTick(function() {
                    channels('space').emit('entity:select', bmnttn);
                });
            },

            /**
             * Собираем данные из формы и создаем новую (или же обновляем старую) сущность
             * @private
             */
            _createEntity: function() {
                var bmnttn = {
                    blockName: this.findBlockOn('block-name', 'input').getVal(),
                    elemName: this.findBlockOn('elem-name', 'input').getVal(),
                    modName: this.findBlockOn('mod-name', 'input').getVal(),
                    modVal: this.findBlockOn('mod-val', 'input').getVal()
                };

                creator.createEntity(bmnttn, this.findBlockOn('techs', 'input').getVal().split(','));

                this._rebuildTree();

                this._selectEntity(bmnttn);

                this.findBlocksInside('input').forEach(function(input) {
                    input.setVal('');
                });

                this._toggle();
            }

        }));
    }
);
