modules.define(
    'techs-line',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'events__channels', 'model', 'utils'],
    function(provide, BEMDOM, $, BEMHTML, channels, MODEL, u) {
    provide(BEMDOM.decl(this.name, {

        onSetMod: {
            js: function() {
                channels('space').on('entity:select', this.buildTechsList, this);
            }
        },

        /**
         * Строим список технологий выбранной сущности
         * @param {Event} e
         * @param {Object} data
         */
        buildTechsList: function(e, data) {
            BEMDOM.replace(this.findElem('list'), BEMHTML.apply({
                block: 'techs-line',
                elem: 'list',
                blockTechs: u.getEntityModel(data).get('techs')
            }));
        }

    }));
});
