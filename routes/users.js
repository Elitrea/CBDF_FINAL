const clientesController = require('../controllers/users');
const router = require('express').Router();

// CRUD Routes /users
router.get('/', clientesController.obtenerTodosClientes);
router.get('/:id', clientesController.obtenerClientePorId);
router.post('/', clientesController.crearCliente);
router.put('/:id', clientesController.actualizarCliente);
router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;