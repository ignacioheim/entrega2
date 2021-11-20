/*
    * Listar todos los productos
*/
const getProductos = async () => {
    const data = await fetch('/productos/listar')
    const response = data.json();
    return response
}

getProductos().then(resp => {
    
    if(resp.msj === "No hay productos añadidos"){
        //Si no hay productos muestro mensaje
        const container = document.getElementById("contenedor")
        container.innerHTML = `<h4>No hay productos añadidos<h4>`
    
    }else{
        const producto = document.getElementById("producto")

        //Creo un elemento para cada nuevo producto
        resp.forEach(element => {
            let id = element.id ?? element.idProducto
            
            let div = document.createElement('div')
            
            div.innerHTML = `<div class="card shadow-sm">
                                <img src="${element.imgUrl}">
                                <div class="card-body">
                                <h2>${element.nombre}</h2>
                                <small id="idProducto">${element.precio}</small>
                                <p class="card-text">${element.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                    <button type="button" id="verProducto-${id}" class="btn btn-sm btn-outline-secondary">Ver</button>
                                    </div>
                                    <small class="text-muted">Agregar al carrito</small>
                                </div>
                                </div>
                            </div>`
            div.className = "col"
            producto.appendChild(div)

            /*
                * Ver producto por ID - Editar y Borrar
            */
            const botonVer = document.getElementById(`verProducto-${id}`)
            const container = document.getElementById("contenedor")
            
            botonVer.addEventListener('click', () => {

                //Fetch para trear infrmación del prodcuto segun id
                const getProductoByID = async () => {
                    const data = await fetch('/productos/listar?id=' + id)
                    const respuesta = await data.json()

                    return respuesta
                }

                //Cambio el template para mostrar detalles del producto
                getProductoByID().then(resp => {
                    const ficha = `<div class="card">
                                    <div class="row">
                                        <aside class="col-sm-5 border-right">
                                            <article class="gallery-wrap"> 
                                                <div class="img-big-wrap">
                                                <div> <a href="#"><img src="${resp[0].imgUrl}"></a></div>
                                                </div> <!-- slider-product.// -->
                                            </article> <!-- gallery-wrap .end// -->
                                        </aside>
                                        <aside class="col-sm-7">
                                        <article class="card-body p-5">
                                        
                                            <p class="price-detail-wrap"> 
                                                <span class="price h3 text-warning"> 
                                                    <span class="currency">ARS $</span><span class="num">${resp[0].precio}</span>
                                                </span> 
                                            </p> <!-- price-detail-wrap .// -->
                                            <dl class="item-property">
                                                <dt>Description</dt>
                                                <dd><p>${resp[0].descripcion} </p></dd>
                                            </dl>
                                            <dl class="param param-feature">
                                                <dt>Codigo</dt>
                                                <dd>${resp[0].codigo}</dd>
                                            </dl>  <!-- item-property-hor .// -->
                                            <dl class="param param-feature">
                                                <dt>Stock</dt>
                                                <dd>${resp[0].stock}</dd>
                                            </dl>  <!-- item-property-hor .// -->                            
                                            <hr>
                                            <button class="btn btn-lg btn-outline-primary" id="comprar"> 
                                                <i class="fas fa-shopping-cart"></i> Agrear al carrito 
                                            </button>
                                            <p id="load">... Cargando </p>
                                            <hr>
                                            <button type="button" id="borrar" class="btn btn-sm btn-outline-secondary">Borrar</button>
                                            <button type="button" id="editar" class="btn btn-sm btn-outline-secondary">Editar</button>
                                            </article> <!-- card-body.// -->
                                        </aside> <!-- col.// -->
                                    </div> <!-- row.// -->
                                </div> <!-- card.// -->`
                                
                    //Reemplazo el grid de productos por la ficha del producto seleccionado            
                    const titulo = document.getElementById('titulo')
                    titulo.innerHTML = `${resp[0].nombre}`
             
                    const desc = document.getElementById('desc')
                    desc.remove()
                                
                    container.innerHTML = ficha
                                
                    
                    /*
                        * Agregar producto al carrito
                    */
                    const comprar = document.getElementById('comprar')
                    const cargando = document.getElementById('load')
                    cargando.style.display = "none"
                   
                    comprar.addEventListener('click', () => {

                        comprar.style.display = "none"
                        cargando.style.display = "block"

                        const data = {
                            id: resp.id
                        }
                        
                        fetch('/carrito/agregar', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(resp => resp.json)
                        .then(resp => console.log(resp))

                        setTimeout(() => {

                            container.innerHTML = '<div class="preCarrito">'
                                                    +'<h3>Producto añadido correctamente</h3>'
                                                    +'<a href="/tienda/" style="float: left">Volver a la tienda</a>'
                                                    +'<a href="/tienda/tu-carrito.html" style="float: right">Ver carrito</a>'
                                                  +'</div>'
                        }, 500)
                    })


                    /* 
                        * Actualizar Producto
                    */
                    const editar = document.getElementById('editar')
                    
                    editar.addEventListener('click', () => {
                        id = resp[0].id ?? resp[0].idProducto

                        const form = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">  
                                       
                                        <div class="form-group">
                                            <label>ID</label>
                                            <input class="form-control" type="text" id="id" name="id" value="${id}">
                                        </div>
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input class="form-control" type="text" id="nombre" name="nombre" value="${resp[0].nombre}">
                                        </div>
                                        <div class="form-group">
                                            <label>Descripción del producto</label>
                                            <input type="text" class="form-control" id="descripcion" name="descripcion" value="${resp[0].descripcion}">
                                        </div>
                                        <div class="form-group">
                                            <label>Codigo</label>
                                            <input class="form-control" type="text" id="codigo" name="codigo" value="${resp[0].codigo}">
                                        </div>
                                        <div class="form-group">
                                            <label>Url de imagen</label>
                                            <input class="form-control" type="text" id="imgUrl" name="imgUrl" value="${resp[0].imgUrl}">
                                        </div>
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input class="form-control" type="text" id="precio" name="precio" value="${resp[0].precio}">
                                        </div>
                                        <div class="form-group">
                                            <label>Stock</label>
                                            <input class="form-control" type="text" id="stock" name="stock" value="${resp[0].stock}">
                                        </div>
                                        <button type="submit" id="actualizar" class="btn btn-primary" data-dismiss="modal">Agregar</button>
                                    </div>
                                    `

                        container.innerHTML = form

                        const actualizar = document.getElementById('actualizar')

                        actualizar.addEventListener('click', () => {
                            const id = document.getElementById('id').value
                            const nombre = document.getElementById('nombre').value
                            const descripcion = document.getElementById('descripcion').value
                            const codigo = document.getElementById('codigo').value
                            const imgUrl = document.getElementById('imgUrl').value
                            const precio = document.getElementById('precio').value
                            const stock = document.getElementById('stock').value

                            const data = {
                                nombre: nombre,
                                descripcion: descripcion,
                                codigo: codigo,
                                imgUrl: imgUrl,
                                precio: precio,
                                stock: stock
                            }

                            console.log(id)

                            fetch('/productos/actualizar/' + id, {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(resp => resp.json)
                                .then(resp => console.log(resp))

                            window.location.assign('/tienda')
                        })
                    })
                        

                    /* 
                        * Borrar producto
                    */
                    const borrar = document.getElementById('borrar')

                    borrar.addEventListener('click', () => {

                        fetch(`/productos/borrar/${id}`, {
                            method: 'DELETE',
                        })
                        .then(resp => resp.json())
                        .then(resp => {
                            container.innerHTML = resp + '<a href="/tienda/">  Volver a la tienda</a>'
                        })

                        //window.location.assign('/tienda')
                    })
                })
            })
            
        });
    }
    
    
})


