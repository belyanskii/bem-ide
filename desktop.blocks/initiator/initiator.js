modules.define(
    'initiator',
    ['i-bem__dom', 'creator', 'events__channels', 'data-provider'],
    function(provide, BEMDOM, creator, channels, dp) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    dp.getLevelsIntrospection(function(blocks) {
                        // по полученным данным создаем модели
                        creator.initiateBlocksData(blocks).then(function(){
                            channels('space').emit('data:initialized');
                        });

                        // объявляем всеобщий хаос после создания моделей по данным
                    }, this);
                }
            }

        }));
    }
);
