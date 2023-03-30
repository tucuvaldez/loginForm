export function getTimestamp() {
  return `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()} - ${new Date().toLocaleTimeString()}`;
}
export function checkLength(arr) {
  if (arr.length === 0) {
    console.error("El array esta vacio");
    return false;
  }
  return true;
}

export function checkId(product, arr) {
  arr.forEach((element) => {
    // Por cada elemento del array
    if (element.id == product.id) {
      // Si existe un elemento con el mismo id del producto nuevo
      console.log("El id del elemento ya existe, se le asignara uno nuevo.");
      return newId(arr, product); // Ejecutamos newId
    }
  });
  return product.id;
}
export function newId(arr, product = false) {
  if (product) {
    // Si el producto llega ...
    arr.sort((a, b) => {
      return a - b;
    }); // Ordenamos de forma ascendente segun el id
    product.id = parseInt(arr[arr.length - 1].id) + 1; // Tomamos el id mas grande le sumamos 1 y lo asignamos al producto
    return product.id;
  }
  return parseInt(arr[arr.length - 1].id) + 1;
}
export function formatDocs(docs, option) {
  let formattedDocs = docs.map((doc) => formatDoc(doc, option));
  return formattedDocs;
}

export function formatDoc(doc, option) {
  try {
    if (option === "products") {
      return {
        id: doc.id,
        cant: doc.data().cant,
        description: doc.data().description,
        name: doc.data().name,
        price: doc.data().price,
        src: doc.data().src,
        stock: doc.data().stock,
      };
    }
    if (option === "carts") {
      return {
        id: doc.id,
        products: doc.data().products,
      };
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
}

export function checkProduct(product) {
  product = parseProduct(product);
  // Check if every object property
  return Object.values(product).every((value) => {
    if (value == undefined) {
      return false;
    }
    return true;
  });
}

export function parseProduct(doc) {
  return {
    cant: doc.cant,
    description: doc.description,
    name: doc.name,
    price: doc.price,
    src: doc.src,
    stock: doc.stock,
  };
}
