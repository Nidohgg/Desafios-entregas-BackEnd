const express=require("express")
const path=require("path")
const ProductManager = require("./Class/productManager");

const PORT=4000;
const app=express();

//productos 

const productManager = new ProductManager();

productManager.addProduct('Hamburguesa', 'El sabor de la carne 100% vacuna más deliciosa, acompañado del pan más esponjoso, kétchup, mostaza y cebolla triturada.', 2000, 'img', 'COD65', 20);

productManager.addProduct('Doble Cuarto de Libra con Queso', 'Imaginá la sensación del clásico Cuarto de Libra. Imaginalo con un medallón de deliciosa carne 100% vacuna, queso cheddar, cebolla, kétchup y mostaza ¿Listo? Ahora duplicá esa sensación. Ya tenés el Doble Cuarto en la cabeza.', 3000, 'img', 'COD34', 15);

productManager.addProduct('McNífica', 'En un mundo donde todos buscan lo nuevo todo el tiempo, la McNífica viene a rectificar lo bueno de ser clásico. Carne, queso cheddar, tomate, lechuga y cebolla, acompañados de kétchup, mostaza y mayonesa.', 2600, 'img', 'COD12', 26);


app.get("/products", async (req, res)=>{

    console.log(req.query);
    
    let datos= await productManager.getProducts();
    let limit = req.query.limit;
    if (limit && limit > 0) {
        datos=datos.slice(0,limit)
    }
    
    res.json(datos);
})

app.get("/products/:id", async (req, res)=>{
    let id=req.params.id
    console.log(id, typeof id);
    let productos= await productManager.getProducts();
    //console.log(productos);
    id=Number(id);

    if (isNaN(id)) {
        return res.json({error:"Ingrese un id numerico para mostrar el producto"})
    }

    let producto= productos.find(i => i.id===id)
    if (producto) {
        res.json(producto);
    }else{
        res.json({error: `NO existe el producto con el ID ${id}`})
    }
})


app.listen(PORT, ()=>console.log(`Servidor Online en PUERTO: ${PORT}`))//server con express

//lee el archivo donde se guardaron todos los productos, o el array seleccionado
//productManager.getProducts();

//id encontrado leyedo el archivo
//productManager.getProductById(1);


//producto no encontrado
//productManager.getProductById(6);

//cambia el nombre del producto
//productManager.updateProduct(1, "TASTY SPICY");

//elimina el producto con el id enviado del archivo
//productManager.deleteProduct(2);


