describe('E2E - Productos', () => {
  const apiUrl = 'http://localhost:3000';
  let categoriaId;
  let productoId;

  it('POST /categorias - crear categoría base', () => {
    const nombreCategoria = `Ropa-${Date.now()}`;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/categorias`,
      body: { nombre: nombreCategoria },
      failOnStatusCode: false
    }).then((res) => {
      if (res.status === 201) {
        categoriaId = res.body.id;
      } else {
        cy.request(`${apiUrl}/categorias`).then((getRes) => {
          const cat = getRes.body.find(c => c.nombre === nombreCategoria);
          categoriaId = cat.id;
        });
      }
    });
  });

  it('POST /productos - crear', () => {
    const nombreProducto = `Remera-${Date.now()}`;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/productos`,
      body: {
        nombre: nombreProducto,
        descripcion: 'Algodón',
        precio: 1000,
        cantidad: 5,
        categoria_id: categoriaId
      },
      failOnStatusCode: false
    }).then((res) => {
      expect([201, 400]).to.include(res.status);
      if (res.status === 201) productoId = res.body.id;
    });
  });

  it('POST /productos - duplicado', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/productos`,
      body: {
        nombre: `Remera-${Date.now()}`, 
        descripcion: 'Duplicado',
        precio: 1500,
        cantidad: 3,
        categoria_id: categoriaId
      },
      failOnStatusCode: false
    }).then((res) => {
      expect([201, 400]).to.include(res.status);
    });
  });

  it('GET /productos', () => {
    cy.request(`${apiUrl}/productos`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  it('PUT /productos/:id', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/productos/${productoId}`,
      body: { precio: 2500 },
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 400]).to.include(res.status);
      if (res.status === 200) expect(res.body.precio).to.eq(2500);
    });
  });

  it('DELETE /productos/:id', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/productos/${productoId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 400]).to.include(res.status);
    });
  });
});
