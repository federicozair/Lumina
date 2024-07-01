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
    const sortPriceDropdown = document.getElementById('ordenar-precio');
    const searchProductInput = document.getElementById('buscar-producto');
    const noProductsMessage = document.getElementById('no-products-message');
    
    function mostrarProductos(productos) {
        galeriaRopas.innerHTML = '';
        productos.forEach(ropa => galeriaRopas.appendChild(ropa));
    }

    sortPriceDropdown.addEventListener('change', () => {
        const sortOrder = sortPriceDropdown.value;
        
        ropas.sort((a, b) => {
            const precioA = parseFloat(a.querySelector('h2').innerText.replace('$', ''));
            const precioB = parseFloat(b.querySelector('h2').innerText.replace('$', ''));
            return sortOrder === 'menor' ? precioA - precioB : precioB - precioA;
        });

        mostrarProductos(ropas);
    });

    searchProductInput.addEventListener('input', () => {
        const searchValue = searchProductInput.value.toLowerCase();
        const filteredRopas = ropas.filter(ropa => ropa.querySelector('h1').innerText.toLowerCase().includes(searchValue));
        mostrarProductos(filteredRopas);

        
        if (filteredRopas.length > 0) {
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.ropa button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productoDiv = event.target.closest('.ropa');
            const nombre = productoDiv.getAttribute('data-nombre');
            const precio = productoDiv.getAttribute('data-precio');
            const img = productoDiv.getAttribute('data-img');

            const producto = { nombre, precio: parseFloat(precio), img, cantidad: 1 };

            let carrito = localStorage.getItem('carrito');
            carrito = carrito ? JSON.parse(carrito) : [];

            const existingProduct = carrito.find(item => item.nombre === producto.nombre);

            if (existingProduct) {
                existingProduct.cantidad += 1;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto añadido al carrito');
        });
    });

    const searchInput = document.getElementById('buscar-producto');
    const noProductsMessage = document.getElementById('no-products-message');

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const productos = document.querySelectorAll('.ropa');
        let productosVisible = false;

        productos.forEach(producto => {
            const nombre = producto.getAttribute('data-nombre').toLowerCase();
            if (nombre.includes(searchValue)) {
                producto.style.display = 'block';
                productosVisible = true;
            } else {
                producto.style.display = 'none';
            }
        });

        if (productosVisible) {
            noProductsMessage.style.display = 'none';
        } else {
            noProductsMessage.style.display = 'block';
        }
    });

    const sortPriceSelect = document.getElementById('ordenar-precio');
    sortPriceSelect.addEventListener('change', () => {
        const productos = Array.from(document.querySelectorAll('.ropa'));
        const container = document.getElementById('galeriaRopas');
        const sortOrder = sortPriceSelect.value;

        productos.sort((a, b) => {
            const precioA = parseFloat(a.getAttribute('data-precio'));
            const precioB = parseFloat(b.getAttribute('data-precio'));

            return sortOrder === 'menor' ? precioA - precioB : precioB - precioA;
        });

        productos.forEach(producto => container.appendChild(producto));
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
        