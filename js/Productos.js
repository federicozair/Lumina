document.addEventListener("DOMContentLoaded", () => {
    const galeriaRopas = document.getElementById('galeriaRopas');
    const ropas = Array.from(galeriaRopas.getElementsByClassName('ropa'));
    const ordenarPrecioDropdown = document.getElementById('ordenar-precio');
    const buscarProductoInput = document.getElementById('buscar-producto');
    const mensajeNoProductos = document.getElementById('mensaje-no-productos');

    function mostrarProductos(productos) {
        galeriaRopas.innerHTML = '';
        productos.forEach(ropa => galeriaRopas.appendChild(ropa));
    }

    ordenarPrecioDropdown.addEventListener('change', () => {
        const orden = ordenarPrecioDropdown.value;
        
        ropas.sort((a, b) => {
            const precioA = parseFloat(a.querySelector('h2').innerText.replace('$', ''));
            const precioB = parseFloat(b.querySelector('h2').innerText.replace('$', ''));
            return orden === 'menor' ? precioA - precioB : precioB - precioA;
        });

        mostrarProductos(ropas);
    });

    buscarProductoInput.addEventListener('input', () => {
        const valorBusqueda = buscarProductoInput.value.toLowerCase();
        const ropasFiltradas = ropas.filter(ropa => ropa.querySelector('h1').innerText.toLowerCase().includes(valorBusqueda));
        mostrarProductos(ropasFiltradas);

        if (ropasFiltradas.length > 0) {
            mensajeNoProductos.style.display = 'none';
        } else {
            mensajeNoProductos.style.display = 'block';
        }
    });

    const botonesAgregarCarrito = document.querySelectorAll('.ropa button');

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const productoDiv = evento.target.closest('.ropa');
            const nombre = productoDiv.getAttribute('data-nombre');
            const precio = productoDiv.getAttribute('data-precio');
            const img = productoDiv.getAttribute('data-img');

            const producto = { nombre, precio: parseFloat(precio), img, cantidad: 1 };

            let carrito = localStorage.getItem('carrito');
            carrito = carrito ? JSON.parse(carrito) : [];

            const productoExistente = carrito.find(item => item.nombre === producto.nombre);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            
            Toastify({
                text: "Producto añadido al carrito",
                duration: 3000,
                gravity: "bottom", 
                position: "right", 
                backgroundColor:"linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true, 
                onClick: function(){} 
            }).showToast();
        });
    });
});