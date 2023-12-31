'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const fakta = sequelize.define('fakta',{ 
    idfakta:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idobjek:{
        type: DataTypes.UUID,
        allowNull: false
    },
    judul: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    fakta: {
        type : DataTypes.STRING(500),
        allowNull : false,
    },
  }, {
    freezeTableName: true,
  });

  module.exports = fakta;
