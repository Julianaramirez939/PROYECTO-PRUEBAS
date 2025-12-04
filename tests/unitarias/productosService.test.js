const { sequelize } = require('../../src/models');
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  actualizarProducto,
  eliminarProducto
} = require('../../src/services/productosService');

const { crearCategoria } = require('../../src/services/categoriasService');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const cat = await crearCategoria({ nombre: 'Alimentos' });
  global.categoriaId = cat.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('ProductosService - Pruebas Unitarias', () => {

  let productoId;

  test('crearProducto debe crear un producto', async () => {
    const producto = await crearProducto({
      nombre: 'Manzana',
      descripcion: 'Roja',
      precio: 3,
      cantidad: 10,
      categoria_id: global.categoriaId
    });

    productoId = producto.id;

    expect(producto).toHaveProperty('id');
    expect(producto.nombre).toBe('Manzana');
  });

  test('crearProducto debe fallar si el nombre está repetido', async () => {
    await expect(crearProducto({
      nombre: 'Manzana',
      descripcion: 'X',
      precio: 1,
      cantidad: 1,
      categoria_id: global.categoriaId
    })).rejects.toThrow('Ya existe un producto con este nombre');
  });

  test('obtenerProductos debe retornar listado', async () => {
    const productos = await obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  test('obtenerProductoPorId debe retornar un producto', async () => {
    const producto = await obtenerProductoPorId(productoId);
    expect(producto).not.toBeNull();
    expect(producto.id).toBe(productoId);
  });

  test('obtenerProductosPorCategoria debe retornar productos', async () => {
    const productos = await obtenerProductosPorCategoria(global.categoriaId);
    expect(productos.length).toBeGreaterThan(0);
  });

  test('actualizarProducto debe modificar un producto', async () => {
    const actualizado = await actualizarProducto(productoId, {
      nombre: 'Manzana Roja',
      cantidad: 20
    });

    expect(actualizado.nombre).toBe('Manzana Roja');
    expect(actualizado.cantidad).toBe(20);
  });

  test('actualizarProducto debe fallar si el nombre existe en otro producto', async () => {
    await crearProducto({
      nombre: 'Pera',
      descripcion: 'Verde',
      precio: 2,
      cantidad: 5,
      categoria_id: global.categoriaId
    });

    await expect(actualizarProducto(productoId, { nombre: 'Pera' }))
      .rejects
      .toThrow('Ya existe un producto con este nombre');
  });

  test('eliminarProducto debe borrar un producto', async () => {
    const res = await eliminarProducto(productoId);
    expect(res.mensaje).toBe('Producto eliminado');
  });

  test('eliminarProducto debe fallar si el ID no existe', async () => {
    await expect(eliminarProducto(9999))
      .rejects
      .toThrow('Producto no encontrado');
  });

});
