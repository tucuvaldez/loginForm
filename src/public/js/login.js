const form = document.getElementById("loginForm");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  const response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.success) {
        if (data.user.email)
          window.location.assign("home", { user: data.user });
      } else {
        alert("Error: " + data.error);
      }
    });
});
