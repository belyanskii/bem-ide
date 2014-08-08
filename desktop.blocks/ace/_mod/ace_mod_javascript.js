/**
 * @module ace_mod_javascript
 * @description Provide ace_mod_javascript (load if it does not exist).
 */

modules.define(
    'ace_mod_javascript',
    ['loader_type_js', 'ace__editor'],
    function(provide, loader) {

/* global ace_mod_javascript */

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(window.require('ace/mode/javascript'));
}

window.require && !!window.require('ace/mode/javascript') ?
    doProvide() :
    loader('ace/mode-javascript.js', doProvide);
});
