const proveedoresController = require('../controllers/proveedores');
const router = require('express').Router();

// CRUD Routes /users
router.get('/', proveedoresController.obtenerTodosProveedores);
router.get('/:id', proveedoresController.obtenerProveedorPorId);
router.post('/', proveedoresController.crearProveedor);
router.put('/:id', proveedoresController.actualizarProveedor);
router.delete('/:id', proveedoresController.eliminarProveedor);

module.exports = router;