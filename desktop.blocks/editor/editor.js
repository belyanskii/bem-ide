modules.define(
    'editor',
    ['i-bem__dom', 'BEMHTML', 'vow', 'ace', 'jquery', 'events__channels', 'model', 'utils', 'data-provider', 'm-block'],
    function(provide, BEMDOM, BEMHTML, vow, ace, $, channels, MODEL, u, dp) {
    provide(BEMDOM.decl(this.name, {

        onSetMod: {
            js: function() {
                channels('space').on('entity:select', this._onEntitySelect, this);

                this.bindToWin('resize', this._setEditorHeight);

                this._setEditorHeight();
            }
        },

        /**
         * Устанавливаем высоту редактора
         */
        _setEditorHeight: function() {
            this.domElem.height($(window).height() - 29);
        },

        /**
         * Создаем инстанс редактора ACE
         * @param {Object} bmnttn
         * @param {String} tech
         */
        _createEditorInstance: function(bmnttn, tech) {
            var _this = this;

            dp.getTech(bmnttn, tech, function(data) {
                var aceEditor;

                BEMDOM.append(this.domElem, BEMHTML.apply({
                    block: 'editor',
                    elem: 'ace',
                    info: tech,
                    title: tech
                }));

                aceEditor = ace.edit(tech);

                this._setEditorSettings(aceEditor, tech);

                aceEditor.setValue(data.join(''), -1);
            }.bind(_this), this);
        },

        /**
         * Набор настроек для каждого редактора
         * @param {Object} editorInst
         * @param {String} tech
         * @private
         */
        _setEditorSettings: function(editorInst, tech) {
            editorInst.session.setMode(this._getAceMod(tech)); // устанавливаем режим редактора для различных технологий
            editorInst.session.setUseWorker(false); // отключаем spelling
            editorInst.session.setUseWrapMode(true); // soft wrap
            editorInst.setOptions({
                theme: 'ace/theme/idle_fingers',
                maxLines: Infinity // убираем скролл у редактора (высота по контенту, неведомый хак из документации)
            });

            // Подписываемся для сохранения
            editorInst.commands.addCommand({
                name: 'saveData',
                bindKey: { win: 'Ctrl-S',  mac: 'Command-S' },
                exec: function(editor) {
                    var a = editor.getValue();

                    dp.saveTech(a, function(data) {
                        console.log(data);
                        alert(data.status);
                    }, this);
                }
            });

            // запрещаем редактировать строчки разделяющие уровни переопределения
            editorInst.selection.on('changeCursor', function(event, data) {
                var range = data.getRange(),
                    text = data.doc.$lines[range.start.row];

                editorInst.setReadOnly(!!text.match('(\\/\\*[\\d\\D]*?\\*\\/)'));
            })
        },

        /**
         * Возвращаем режим, относительно прешедшей технологии
         * @param {string} tech
         * @returns {string}
         * @private
         */
        _getAceMod: function(tech) {
            var techAssoc = {
                    javascript: [
                        'js',
                        'vanilla.js',
                        'spec.js',
                        'deps.js',
                        'bemjson.js',
                        'bemhtml',
                        'bemtree'
                    ],
                    css: [
                        'css',
                        'ie.css',
                        'ie7.css',
                        'ie8.css'
                    ],
                    markdown: ['md']
                };

            if(techAssoc.javascript.indexOf(tech) > -1) {
                return 'ace/mode/javascript'
            } else if(techAssoc.css.indexOf(tech) > -1) {
                return 'ace/mode/css'
            } else if(techAssoc.markdown.indexOf(tech) > -1) {
                return 'ace/mode/markdown'
            } else {
                return 'ace/mode/text'
            }
        },

        /**
         * Уничтожаем экземпляры редакторов перед добавлением новых
         * @private
         */
        _destructEditors: function() {
            var aceInstances = this.elem('area');

            aceInstances.length && aceInstances.forEach(function(inst) {
                ace.edit(inst).container.remove();
            });

            BEMDOM.destruct(this.domElem, true);
        },

        /**
         * Для каждой технологии блока создаем редактор
         * @param {Event} e
         * @param {Object} bmnttn
         */
        _onEntitySelect: function(e, bmnttn) {
            this._destructEditors();

            var model = u.getEntityModel(bmnttn),
                techs = model.get('techs');

            techs.forEach(function(tech) {
                this._createEditorInstance(bmnttn, tech);
            }, this);
        }

    }));
});
