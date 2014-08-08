modules.define(
    'space',
    ['i-bem__dom', 'initiator', 'events__channels'],
    function(provide, BEMDOM, initiator, channels) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    // когда инициатор создал модели по данным - объявляем всеобщий хаос
                    initiator.init().then(function() {
                        channels('space').emit('data:initialized');
                    }, this);
                }
            }

        }));
    }
);
