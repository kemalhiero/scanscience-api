'use strict';

// panggil tabel
const token = require('./token')
const user = require('./user')

// relasi antar tabel
user.hasMany(token, {foreignKey: 'id_user'})
token.belongsTo(user, {foreignKey: 'id_user'})
