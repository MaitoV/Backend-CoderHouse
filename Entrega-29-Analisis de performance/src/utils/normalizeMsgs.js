const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;


module.exports = class normalizrData {
    normalize(inputData){
        const schemaAuthor = new schema.Entity('author', {}, {
            idAttribute: 'id',
        })
        const schemaMsg = new schema.Entity('msgs', {
            author: schemaAuthor
        })

        const normalizedData = normalize(inputData, [schemaMsg]);
        return normalizedData;
    }
}