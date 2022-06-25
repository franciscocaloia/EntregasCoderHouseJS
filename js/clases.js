class Producto {
  constructor(nombre, precio, descripcion, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.stock = stock;
  }
}

class Board extends Producto {
  constructor(nombre, precio, descripcion, stock) {
    super(nombre, precio, descripcion, stock);
    this.id = "b" + idBoards++;
  }
}
class Sensor extends Producto {
  constructor(nombre, precio, descripcion, stock) {
    super(nombre, precio, descripcion, stock);
    this.id = "s" + idSens++;
  }
}

class Kit extends Producto {
  constructor(nombre, precio, descripcion, stock) {
    super(nombre, precio, descripcion, stock);
    this.id = "k" + idKits++;
  }
}
