'use strict';

// panggil tabel
const fakta = require('./fakta');
const jenis = require('./jenis');
const koleksi = require('./koleksi');
const komentar = require('./komentar');
const objek_postingan = require('./objek_postingan');
const objek = require('./objek');
const postingan = require('./postingan');
const suka = require('./suka');
const token = require('./token');
const umpan_balik = require('./umpan_balik');
const user = require('./user');

// relasi antar tabel
user.hasMany(token, {foreignKey: 'id_user'});
token.belongsTo(user, {foreignKey: 'id_user'});

user.hasMany(postingan, {foreignKey: 'iduser'});
postingan.belongsTo(user, {foreignKey: 'iduser'});

user.hasMany(koleksi, {foreignKey: 'iduser'});
koleksi.belongsTo(user, {foreignKey: 'iduser'});

user.hasMany(komentar, {foreignKey: 'iduser'});
komentar.belongsTo(user, {foreignKey: 'iduser'});

user.hasMany(suka, {foreignKey: 'iduser'});
suka.belongsTo(user, {foreignKey: 'iduser'});

user.hasMany(umpan_balik, {foreignKey: 'iduser'});
umpan_balik.belongsTo(user, {foreignKey: 'iduser'});

postingan.hasMany(komentar, {foreignKey: 'idpostingan'});
komentar.belongsTo(postingan, {foreignKey: 'idpostingan'});

postingan.hasMany(koleksi, {foreignKey: 'idpostingan'});
koleksi.belongsTo(postingan, {foreignKey: 'idpostingan'});

postingan.hasMany(suka, {foreignKey: 'idpostingan'});
suka.belongsTo(postingan, {foreignKey: 'idpostingan'});

postingan.hasMany(umpan_balik, {foreignKey: 'idpostingan'});
umpan_balik.belongsTo(postingan, {foreignKey: 'idpostingan'});

jenis.hasMany(umpan_balik, {foreignKey: 'idjenis'});
umpan_balik.belongsTo(jenis, {foreignKey: 'idjenis'});

objek.hasMany(fakta, {foreignKey: 'idobjek'});
fakta.belongsTo(objek, {foreignKey: 'idobjek'});

objek.belongsToMany(postingan, {through : objek_postingan, foreignKey: 'idobjek'});
postingan.belongsToMany(objek, {through : objek_postingan, foreignKey: 'idpostingan'});
