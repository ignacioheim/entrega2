const express = require('express');
const routerPublico = express.Router()

//Espacio publico para front
routerPublico.get('/tienda', (request, response) => {
    response.sendFile('/public/index.html')
    response.sendFile('/public/publicar-producto.html')
    response.sendFile('/public/tu-carrito.html')
    response.sendFile('/public/index.js')
    response.sendFile('/public/carrito.js')
    response.sendFile('/public/publicar.js')
    response.sendFile('/public/style.css')
})

module.exports = routerPublico
