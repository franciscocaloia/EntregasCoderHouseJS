getCartStorage();
(async () => {
  await getProductsData();
  mostrarProductos(typeBoard, "");
})();
document.querySelector("#searchProducts").addEventListener("input", (event) => {
  console.log(event.target.value);
  mostrarProductos(typeBoard, event.target.value);
});
