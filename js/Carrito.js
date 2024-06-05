const productos = [
    { nombre: "Pantalon oversize snow", precio: 20, categoria: "Pantalones" },
    { nombre: "Pantalon oversize Jean", precio: 30, categoria: "Pantalones" },
    { nombre: "Pantalon oversize Skyblue", precio: 40, categoria: "Pantalones" },
    { nombre: "Pantalon oversize 014", precio: 35, categoria: "Pantalones" },
    { nombre: "Pantalon oversize Military", precio: 30, categoria: "Pantalones" },
    { nombre: "Remera oversize Skeleton", precio: 35, categoria: "Remeras" },
    { nombre: "Remera oversize Flash", precio: 25, categoria: "Remeras" },
    { nombre: "Remera oversize Skyline", precio: 20, categoria: "Remeras" },
    { nombre: "Remera oversize Butterfly", precio: 30, categoria: "Remeras" },
    { nombre: "Remera oversize Moon", precio: 20, categoria: "Remeras" },
    { nombre: "Remera oversize Angel", precio: 25, categoria: "Remeras" },
    { nombre: "Remera oversize Purple", precio: 30, categoria: "Remeras" },
    { nombre: "Remera oversize Universe", precio: 35, categoria: "Remeras" },
];

let carrito = [];

// Función para ordenar productos por precio
function ordenarProductosPorPrecio(productos, orden) {
    return productos.slice().sort((a, b) => orden === 'menor' ? a.precio - b.precio : b.precio - a.precio);
}

// Función para pedir selección al usuario
function pedirSeleccion(mensaje) {
    let seleccion;
    do {
        seleccion = prompt(mensaje).toLowerCase();
    } while (seleccion !== "si" && seleccion !== "no");
    return seleccion;
}

// Función para encontrar un producto por nombre
function encontrarProducto(nombre) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto, cantidad) {
    carrito.push({ ...producto, cantidad });
    alert(`${cantidad} unidad(es) de ${producto.nombre} ha(n) sido agregada(s) a tu carrito.`);
}

// Función para calcular el total del carrito
function calcularTotal() {
    let total = carrito.reduce((acc, { precio, cantidad }) => acc + precio * cantidad, 0);
    let totalProductos = carrito.reduce((acc, { cantidad }) => acc + cantidad, 0);
    carrito.forEach(({ nombre, precio, cantidad }) => {
        alert(`Producto: ${nombre}, Precio: ${precio}$, Cantidad: ${cantidad}`);
        console.log(`Producto: ${nombre}, Precio: ${precio}$, Cantidad: ${cantidad}`);
    });
    alert(`Total de productos: ${totalProductos}`);
    alert(`Total a pagar: ${total}$`);
    console.log(`Total de productos: ${totalProductos}`);
    console.log(`Total a pagar: ${total}$`);
}

// Función para filtrar productos por categoría
function filtrarProductosPorCategoria(categoria) {
    return productos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
}

// Función para mostrar todos los productos
function mostrarProductos(productos) {
    productos.forEach(producto => console.log(`Nombre: ${producto.nombre}, Precio: ${producto.precio}$, Categoría: ${producto.categoria}`));
}

// Preguntar al usuario si busca Remeras o Pantalones
let categoriaSeleccionada;
do {
    categoriaSeleccionada = prompt("¿Qué categoría de productos desea ver? Ingrese 'Remeras' o 'Pantalones':").toLowerCase();
} while (categoriaSeleccionada !== 'remeras' && categoriaSeleccionada !== 'pantalones');

// Preguntar al usuario si desea ordenar de menor a mayor o de mayor a menor
let ordenSeleccionado;
do {
    ordenSeleccionado = prompt("¿Cómo desea ordenar los productos? Ingrese 'menor' para menor a mayor o 'mayor' para mayor a menor:").toLowerCase();
} while (ordenSeleccionado !== 'menor' && ordenSeleccionado !== 'mayor');

let productosFiltrados = ordenarProductosPorPrecio(filtrarProductosPorCategoria(categoriaSeleccionada), ordenSeleccionado);

alert(`A continuación, una lista de ${categoriaSeleccionada} ordenados por precio en la consola`);
console.log(`${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)} ordenados por precio de ${ordenSeleccionado === 'menor' ? 'menor a mayor' : 'mayor a menor'}:`);
mostrarProductos(productosFiltrados);

let seleccion = pedirSeleccion("¿Desea comprar algún producto? SI o NO");
if (seleccion === "no") {
    alert("Gracias por mirar, ¡Nos vemos!");
} else {
    while (true) {
        let productoNombre = prompt("Agregar nombre de producto a tu carrito");
        let productoEncontrado = encontrarProducto(productoNombre);
        if (productoEncontrado) {
            let cantidad = parseInt(prompt(`¿Cuántas unidades de ${productoEncontrado.nombre} desea agregar?`), 10);
            if (!isNaN(cantidad) && cantidad > 0) {
                agregarAlCarrito(productoEncontrado, cantidad);
            } else {
                alert("Cantidad no válida. Intente nuevamente.");
            }
        } else {
            alert("El producto no se encuentra disponible.");
        }
        seleccion = pedirSeleccion("¿Desea seguir comprando? SI o NO");
        if (seleccion === "no") {
            alert("Gracias por su compra!");
            alert(`Has comprado ${carrito.length} producto(s).`);
            alert(`Productos comprados: ${carrito.map(p => p.nombre).join(', ')}`);
            console.log(carrito.map(p => p.nombre).concat(". ¡Gracias por tu compra!").join(' '));
            calcularTotal();
            break;
        }
    }
}
