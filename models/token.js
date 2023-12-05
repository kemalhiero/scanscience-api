'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const token = sequelize.define('token',{ 
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    id_user: {
      type : DataTypes.UUID,
      allowNull : false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    expires_at: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  module.exports = token;
