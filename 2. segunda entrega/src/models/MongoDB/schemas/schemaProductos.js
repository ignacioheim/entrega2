const mongoose = require('mongoose')

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    idProducto: {type: Number, required: true, unique: true},
    timestamp: {type: Number, requeride: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true},
    imgUrl: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

module.exports.Productos = mongoose.model(productosCollection, productosSchema)