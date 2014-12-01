[
    {
        shouldDeps: [
            { block: 'i-bem', elems: 'dom' }
        ]
    },
    {
        mustDeps: [
            'ace',
            { block : 'events', elems : 'channels' },
            { block : 'model' },
            { block : 'utils' },
            { block : 'data-provider' },
            'm-block',
            { elems: ['ace'] }
        ]
    },
    {
        tech: 'js',
        shouldDeps: [
            { tech: 'bemhtml', block: 'i-bem' },
            {
                tech: 'bemhtml',
                block: 'editor',
                elems: ['ace']
            }
        ]
    }
]
