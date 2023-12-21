'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const objek = sequelize.define('objek',{ 
    idobjek:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nama: {
        type : DataTypes.STRING(255),
        allowNull : false,
    },
    deskripsi: {
        allowNull: false,
        type: DataTypes.STRING(1000)
    },
    referensi: {
        type: DataTypes.STRING(1000)
    },
    idjenis:{
        type: DataTypes.UUID,
        allowNull: false
    },
  }, {
    freezeTableName: true,
  });

  module.exports = objek;
