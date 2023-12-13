'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const objek_gambar = sequelize.define('objek_gambar',{ 
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idgambar:{
        type: DataTypes.UUID,
        allowNull: false
    },
    idobjek:{
        type: DataTypes.UUID,
        allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  module.exports = objek_gambar;
