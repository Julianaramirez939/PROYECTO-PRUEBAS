# 📘 PLAN DE PRUEBAS – CATEGORÍAS Y PRODUCTOS

Este documento describe los casos de prueba **Unitarios**, **Integración** y **E2E (Cypress + Supertest)** para el sistema de gestión de categorías y productos.

---

# 1. Pruebas de Integración – Categorías

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| INT-CAT-01 | Integración | Crear categoría | BD vacía | 1. Ejecutar `crearCategoria({ nombre: "Electronica" })` | Categoría creada | ✔ Correcto |
| INT-CAT-02 | Integración | Evitar duplicados | Categoría "Electronica" creada | 1. Ejecutar `crearCategoria()` con el mismo nombre | Error duplicado | ✔ Correcto |
| INT-CAT-03 | Integración | Actualizar categoría | ID=1 existente | 1. Ejecutar `actualizarCategoria(1, { nombre: "Tecnología" })` | Nombre actualizado | ✔ Correcto |
| INT-CAT-04 | Integración | Eliminar categoría | Categoría sin productos asociados | 1. Ejecutar `eliminarCategoria(1)` | Categoría eliminada | ✔ Correcto |

---

# ✅ 2. Pruebas de Integración – Productos

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| INT-PROD-01 | Integración | Crear producto | Categoría ID=1 | 1. Ejecutar `crearProducto({...})` | Producto creado | ✔ Correcto |
| INT-PROD-02 | Integración | Evitar duplicado | Producto “Remera” creado | 1. Ejecutar creación con mismo nombre | Error por duplicado | ✔ Correcto |
| INT-PROD-03 | Integración | Actualizar producto | Producto ID=1 | 1. Ejecutar `actualizarProducto(1)` | Propiedad actualizada | ✔ Correcto |
| INT-PROD-04 | Integración | Eliminar producto | Producto ID=1 | 1. Ejecutar `eliminarProducto(1)` | Eliminado correctamente | ✔ Correcto |

---

# ✅ 3. Pruebas Unitarias – Categorías

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| UNIT-CAT-01 | Unitaria | Crear categoría | BD vacía | 1. Ejecutar `crearCategoria()` | Categoría creada con ID | ✔ Correcto |
| UNIT-CAT-02 | Unitaria | Evitar duplicados | Categoría creada | 1. Crear misma categoría | Error de duplicado | ✔ Correcto |
| UNIT-CAT-03 | Unitaria | Obtener categorías | BD con registros | 1. Ejecutar `obtenerCategorias()` | Lista con elementos | ✔ Correcto |
| UNIT-CAT-04 | Unitaria | Obtener categoría por ID | Categoría existente | 1. Ejecutar `obtenerCategoriaPorId(id)` | Devuelve objeto categoría | ✔ Correcto |
| UNIT-CAT-05 | Unitaria | Actualizar categoría | Categoría existente | 1. Ejecutar `actualizarCategoria(id)` | Categoría actualizada | ✔ Correcto |
| UNIT-CAT-06 | Unitaria | Error actualizar duplicado | Categoría "Hogar" ya existe | 1. Actualizar a nombre repetido | Error duplicado | ✔ Correcto |
| UNIT-CAT-07 | Unitaria | Evitar eliminar con productos asociados | Producto asociado | 1. Ejecutar `eliminarCategoria(id)` | Error de asociación | ✔ Correcto |

---

# ✅ 4. Pruebas Unitarias – Productos

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| UNIT-PROD-01 | Unitaria | Crear producto | Categoría existente | 1. Ejecutar `crearProducto()` | Producto creado | ✔ Correcto |
| UNIT-PROD-02 | Unitaria | Evitar duplicado | Producto creado | 1. Crear producto con mismo nombre | Error duplicado | ✔ Correcto |
| UNIT-PROD-03 | Unitaria | Obtener productos | BD con registros | 1. Ejecutar `obtenerProductos()` | Lista con elementos | ✔ Correcto |
| UNIT-PROD-04 | Unitaria | Obtener producto por ID | Producto existente | 1. Ejecutar `obtenerProductoPorId(id)` | Devuelve producto | ✔ Correcto |
| UNIT-PROD-05 | Unitaria | Obtener productos por categoría | Categoría con productos | 1. Ejecutar `obtenerProductosPorCategoria(id)` | Lista filtrada | ✔ Correcto |
| UNIT-PROD-06 | Unitaria | Actualizar producto | Producto existente | 1. Ejecutar `actualizarProducto(id)` | Producto modificado | ✔ Correcto |
| UNIT-PROD-07 | Unitaria | Error actualizar duplicado | Ya existe un producto "Pera" | 1. Cambiar nombre a duplicado | Error duplicado | ✔ Correcto |
| UNIT-PROD-08 | Unitaria | Eliminar producto | Producto existente | 1. Ejecutar `eliminarProducto(id)` | Producto eliminado | ✔ Correcto |
| UNIT-PROD-09 | Unitaria | Error eliminar inexistente | ID inválido | 1. Ejecutar `eliminarProducto(9999)` | Error "Producto no encontrado" | ✔ Correcto |

---

# ✅ 5. Pruebas E2E – Cypress

## **5.1 E2E – Categorías**

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| E2E-CAT-01 | E2E | Crear categoría | Servidor corriendo | 1. POST `/categorias` con nombre único | 201 y objeto creado | ✔ Correcto |
| E2E-CAT-02 | E2E | Crear duplicada | Categoría ya creada | 1. POST mismo nombre | 400 | ✔ Correcto |
| E2E-CAT-03 | E2E | Listar categorías | BD con datos | 1. GET `/categorias` | Retorna array | ✔ Correcto |
| E2E-CAT-04 | E2E | Actualizar categoría | categoría creada | 1. PUT `/categorias/:id` | 200 y cambio aplicado | ✔ Correcto |
| E2E-CAT-05 | E2E | Eliminar categoría | categoría creada | 1. DELETE `/categorias/:id` | 200 | ✔ Correcto |

---

## **5.2 E2E – Productos**

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| E2E-PROD-01 | E2E | Crear producto | Categoría creada | 1. POST `/productos` | 201 y objeto creado | ✔ Correcto |
| E2E-PROD-02 | E2E | Crear duplicado | Producto ya existe | 1. POST mismo nombre | 400 | ✔ Correcto |
| E2E-PROD-03 | E2E | Listar productos | BD con datos | 1. GET `/productos` | Retorna lista | ✔ Correcto |
| E2E-PROD-04 | E2E | Editar producto | Producto creado | 1. PUT `/productos/:id` | 200 y cambio aplicado | ✔ Correcto |
| E2E-PROD-05 | E2E | Eliminar producto | Producto creado | 1. DELETE `/productos/:id` | 200 | ✔ Correcto |

---
