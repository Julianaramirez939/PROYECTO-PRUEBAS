const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  cargarProductos();
});

const formCategoria = document.getElementById("formCategoria");
const categoriaId = document.getElementById("categoriaId");
const categoriaNombre = document.getElementById("categoriaNombre");
const tablaCategorias = document.querySelector("#tablaCategorias tbody");

async function cargarCategorias() {
  try {
    const res = await fetch(`${API_URL}/categorias`);
    const categorias = await res.json();

    tablaCategorias.innerHTML = "";
    const select = document.getElementById("productoCategoria");
    select.innerHTML = `<option value="">Seleccionar categoría</option>`;

    categorias.forEach((cat) => {
      tablaCategorias.innerHTML += `
        <tr>
          <td>${cat.id}</td>
          <td>${cat.nombre}</td>
          <td class="acciones">
            <button onclick="editarCategoria(${cat.id}, '${cat.nombre}')">Editar</button>
            <button class="danger" onclick="eliminarCategoria(${cat.id})">Eliminar</button>
          </td>
        </tr>
      `;
      select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });
  } catch (error) {
    showAlert("Error cargando categorías", "error");
  }
}

formCategoria.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = categoriaNombre.value.trim();

  if (!nombre) return showAlert("El nombre es obligatorio", "warning");

  const data = { nombre };

  try {
    let res;
    if (categoriaId.value) {
      res = await fetch(`${API_URL}/categorias/${categoriaId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const json = await res.json();
    if (!res.ok)
      return showAlert(json.error || "Error procesando la categoría", "error");

    formCategoria.reset();
    categoriaId.value = "";
    showAlert("Categoría guardada correctamente");
    cargarCategorias();
  } catch (error) {
    showAlert("Error en la comunicación con el servidor", "error");
  }
});

function editarCategoria(id, nombre) {
  categoriaId.value = id;
  categoriaNombre.value = nombre;
}

async function eliminarCategoria(id) {
  const confirmed = await showConfirm(
    "¿Seguro que deseas eliminar esta categoría?"
  );
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok)
      return showAlert(json.error || "Error eliminando la categoría", "error");

    showAlert("Categoría eliminada correctamente", "success");
    categoriaId.value = "";
    categoriaNombre.value = "";
    cargarCategorias();
  } catch (error) {
    showAlert("Error eliminando categoría", "error");
  }
}

const formProducto = document.getElementById("formProducto");
const productoId = document.getElementById("productoId");
const tablaProductos = document.querySelector("#tablaProductos tbody");

async function cargarProductos() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    const productos = await res.json();

    tablaProductos.innerHTML = "";

    productos.forEach((p) => {
      // p.Categoria puede ser null si no hay relación
      const nombreCategoria = p.Categoria
        ? p.Categoria.nombre
        : "Sin categoría";

      // Asegurar que el precio tenga dos decimales
      const precioFormateado = parseFloat(p.precio).toFixed(2);

      tablaProductos.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>${p.descripcion}</td>
          <td>$${precioFormateado}</td>
          <td>${p.cantidad}</td>
          <td>${nombreCategoria}</td>
          <td class="acciones">
            <button onclick="editarProducto(${p.id}, '${encodeURIComponent(
        p.nombre
      )}', '${encodeURIComponent(p.descripcion)}', ${precioFormateado}, ${
        p.cantidad
      }, ${p.categoria_id})">Editar</button>
            <button class="danger" onclick="eliminarProducto(${
              p.id
            })">Eliminar</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    showAlert("Error cargando productos", "error");
    console.error(error);
  }
}

formProducto.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("productoNombre").value.trim(),
    descripcion: document.getElementById("productoDescripcion").value.trim(),
    precio: document.getElementById("productoPrecio").value,
    cantidad: document.getElementById("productoCantidad").value,
    categoria_id: document.getElementById("productoCategoria").value,
  };

  if (
    !data.nombre ||
    !data.descripcion ||
    !data.precio ||
    !data.cantidad ||
    !data.categoria_id
  ) {
    return showAlert("Todos los campos son obligatorios", "warning");
  }

  try {
    let res;
    if (productoId.value) {
      res = await fetch(`${API_URL}/productos/${productoId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const json = await res.json();
    if (!res.ok)
      return showAlert(json.error || "Error procesando el producto", "error");

    formProducto.reset();
    productoId.value = "";
    showAlert("Producto guardado correctamente", "success");
    cargarProductos();
  } catch (error) {
    showAlert("Error en la comunicación con el servidor", "error");
  }
});

function editarProducto(
  id,
  nombre,
  descripcion,
  precio,
  cantidad,
  categoriaId
) {
  productoId.value = id;
  document.getElementById("productoNombre").value = nombre;
  document.getElementById("productoDescripcion").value = descripcion;
  document.getElementById("productoPrecio").value = precio;
  document.getElementById("productoCantidad").value = cantidad;
  document.getElementById("productoCategoria").value = categoriaId;
}

async function eliminarProducto(id) {
  const confirmed = await showConfirm(
    "¿Seguro que deseas eliminar este producto?"
  );
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok)
      return showAlert(json.error || "Error eliminando el producto", "error");

    showAlert("Producto eliminado correctamente", "success");
    productoId.value = "";
    formProducto.reset();
    cargarProductos();
  } catch (error) {
    showAlert("Error eliminando producto", "error");
  }
}

function showAlert(message, type = "success") {
  const container = document.getElementById("alertContainer");
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;
  container.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "fadeOut 0.4s forwards";
    setTimeout(() => alert.remove(), 400);
  }, 3000);
}

function showConfirm(message) {
  return new Promise((resolve) => {
    const container = document.getElementById("alertContainer");

    const confirmBox = document.createElement("div");
    confirmBox.className = "alert confirm";
    confirmBox.innerHTML = `
      <span>${message}</span>
      <div class="confirm-buttons">
        <button class="secondary yes">Sí</button>
        <button class="danger no">No</button>
      </div>
    `;

    container.appendChild(confirmBox);

    confirmBox.querySelector(".yes").addEventListener("click", () => {
      confirmBox.remove();
      resolve(true);
    });
    confirmBox.querySelector(".no").addEventListener("click", () => {
      confirmBox.remove();
      resolve(false);
    });
  });
}
