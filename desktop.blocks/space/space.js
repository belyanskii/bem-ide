modules.define(
    'space',
    ['i-bem__dom', 'initiator', 'events__channels', 'mousetrap'],
    function(provide, BEMDOM, initiator, channels, mousetrap) {
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    // когда инициатор создал модели по данным - объявляем всеобщий хаос
                    initiator.init().then(function() {
                        channels('space').emit('data:initialized');
                    }, this);

                    mousetrap.bind(['command+b', 'ctrl+b'], function() {
                        channels('space').emit('entity:create');

                        return false;
                    });

                }
            }

        }));
    }
);
