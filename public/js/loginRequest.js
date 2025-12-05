// public/js/loginRequest.js
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const res = await fetch("/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "/admin";
  } else {
    alert(data.error || "Erro ao logar");
  }
});
