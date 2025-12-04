const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Categorias = require("./Categorias");

const Productos = sequelize.define(
  "Productos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categorias,
        key: "id",
      },
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);

module.exports = Productos;
