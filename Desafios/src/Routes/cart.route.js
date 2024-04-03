const Router=require('express').Router;

const router=Router()

// array temporal de carritos
const carts = [];
let cartCounter = 0;


//crea un nuevo carrito
router.post('/api/carts', (req, res) => {
    try {
        // ID carrito
        const cartId = ++cartCounter;

        //nuevo carrito con un array vacío de productos
        const carritoCreado = {
            id: cartId,
            products: []
        };

        // Agregar el nuevo carrito al almacenamiento temporal
        carts.push(carritoCreado);

        res.status(201).json(carritoCreado);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.get('/api/carts/:cid', (req, res) => {
    try {
        const cartId = req.params.cid;

        // Buscar el carrito en el carrito "provisorio"
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: "Error al listar los productos del carrito" });
    }
});

//agregar producto al carrito
router.post('/api/carts/:cid/product/:pid', (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = parseInt(req.body.quantity) || 1; 
        
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // Verifica si el producto ya está en el carrito
        const productoEnCart = cart.products.findIndex(product => product.id === productId);

        if (productoEnCart !== -1) {
            // Si el producto ya existe en el carrito, se incrementa la cantidad
            cart.products[productoEnCart].quantity += quantity;
        } else {
            // Si el producto no existe en el carrito, se agrega
            cart.products.push({ id: productId, quantity });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar un producto al carrito" });
    }
});

module.exports = router;