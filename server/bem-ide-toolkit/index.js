var scanl = require('scan-level'),
    PATH = require('path'),
    fs = require('vow-fs'),
    vow = require('vow'),
    deepExtend = require('deep-extend');

/**
 * Сканирует уровень с блоками
 * @param {String} level
 * @returns {*}
 */
function scanLevel(level) {
    var deferred = vow.defer();

    scanl(level, function(err, files) {
       if(err) throw err;

        deferred.resolve({
            level: level,
            introspection: files.tree
        });
    });

    return deferred.promise();
}

/**
 * Сканирует несколько уровней сразу
 * @param {Array} levels
 * @returns {*}
 */
function scanLevels(levels) {
    return vow.all(levels.map(function(level) {
        return scanLevel(level);
    }));
}

/**
 * Сканирует блок на уровне
 * @param {String} level
 * @param {String} block
 * @returns {*}
 */
function scanLevelByBlock(level, block) {
    var deferred = vow.defer();

    scanl(level, function(err, files) {
       if(err) throw err;

        deferred.resolve({
            level: level,
            introspection: files.tree[block]
        });
    });

    return deferred.promise();
}

/**
 * Сканирует блок на уровнях
 * @param {Array} levels
 * @param {String} block
 * @returns {*}
 */
function scanBlock(levels, block) {
    return vow.all(levels.map(function(level) {
        return scanLevelByBlock(level, block);
    }));
}

/**
 * Возвращает файл технологии сущности (блок, элемент, модификатор)
 * Если файлов несколько (на разных уровнях), склеивает в один используя разделитель
 * @param {Array} levels
 * @param {Object} entity
 * @param {String} tech
 * @returns {*}
 */
function getTech(levels, entity, tech) {
    typeof entity === 'string' && (entity = { blockName: entity });

    return vow.all(levels.map(function(level) {
        // TODO: добавить проверки для всех возможный вариантов отсутствия файла на разных уровнях
        var entityPath = _buildEntityPath(entity, level, tech);

        return fs.exists(entityPath).then(function(exists) {
            if(exists) {
                return fs.read(entityPath, 'utf-8').then(function(data) {
                    return {
                        tech: data,
                        level: entityPath
                    };
                });
            } else {
                return {
                    tech: 'WRITE SOME CODE FOR THIS LEVEL HERE',
                    level: entityPath
                };
            }
        });
    }, this))
    .then(function(data) {
        return data.map(function(data) {
            var separator = data.level + ' */';

            return '/* begin ' + separator + '\n' + data.tech + '\n' + '/* end ' + separator + '\n';
        });
    });
}

/**
 * Строим путь для сущности
 * @param {Object|String} entity
 * @param {String} level
 * @param {String} tech
 * @returns {*}
 * @private
 */
function _buildEntityPath(entity, level, tech) {
    var entityFullName = [entity.blockName],
        entityPath = [level, entity.blockName];

    if(entity.elemName) {
        entityFullName.push('__' + entity.elemName);
        entityPath.push('__' + entity.elemName);
    }

    if(entity.modName) {
        entity.modVal ?
            entityFullName.push('_' + entity.modName + '_' + entity.modVal) :
            entityFullName.push('_' + entity.modName);

        entityPath.push('_' + entity.modName);
    }

    entityFullName.push('.' + tech);

    return PATH.join(process.cwd(), entityPath.concat(entityFullName.join('')).join('/'));
}

/**
 * Сохранение о_о
 * @param {string} raw
 */
function saveTech(raw) {
    var beginRegex = /\/\* begin (.*) \*\/\s/,
        endRegex = /\s\/\* end (.*) \*\/\s/g,
        parsedContent = [],
        tempObj = {};

    raw.replace(endRegex, '')
        .split(beginRegex).forEach(function(item, idx) {
            if(item.length !== 0) {
                if(idx % 2) {
                    tempObj.path = item;
                } else {
                    tempObj.content = item;
                    parsedContent.push(tempObj);
                    tempObj = {};
                }
            }
        });

    return vow.all(parsedContent.map(function(item) {
        var path = item.path,
            content = item.content,
            isFish = content.match('WRITE SOME CODE FOR THIS LEVEL HERE');

        if(isFish) return{
            path: item.path,
            status: 'Skipped!'
        };

        return fs.exists(path).then(function(exists) {
            if(exists) {
                return fs.write(path, content).then(function(err) {
                    if(err) throw err;

                    return {
                        path: item.path,
                        status: 'Saved!'
                    };
                });
            } else {
                return fs.makeDir(PATH.dirname(path)).then(function(err) {
                    if(err) return cb(err);

                    return fs.write(path, content).then(function(err) {
                        if(err) throw err;

                        return {
                            path: item.path,
                            status: 'Created!'
                        };
                    });
                });
            }
        });

    }, this));
}

// TODO: Использовать другой сканер с возможностью настройки получаемых на выходе данных
/**
 * Преобразовываем данные полученные путем интроспекции в удобный формат
 * @param data
 * @returns {Array}
 */
function introspectionDecorator(data) {
    var extended = {},
        blocksList = [];

    // Склеиваем все уровни в одну партянку
    // Нам не нужно знать про пути к файлам и т.д.
    // Необходимо только знать все возможные модификаторы/элементы и технологии
    data.forEach(function(level) {
        deepExtend(extended, level.introspection);
    }, this);

    // Имея склееный начинаем собирать список блоков
    // в нужном нам формате
    Object.keys(extended).forEach(function(blockName) {
        var blockData = extended[blockName],
            block = getEntity(blockName, blockData);

        /**
         * Построение сущности (блок, элемент)
         * @param name Название блока/элемента
         * @param data Данные для преобразования
         * @returns {Object}
         */
        function getEntity(name, data) {
            var entity = {
                name: name
            };

            // Если есть файлы - преобразуем их в массив технологий
            Object.keys(data.files).length && (entity.techs = Object.keys(data.files));

            // Если есть модификаторы - получаем их
            Object.keys(data.mods).length && (entity.mods = getMods(data));

            // Если мы в контексте блока - проверяем на наличие элементов
            // Если они есть - вызываем себя же с новыми данными
            if (Object.keys(data.elems || {}).length) {
                entity.elems = [];

                Object.keys(data.elems).forEach(function(elemName) {
                    entity.elems.push(getEntity(elemName, data.elems[elemName]));
                }, this);
            }

            return entity;
        }

        /**
         * Построение данных про подификатор
         * @param entity Данные блока/элемента
         * @returns {Array}
         */
        function getMods(entity) {
            var mods = [];

            // Обходим все модификаторы сущности
            Object.keys(entity.mods).forEach(function(modName) {
                var modData = entity.mods[modName],
                    mod = {
                        name: modName
                    };

                // Если есть файлы - преобразуем в массив технологий
                Object.keys(modData.files).length && (mod.techs = Object.keys(modData.files));

                // Если у модификатора есть значение - обходим их и добавляем в результирующий объект
                Object.keys(modData.vals).forEach(function(modVal) {
                    if (!mod.vals) mod.vals = [];

                    var valData = modData.vals[modVal],
                        val = {
                            name: modVal
                        };

                    // Если есть файлы - преобразуем в массив технологий
                    Object.keys(valData).length && (val.techs = Object.keys(valData.files));

                    mod.vals.push(val);
                });

                mods.push(mod);
            });

            return mods;
        }

        blocksList.push(block);
    });

    return blocksList;
}

module.exports = {
    scanLevel: scanLevel,
    scanLevels: scanLevels,
    scanLevelByBlock: scanLevelByBlock,
    scanBlock: scanBlock,
    getTech: getTech,
    saveTech: saveTech,
    introspectionDecorator: introspectionDecorator
};
