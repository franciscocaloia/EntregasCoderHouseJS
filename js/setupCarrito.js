getCartStorage();
(async () => {
  await getProductsData();
  showCart();
})();
document
  .querySelector("#deleteCart")
  .addEventListener("click", alertDeleteCart);
