[
    {
        shouldDeps : [
            { block : 'i-bem', elems : 'dom' }
        ],
        mustDeps : [
            { block : 'model' },
            { block : 'utils' },
            { block : 'events', elems : 'channels' },
            { elems: ['list'] },
            {
                block: 'link',
                mods: {
                    pseudo: true
                }
            }
        ]
    },
    {
        tech : 'js',
        shouldDeps : [
            { tech : 'bemhtml', block : 'i-bem' },
            {
                tech : 'bemhtml',
                block : 'techs-line',
                elems: ['list']
            }
        ]
    }
]
