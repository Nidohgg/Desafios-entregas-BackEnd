const Router = require('express').Router;

const router = Router();

const products = require('../data/arrayObjetos.json');
//ruta a la lsita de productos
router.get('/home', (req, res) =>{
    res.render('home', {products});
})

//Ruta para realtimeProducts
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products});
})

module.exports = router;
