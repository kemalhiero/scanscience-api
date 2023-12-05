'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const user = sequelize.define('user',{ 
    id_user:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    nama: {
      type : DataTypes.STRING(50),
      allowNull : false
    },
    jenis_kelamin: {
        type: DataTypes.STRING,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  module.exports = user;
