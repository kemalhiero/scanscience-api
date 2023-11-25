const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.NAMA_DB, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'mysql',
    timezone: "+07:00" 
  });

  try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = db;