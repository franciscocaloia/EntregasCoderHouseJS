class Producto {
  constructor(name, price, description, type, img) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.type = type;
    this.img = img;
    this.id = idProduct++;
  }
}

class HistoryPurchase {
  constructor(cart, total) {
    this.productsHistory = cart;
    this.total = total;
    this.id = idHistory++;
  }
}

async function getProductsData() {
  const response = await fetch("../data/products.json");
  const dataJSON = await response.json();
  dataJSON.forEach((productJSON) => {
    let newProduct = new Producto(
      productJSON.name,
      productJSON.price,
      productJSON.description,
      productJSON.type,
      productJSON.img
    );
    products.push(newProduct);
  });
  return products;
}

function getCartStorage() {
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).map((p) => cart.push(p))
    : localStorage.setItem("cart", cart);
}

function getHistoryStorage() {
  localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history")).forEach((h) =>
        history.push(new HistoryPurchase(h.productsHistory, h.total))
      )
    : localStorage.setItem("history", history);
}

function mostrarProductos(typeProduct, searchName) {
  let mainContainer = document.querySelector("#mainContainer");
  mainContainer.innerHTML = "";
  const productsFilter = products.filter(
    ({ type, name }) =>
      type === typeProduct &&
      name.toLowerCase().includes(searchName.toLowerCase())
  );
  productsFilter.forEach(({ id, name, price, description, img }) => {
    let productoHTML = document.createElement("div");
    productoHTML.id = `producto-${id}`;
    productoHTML.className = "producto";
    productoHTML.innerHTML = `<img class="productImg" src="${img}">
                              <h2 class="productName">${name}</h2>
                              <p class="productDesc">${description}</p>
                              <div class="price-items">
                                <p class="productPrice">$${price}</p>
                                <div id="buttons-${id}" class="buttons">
                                </div>
                              </div>`;
    mainContainer.appendChild(productoHTML);
    buttonsHTML = document.querySelector(`#buttons-${id}`);
    if ((productCart = cart.find(({ id: idCart }) => idCart == id))) {
      showItemsButtons(id, productCart.items, buttonsHTML);
    } else {
      createButtonProducto(`Agregar al Cart`, buttonsHTML).addEventListener(
        "click",
        () => {
          incrementCartItem(id);
          mostrarProductos(typeProduct, searchName);
        }
      );
    }
  });
  addUpdateEvents(() => mostrarProductos(typeProduct, searchName));
}

function showCart() {
  let total = 0;
  let tablaCart = document.querySelector("#cartContent");
  tablaCart.innerHTML = "";
  total = cart
    .map(({ id: idCart, items }) => {
      const { name, price, img } = products.find(({ id }) => id === idCart);
      let productoCartHtml = document.createElement("tr");
      productoCartHtml.classList = "cartRow";
      productoCartHtml.innerHTML = `<td class="cartNameImg">
                                    <img class="cartImg" src="${img}">
                                    <p>${name}</p>
                                  </td>
                                  <td class="cartPrice">${price}</td>
                                  <td class="cartButtons">
                                    <div id="buttons-${idCart}" class="buttons">
                                    </div>
                                  </td>`;
      tablaCart.appendChild(productoCartHtml);
      buttonsHTML = document.querySelector(`#buttons-${idCart}`);
      showItemsButtons(idCart, items, buttonsHTML);
      createButtonProducto(`x`, buttonsHTML).addEventListener("click", () => {
        let productCart = cart.find(({ id }) => id === idCart);
        alertDeleteCartItem(productCart, name);
      });
      return price * items;
    })
    .reduce((previous, actual) => previous + actual, 0);
  addUpdateEvents(showCart);
  let totalHTML = document.createElement("tr");
  totalHTML.innerHTML = `<td>TOTAL</td> 
      <td>
        ${total}
      </td>`;
  totalHTML.id = "totalCart";
  tablaCart.appendChild(totalHTML);
  document
    .querySelector("#cartFinal")
    .addEventListener("click", () => alertCartFinal(total));
}

function showHistory() {
  getHistoryStorage();
  let historyHTML = document.querySelector("#historyContainer");
  historyHTML.innerHTML = "";
  history.forEach((historyInstance) => {
    let historyInstanceHTML = document.createElement("ul");
    historyInstanceHTML.innerHTML = `<li class="historyProduct"><b>Compra N°${historyInstance.id}</b></li>`;
    historyInstanceHTML.innerHTML += historyInstance.productsHistory
      .map((cartProduct) => {
        let { name } = products.find(
          (product) => cartProduct.id === product.id
        );
        return `<li class="historyProduct"><span class="historyName">${name}</span><span class="historyItems">${cartProduct.items}</span></li>`;
      })
      .join("");
    historyInstanceHTML.innerHTML += `<li class="historyProduct"><span class="historyName"><b>TOTAL</b></span><span class="historyItems">${historyInstance.total}</span></li>`;
    historyHTML.appendChild(historyInstanceHTML);
  });
}

function showItemsButtons(idCart, items, containerHTML) {
  createButtonProducto(`-`, containerHTML).addEventListener("click", () => {
    decrementCartItem(idCart);
  });

  let productItemsHTML = document.createElement("p");
  productItemsHTML.innerHTML = items;
  productItemsHTML.id = idCart;
  containerHTML.appendChild(productItemsHTML);

  createButtonProducto(`+`, containerHTML).addEventListener("click", () => {
    incrementCartItem(idCart);
  });
}

function createButtonProducto(innerHTML, containerHTML) {
  let button = document.createElement("button");
  button.className = `productButton`;
  button.innerHTML = innerHTML;
  containerHTML.appendChild(button);
  return button;
}

function incrementCartItem(idProductoSeleccionado) {
  let productCart;
  if ((productCart = cart.find(({ id }) => id === idProductoSeleccionado))) {
    productCart.items++;
  } else {
    productCart = {
      id: idProductoSeleccionado,
      items: 1,
    };
    cart.push(productCart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function decrementCartItem(idProductoSeleccionado) {
  let productCart = cart.find(({ id }) => id === idProductoSeleccionado);
  if (--productCart.items === 0) {
    deleteCartItem(productCart);
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return productCart.items;
}

function deleteCartItem(productCart) {
  cart.splice(cart.indexOf(productCart), 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteCart() {
  while (cart.length > 0) {
    cart.pop();
  }
  localStorage.setItem("cart", cart);
}

function addToHistory(cart, total) {
  let historyObjet = {
    productsHistory: cart,
    total: total,
  };
  history.push(historyObjet);
  localStorage.setItem("history", JSON.stringify(history));
}

function addUpdateEvents(updateFunction) {
  buttons = document.querySelectorAll(".productButton");
  buttons.forEach((button) => {
    button.addEventListener("click", updateFunction);
  });
}

async function alertDeleteCartItem(id, name) {
  let mensaje = document.createElement("p");
  mensaje.innerHTML = `Desea quitar todas las unidades de <b>[${name}]</b> de su carro de compras?`;
  let response = await swal({
    content: mensaje,
    buttons: {
      cancel: true,
      ok: true,
    },
  });
  switch (response) {
    case "ok":
      deleteCartItem(id);
      showCart();
      break;
    default:
      break;
  }
}

async function alertDeleteCart() {
  let response = await swal(
    "Desea eliminar todos los productos de su carro de compras?",
    {
      buttons: {
        cancel: true,
        ok: true,
      },
    }
  );
  switch (response) {
    case "ok":
      deleteCart();
      showCart();
      break;
    default:
      break;
  }
}

async function alertCartFinal(total) {
  let mensaje = document.createElement("p");
  mensaje.innerHTML = `El total a pagar será de ${total}\n
                        Seleccione [Pagar] para finalizar con la compra. Muchas gracias!`;
  let response = await swal({
    content: mensaje,
    buttons: {
      cancel: true,
      Pagar: true,
    },
  });
  switch (response) {
    case "Pagar":
      swal("Gracias por elegirnos!");
      addToHistory(cart, total);
      deleteCart();
      showHistory();
      showCart();
      break;
    default:
      break;
  }
}
