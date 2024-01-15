const Sequelize = require('sequelize');
const db = require('../util/database');

const Cliente = db.define('cliente', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_cliente'
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
  },
  proveedorId: {
    type: Sequelize.INTEGER,
    allowNull: true, // Puede ser nulo, ya que la relación es unilateral
    references: {
      model: 'proveedores', // Nombre de la tabla en lugar del modelo
      key: 'id_proveedor'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
}, {
  timestamps: false,
  tableName: 'clientes'
});

Cliente.sync().then(() => {
  console.log('Tabla Clientes creada o ya existente');
}).catch((error) => {
  console.error('Error al crear la tabla Clientes', error);
});

module.exports = Cliente;
