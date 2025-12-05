document.addEventListener("DOMContentLoaded", () => {
  loadAccountInfo();
  loadShoppingLists();
  setupNewListForm();
});

// ----- Minha conta -----
async function loadAccountInfo() {
  try {
    const res = await fetch("/me");
    if (!res.ok) throw new Error("Erro ao carregar conta");

    const user = await res.json();
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-type").textContent = user.type || "USER";
  } catch (err) {
    console.error(err);
    document.getElementById("user-name").textContent = "Erro ao carregar";
    document.getElementById("user-email").textContent = "-";
    document.getElementById("user-type").textContent = "-";
  }
}

// ----- Listas -----
async function loadShoppingLists() {
  const container = document.getElementById("lists-container");
  container.innerHTML = `<div class="col-12 text-muted">Carregando listas...</div>`;

  try {
    const res = await fetch("/shopping-lists");
    if (!res.ok) throw new Error("Erro ao carregar listas");

    const lists = await res.json();
    if (!lists.length) {
      container.innerHTML = `<div class="col-12 text-muted">Você ainda não tem nenhuma lista.</div>`;
      return;
    }

    container.innerHTML = "";
    lists.forEach((list) => renderList(list));
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="col-12 text-danger">Erro ao carregar listas.</div>`;
  }
}

function renderList(list) {
  const container = document.getElementById("lists-container");

  const col = document.createElement("div");
  col.className = "col-md-6";
  col.innerHTML = `
    <div class="card h-100 shopping-list" data-id="${list.id}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${list.name}</h5>

        <form class="row g-2 align-items-center new-item-form mb-2">
          <div class="col-6">
            <input type="text" name="itemName" class="form-control" placeholder="Item" required />
          </div>
          <div class="col-3">
            <input type="number" name="quantity" class="form-control" min="1" value="1" required />
          </div>
          <div class="col-3 d-grid">
            <button type="submit" class="btn btn-sm btn-outline-primary">Adicionar</button>
          </div>
        </form>

        <ul class="list-group list-group-flush flex-grow-1 items">
          ${
            Array.isArray(list.items) && list.items.length
              ? list.items
                  .map(
                    (item) => `
            <li class="list-group-item d-flex align-items-center" data-item-id="${item.id}">
              <div class="form-check">
                <input class="form-check-input me-2" type="checkbox" ${
                  item.checked ? "checked" : ""
                } />
                <label class="form-check-label ${
                  item.checked ? "text-decoration-line-through text-muted" : ""
                }">
                  ${item.name} (${item.quantity})
                </label>
              </div>
            </li>`
                  )
                  .join("")
              : `<li class="list-group-item text-muted">Nenhum item ainda.</li>`
          }
        </ul>
      </div>
    </div>
  `;

  const listEl = col.querySelector(".shopping-list");

  const form = listEl.querySelector(".new-item-form");
  form.addEventListener("submit", (e) => handleNewItemSubmit(e, list.id));

  const checkboxes = listEl.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", (e) =>
      handleToggleItem(e, list.id, e.target.closest("li").dataset.itemId)
    );
  });

  container.appendChild(col);
}

function setupNewListForm() {
  const form = document.getElementById("new-list-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("new-list-name");
    const name = nameInput.value.trim();
    if (!name) return;

    try {
      const res = await fetch("/shopping-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Erro ao criar lista");

      const newList = await res.json();
      renderList({ ...newList, items: [] });
      nameInput.value = "";
    } catch (err) {
      console.error(err);
      alert("Erro ao criar lista");
    }
  });
}

async function handleNewItemSubmit(e, listId) {
  e.preventDefault();
  const form = e.target;
  const name = form.itemName.value.trim();
  const quantity = parseInt(form.quantity.value, 10) || 1;
  if (!name) return;

  try {
    const res = await fetch(`/shopping-lists/${listId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity }),
    });
    if (!res.ok) throw new Error("Erro ao adicionar item");

    const newItem = await res.json();

    const listEl = document.querySelector(
      `.shopping-list[data-id="${listId}"]`
    );
    const ul = listEl.querySelector(".items");

    if (
      ul.children.length === 1 &&
      ul.children[0].textContent.includes("Nenhum item")
    ) {
      ul.innerHTML = "";
    }

    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";
    li.dataset.itemId = newItem.id;
    li.innerHTML = `
      <div class="form-check">
        <input class="form-check-input me-2" type="checkbox" />
        <label class="form-check-label">${newItem.name} (${newItem.quantity})</label>
      </div>
    `;
    li.querySelector("input").addEventListener("change", (ev) =>
      handleToggleItem(ev, listId, newItem.id)
    );

    ul.appendChild(li);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar item");
  }
}

async function handleToggleItem(e, listId, itemId) {
  const checked = e.target.checked;
  const label = e.target.closest("li").querySelector(".form-check-label");

  try {
    const res = await fetch(`/shopping-lists/${listId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
    if (!res.ok) throw new Error("Erro ao atualizar item");

    if (checked) {
      label.classList.add("text-decoration-line-through", "text-muted");
    } else {
      label.classList.remove("text-decoration-line-through", "text-muted");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar item");
    e.target.checked = !checked;
  }
}
