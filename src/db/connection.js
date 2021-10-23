const Sequelize = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.HOST_BD,
    dialect: 'postgres',
    port: 5432,
})

module.exports = {
    db
}