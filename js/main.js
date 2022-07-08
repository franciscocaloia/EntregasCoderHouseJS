async function mostrarProductosBoards(arregloProductos) {
  await getBoarsData();
  let contenedor = document.querySelector(".mainContainer");
  for (const { id, nombre, precio, descripcion } of arregloProductos) {
    let productoHTML = document.createElement("div");
    console.log("hola");
    productoHTML.id = id;
    productoHTML.className = "producto";
    productoHTML.innerHTML = `<h2 class="nombreProducto">${nombre}</h2>
            <p class="precioProducto">$${precio}</p>
            <p class="descProducto">${descripcion}</p>
            <button class="buttonProducto agregarAlCarrito">Agregar al Carrito<button>`;
    contenedor.appendChild(productoHTML);
  }
}

function getCarritoStorage() {
  localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito")).map((p) => carrito.push(p))
    : localStorage.setItem("carrito", carrito);
}

function mostrarTotalCompra() {
  let total = carrito.reduce((previous, { precio }) => previous + precio, 0);
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
        ({ id }) => id == idProductoSeleccionado
      );
      break;
    case "s":
      productoEncontrado = sensors.find(
        ({ id }) => id == idProductoSeleccionado
      );
      break;
    case "k":
      productoEncontrado = kits.find(({ id }) => id == idProductoSeleccionado);
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

function mostrarAlertaComprobacion(event) {
  swal("Desea eliminar todos los elementos del carrito?", {
    buttons: {
      cancel: true,
      ok: true,
    },
  }).then((value) => {
    switch (value) {
      case "ok":
        borrarCarrito();
        break;
      default:
        break;
    }
  });
}

async function getBoarsData() {
  await fetch("../data/boards.json")
    .then((res) => res.json())
    .then((dataJSON) => {
      dataJSON.forEach((boardJSON) => {
        let newBoard = new Board(
          boardJSON.nombre,
          boardJSON.precio,
          boardJSON.descripcion,
          boardJSON.stock
        );
        boards.push(newBoard);
      });
    });
}
