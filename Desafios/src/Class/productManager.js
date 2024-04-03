const fs=require("fs")

class ProductManager{

    #products;
    #idProx;
    //constructor
    constructor(rutaArchivo){
        this.#products = [];
        this.#idProx = 1;
        this.path= rutaArchivo;
    }

    //metodos
    async addProduct(title, description, price, thumbnail, status, code, stock) {
        if (!title || !description || !price || !thumbnail || !status || !code || !stock) {
            throw new Error("Todos los parametros son requeridos");
        }
        
        if (this.#products.some(product => product.code === code)) {
            throw new Error("ERROR, NO SE PUEDE VOLVER A CARGAR EL MISMO PRODUCTO");
        }
    
        const product = {
            id: this.#idProx++,
            title, 
            description, 
            price, 
            thumbnail, 
            status: true,
            code,
            stock
        };
    
        this.#products.push(product);
    
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, 5));
            console.log("Producto agregado y archivo guardado correctamente.");
        } catch (error) {
            throw new Error("Error al guardar el archivo de productos.");
        }
    }

    async getProducts(){ //debe devolver el arreglo con todos los productos creados hasta ese momento
        //console.log(this.#products);
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []; //devuelve un array vacio si no existe
        }
        /*let lecturaProductos=fs.readFileSync(this.path, {encoding:"utf-8"});
        console.log(lecturaProductos);*/
    }

    getProductById(id) {//muestra o trae un producto tomando como referencia su ID
        let lecturaProductos=fs.readFileSync(this.path, {encoding:"utf-8"});
        let productos = JSON.parse(lecturaProductos);
        const product = productos.find((product) => product.id === id);
    
        if (!product) {
          return console.log(null);
        }
        return console.log(product);
        
    }

    async updateProduct(id, valorACambiar) {
        try {
            let lecturaProductos = await fs.promises.readFile(this.path, { encoding: "utf-8" });
            let productos = JSON.parse(lecturaProductos);
            const productID = productos.findIndex((product) => product.id === id);
    
            if (productID !== -1) {
                productos[productID].title = valorACambiar;
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
                console.log("Producto actualizado!");
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            let lecturaProductos = await fs.promises.readFile(this.path, { encoding: "utf-8" });
            let productos = JSON.parse(lecturaProductos);
            const newProducts = productos.filter((product) => product.id !== id);
    
            if (newProducts.length !== productos.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 5));
                console.log("Producto eliminado con éxito");
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

}//fin del class

module.exports = ProductManager;