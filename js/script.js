let id = 1;
const productos = [];
const carrito = [];
function Producto(nombre,precio,descripcion,stock){
    this.id=id++;
    this.nombre=nombre;
    this.precio=precio;
    this.descripcion=descripcion;
    this.stock=stock;
}
let nuevoProducto,productoEncontrado;
function addProductoCarrito(nombre){
    let productoEncontrado = productos.find((prod) => prod.nombre == nombre);
    carrito.push(productoEncontrado);
}
function addIVA(monto){
    return monto*=1.21;
}
function addEnvio(monto){
    if(monto <= 4000 && carrito.length != 0)return monto + 600;
    else return monto;
}

productos.push(new Producto("arduino uno",2500,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("arduino nano",1500,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("arduino proMicro",2000,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("arduino leonardo",3000,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("arduino mega",4000,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("raspBerry pi",20000,"Microprocesador arduino para proyectos de robotica y programacion",10));
productos.push(new Producto("raspBerry pi pico",1000,"Microprocesador arduino para proyectos de robotica y programacion",10));

function mostrarProductos(){
    let contenedor = document.querySelector(".mainContainer");
    for(const p of productos){
        let productoHTML = document.createElement("div");
        productoHTML.className="producto";
        productoHTML.innerHTML=`<h2 class="nombreProducto">${p.nombre}</h2>
                            <p class="precioProducto">$${p.precio}</p>
                            <p class="descProducto">${p.descripcion}</p>
                            <button class="buttonProducto agregarCarrito">Agregar al Carrito<button>`;
        contenedor.appendChild(productoHTML);
    }
}
let botones = querySelectorAll(".agregarCarrito");
for(const button of botones){
    button.addEventListener("click",agregarCarrito);
}
let total=0;
for(const pc of carrito){
    total += pc.precio;
}
total = addIVA(total);
total = addEnvio(total);    
mostrarProductos();