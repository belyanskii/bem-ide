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
                    type: 'button',
                    theme: 'normal',
                    size: 'm'
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
                    theme: 'normal',
                    size: 's'
                }
            }
        ]
    }
]
