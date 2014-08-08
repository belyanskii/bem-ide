modules.define(
    'blocks-list',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'vow', 'model', 'events__channels'],
    function(provide, BEMDOM, $, BEMHTML, vow, MODEL, channels) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    channels('space').on('data:initialized', this.buildBlocksList, this);
                }
            },

            /**
             * Строим дерево БЭМ сущностей
             */
            buildBlocksList: function() {
                var blocksModels = MODEL.get('m-block'),
                    blocks = blocksModels.map(function(blockModel) {
                        return {
                            block: 'blocks-list',
                            elem: 'item',
                            blockInfo: blockModel.toJSON()
                        };
                    });

                BEMDOM.append(this.domElem, BEMHTML.apply(blocks));
            }

        }));
    }
);
