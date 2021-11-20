const controllerPersistencia = require('./controllerPersistencia.js')

const persistencia = 0
const almacenamiento = new controllerPersistencia()

class Productos{

    listarTodos(productos){
        
        const db = almacenamiento.setPersist(persistencia, productos)
        const listaDeProductos = db.getAll()

        return Promise.resolve(listaDeProductos)
    }
    
    listarProductosPorID(id, productos){
        
        const db = almacenamiento.setPersist(persistencia, productos)
        const listaDeProductos = db.getOne(id)
        
        return Promise.resolve(listaDeProductos)
    }

    agregarProducto(data, id, productos){
        
        let producto = {
            id: id++,
            idProducto: id++,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        }
        
        const db = almacenamiento.setPersist(persistencia, productos)
        const listaDeProductos = db.addOne(producto)

        return Promise.resolve(listaDeProductos)

    }

    
    actualizarProducto(id, data){
        let productos = []
            
        const db = almacenamiento.setPersist(persistencia, productos)
        const listaDeProductos = db.updateOne(id, data)
        
        return Promise.resolve(listaDeProductos)
        
        
    }

    borrarProducto(id, productos){
        const enMemoria = almacenamiento.setPersist(persistencia, productos)
        const listaDeProductos = enMemoria.deleteOne(id)
            
        return Promise.resolve(listaDeProductos)
    }

}

module.exports.Productos = Productos