modules.define(
    'tree',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'vow', 'model', 'events__channels'],
    function(provide, BEMDOM, $, BEMHTML, vow, MODEL, channels) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    channels('space')
                        .on('data:initialized', this._buildBlocksList, this)
                        .on('entity:select', this._selectEntity, this);

                    // Обработчик выбора сущности
                    BEMDOM.blocks['link'].on(this.domElem, 'click', this._onEntityClick, this);
                }
            },

            /**
             * Событие на клик по сущности (блок, элемент, модификатор)
             * @private
             */
            _onEntityClick: function(e) {
                channels('space').emit('entity:select', this.closestElemInstance(e.target.domElem, 'entity').params);
            },

            /**
             * Строим дерево БЭМ сущностей
             */
            _buildBlocksList: function() {
                var blocksModels = MODEL.get('m-block'),
                    blocks = blocksModels
                        // Сортируем по алфавиту относительно названия блока
                        .sort(function(a, b) { return (a['id'] < b['id']) ? -1 : (a['id'] > b['id']) ? 1 : 0; })
                        .map(function(blockModel) {
                            return {
                                block: 'tree',
                                elem: 'item',
                                blockInfo: blockModel.toJSON()
                            };
                        });

                // Кнопка добавления новой сущности
                blocks.unshift({
                    block: 'tree',
                    elem: 'new-entity'
                });

                BEMDOM.update(this.domElem, BEMHTML.apply(blocks));
            },

            /**
             * Генерируем путь к сущности используя bmnttn
             * Аналогичным образом мы это делаем в шаблоне элемента nested-item
             * @param {Object} bmnttn
             * @returns {string}
             */
            generateEntityPath: function(bmnttn) {
                var path = [];

                path.push(bmnttn.blockName);
                path.push(bmnttn.elemName);
                path.push(bmnttn.modName);
                path.push(bmnttn.modVal);

                return path.join('');
            },

            _getEntity: function(bmnttn) {
                var path = this.generateEntityPath(bmnttn);

                return this.findElemInstance('entity', 'path', path);
            },

            _selectEntity: function(e, bmnttn) {
                if(this.findElemInstance('entity', 'selected', true)) {
                    this.findElemInstance('entity', 'selected', true).delMod('selected');
                }

                this._getEntity(bmnttn).setMod('selected');
            }

        }));
    }
);
