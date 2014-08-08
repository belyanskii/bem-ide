modules.define('initiator', ['jquery', 'vow', 'model', 'utils', 'data-provider', 'm-block'], function(provide, $, vow, MODEL, u, dp) {
    provide({

        /**
         * Инициализируем, интроспектим, делаем магию ;)
         * @returns {Promise} возвращаем promise что мы когда-нибудь заинитимся
         */
        init: function() {
            return this._buildOrUpdateBlockModel();
        },

        /**
         * Проходимся по полученным данным, по каждому уровню и блоку.
         * @returns {Promise}
         * @private
         */
        _buildOrUpdateBlockModel: function() {
            var deferred = vow.defer(),
                _this = this;

            dp.getLevelsIntrospection(function(data) {
                data.forEach(function(level) {
                    this._getObjKeys(level.introspection).forEach(function(name) {
                        var data = level.introspection[name];

                        MODEL.getOne({ name: 'm-block', id: name }) ?
                            this._updateBlockModel(data, name) :
                            this._buildBlockModel(data, name);

                    }, this);
                }, this);

                deferred.resolve();
            }.bind(_this), this);

            return deferred.promise();
        },

        /**
         * Создаем модель блока
         * @param {Object} data
         * @param {String} name
         * @private
         */
        _buildBlockModel: function(data, name) {
            MODEL.create('m-block', {
                name: name,
                techs: this._getObjKeys(data.files)
            });

            // Если у блока есть модификаторы, создаем для каждого из них модель
            this._getObjKeys(data.mods).length && this._addMods(name, false, data.mods);

            // Если у блока есть элементы, создаем для каждого из них модель
            this._getObjKeys(data.elems).length && this._addElems(name, data.elems);
        },

        /**
         * Обновляем модель блока
         * @param {Object} data
         * @param {String} name
         * @private
         */
        _updateBlockModel: function(data, name) {
            MODEL.getOne({ name: 'm-block', id: name }).update({
                techs: this._getObjKeys(data.files)
            });

            this._getObjKeys(data.mods).length && this._addMods(name, false, data.mods);

            this._getObjKeys(data.elems).length && this._addElems(name, data.elems);
        },

        /**
         * Добавляем данные про модификаторы и их технологии
         * @param {String} blockName
         * @param {String} [elemName]
         * @param {Object} mods
         * @param {String} [prefix]
         * @private
         */
         _addMods: function(blockName, elemName, mods, prefix) {
            var isElemMods = !!elemName,
                parentModel = MODEL.getOne({
                    name: isElemMods ? 'm-block-elem' : 'm-block',
                    id: blockName + (isElemMods ?  ('__' + elemName) : '')
                });

            this._getObjKeys(mods).forEach(function(key) {
                var data = mods[key],
                    value = !!prefix ? key : false,
                    modName = prefix || key,
                    id = value ? (modName + '_' + value) : modName,
                    techs = this._getObjKeys(data.files),
                    modModel = MODEL.getOne({
                        name: 'm-modifier',
                        id: modName,
                        parentModel: parentModel
                    });

                if(!modModel) {
                    modModel = MODEL.create({
                        name: 'm-modifier',
                        parentModel: parentModel
                    }, {
                        id: modName,
                        name: modName
                    });
                }

                (techs.length && !prefix) && modModel.update({
                    techs: techs
                });

                if(!!prefix) {
                    var valModel = MODEL.getOne({ name: 'm-modifier-val', id: id });

                    if(valModel) {
                        valModel.update({
                            techs: techs
                        });
                    } else {
                        modModel.get('vals').add({
                            id: id,
                            name: value,
                            techs: techs
                        });
                    }
                }

                this._getObjKeys(data.vals).length && this._addMods(blockName, elemName, data.vals, modName);
            }, this);
        },

        /**
         * Добавляем данные про элементы и их технологии
         * @param {String} blockName
         * @param {Object} elems
         * @private
         */
         _addElems: function(blockName, elems) {
            var blockModel = MODEL.getOne({ name: 'm-block', id: blockName });

            this._getObjKeys(elems).forEach(function(key) {
                var data = elems[key],
                    elemName = key,
                    id = (blockName + '__' + elemName),
                    elemModel = MODEL.getOne({ name: 'm-block-elem', id: id, parentName: blockName }),
                    techs = this._getObjKeys(data.files);

                if(elemModel) {
                    elemModel.update({
                        techs: techs
                    });
                } else {
                    blockModel.get('elems').add({
                        id: id,
                        name: elemName,
                        techs: techs
                    });
                }

                this._getObjKeys(data.mods).length && this._addMods(blockName, elemName, data.mods);

            }, this);

        },

        /**
         * Обертка для Objects.keys
         * @param {Object} obj
         * @returns {Array}
         * @private
         */
        _getObjKeys: function(obj) {
            return Object.keys((obj || {}));
        }

    });
});
