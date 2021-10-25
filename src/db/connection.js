const Sequelize = require('sequelize');

const mibd = process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB

const db = new Sequelize(mibd, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.HOST_BD,
    dialect: 'postgres',
    port: 5432,
})
const closeConnection = () => {
    db.close()
}

module.exports = {
    db,
    closeConnection
}