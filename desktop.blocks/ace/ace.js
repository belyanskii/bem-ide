/**
 * @module ace
 * @description Provide ace (load if it does not exist).
 */

modules.define(
    'ace',
    ['ace_theme_idle-fingers', 'ace_mod_javascript', 'ace_mod_css', 'ace_mod_markdown'],
    function(provide) {

/* global ace */
    provide(ace);
});
