const productos = [
    { nombre: "Pantalon oversize snow", precio: 20 },
    { nombre: "Pantalon oversize Jean", precio: 30 },
    { nombre: "Pantalon oversize Skyblue", precio: 40 },
    { nombre: "Pantalon oversize 014", precio: 35 },
    { nombre: "Pantalon oversize Military", precio: 30 },
    { nombre: "Remera oversize Skeleton", precio: 35 },
    { nombre: "Remera oversize Flash", precio: 25 },
    { nombre: "Remera oversize Skyline", precio: 20 },
    { nombre: "Remera oversize Butterfly", precio: 30 },
    { nombre: "Remera oversize Moon", precio: 20 },
    { nombre: "Remera oversize Angel", precio: 25 },
    { nombre: "Remera oversize Purple", precio: 30 },
    { nombre: "Remera oversize Universe", precio: 35 },
];
let carrito = [];
function ordenarProductosPorPrecio() {
    return productos.slice().sort((a, b) => a.precio - b.precio);
}
console.log('Productos ordenados por precio de menor a mayor:', ordenarProductosPorPrecio());
function pedirSeleccion(mensaje) {
    let seleccion;
    do {
        seleccion = prompt(mensaje).toLowerCase();
    } while (seleccion !== "si" && seleccion !== "no");
    return seleccion;
}
function encontrarProducto(nombre) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}
function agregarAlCarrito(producto, cantidad) {
    carrito.push({ ...producto, cantidad });
    alert(`${cantidad} unidad(es) de ${producto.nombre} ha(n) sido agregada(s) a tu carrito.`);
}
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
alert("A continuación, una lista de productos de menor a mayor precio en la consola");
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