const form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok) {
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "/login";
  } else {
    console.log("Erro no cadastro:", data);
    alert(data.error || "Erro ao cadastrar usuário");
  }
});
