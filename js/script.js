function Producto(nombre,precio,stock){
    this.nombre=nombre;
    this.precio=precio;
    this.stock=stock;
}

function getNombreProducto(){
    return prompt(mensaje);
}
function addProducto(nombre){
    let productoEncontrado = productos.find((prod) => prod.nombre == nombre);
    if(productoEncontrado == null){
        alert("El nombre ingresado no coincide con ningun producto de la lista, por favor ingrese el nombre nuevamente");
    }else{
        carrito.push(productoEncontrado);
    }
}
function addIVA(monto){
    return monto*=1.21;
}
function addEnvio(monto){
    if(monto <= 4000 && carrito.length != 0)return monto + 600;
    else return monto;
}

const productos = [];
const carrito = [];

productos.push(new Producto("arduino uno",2500,10));
productos.push(new Producto("arduino nano",1500,10));
productos.push(new Producto("arduino proMicro",2000,10));
productos.push(new Producto("arduino leonardo",3000,10));
productos.push(new Producto("arduino mega",4000,10));
productos.push(new Producto("raspBerry pi",20000,10));
productos.push(new Producto("raspBerry pi pico",1000,10));

let mensaje = "------Bienvenido a KloiArduino!------\nTenemos disponibles los siguientes productos:\n"
for(const p of productos){
    mensaje = mensaje.concat("\tNombre: " + p.nombre + "\t\t Precio: " + p.precio + "\n");
}
    mensaje=mensaje.concat("Escriba el nombre del producto para agregarlo al carro de compras \n Presione cancelar para finalizar la compra.\nSi la compra es mayor a $4000 el envio sera sin cargo");
let nuevoProducto,productoEncontrado;
while(true){
    nuevoProducto = getNombreProducto();
    if (nuevoProducto == null)break;
    addProducto(nuevoProducto);
} 
let total=0;
for(const pc of carrito){
    total += pc.precio;
}

total = addIVA(total);
total = addEnvio(total);

alert("El precio total de su compra es de: $"+ total + ".\n");

