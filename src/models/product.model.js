const { DataTypes } = require('sequelize');

const { db } = require('../db/connection');

const Product = db.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, 
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Product