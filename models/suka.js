'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const suka = sequelize.define('suka',{ 
    idlike:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    iduser:{
        type: DataTypes.UUID,
        allowNull: false
    },
    idpostingan:{
        type: DataTypes.UUID,
        allowNull: false
    },
    waktu: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  module.exports = suka;
