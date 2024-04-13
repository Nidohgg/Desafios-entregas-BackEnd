socket.on('products', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - Precio: $${product.price}`;
        
        // Agrega un botón de eliminar junto a cada producto
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            // Emite un evento al servidor para eliminar el producto
            console.log('Botón de eliminar clickeado');
            socket.emit('deleteProduct', product.id); 
        });

        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    });
});

// Manejar el envío del formulario para agregar un nuevo producto
document.getElementById('new-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value; // Cambiar 'product-name' a 'name'
    const price = document.getElementById('price').value; // Cambiar 'product-price' a 'price'
    socket.emit('newProduct', { name, price });
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
});

