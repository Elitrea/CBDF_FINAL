const Proveedor = require('../models/proveedores');
const Cliente = require('../models/user');

// CRUD Controllers
exports.obtenerTodosClientes = async(req,res) => {
  try {
      const clientes = await Cliente.findAll();
      if (clientes.length > 0) {
          res.status(200).json({
              estado : 1,
              mensaje: "Clientes encontrados",
              clientes : clientes
          });
      } else {
          res.status(404).json({
              estado: 0,
              mensaje: "No se encontraron clientes",
              clientes: []
          })
      }
  } catch (error) {
      res.status(500).json({
          estado : 0,
          mensaje: "Ocurrió un error desconocido",
          clientes: []
      });
  }
}
//Un cliente por ID
exports.obtenerClientePorId = async(req,res) => {
  const {id} = req.params
  try {
      const cliente = await Cliente.findByPk(id)
      if (cliente == null) {
          res.status(404).json({
              estado: 0,
              mensaje: "No se encontró cliente"
          })
      } else {
          res.status(200).json({
              estado : 1,
              mensaje: "Cliente encontrado",
              cliente : cliente
          })
      }
  } catch (error) {
      res.status(500).json({
          estado : 0,
          mensaje: "Ocurrió un error desconocido"
      })
  }
}
//Crea un cliente
exports.crearCliente = async (req, res) => {
    const { nombre, direccion, contacto, proveedorId } = req.body;
  
    try {
      if (!nombre || !direccion || !contacto || proveedorId === undefined || proveedorId === null) {
        res.status(400).json({
          estado: 0,
          mensaje: "Bad Request - Faltan parámetros",
          cliente: []
        });
      } else {
        // Verifica si el proveedor existe antes de asociarlo al cliente
        const proveedorExistente = await Proveedor.findByPk(proveedorId);
  
        if (!proveedorExistente) {
          res.status(400).json({
            estado: 0,
            mensaje: "Bad Request - El proveedor especificado no existe",
            cliente: []
          });
        } else {
          const clienteC = await Cliente.create({
            nombre: nombre,
            direccion: direccion,
            contacto: contacto,
            proveedorId: proveedorId // Asocia el cliente con el proveedor
          });
  
          res.status(200).json({
            estado: 1,
            mensaje: "Cliente creado correctamente",
            cliente: clienteC
          });
        }
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      res.status(500).json({
        estado: 0,
        mensaje: "Ocurrió un error desconocido",
        cliente: []
      });
    }
  };
  
//Actualizar cliente
exports.actualizarCliente = async(req,res) => {
  const {id} = req.params
  const {nombre, direccion, contacto} = req.body;
  try {
      const clienteC = await Cliente.findByPk(id)

      if (clienteC == null || nombre == undefined || direccion == undefined || contacto == undefined) {
          res.status(404).json({
              estado: 0,
              mensaje: "Faltan parámetros"
          })
      } else {
          await clienteC.update({
              nombre: nombre,
              direccion: direccion,
              contacto: contacto
          })
          res.status(200).json({
              estado : 1,
              mensaje: "Cliente actualizado",
              cliente:clienteC
          })
      }
  } catch (error) {
      res.status(500).json({
          estado : 0,
          mensaje: "Ocurrió un error desconocido"
      })
  }
}
//Eliminar cliente
exports.eliminarCliente = async(req,res) => {
  const {id} = req.params
  try {
      const cliente = await Cliente.findByPk(id)

      if (cliente == null) {
          res.status(404).json({
              estado: 0,
              mensaje: "Cliente no encontrado",
              cliente:[]
          })
      } else {
          await cliente.destroy()
          res.status(200).json({
              estado : 1,
              mensaje: "Cliente eliminado",
              cliente:[]
          })
      }
  } catch (error) {
      res.status(500).json({
          estado : 0,
          mensaje: "Ocurrió un error desconocido",
          cliente:[]
      })
  }
}