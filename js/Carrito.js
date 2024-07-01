document.addEventListener('DOMContentLoaded', () => {
    const carritoItemsContainer = document.getElementById('carritoItems');
    const totalCarritoSpan = document.getElementById('totalCarrito');
    const vaciarCarritoButton = document.getElementById('vaciarCarrito');

    function cargarCarrito() {
        let carrito = localStorage.getItem('carrito');
        carrito = carrito ? JSON.parse(carrito) : [];

        carritoItemsContainer.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('carrito-item');

            productoDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: <button class="disminuir-cantidad" data-index="${index}">-</button> ${producto.cantidad} <button class="aumentar-cantidad" data-index="${index}">+</button></p>
                <button class="eliminar-producto" data-index="${index}">Eliminar</button>
            `;

            carritoItemsContainer.appendChild(productoDiv);
            total += producto.precio * producto.cantidad;
        });

        totalCarritoSpan.textContent = total.toFixed(2);
    }

    function eliminarProducto(index) {
        let carrito = localStorage.getItem('carrito');
        carrito = carrito ? JSON.parse(carrito) : [];

        carrito.splice(index, 1);

        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }

    function actualizarCantidad(index, cantidad) {
        let carrito = localStorage.getItem('carrito');
        carrito = carrito ? JSON.parse(carrito) : [];

        if (cantidad === 0) {
            carrito.splice(index, 1);
        } else {
            carrito[index].cantidad = cantidad;
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }

    carritoItemsContainer.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');

        if (event.target.classList.contains('eliminar-producto')) {
            eliminarProducto(index);
        } else if (event.target.classList.contains('aumentar-cantidad')) {
            let carrito = JSON.parse(localStorage.getItem('carrito'));
            const nuevaCantidad = carrito[index].cantidad + 1;
            actualizarCantidad(index, nuevaCantidad);
        } else if (event.target.classList.contains('disminuir-cantidad')) {
            let carrito = JSON.parse(localStorage.getItem('carrito'));
            const nuevaCantidad = carrito[index].cantidad - 1;
            actualizarCantidad(index, nuevaCantidad);
        }
    });

    vaciarCarritoButton.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    cargarCarrito();
});

function agregarAlCarrito(nombre, precio, img) {
    let carrito = localStorage.getItem('carrito');
    carrito = carrito ? JSON.parse(carrito) : [];

    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, img, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}