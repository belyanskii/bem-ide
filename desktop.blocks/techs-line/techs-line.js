modules.define(
    'techs-line',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'events__channels', 'model', 'utils'],
    function(provide, BEMDOM, $, BEMHTML, channels, MODEL, u) {
    provide(BEMDOM.decl(this.name, {

        onSetMod: {
            js: function() {
                channels('space').on('entity:select', this.buildTechsList, this);

                BEMDOM.blocks['checkbox'].on(this.domElem,
                    { modName: 'checked', modVal: '*' }, this._onFilterChange, this);
            }
        },

        /**
         * Обработчик изменения фильтра
         * @private
         */
        _onFilterChange: function() {
            var techsToHide = [];

            this.findBlocksInside('checkbox').forEach(function(block) {
                !block.hasMod('checked') && techsToHide.push(block.getVal());
            });

            this._currentEntity.set('techsToHide', techsToHide);
        },

        /**
         * Текущая выбранная сущность
         */
        _currentEntity: null,

        /**
         * Строим список технологий выбранной сущности
         * @param {Event} e
         * @param {Object} bmnttn
         */
        buildTechsList: function(e, bmnttn) {
            var entityModel = u.getEntityModel(bmnttn);

            BEMDOM.replace(this.findElem('list'), BEMHTML.apply({
                block: 'techs-line',
                elem: 'list',
                techs: entityModel.get('techs'),
                techsToHide: entityModel.get('techsToHide')
            }));

            this._currentEntity = entityModel;
        }

    }));
});
