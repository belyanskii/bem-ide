/**
 * @module ace_mod_markdown
 * @description Provide ace_mod_markdown (load if it does not exist).
 */

modules.define(
    'ace_mod_markdown',
    ['loader_type_js', 'ace__editor'],
    function(provide, loader) {

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(window.require('ace/mode/markdown'));
}

window.require && !!window.require('ace/mode/markdown') ?
    doProvide() :
    loader('ace/mode-markdown.js', doProvide);
});
