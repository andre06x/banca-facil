import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Estabelecimento from "./Estabelecimento.js";
import Categoria from "./Categoria.js";
import ProdutoTaxa from "./ProdutoTaxa.js";

const Produto = sequelize.define(
  "produto",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    foto: {
      type: Sequelize.BLOB,
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
    },
    quantidade_disponivel: {
      type: Sequelize.INTEGER,
    },
  },
  { underscored: true, freezeTableName: true }
);

Produto.hasMany(ProdutoTaxa, { foreignKey: "produto_id" });
Produto.belongsTo(Estabelecimento, {
  foreignKey: "estabelecimento_id",
  allowNull: false,
});
Produto.belongsTo(Categoria, { foreignKey: "categoria_id", allowNull: false });
export default Produto;
