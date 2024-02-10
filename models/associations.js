'use strict';

// panggil tabel
const deskripsi_umum_objek = require('./deskripsi_umum_objek');
const fakta = require('./fakta');
const gambar = require('./gambar');
const jenis = require('./jenis');
const koleksi = require('./koleksi');
const komentar = require('./komentar');
const objek_gambar = require('./objek_gambar');
const objek = require('./objek');
const postingan = require('./postingan');
const suka = require('./suka');
const token = require('./token');
const umpan_balik = require('./umpan_balik');
const user = require('./user');

// relasi antar tabel
user.hasMany(token, {foreignKey: 'id_user'});
token.belongsTo(user, {foreignKey: 'id_user'});

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

jenis.hasMany(objek, {foreignKey: 'idjenis'});
objek.belongsTo(jenis, {foreignKey: 'idjenis'});

objek.hasMany(fakta, {foreignKey: 'idobjek'});
fakta.belongsTo(objek, {foreignKey: 'idobjek'});

objek.belongsToMany(gambar, {through : objek_gambar, foreignKey: 'idobjek'});
gambar.belongsToMany(objek, {through : objek_gambar, foreignKey: 'idgambar'});

user.hasMany(gambar, {foreignKey: 'iduser'});
gambar.belongsTo(user, {foreignKey: 'iduser'});

gambar.hasOne(postingan, {foreignKey: 'idgambar'})
postingan.belongsTo(gambar, {foreignKey: 'idgambar'})

objek.hasMany(deskripsi_umum_objek, {foreignKey: 'idobjek'});
deskripsi_umum_objek.belongsTo(objek, {foreignKey: 'idobjek'});
