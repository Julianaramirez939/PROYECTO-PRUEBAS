const sequelize = require("../config/db");
const Categorias = require("./Categorias");
const Productos = require("./Productos");
Categorias.hasMany(Productos, { foreignKey: "categoria_id" });
Productos.belongsTo(Categorias, { foreignKey: "categoria_id" });
const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log("Tablas sincronizadas correctamente");
  } catch (error) {
    console.error("Error sincronizando las tablas:", error);
  }
};

module.exports = { sequelize, Categorias, Productos, syncDB };
