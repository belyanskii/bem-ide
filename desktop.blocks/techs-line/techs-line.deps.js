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
                block: 'checkbox',
                mods: {
                    theme: 'islands',
                    size: 's',
                    type: 'button'
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
            },
            {
                tech : 'bemhtml',
                block: 'checkbox',
                mods: {
                    type: 'button',
                    theme: 'islands',
                    size: 's'
                }
            }
        ]
    }
]
