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
    foto: {
        type : DataTypes.STRING(255),
        allowNull : false,
    },
    caption: {
        allowNull: false,
        type: DataTypes.STRING(1000)
    },
    iduser:{
        type: DataTypes.UUID,
        allowNull: false
    },
  }, {
    freezeTableName: true,
  });

  module.exports = postingan;
