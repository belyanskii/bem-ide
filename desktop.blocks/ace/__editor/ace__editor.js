/**
 * 
 * @module ace__editor
 * @description Provide ace__editor (load if it does not exist).
 */

modules.define(
    'ace__editor',
    ['loader_type_js'],
    function(provide, loader) {

/* global ace */

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(ace);
}

typeof ace !== 'undefined'?
    doProvide() :
    loader('ace/ace.js', doProvide);
});
