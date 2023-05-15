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
