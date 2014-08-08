/**
 * @module ace_mod_css
 * @description Provide ace_mod_css (load if it does not exist).
 */

modules.define(
    'ace_mod_css',
    ['loader_type_js', 'ace__editor'],
    function(provide, loader) {

/* global ace_mod_css */

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(window.require('ace/mode/css'));
}

window.require && !!window.require('ace/mode/css') ?
    doProvide() :
    loader('ace/mode-css.js', doProvide);
});
