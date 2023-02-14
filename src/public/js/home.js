const logout = document.getElementById("loggedOut");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/sessions/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        window.location.assign("logout");
      }
    });
});
