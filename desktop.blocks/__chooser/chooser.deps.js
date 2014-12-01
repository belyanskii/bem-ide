({
    shouldDeps : [
        { block : 'i-bem', elems : 'dom' },
        { block : 'events', elems : 'channels' },
        {
            block: 'link',
            mods: {
                pseudo: true
            }
        },
        {
            elems: [
                'list',
                'item',
                {
                    elem: 'entity',
                    mods: { type: ['mod', 'mod-val', 'elem'] }
                }
            ]
        }
    ]
})
