[
    {
        shouldDeps : [
            { block : 'i-bem', elems : 'dom' }
        ],
        mustDeps : [
            {
                block: 'chooser'
            },
            {
                block: 'model'
            },
            {
                elems: ['item']
            }
        ]
    },
    {
        tech : 'js',
        shouldDeps : [
            { tech : 'bemhtml', block : 'i-bem' },
            {
                tech : 'bemhtml',
                block : 'blocks-list',
                elems: ['item']
            }
        ]
    }
]
