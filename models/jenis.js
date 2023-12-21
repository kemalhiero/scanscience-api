'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const jenis = sequelize.define('jenis',{ 
    idjenis:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    jenis: {
        type : DataTypes.STRING(30),
        allowNull : false,
    },
    keterangan: {
        type: DataTypes.STRING(255)
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  module.exports = jenis;
