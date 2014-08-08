modules.define('utils', ['model'], function(provide, MODEL) {
    provide({

        /**
         * Хелпер для получения модели сущности по данным от
         * блока chooser (см. chooser.md:API)
         * @param {Object} params
         * @returns {MODEL|undefined}
         */
        getEntityModel: function(params) {
            var blockModel = MODEL.getOne({ name: 'm-block', id: params.blockName }),
                elemModel = params.elemName && MODEL.getOne({ name: 'm-block-elem', id: params.blockName + '__' + params.elemName, parentModel: blockModel }),
                parentModel = elemModel || blockModel,
                type = params.type,
                isMod = type === 'mod',
                isModVal = type === 'mod-val',
                entityModel;

            if(isMod) {
                entityModel = MODEL.getOne({ name: 'm-modifier', id: params.modName, parentModel: parentModel });
            } else if(isModVal) {
                var modModel = MODEL.getOne({ name: 'm-modifier', id: params.modName, parentModel: parentModel });

                entityModel = MODEL.getOne({
                    name: 'm-modifier-val',
                    id: params.modName + '_' + params.modVal,
                    parentModel: modModel
                });
            } else {
                entityModel = parentModel;
            }

            return entityModel;
        }

    });
});
