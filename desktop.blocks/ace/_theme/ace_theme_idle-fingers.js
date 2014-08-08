/**
 * @module ace_theme_idle-fingers
 * @description Provide ace_theme_idle-fingers (load if it does not exist).
 */

modules.define(
    'ace_theme_idle-fingers',
    ['loader_type_js', 'ace__editor'],
    function(provide, loader) {

/* global ace_theme_idle-fingers */

function doProvide() {
    /**
     * @exports
     * @type Function
     */
    provide(window.require('ace/theme/idle_fingers'));
}

window.require && !!window.require('ace/theme/idle_fingers') ?
    doProvide() :
    loader('ace/theme-idle_fingers.js', doProvide);
});
