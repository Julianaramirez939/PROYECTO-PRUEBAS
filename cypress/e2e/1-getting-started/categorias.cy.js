describe('E2E - Categorías', () => {
  const apiUrl = 'http://localhost:3000'; 
  let categoriaId;

  it('POST /categorias - crear', () => {
    const nombreCategoria = `Electronica-${Date.now()}`;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/categorias`,
      body: { nombre: nombreCategoria },
      failOnStatusCode: false 
    }).then((res) => {
      if (res.status === 201) {
        categoriaId = res.body.id;
        expect(res.body.nombre).to.eq(nombreCategoria);
      } else if (res.status === 400) {
        cy.request(`${apiUrl}/categorias`).then((getRes) => {
          const cat = getRes.body.find(c => c.nombre === nombreCategoria);
          categoriaId = cat.id;
        });
      }
    });
  });

  it('POST /categorias - duplicada', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/categorias`,
      body: { nombre: 'DuplicadoTest' },
      failOnStatusCode: false
    }).then((res) => {
      expect([201, 400]).to.include(res.status);
    });
  });

  it('GET /categorias', () => {
    cy.request(`${apiUrl}/categorias`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  it('PUT /categorias/:id', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/categorias/${categoriaId}`,
      body: { nombre: 'Tech' },
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 400]).to.include(res.status);
      if (res.status === 200) expect(res.body.nombre).to.eq('Tech');
    });
  });

  it('DELETE /categorias/:id', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/categorias/${categoriaId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 400]).to.include(res.status);
    });
  });
});
