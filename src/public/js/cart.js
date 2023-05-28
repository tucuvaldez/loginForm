const addQuantity = (id) => {
  let quantityElement = document.getElementById(`quantity${id}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  let stockElement = document.getElementById(`stock_${id}`);
  let currentStock = parseInt(stockElement.innerText);
  let addBtn = document.getElementById(`addBtn${id}`);
  let decreaseBtn = document.getElementById(`decreaseBtn${id}`);
  if (currentStock > 0) {
    quantityElement.innerText = currentQuantity + 1;
    stockElement.innerText = currentStock - 1;
    decreaseBtn.disabled = false;
  }
  if (currentStock - 1 == 0) {
    addBtn.disabled = true;
  }
};

const decreaseQuantity = (id) => {
  let quantityElement = document.getElementById(`quantity${id}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  let stockElement = document.getElementById(`stock_${id}`);
  let currentStock = parseInt(stockElement.innerText);
  let decreaseBtn = document.getElementById(`decreaseBtn${id}`);
  let addBtn = document.getElementById(`addBtn${id}`);
  if (currentQuantity > 0) {
    quantityElement.innerText = currentQuantity - 1;
    stockElement.innerText = currentStock + 1;
    addBtn.disabled = false;
  }
  if (currentQuantity - 1 == 0) {
    decreaseBtn.disabled = true;
  }
};

const addToCart = (product) => {
  let prodId = product._id;
  let quantityElement = document.getElementById(`quantity${id}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  window.location.href = `http://localhost:8080/api/carts/products/${prodId}?quantity=${currentQuantity}`;
};

const button = document.getElementById("purchaseBtn");

button.addEventListener("click", async (e) => {
  try {
    const response = await fetch("/api/carts/purchase", {
      method: "POST",
    });
    const result = await response.json();
    console.log(result);
    window.location.href = "/products";
  } catch (error) {
    console.error(error);
  }
});
