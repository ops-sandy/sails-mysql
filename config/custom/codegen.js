module.exports.codegen = {
    baseFields: ['Id', 'CreatedAt', 'ModifiedAt', 'CreatedBy', 'ModifiedBy', 'Status', 'UpdateCount', 'Code', 'UpdateCount', 'CompanyCode', 'Data'],
    baseFieldsAdvanced: ['CompanyCode', 'Data'],
    stringTypesInPostgreSql: ['varchar', 'character', 'char', 'character varying'],
    stringTypesInSails: 'STRING',
    numericTypesInPostgreSql: ['int', 'bigint', 'numeric'],
    numericTypesInSails: 'INTEGER',
    jsonTypesInPostgreSql: ['json', 'jsonb'],
    jsonTypesInSails: 'JSONB',
    dateTypesInPostgreSql: ['date', 'timestamp', 'timestamp without time zone'],
    dateTypesInSails: 'DATE',
    modelCodeTemplate: 'code/sails/model/model',
    controllerCodeTemplate: 'code/sails/controller/controller',
    modelCodeSaveToPath: 'api/models/{}.js',
    modelControllerSaveToPath: 'api/controllers/{}Controller.js',
    queryColumndefTemplate: 'queries/columndef',
    queryTabledefTemplate: 'queries/tabledef',
    queryViewdefTemplate: 'queries/viewdef'
};