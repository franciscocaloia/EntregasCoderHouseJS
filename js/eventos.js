let botones = document.querySelectorAll(".agregarAlCarrito");
for (const button of botones) {
  button.addEventListener("click", agregarAlCarrito);
}

let botonFinalizar = document.querySelector(".buttonBorrarCarrito");
botonFinalizar.addEventListener("click", mostrarAlertaComprobacion);
