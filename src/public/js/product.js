const expandDescription = (button) => {
  const description = button.previousElementSibling;
  description.style.maxHeight = "none";
  button.style.display = "none";
  button.nextElementSibling.style.display = "inline";
};

const collapseDescription = (button) => {
  const description = button.previousElementSibling.previousElementSibling;
  description.style.maxHeight = "100px";
  button.style.display = "none";
  button.previousElementSibling.style.display = "inline";
};

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
