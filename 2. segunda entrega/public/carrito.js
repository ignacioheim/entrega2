fetch('/carrito/listar')
.then(resp => resp.json())
.then(resp => {
    const producto = document.getElementById('producto')

    if(resp.msj === "No hay productos en el carro" ){

        producto.innerHTML = resp.msj
    
    }else{

        resp.map(item => {
            item.producto.forEach(element => {
                const resumen = `<!-- PRODUCT -->
                                    <div class="col-12 col-sm-12 col-md-2 text-center">
                                            <img class="img-responsive" src="${element.imgUrl}" alt="prewiew" width="120" height="80">
                                    </div>
                                    <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                        <h4 class="product-name"><strong>${element.nombre}</strong></h4>
                                        <h4>
                                            <small>${element.descripcion}</small>
                                        </h4>
                                    </div>
                                    <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                        <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                                            <h6><strong><span class="text-muted">$ARS</span> ${element.precio}</strong></h6>
                                        </div>
                                        <div class="col-4 col-sm-4 col-md-4">
                                            <div class="quantity">
                                                <input type="button" value="+" class="plus">
                                                <input type="number" step="1" max="99" min="1" value="1" title="Qty" class="qty"
                                                    size="4">
                                                <input type="button" value="-" class="minus">
                                            </div>
                                        </div>
                                        <div class="col-2 col-sm-2 col-md-2 text-right">
                                            <button type="button" class="btn btn-outline-danger btn-xs" id="eliminar">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                <!-- END PRODUCT -->`
                producto.innerHTML = resumen 
                
                const eliminar = document.getElementById('eliminar')

                eliminar.addEventListener('click', () => {
                    
                    fetch('/carrito/borrar/' + element.id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        console.log(resp)
                        location.reload();
                    })

                })
            });
        })

    }


})