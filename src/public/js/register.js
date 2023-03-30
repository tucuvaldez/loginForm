const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch("api/sessions/register", {
    method: "POST",
    body: data,
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.success) {
        window.location.assign("login");
      }
      console.log(data);
    });
});
