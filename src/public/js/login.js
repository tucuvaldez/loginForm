const form = document.getElementById("loginForm");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    redirect: "manual",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.success) {
        window.location.assign("home");
      } else {
        alert("Error: " + data.message);
      }
      console.log(data);
    });
});
