const Sequelize = require('sequelize');
const db = require('../util/database');
const Cliente = require('./user');

const Proveedor = db.define('proveedor', {
  id_proveedor: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_proveedor'
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contacto: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'proveedores',
  timestamps: false
});

Proveedor.hasMany(Cliente, { foreignKey: 'proveedorId' });

Proveedor.sync().then(() => {
  console.log('Tabla Proveedores creada o ya existente');
}).catch((error) => {
  console.error('Error al crear la tabla Proveedores', error);
});

module.exports = Proveedor;
