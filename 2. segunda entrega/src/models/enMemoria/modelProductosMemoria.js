class modelProductosMemoria{
    arr = ""
    constructor(arr){
        this.arr = arr
    }

    getAll(){
        if(this.arr.length === 0){
            const msj = {"msj": "No hay productos añadidos"}
            return msj
        }else{
            return this.arr
        }
    }

    getOne(id){
        const listado = this.arr
        const idInt = parseInt(id)

        if(id > this.arr.length){
            throw new Error('Producto no encontrado')
        }

        let productos = []
        const item = listado.find(elem => elem.id === idInt)
        
        productos.push(item)
        
        return productos
    }

    addOne(producto){

        this.arr.push(producto)

        return this.arr
    }

    updateOne(id, data){
        const idInt = parseInt(id)
            
            let index = this.arr.findIndex(elem => elem.id === idInt)

            this.arr[index] = {
                idProducto: idInt,
                timestamp: Date.now(),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                imgUrl: data.imgUrl,
                precio: data.precio,
                stock: data.stock
            }
    
            return this.arr
    }

    deleteOne(id){
        if(id > this.arr.length){
            
            return {"msj": "El producto indicado no existe"}
        
        }else{
            const idInt = parseInt(id)
            const index = this.arr.findIndex(el => el.id === idInt)
            
            this.arr.splice(index, 1)
            
            return {"msj": "Producto eliminado correctamente"}
        }
    }
}

module.exports = modelProductosMemoria