const fs=require("fs")
const path = require('path');

class ProductManager{

    #products;
    #idProx;
    path;
    //constructor
    constructor(){
        this.#products = [];
        this.#idProx = 1;
        this.path= path.resolve(__dirname, "../data/arrayObjetos.json")
    }

    //metodos
    addProduct(title, description, price, thumbnail, code, stock){//agregara el producto al arreglo d productos inicial
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los parametros son requeridos");
        }
        
        if (this.#products.some(product => product.code === code)) {
            throw new Error("ERROR, NO SE PUEDE VOLVER A CARGAR EL MISMO PRODUCTO");
        }

        const product ={
            id: this.#idProx++,
            title, 
            description, 
            price, 
            thumbnail, 
            code,
            stock
        };

       this.#products.push(product);
       fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 5));
       
       /*if (fs.existsSync(this.path)) {
        console.log("archivo guardado!!");
       }else{
        console.log("No se guardo");
       }*/
    };

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

    updateProduct(id, valorACambiar){//actualiza el valor de un producto
        let lecturaProductos=fs.readFileSync(this.path, {encoding:"utf-8"});
        let productos = JSON.parse(lecturaProductos);
        const productID = productos.findIndex((product) => product.id === id);

        if (productID != -1) {
            productos[productID].title=valorACambiar;
            fs.writeFileSync(this.path, JSON.stringify(productos, null, 5));
            console.log("Producto actualizado!");
        } else{
            console.log("Producto No encontrado");
        }

    }

    deleteProduct(id){//elimina el producto desde su ID
        let lecturaProductos = fs.readFileSync(this.path, { encoding: "utf-8" });
        let productos = JSON.parse(lecturaProductos);
        const newProducts = productos.filter((product) => product.id !== id);

        if (newProducts.length !== productos.length) {
            fs.writeFileSync(this.path, JSON.stringify(newProducts, null, 5));
            console.log("Producto eliminado con éxito");
        } else {
            console.log("Producto no encontrado");
        }
    }

}//fin del class

module.exports = ProductManager;