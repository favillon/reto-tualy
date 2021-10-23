const { DataTypes } = require('sequelize');

const { db } = require('../db/connection');

const User = db.define('user', {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
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

module.exports = User