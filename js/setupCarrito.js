getCartStorage();
getHistoryStorage();
(async () => {
  await getProductsData();
  showCart();
  showHistory();
})();
document
  .querySelector("#deleteCart")
  .addEventListener("click", alertDeleteCart);
