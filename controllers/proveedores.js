const Proveedor = require('../models/proveedores');
const Cliente = require('../models/user');

exports.obtenerTodosProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: ['id_proveedor', 'nombre', 'direccion', 'contacto'],
      include: {
        model: Cliente,
        attributes: ['id', 'nombre', 'direccion', 'contacto'],
      },
    });

    res.status(200).json({
      estado: 1,
      mensaje: "Proveedores encontrados",
      proveedores: proveedores
    });
  } catch (error) {
    console.error('Error al obtener todos los proveedores:', error);
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error al obtener los proveedores",
      proveedores: []
    });
  }
}

  
//Un Proveedor por ID
exports.obtenerProveedorPorId = async(req,res) => {
    const{id} = req.params;
    try {
        const proveedor = await Proveedor.findByPk(id, { attributes: ['id_proveedor', 'nombre', 'direccion', 'contacto'] });
        if(proveedor == null){
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado",
                proveedores : []
            })
        }else{
        res.status(200).json({
            estado: 1,
            mensaje: "Proveedor encontrado",
            proveedores : proveedor
        })}
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
            proveedores : []
        })
    }
}
//Cree un Proveedor
exports.crearProveedor = async (req, res) => {
    const { nombre, direccion, contacto } = req.body;
    
    try {
        if (nombre == undefined || direccion == undefined || contacto == undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Bad request - Faltan parametros",
                proveedores: []
            });
        } else {
            const proveedor = await Proveedor.create({
                nombre: nombre,
                direccion: direccion,
                contacto: contacto
            }, {
                attributes: ['id_proveedor', 'nombre', 'direccion', 'contacto']
            });

            const proveedorPlain = proveedor.get({ plain: true });

            res.status(200).json({
                estado: 1,
                mensaje: "Proveedor creado correctamente",
                proveedores: proveedorPlain
            });
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido",
            proveedores: []
        });
    }
};


//Actualizar un Proveedor
exports.actualizarProveedor= async(req,res) => {
    const {id} = req.params;
    const { nombre, direccion, contacto } = req.body;
    try {
        const proveedor = await Proveedor.findByPk(id, { attributes: ['id_proveedor', 'nombre', 'direccion', 'contacto'] });
        if (proveedor == null) {
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado",
                proveedores : []
            })
        } else {
            if (nombre == undefined || direccion == undefined || contacto == undefined) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "Faltan parámetros",
                    proveedores : []
                })
            } else {
                await proveedor.update({
                    nombre : nombre,
                    direccion : direccion,
                    contacto : contacto
                })
                res.status(200).json({
                    estado: 1,
                    mensaje: "Proveedor actualizado con exito",
                    proveedores : proveedor
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
            proveedores : []
        })
    }
}
//Eliminar producto
exports.eliminarProveedor = async(req,res) => {
    const{id} = req.params;
    try {
        const proveedor = await Proveedor.findByPk(id, { attributes: ['id_proveedor', 'nombre', 'direccion', 'contacto'] });
        if(proveedor == null){
            res.status(404).json({
                estado: 0,
                mensaje: "Proveedor no encontrado",
                proveedores : []
            })
        }else{
        await proveedor.destroy();
        res.status(200).json({
            estado: 1,
            mensaje: "Proveedor eliminado con exito",
            proveedores : proveedor
        })}
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
            proveedores : []
        })
    }
}
