const Productos = [
    {nombre: "Pantalon oversize snow", precio: 20},
    {nombre: "Pantalon oversize Jean", precio: 30},
    {nombre: "Pantalon oversize Skyblue", precio: 40},
    {nombre: "Pantalon oversize 014", precio: 35},
    {nombre: "Pantalon oversize Military", precio: 30},
    {nombre: "Remera oversize Skeleton", precio: 35},
    {nombre: "Remera oversize Flash", precio: 25},
    {nombre: "Remera oversize Skyline", precio: 20},
    {nombre: "Remera oversize Butterfly", precio: 30},
    {nombre: "Remera oversize Moon", precio: 20},
    {nombre: "Remera oversize Angel", precio: 25},
    {nombre: "Remera oversize Purple", precio: 30},
    {nombre: "Remera oversize Universe", precio: 35},
];

let carrito = [];
let seleccion = prompt("Desea comprar algún producto? SI o NO").toLowerCase();

while (seleccion !== "si" && seleccion !== "no") {
    alert("Solo puede ingresar SI o NO");
    seleccion = prompt("Desea comprar algún producto? SI o NO").toLowerCase();
}

if (seleccion === "no") {
    alert("Gracias por mirar, ¡Nos vemos!");
}

while (seleccion !== "no") {
    let productoNombre = prompt("Agregar nombre de producto a tu carrito");
    let productoEncontrado = Productos.find(
        (producto) => producto.nombre.toLowerCase() === productoNombre.toLowerCase()
    );

    if (productoEncontrado) {
        let cantidad = parseInt(prompt(`¿Cuántas unidades de ${productoEncontrado.nombre} desea agregar?`), 10);
        if (!isNaN(cantidad) && cantidad > 0) {
            carrito.push({ ...productoEncontrado, cantidad: cantidad });
            alert(`${cantidad} unidad(es) de ${productoEncontrado.nombre} ha(n) sido agregada(s) a tu carrito.`);
        } else {
            alert("Cantidad no válida. Intente nuevamente.");
        }
    } else {
        alert("El producto no se encuentra disponible.");
    }

    seleccion = prompt("Desea seguir comprando? SI o NO").toLowerCase();
    if (seleccion === "no") {
        alert("Gracias por su compra!");
        let total = 0;
        let totalProductos = 0;
        carrito.forEach((producto) => {
            alert(`Producto: ${producto.nombre}, Precio: ${producto.precio}$, Cantidad: ${producto.cantidad}`);
            total += producto.precio * producto.cantidad;
            totalProductos += producto.cantidad;
            console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}$, Cantidad: ${producto.cantidad}`);
        });
        alert(`Total a pagar: ${total}$`);
        console.log(`Total de productos: ${totalProductos}`);
        console.log(`Total a pagar: ${total}$`);
        break;
    }
}

