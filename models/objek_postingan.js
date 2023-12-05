'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const objek_postingan = sequelize.define('objek_postingan',{ 
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idpostingan:{
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

  module.exports = objek_postingan;
