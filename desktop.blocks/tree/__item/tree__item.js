modules.define(
    'tree__item',
    ['i-bem__dom'],
    function(provide, BEMDOM) {
        provide(BEMDOM.decl({ block: 'tree', elem: 'item' }, {

            onSetMod: {
                js: function() {
                    // Если внутри item'a была выбрана сущность - показываем его вложенность
                    this.elemInstances('entity').forEach(function(entity) {
                        entity.on({ modName:'selected', modVal: '*' }, function(e, data) {
                            this.setMod('show-nested', data.modVal);
                        }, this);
                    }, this);
                }
            }

        }));
    }
);
