const { DataTypes } = require('sequelize');

const { db } = require('../db/connection');

const Service = db.define('service', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_of_service: {
            type: DataTypes.DATE
        },
        products: {
            type: DataTypes.JSONB
        },
        status: {
            type: DataTypes.INTEGER,
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

module.exports = Service