[
    {
        shouldDeps : [
            {
                block : 'i-bem',
                elems: [{
                    name: 'dom',
                    mods: { 'elem-instances': true }
                }]
            },
            { block : 'events', elems : 'channels' },
            {
                block: 'link',
                mods: {
                    pseudo: true
                }
            }
        ],
        mustDeps : [
            {
                block: 'model'
            },
            {
                elems: [
                    'nested',
                    'nested-item',
                    {
                        name: 'item',
                        mods: { 'show-nested': true }
                    },
                    {
                        name: 'entity',
                        mods: { type: ['elem', 'mod', 'mod-val'] }
                    }
                ]
            }
        ]
    },
    {
        tech : 'js',
        shouldDeps : [
            { tech : 'bemhtml', block : 'i-bem' },
            {
                tech : 'bemhtml',
                block : 'tree',
                elems: ['item']
            }
        ]
    }
]
