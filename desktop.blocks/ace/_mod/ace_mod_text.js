/**
 * @module ace_mod_text
 * @description Provide ace_mod_text (load if it does not exist).
 */

modules.define(
    'ace_mod_text',
    ['loader_type_js', 'ace__editor'],
    function(provide, loader) {

/* global ace_mod_text */

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(window.require('ace/mode/text'));
}

window.require && !!window.require('ace/mode/text') ?
    doProvide() :
    loader('ace/mode-text.js', doProvide);
});
