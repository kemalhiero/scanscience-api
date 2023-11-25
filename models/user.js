'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const user = sequelize.define('user',{ 
    email: {
      type : DataTypes.STRING(30),
      primaryKey: true,
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
      type : DataTypes.STRING(30),
      allowNull : false
    }

  }, {
    freezeTableName: true
  });

  module.exports = user;