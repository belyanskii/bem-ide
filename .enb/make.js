var tech = {
    // essential
    levels: require('enb-bem/techs/levels'),
    fileProvider: require('enb/techs/file-provider'),
    fileCopy: require('enb/techs/file-copy'),
    bemdeclFromBemjson: require('enb-bem/techs/bemdecl-from-bemjson'),
    deps: require('enb-bem/techs/deps-old'),
    files: require('enb-bem/techs/files'),
    bemdeclFromDepsByTech: require('enb-bem/techs/bemdecl-from-deps-by-tech'),
    fileMerge: require('enb/techs/file-merge'),

    // optimization
    borschik: require('enb-borschik/techs/borschik'),

    // css
    cssStylus: require('enb-stylus/techs/css-stylus'),

    // js
    browserJs: require('enb-diverse-js/techs/browser-js'),
    prependYm: require('enb-modules/techs/prepend-modules'),

    // bemtree
    // bemtree: require('enb-bemxjst/techs/bemtree-old'),

    // bemhtml
    bemhtml: require('enb-bemxjst/techs/bemhtml-old'),
    htmlFromBemjson: require('enb-bemxjst/techs/html-from-bemjson')
};

module.exports = function(config) {
    config.nodes('*.bundles/*', function(nodeConfig) {
        var isProd = process.env.YENV === 'production';

        nodeConfig.addTechs([
            // essential
            [tech.levels, { levels: getLevels(config) }],
            [tech.fileProvider, { target: '?.bemjson.js' }],
            [tech.bemdeclFromBemjson],
            [tech.deps],
            [tech.files],

            // css
            [tech.cssStylus, { target: '?.css' }],

            // bemhtml
            [tech.bemhtml, { devMode: isProd }],
            [tech.htmlFromBemjson],

            // client bemhtml
            [tech.bemdeclFromDepsByTech, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [tech.deps, {
                target: '?.bemhtml.deps.js',
                sourceDepsFile: '?.bemhtml.bemdecl.js'
            }],
            [tech.files, {
                target: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [tech.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: isProd
            }],

            // js
            [tech.browserJs],
            [tech.fileMerge, {
                target: '?.pre.js',
                sources: ['?.browser.bemhtml.js', '?.browser.js']
            }],
            [tech.prependYm, { source: '?.pre.js' }],

            // borschik
            [tech.borschik, { sourceTarget: '?.js', destTarget: '_?.js', freeze: true, minify: isProd }],
            [tech.borschik, { sourceTarget: '?.css', destTarget: '_?.css', tech: 'cleancss', freeze: true, minify: isProd }]
        ]);

        nodeConfig.addTargets(['?.html', '_?.css', '_?.js']);
    });
};

function getLevels(config) {
    return [
            {"path":"libs/bem-core/common.blocks/","check":false},
            {"path":"libs/bem-core/desktop.blocks/","check":false},
            {"path":"libs/bem-mvc/common.blocks/","check":false},
            {"path":"libs/bem-components/common.blocks","check":false},
            {"path":"libs/bem-components/desktop.blocks","check":false},
            {"path":"libs/bem-components/design/common.blocks","check":false},
            {"path":"libs/bem-components/design/desktop.blocks","check":false},
            {"path":"node_modules/bla/blocks","check":false},
            {"path":"desktop.blocks","check":true}
        ]
        .map(function(level) {
            return config.resolvePath(level);
        });
}
