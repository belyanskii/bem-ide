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
                modModel = MODEL.getOne({ name: 'm-modifier', id: params.blockName + '_' +  params.modName, parentModel: parentModel }),
                type = params.type,
                isMod = type === 'mod',
                isModVal = type === 'mod-val',
                entityModel;

            if(isMod) {
                entityModel = modModel;
            } else if(isModVal) {
                entityModel = MODEL.getOne({
                    name: 'm-modifier-val',
                    id: params.blockName + '_' + params.modName + '_' + params.modVal,
                    parentModel: modModel
                });
            } else {
                entityModel = parentModel;
            }

            return entityModel;
        }

    });
});
