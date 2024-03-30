const ProductManager = require("./Entregable.js");


//productos 

const productManager = new ProductManager();

productManager.addProduct('Hamburguesa', 'El sabor de la carne 100% vacuna más deliciosa, acompañado del pan más esponjoso, kétchup, mostaza y cebolla triturada.', 2000, 'img', 'COD65', 20);

productManager.addProduct('Doble Cuarto de Libra con Queso', 'Imaginá la sensación del clásico Cuarto de Libra. Imaginalo con un medallón de deliciosa carne 100% vacuna, queso cheddar, cebolla, kétchup y mostaza ¿Listo? Ahora duplicá esa sensación. Ya tenés el Doble Cuarto en la cabeza.', 3000, 'img', 'COD34', 15);

//productManager.addProduct('McNífica', 'En un mundo donde todos buscan lo nuevo todo el tiempo, la McNífica viene a rectificar lo bueno de ser clásico. Carne, queso cheddar, tomate, lechuga y cebolla, acompañados de kétchup, mostaza y mayonesa.', 2600, '', 'COD12', 26);

//lee el archivo donde se guardaron todos los productos, o el array seleccionado
productManager.getProducts();

//id encontrado leyedo el archivo
productManager.getProductById(1);


//producto no encontrado
productManager.getProductById(6);

//cambia el nombre del producto
productManager.updateProduct(1, "TASTY SPICY");

//elimina el producto con el id enviado del archivo
productManager.deleteProduct(2);