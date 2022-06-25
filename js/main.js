function mostrarProductos(arregloProductos) {
  let contenedor = document.querySelector(".mainContainer");
  for (const p of arregloProductos) {
    let productoHTML = document.createElement("div");
    productoHTML.id = p.id;
    productoHTML.className = "producto";
    productoHTML.innerHTML = `<h2 class="nombreProducto">${p.nombre}</h2>
            <p class="precioProducto">$${p.precio}</p>
            <p class="descProducto">${p.descripcion}</p>
            <button class="buttonProducto agregarAlCarrito">Agregar al Carrito<button>`;
    contenedor.appendChild(productoHTML);
  }
}

function getCarritoStorage() {
  if (localStorage.getItem("carrito")) {
    for (const p of JSON.parse(localStorage.getItem("carrito"))) {
      carrito.push(p);
    }
  } else {
    localStorage.setItem("carrito", []);
  }
}

function mostrarTotalCompra() {
  let total = carrito.reduce((previous, actual) => previous + actual.precio, 0);
  total = addIVA(total);
  total = addEnvio(total);
  let totalHTML = document.querySelector(".mostrarTotal");
  totalHTML.innerHTML = "El total de su compra es de: $" + total;
}

function borrarCarrito() {
  while (carrito.length > 0) {
    carrito.pop();
  }
  localStorage.setItem("carrito", carrito);
  mostrarTotalCompra();
}

function agregarAlCarrito(event) {
  let idProductoSeleccionado = event.target.parentNode.id,
    productoEncontrado;
  console.log(idProductoSeleccionado);
  switch (idProductoSeleccionado.charAt(0)) {
    case "b":
      console.log("hola");
      productoEncontrado = boards.find(
        (prod) => prod.id == idProductoSeleccionado
      );
      break;
    case "s":
      productoEncontrado = sensors.find(
        (prod) => prod.id == idProductoSeleccionado
      );
      break;
    case "k":
      productoEncontrado = kits.find(
        (prod) => prod.id == idProductoSeleccionado
      );
      break;
    default:
      break;
  }
  carrito.push(productoEncontrado);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarTotalCompra();
}

function addIVA(monto) {
  return (monto *= 1.21);
}

function addEnvio(monto) {
  if (monto <= 4000 && carrito.length != 0) return monto + 600;
  else return monto;
}
