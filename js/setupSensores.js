getCartStorage();
(async () => {
  await getProductsData();
  mostrarProductos(typeSensor, "");
})();
document.querySelector("#searchProducts").addEventListener("input", (event) => {
  console.log(event.target.value);
  mostrarProductos(typeSensor, event.target.value);
});
