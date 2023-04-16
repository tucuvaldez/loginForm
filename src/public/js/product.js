const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch("api/productos", {
    method: "POST",
    body: data,
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    });
});
