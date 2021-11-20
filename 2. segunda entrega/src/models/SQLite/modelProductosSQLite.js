const {options} = require('../SQLite/connectionSQLite.js')
const knex = require('knex')(options)

class modelProductoSqlite{

    //Guardar producto en DB
    addOne(producto){
        knex.schema.hasTable('productos')
        .then((exist) => {
            if(exist) return;
            return knex.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.integer('timestamp').notNullable();
                table.string('nombre', 100).notNullable();
                table.string('descripcion', 225).notNullable();
                table.integer('codigo').notNullable();
                table.string('imgUrl').notNullable();
                table.integer('precio').notNullable();
                table.integer('stock').notNullable();
            })
            .then((resp) =>{
                console.log(resp)
                return resp
            })
            .catch(e => console.log(e))
        })

        knex('productos').insert({
            id: producto.id,
            timestamp: producto.timestamp,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            imgUrl: producto.imgUrl,
            precio: producto.precio,
            stock: producto.stock
        })
        .then((resp) => {
            if(resp == 1){
                return {msj: 'Producto guardado correctamente'}
            }else{
                return {msj: 'Ocurrio un error. Volvé a intentarlo'}
            }
        })
        .catch(e => {console.log(e); throw e})
        
        
    }

    //Seleccionar todos los Productos en DB
    getAll(){
        let data = []
        return knex.select().from('productos')
            .then((resp) => {
                
                if(resp.length > 0){
                    for (const item of resp) {
                        data.push(item)
                    }
                }else{
                    return {msj: "No hay productos añadidos"}
                }
                
                return data
            })
            .catch(e => console.log(e))
    }

    //Seleccionar un solo producto en DB
    getOne(id){
        
        return knex.from('productos').select().where('id', id)
            .then((resp) => {
                return resp
            })
        .catch(e => console.log(e))
    }

    //Borrar un producto
    deleteOne(id){
        console.log(id)
        return knex.from('productos').where('id', id).del()
            .then(resp => {
                if(resp == 1){
                    return {msj: 'El producto fue eliminado correctamente'}
                }else{
                    return {msj: 'El producto no se encuentra'}
                }
            })
            .catch(e => e)
    }

    //Actualizar un producto en DB
    updateOne(id, data){
        
        knex.from('productos').where('id', id).update({
            id: data.id,
            timestamp: data.timestamp,
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        })
        .then(resp => {
            if(resp == 1){
                return {msj: 'Producto actualizado correctamente'}
            }else{
                return {msj: 'Error al actualizar el producto'}
            }
        })
        .catch(e => e)

    }
}

module.exports = modelProductoSqlite