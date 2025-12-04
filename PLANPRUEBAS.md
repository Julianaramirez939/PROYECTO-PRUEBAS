# PLAN DE PRUEBAS – CATEGORÍAS Y PRODUCTOS

Este documento describe los casos de prueba **Unitarios**, **Integración** y **E2E (Cypress / Supertest)** para el sistema de gestión de categorías y productos.

---

# 1. Pruebas de Integración – Categorías

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| INT-CAT-01 | Integración | Crear categoría | BD vacía | 1. Ejecutar `crearCategoria({ nombre: "Electronica" })`.<br>2. Verificar que responde con código 201.<br>3. Consultar BD para confirmar el registro. | La categoría debe crearse correctamente con un ID único y quedar almacenada en BD. | La categoría fue creada correctamente y almacenada con un ID válido en BD. |
| INT-CAT-02 | Integración | Evitar duplicados | Categoría "Electronica" existente | 1. Ejecutar nuevamente `crearCategoria({ nombre: "Electronica" })`.<br>2. Verificar que responde con 400.<br>3. Validar el mensaje de error recibido. | El sistema debe rechazar duplicados, devolviendo 400 y mensaje "Categoría ya existe". | El sistema rechazó el duplicado con código 400 y mensaje correcto. |
| INT-CAT-03 | Integración | Actualizar categoría | Categoría con ID=1 | 1. Ejecutar `actualizarCategoria(1, { nombre: "Tecnología" })`.<br>2. Verificar código 200.<br>3. Validar nombre actualizado en BD. | El nombre debe cambiarse a "Tecnología" correctamente. | El nombre fue actualizado correctamente en BD. |
| INT-CAT-04 | Integración | Eliminar categoría | Sin productos asociados | 1. Ejecutar `eliminarCategoria(1)`.<br>2. Verificar código 200.<br>3. Confirmar que ya no existe en BD. | La categoría debe eliminarse correctamente y no aparecer en consultas posteriores. | La categoría fue eliminada correctamente y ya no existe en la BD. |

---

# 2. Pruebas de Integración – Productos

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| INT-PROD-01 | Integración | Crear producto | Categoría ID=1 existente | 1. Ejecutar `crearProducto({...})`.<br>2. Verificar código 201.<br>3. Confirmar registro en BD. | El producto debe crearse con ID único y vincularse a la categoría correspondiente. | El producto fue creado correctamente y vinculado a la categoría en BD. |
| INT-PROD-02 | Integración | Evitar duplicados | Producto "Remera" existente | 1. Intentar crear producto con el mismo nombre.<br>2. Verificar código 400.<br>3. Validar mensaje de duplicado. | El sistema debe impedir el duplicado devolviendo error 400. | El sistema devolvió 400 correctamente indicando producto duplicado. |
| INT-PROD-03 | Integración | Actualizar producto | Producto ID=1 | 1. Ejecutar `actualizarProducto(1, { precio: 2500 })`.<br>2. Verificar código 200.<br>3. Validar cambio en BD. | El precio debe actualizarse correctamente. | El precio fue actualizado correctamente y persistió en la BD. |
| INT-PROD-04 | Integración | Eliminar producto | Producto ID=1 | 1. Ejecutar `eliminarProducto(1)`.<br>2. Verificar código 200.<br>3. Verificar que no exista en BD. | El producto debe eliminarse correctamente. | El producto fue eliminado correctamente de la BD. |

---

# 3. Pruebas Unitarias – Categorías

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| UNIT-CAT-01 | Unitaria | Crear categoría | BD vacía | 1. Ejecutar función `crearCategoria()`.<br>2. Simular el comportamiento del modelo.<br>3. Validar la respuesta. | Retorna objeto con ID, nombre y fecha de creación. | La función devolvió un objeto válido con ID y nombre asignado. |
| UNIT-CAT-02 | Unitaria | Evitar duplicados | Categoría existente | 1. Simular la existencia previa de la categoría.<br>2. Ejecutar creación con mismo nombre.<br>3. Validar error. | Debe lanzar error personalizado de duplicado. | El sistema lanzó el error de duplicado correctamente. |
| UNIT-CAT-03 | Unitaria | Obtener categorías | BD con registros | 1. Preparar lista simulada de categorías.<br>2. Ejecutar `obtenerCategorias()`.<br>3. Verificar respuesta. | Se debe retornar un array con una o más categorías. | Se retornó un array con datos correctos. |
| UNIT-CAT-04 | Unitaria | Obtener categoría por ID | Categoría existente | 1. Simular el retorno de la categoría según el ID.<br>2. Ejecutar búsqueda.<br>3. Validar respuesta. | Se debe retornar la categoría correspondiente. | La categoría fue retornada correctamente. |
| UNIT-CAT-05 | Unitaria | Actualizar categoría | Categoría existente | 1. Preparar datos simulados actuales.<br>2. Ejecutar actualización.<br>3. Validar cambios. | La función debe retornar la categoría con datos actualizados. | El cambio fue aplicado correctamente. |
| UNIT-CAT-06 | Unitaria | Error actualizar duplicado | Nombre “Hogar” ya existe | 1. Simular una categoría existente con ese nombre.<br>2. Ejecutar actualización.<br>3. Validar error. | Debe devolver error de duplicado. | El error de duplicado se generó correctamente. |
| UNIT-CAT-07 | Unitaria | Evitar eliminar con productos asociados | Productos asociados | 1. Simular la relación con productos.<br>2. Ejecutar eliminación.<br>3. Validar excepción. | Debe devolver error indicando dependencia. | El error de dependencia se generó correctamente. |

---

# 4. Pruebas Unitarias – Productos

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| UNIT-PROD-01 | Unitaria | Crear producto | Categoría existente | 1. Ejecutar `crearProducto()`.<br>2. Simular el proceso de guardado.<br>3. Validar retorno. | Producto creado con ID, nombre y categoría. | Producto retornado correctamente con ID y datos válidos. |
| UNIT-PROD-02 | Unitaria | Evitar duplicado | Producto “Pera” ya existe | 1. Simular existencia previa.<br>2. Ejecutar creación repetida.<br>3. Validar error. | Debe lanzar error de duplicado. | Error de duplicado generado correctamente. |
| UNIT-PROD-03 | Unitaria | Obtener productos | BD con registros | 1. Preparar lista simulada de productos.<br>2. Ejecutar función.<br>3. Validar array retornado. | Debe retornar un array con productos. | Se retornó un array válido. |
| UNIT-PROD-04 | Unitaria | Obtener por ID | Producto existente | 1. Simular el producto buscado.<br>2. Ejecutar búsqueda.<br>3. Validar objeto. | Debe retornar el producto correcto. | El producto fue retornado correctamente. |
| UNIT-PROD-05 | Unitaria | Obtener productos por categoría | Categoría con productos | 1. Simular lista filtrada.<br>2. Ejecutar consulta.<br>3. Validar lista. | Se debe retornar lista filtrada correctamente. | Lista retornada correctamente. |
| UNIT-PROD-06 | Unitaria | Actualizar producto | Producto existente | 1. Preparar datos simulados anteriores.<br>2. Ejecutar actualización.<br>3. Validar cambios. | Debe actualizar los datos y retornarlos. | Los cambios se aplicaron correctamente. |
| UNIT-PROD-07 | Unitaria | Error actualizar duplicado | Nombre ya existe | 1. Simular conflicto de nombre repetido.<br>2. Ejecutar actualización.<br>3. Validar error. | Debe generar error por duplicado. | Error de duplicado generado exitosamente. |
| UNIT-PROD-08 | Unitaria | Eliminar producto | Producto existente | 1. Simular existencia del producto.<br>2. Ejecutar eliminación.<br>3. Validar retorno. | Debe eliminarse correctamente. | Eliminado correctamente. |
| UNIT-PROD-09 | Unitaria | Error eliminar inexistente | ID no válido | 1. Simular que el producto no existe.<br>2. Ejecutar eliminación.<br>3. Validar error. | Debe devolver "Producto no encontrado". | Mensaje de error retornado correctamente. |

---

# 5. Pruebas E2E – Cypress

## 5.1 E2E – Categorías

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| E2E-CAT-01 | E2E | Crear categoría | Servidor backend activo | 1. POST `/categorias` con nombre único.<br>2. Validar status 201.<br>3. Revisar objeto devuelto. | Categoría creada con ID y datos correctos. | Categoría creada exitosamente y retornada en formato correcto. |
| E2E-CAT-02 | E2E | Crear duplicada | Categoría existente | 1. POST con nombre repetido.<br>2. Validar 400.<br>3. Revisar mensaje. | Error 400 indicando categoría duplicada. | Error retornado correctamente. |
| E2E-CAT-03 | E2E | Listar categorías | BD con datos | 1. GET `/categorias`.<br>2. Validar status 200.<br>3. Verificar array. | Se retorna lista con categorías. | Lista obtenida correctamente. |
| E2E-CAT-04 | E2E | Actualizar categoría | Categoría creada | 1. PUT `/categorias/:id`.<br>2. Validar cambio en respuesta. | 200 y datos actualizados. | Actualización aplicada correctamente. |
| E2E-CAT-05 | E2E | Eliminar categoría | Categoría creada | 1. DELETE `/categorias/:id`.<br>2. Validar 200. | Categoría eliminada desde API. | Eliminación realizada con éxito. |

---

## 5.2 E2E – Productos

| ID | Tipo | Descripción | Pre requisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|---------------------|---------------------|
| E2E-PROD-01 | E2E | Crear producto | Categoría existente | 1. POST `/productos`.<br>2. Validar status 201.<br>3. Verificar campos. | Producto creado con ID y asignado a categoría. | Producto creado correctamente. |
| E2E-PROD-02 | E2E | Crear duplicado | Producto existente | 1. POST con mismo nombre.<br>2. Esperar 400. | Error por duplicado. | Error devuelto correctamente. |
| E2E-PROD-03 | E2E | Listar productos | BD con datos | 1. GET `/productos`.<br>2. Validar status 200.<br>3. Verificar lista. | Devuelve array de productos. | Lista retornada exitosamente. |
| E2E-PROD-04 | E2E | Editar producto | Producto creado | 1. PUT `/productos/:id`.<br>2. Revisar cambios. | Producto actualizado. | Cambios aplicados correctamente. |
| E2E-PROD-05 | E2E | Eliminar producto | Producto creado | 1. DELETE `/productos/:id`.<br>2. Validar 200. | Producto eliminado. | Eliminado correctamente. |
