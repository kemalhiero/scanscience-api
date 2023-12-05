'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const koleksi = sequelize.define('koleksi',{ 
    idkoleksi:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
        type: DataTypes.DATE
    },
  }, {
    freezeTableName: true,
    timestamps:false
  });

  module.exports = koleksi;
