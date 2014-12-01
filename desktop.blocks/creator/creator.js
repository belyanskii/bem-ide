modules.define(
    'creator',
    ['jquery', 'vow', 'model', 'm-block'],
    function(provide, $, vow, MODEL) {
    provide({

        /**
         * Проходимся по полученным данным, создавая модели блоков
         * @returns {Promise}
         * @private
         */
        initiateBlocksData: function(blocks) {
            var defer = vow.defer();
            // Учитывая формат данных приходящих с сервера
            // мы просто добавляем новые модели
            blocks.forEach(this.buildBlockModel, this);
            defer.resolve();

            return defer.promise();
        },

        /**
         * Создаем или обновляем модель блока
         * @param {Object} data Данные интроспекции блока
         * @private
         */
        buildOrUpdateBlockModel: function(data) {
            MODEL.getOne({ name: 'm-block', id: data.name }) ?
                this.updateBlockModel(data) :
                this.buildBlockModel(data);
        },

        /**
         * Создаем модель блока
         * @param {Object} data
         * @private
         */
        buildBlockModel: function(data) {
            MODEL.create('m-block', {
                name: data.name,
                techs: data.techs
            });

            // Если у блока есть модификаторы, создаем для каждого из них модель
            data.mods && this._addMods(data.name, false, data.mods);

            // Если у блока есть элементы, создаем для каждого из них модель
            data.elems && this._addElems(data.name, data.elems);
        },

        /**
         * Обновляем модель блока
         * @param {Object} data
         * @private
         */
        updateBlockModel: function(data) {
            MODEL.getOne({ name: 'm-block', id: data.name }).update({
                techs: data.techs
            });

            data.mods && this._addMods(data.name, false, data.mods);

            data.elems && this._addElems(data.name, data.elems);
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

            mods.forEach(function(modData) {
                var value = !!prefix ? modData.name : false,
                    modName = prefix || modData.name,
                    modId = blockName + '_' + modName,
                    modValId = modId + '_' + value,
                    techs = modData.techs || [],
                    modModel = MODEL.getOne({
                        name: 'm-modifier',
                        id: modId,
                        parentModel: parentModel
                    });

                if(!modModel) {
                    modModel = MODEL.create({
                        name: 'm-modifier',
                        parentModel: parentModel
                    }, {
                        id: modId,
                        name: modName
                    });
                }

                (techs.length && !prefix) && modModel.update({
                    techs: techs
                });

                if(!!prefix) {
                    var valModel = MODEL.getOne({ name: 'm-modifier-val', id: modValId });

                    if(valModel) {
                        valModel.update({
                            techs: techs
                        });
                    } else {
                        modModel.get('vals').add({
                            id: modValId,
                            name: value,
                            techs: techs
                        });
                    }
                }

                modData.vals && this._addMods(blockName, elemName, modData.vals, modName);
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

            elems.forEach(function(elemData) {
                var elemName = elemData.name,
                    id = (blockName + '__' + elemName),
                    elemModel = MODEL.getOne({ name: 'm-block-elem', id: id, parentName: blockName }),
                    techs = elemData.techs;

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

                elemData.mods && this._addMods(blockName, elemName, elemData.mods);

            }, this);

        },

        createEntity: function(bmnttn, techs) {
            var blockName = bmnttn.blockName,
                elemName = bmnttn.elemName,
                modName = bmnttn.modName,
                modVal = bmnttn.modVal,
                entityData = {
                    name: blockName
                };

            if(modName) {
                var mod = [{
                    name: modName
                }];

                if(modVal) {
                    mod[0].vals = [{
                        name: modVal
                    }];

                    mod[0].vals[0].techs = techs;
                } else {
                    mod[0].techs = techs;
                }
            }

            if(elemName) {
                entityData.elems = [{
                    name: elemName
                }];

                (modName || modVal) ?
                    entityData.elems[0].mods = mod :
                    entityData.elems[0].techs = techs;
            } else {
                (modName || modVal) ?
                    entityData.mods = mod :
                    entityData.techs = techs;
            }

            this.buildOrUpdateBlockModel(entityData);
        }

    });
});
