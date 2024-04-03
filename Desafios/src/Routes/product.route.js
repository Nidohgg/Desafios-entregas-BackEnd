const path=require("path")
const ProductManager = require("../Class/productManager");
const Router=require('express').Router;


const productManager = new ProductManager(path.resolve(__dirname, "../data/arrayObjetos.json"));
const router=Router()

router.get("/api/products", async (req, res)=>{

    console.log(req.query);
    
    let datos= await productManager.getProducts();
    let limit = req.query.limit;

    if (limit && limit > 0) {
        datos=datos.slice(0,limit)
    }
    console.log(datos);
    res.json(datos);
})

router.get("/api/products/:pid", async (req, res)=>{
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

router.post("/api/products/", async(req, res)=>{
    const { title, description, price, thumbnail, status, code, stock } = req.body;

    try {
        await productManager.addProduct(title, description, price, thumbnail, status, code, stock);
        res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/api/products/:pid", async(req, res)=>{
    const { id } = req.params;
    const { title } = req.body;

    try {
        await productManager.updateProduct(id, title);
        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await productManager.deleteProduct(id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;