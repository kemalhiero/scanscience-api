'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const deskripsi_umum_objek = sequelize.define('deskripsi_umum_objek',{ 
    iddeskripsi:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    judul:{
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi: {
        type : DataTypes.STRING(500),
        allowNull : false,
    },
    idobjek: {
        allowNull: false,
        type: DataTypes.UUID
    },
  }, {
    freezeTableName: true,
  });

  module.exports = deskripsi_umum_objek;
