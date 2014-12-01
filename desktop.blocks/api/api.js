/**
 * Модуль для взаиподействия с API
 * Через блок `bla` из библиотеки `bla`
 */
modules.define('api', ['bla'], function(provide, Api) {
    provide(new Api('/api/'));
});
