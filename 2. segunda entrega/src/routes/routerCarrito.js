const express = require('express');
const Carrito = require('../controllers/controllerCarrito.js').Carrito
const listado = require('./routerProductos').listadoProductos
const routerCarrito = express.Router()

let listadoProductos = listado
let carritoCompras = []

/*
    * Endpoint Carrito
*/
const carrito = new Carrito(carritoCompras)
routerCarrito.get('/listar', (request, response, next) => {
    try {
        const itemID = request.query.id

        if(itemID){
            const item = carrito.listarCarritoPorID(itemID)
        
            if(item.msj === "Producto no encontrado"){
                //response.status(404)
                response.json(item)
            
            }else{
                response.status(200)
                response.json(item)
            }
            
        }else{
            const getAll = carrito.listarCarrito()
            
            response.status(200)
            response.json(getAll)
        }
        

    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
})

//Cargar productos al carrito
let idCarrito = 0
routerCarrito.post('/agregar', (request, response, next) => {
    try {
        if(listadoProductos.length === 0){
            
            response.json({msj: "No hay productos a la venta."})
       
        }else{

            const item = listadoProductos.find(elem => elem.id === request.body.id)
            const addItem = carrito.agregarAlCarrito(item, idCarrito++)

            carritoCompras.push(addItem)
            
            response.status(200)
            response.json(carritoCompras)
        
        }
    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
    
})

//Eliminar producto del carrito
routerCarrito.delete('/borrar/:id', (request, response, next) => {
    try {
        if(request.params.id > carritoCompras.length){
            
            response.json({msj: "El producto no está en el carrito."})
        
        }else{
            
            const carritoActualizado = carrito.borrarDelCarrito(request.params.id)
            carritoCompras = carritoActualizado

            response.json(carritoCompras)
        }
    
    } catch (error) {
        console.log(error)
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
    
})

module.exports = routerCarrito