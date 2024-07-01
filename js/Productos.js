const productos = [
    {
        id: 1,
        nombre: 'Remera oversize Skeleton',
        precio: 35,
        imagen: 'Remeras.img/remera (1).jpg'
    },
    {
        id: 2,
        nombre: 'Remera oversize Flash',
        precio: 25,
        imagen: 'Remeras.img/remera (2).jpg'
    },
    {
        id: 3,
        nombre: 'Remera oversize Skyline',
        precio: 20,
        imagen: 'Remeras.img/remera (7).jpg'
    },
    {
        id: 4,
        nombre: 'Remera oversize Butterfly',
        precio: 30,
        imagen: 'Remeras.img/remera (4).jpg'
    },
    {
        id: 5,
        nombre: 'Remera oversize Moon',
        precio: 20,
        imagen: 'Remeras.img/remera (5).jpg'
    },
    {
        id: 6,
        nombre: 'Remera oversize Angel',
        precio: 25,
        imagen: 'Remeras.img/remera (9).jpg'
    },
    {
        id: 7,
        nombre: 'Remera oversize Purple',
        precio: 30,
        imagen: 'Remeras.img/remera (6).jpg'
    },
    {
        id: 8,
        nombre: 'Remera oversize Universe',
        precio: 35,
        imagen: 'Remeras.img/remera (8).jpg'
    },
    {
        id: 9,
        nombre: 'Remera oversize Moonlight',
        precio: 30,
        imagen: 'Remeras.img/remera (4).jpg'
    }
];

console.log('Productos disponibles:', productos);



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
            alert('Producto añadido al carrito');
        });
    });

    const ordenarPrecioSelect = document.getElementById('ordenar-precio');
    ordenarPrecioSelect.addEventListener('change', () => {
        const productos = Array.from(document.querySelectorAll('.ropa'));
        const contenedor = document.getElementById('galeriaRopas');
        const orden = ordenarPrecioSelect.value;

        productos.sort((a, b) => {
            const precioA = parseFloat(a.getAttribute('data-precio'));
            const precioB = parseFloat(b.getAttribute('data-precio'));

            return orden === 'menor' ? precioA - precioB : precioB - precioA;
        });

        productos.forEach(producto => contenedor.appendChild(producto));
    });
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