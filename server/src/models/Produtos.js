import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Estabelecimento from "./Estabelecimento.js";
import Categorias from "./Categorias.js";

const Produtos = sequelize.define(
  "produtos",
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
      type: Sequelize.TEXT,
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
    },
    quantidade_disponivel: {
      type: Sequelize.INTEGER,
    },
    taxas_id: {
      type: Sequelize.UUID,
    },
  },
  { underscored: true, freezeTableName: true }
);

Produtos.belongsTo(Estabelecimento, { foreignKey: "estabelecimento_id" });
Produtos.belongsTo(Categorias, { foreignKey: "categoria_id" });
export default Produtos;
