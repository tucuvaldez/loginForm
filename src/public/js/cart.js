const addQuantity = (id) => {
  let quantityElement = document.getElementById(`quantity${id}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  let stockElement = document.getElementById(`stock_${id}`);
  let currentStock = parseInt(stockElement.innerText);
  if (currentStock > 0) {
    quantityElement.innerText = currentQuantity + 1;
    stockElement.innerText = currentStock - 1;
  }
};

const decreaseQuantity = (id) => {
  let quantityElement = document.getElementById(`quantity${id}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  let stockElement = document.getElementById(`stock_${id}`);
  let currentStock = parseInt(stockElement.innerText);
  if (currentQuantity > 0) {
    quantityElement.innerText = currentQuantity - 1;
    stockElement.innerText = currentStock + 1;
  }
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
