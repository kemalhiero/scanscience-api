'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const user = sequelize.define('user',{ 
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
      type : DataTypes.STRING(100),
      allowNull : false,
      validate: {
        isEmail: true
      }
    },    
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      type : DataTypes.STRING(50),
      allowNull : false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  module.exports = user;
