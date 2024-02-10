'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const postingan = sequelize.define('postingan',{ 
    idpostingan:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idgambar: {
        type : DataTypes.UUID,
        allowNull : false,
        unique: true
    },
    caption: {
        type: DataTypes.STRING(1000)
    }
  }, {
    freezeTableName: true,
  });

  module.exports = postingan;
