const knex = require('knex');
const initProducts = require('./seeds/products');


const sqliteDB = knex({
    client: 'sqlite3',
    connection: {filename: './src/db/db.sqlite'}
})
const mysqlDB = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Mr*y2Fl17',
        database: 'ecommerceCH'
    }
})

const initDB = async () => {
    const tableMessages = await sqliteDB.schema.hasTable('messages')
    if(!tableMessages) {
        await sqliteDB.schema.createTable('messages', (messagesTable) => {
        messagesTable.increments();
        messagesTable.string('msg').notNullable();
        messagesTable.timestamp('createdAt').defaultTo(knex.fn.now()); }) 
    }

    const tableProducts = await mysqlDB.schema.hasTable('products')
    if(!tableProducts) {
        await mysqlDB.schema.createTable('products', (productsTable) => {
            productsTable.increments();
            productsTable.string('title').notNullable();
            productsTable.integer('price').notNullable();
            productsTable.string('thumbnail').notNullable()
        })
        await mysqlDB.from('products').insert(initProducts);
    }
}

module.exports = {
    initDB,
    mysqlDB,
    sqliteDB
}
