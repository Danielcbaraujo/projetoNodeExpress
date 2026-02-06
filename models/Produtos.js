const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Produto = sequelize.define("Produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Produto.sync({ force: false });

module.exports = Produto;
