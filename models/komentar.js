'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const komentar = sequelize.define('komentar',{ 
    idkomentar:{
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
    komentar: {
        allowNull: false,
        type: DataTypes.STRING(255)
    },
  }, {
    freezeTableName: true,
  });

  module.exports = komentar;
