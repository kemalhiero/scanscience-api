'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const gambar = sequelize.define('gambar',{ 
    idgambar:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    iduser:{
        type: DataTypes.UUID,
        allowNull: false
    },
    link: {
        type : DataTypes.STRING(255),
        allowNull : false,
    },
    nama: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    keterangan: {
        allowNull: false,
        type: DataTypes.STRING(255)
    },
  }, {
    freezeTableName: true,
  });

  module.exports = gambar;
