const express=require("express")
const productRouter=require('../src/Routes/product.route')
const cartRouter=require('./Routes/cart.route')


const PORT=8080;
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter);

app.get("/", (req, res)=>{
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('OK')    
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
