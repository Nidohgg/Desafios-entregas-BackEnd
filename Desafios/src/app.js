const express=require("express")
const productRouter=require('../src/Routes/product.route')
const cartRouter=require('./Routes/cart.route')
const handleBars=require('express-handlebars')
const viewsRouter=require("./Routes/views.Routes")
const path=require("path")
const { Server } = require("socket.io")

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const httpServer = app.listen(8080,()=>console.log('Servidor online en PORT 8080'));

const socketServer = new Server(httpServer)

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter);
//Configuracion de sockets referencia de ppptt
app.engine('handlebars', handleBars.engine());
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', viewsRouter);


app.get("/", (req, res)=>{
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('OK')    
})

// Array de productos
let products = [];

socketServer.on('connection', socket=>{

    console.log("Nuevo cliente Conectado")
    // Envia la lista de productos cuando un cliente se conecta
    socket.emit('products', products);

    //creación de un nuevo producto
    socket.on('newProduct', (product) => {
        products.push(product);
        // Emite la lista actualizada de productos a todos los clientes
        socket.emit('products', products);
    });

  // eliminación de un producto
    socket.on('deleteProduct', (productId) => {
        products = products.filter(product => product.id !== productId);
    // Emite la lista actualizada de productos a todos los clientes
        socketServer.emit('products', products); 
    });

})

///lee el archivo donde se guardaron todos los productos, o el array seleccionado
//productManager.getProducts();

//id encontrado leyedo el archivo
//productManager.getProductById(1);


//producto no encontrado
//productManager.getProductById(6);

//cambia el nombre del producto
//productManager.updateProduct(1, "TASTY SPICY");

//elimina el producto con el id enviado del archivo
//productManager.deleteProduct(2);
