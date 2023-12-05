'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const umpan_balik = sequelize.define('umpan_balik',{ 
    idfeedback:{
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
    teks: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    jenis: {
        allowNull: false,
        type: DataTypes.ENUM('kritik', 'saran', 'tambah')
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM('diterima', 'ditolak', 'dibahas')
    },
  }, {
    freezeTableName: true,
  });

  module.exports = umpan_balik;
