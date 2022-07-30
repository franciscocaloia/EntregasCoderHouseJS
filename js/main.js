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
    productoHTML.innerHTML = `<img class="imgProducto" src="${img}">
                              <h2 class="nombreProducto">${name}</h2>
                              <p class="descProducto">${description}</p>
                              <div class="priceItems">
                                <p class="precioProducto">$${price}</p>
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

function createButtonProducto(innerHTML, containerHTML) {
  let button = document.createElement("button");
  button.className = `buttonProducto`;
  button.innerHTML = innerHTML;
  containerHTML.appendChild(button);
  return button;
}

function addUpdateEvents(updateFunction) {
  buttons = document.querySelectorAll(".buttonProducto");
  buttons.forEach((button) => {
    button.addEventListener("click", updateFunction);
  });
}

function getCartStorage() {
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).map((p) => cart.push(p))
    : localStorage.setItem("cart", cart);
}

function showCart() {
  let total = 0;
  let tablaCart = document.querySelector("#cartContent");
  tablaCart.innerHTML = "";
  total = cart
    .map(({ id: idCart, items }) => {
      const { name, price } = products.find(({ id }) => id === idCart);
      let productoCartHtml = document.createElement("tr");
      productoCartHtml.innerHTML = `<td>${name}</td>
                                  <td>${price}</td>
                                  <td>
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
